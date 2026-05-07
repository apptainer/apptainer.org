.. _userns:

############################
 User Namespaces & Fakeroot
############################

User namespaces are an isolation feature that allow processes to run
with different user identifiers and/or privileges inside that namespace
than are permitted outside. A user may have a ``uid`` of ``1001`` on a
system outside of a user namespace, but run programs with a different
``uid`` with different privileges inside the namespace.

User namespaces are used with containers to make it possible to set up a
container without privileged operations, so that a normal user can
act as root inside a container to perform administrative tasks without
being root on the host outside. 

User namespaces are required whenever the setuid-root component of
{Project} is not installed.
The default installation of {Project} does not include a setuid-root
component.
Pros and cons of a setuid-root installation are discussed in the
`Security section <{userdocs}/security.html#setuid-user-namespaces>`_
of the user guide.

.. _userns-requirements:

*****************************
 User Namespace Requirements
*****************************

To allow unprivileged creation of user namespaces a kernel >=3.8 is
required, with >=4.18 being recommended due to support for unprivileged
mounting of FUSE filesystems (needed for example for mounting SIF files).
To use unprivileged overlayFS for creating missing bind mount paths and
for writable overlays, kernel >=5.11 is recommended.
Whenever the kernel overlayFS doesn't work then {Project} will use
fuse-overlayfs instead.  

Additionally, some Linux distributions require that unprivileged user
namespace creation is enabled using a ``sysctl`` or kernel command line
parameter. Please consult your distribution documentation or vendor to
confirm the steps necessary to 'enable unprivileged user namespace
creation'.  
In general, the parameter ``user.max_usernamespaces`` has to be non-zero,
and additionally on Debian the parameter ``kernel.unprivileged_userns_clone``
needs to be non-zero.

******************************
 Disabling network namespaces
******************************

There have been many Linux kernel exploits that have made use of
unprivileged user namespaces as a point of entry, but almost all of them
in the last few years have been in combination with network namespaces.
Therefore even though the {Project} project recommends enabling
unprivileged user namespaces, it recommends disabling network namespaces
when possible in order to substantially reduce the risk profile
and need for urgent updates when vulnerabilities are announced.

Network namespaces can be disabled on most Linux-based systems
like this:

.. code:: bash

   echo "user.max_net_namespaces = 0" \
        >/etc/sysctl.d/90-max_net_namespaces.conf
   sysctl -p /etc/sysctl.d/90-max_net_namespaces.conf 

{Project} does not by default make use of network namespaces, but it
does have some little-used privileged options beginning with ``--net``
that do.
Those options will not work when network namespaces are disabled.
Unfortunately it is not possible to disable only unprivileged
network namespaces, so this will affect programs that use them
even if run as root.

Some other container runtimes such as Docker and Podman do make use
of network namespaces by default.
Those two runtimes can still work when network namespaces are disabled
by adding the ``--net=host`` option.

Disabling network namespaces also blocks the systemd PrivateNetwork
feature.
To find services that use it, look for ``PrivateNetwork=true``
or ``PrivateNetwork=yes`` in ``/lib/systemd/system/*.service``.
This can be turned off for each service through a
``/etc/systemd/system/<service>.d/*.conf`` file, for example for
``systemd-hostnamed``:

.. code:: bash

   cd /etc/systemd/system
   mkdir -p systemd-hostnamed.service.d
   (echo "[Service]"; echo "PrivateNetwork=no") \
        >systemd-hostnamed.service.d/no-private-network.conf

If the service is enabled (that is, actively used) then restart it
and check its status:

.. code:: bash

   systemctl status systemd-hostnamed
   systemctl daemon-reload
   systemctl restart systemd-hostnamed
   systemctl status systemd-hostnamed

.. _fakeroot:

********************************
 "Rootless" Fakeroot feature
********************************

The ``--fakeroot`` option available on many {Project} functions allows an 
unprivileged user to run a container with the appearance of running as
root.
{Project} does this in multiple different ways depending on what
is available on the system. 
See details in the 
`Fakeroot feature section <{userdocs}/fakeroot.html>`_
of the user guide.

The most complete method of emulating running as root, the method used
for example by Podman and also commonly referred to as "rootless" mode,
requires administrator setup and also requires some assistance from an
enhanced-privilege program.
The rest of the documentation on this page describes how to do that
setup.
If this setup is done, {Project} will take advantage of it and use
it, otherwise it will try to use one of its other methods when the
``--fakeroot`` option is used.
The other methods do not require any special administrator setup,
so they actually use less privileges than the mode commonly called
"rootless" described below.
Again, the details of those other methods are in the
`Fakeroot feature section <{userdocs}/fakeroot.html>`_
of the user guide.

This mode not only maps the root user to the original unprivileged
user, but it also maps many additional UIDs and GIDs to otherwise 
unused UIDs and GIDs on the host, via `user namespace UID/GID mapping
<http://man7.org/linux/man-pages/man7/user_namespaces.7.html>`_.

User namespace UID/GID mapping allows a user to act as different
UIDs/GIDs in the container than they are on the host. A user can access a
configured range of UIDs/GIDs in the container, which map back to
unprivileged user UIDs/GIDs on the host. This allows a user
to be ``root (uid 0)`` in a container, install packages etc., but have
no privilege on the host.

Requirements
============

In addition to user namespace support, for rootless fakeroot mode {Project}
must manipulate ``subuid`` and ``subgid`` maps for the user namespace it
creates.
When {Project} is installed as setuid-root, it handles doing the
manipulations itself.
With non-suid installations of {Project} or where ``allow setuid =
no`` is set in ``{command}.conf``, {Project} attempts to use
external setuid binaries ``newuidmap`` and ``newgidmap``, so you need to
install those binaries on your system.

Basics
======

Rootless fakeroot relies on ``/etc/subuid`` and ``/etc/subgid`` files to find
configured mappings from real user and group IDs, to a range of
otherwise vacant IDs for each user on the host system that can be
remapped in the user namespace. A user must have an entry in these system
configuration files to use the fakeroot feature. {Project} provides
a :ref:`config fakeroot <config-fakeroot>` command to assist in managing
these files, but it is important to understand how they work.

For user ``foo`` an entry in ``/etc/subuid`` might be:

.. code:: text

   foo:100000:65536

where ``foo`` is the username, ``100000`` is the start of the UID range
that can be used by ``foo`` in a user namespace uid mapping, and
``65536`` number of UIDs available for mapping.

Same for ``/etc/subgid``:

.. code:: text

   foo:100000:65536

.. note::

   Some distributions add users to these files on installation, or when
   ``useradd``, ``adduser``, etc. utilities are used to manage local
   users.

   Newer operating systems that support libsubid can
   :ref:`manage these mappings centrally for a cluster <managed-subuid>`.

.. warning::

   {Project} requires that a range of at least ``65536`` IDs is used
   for each mapping. Larger ranges may be defined without error.

   It is also important to ensure that the subuid and subgid ranges
   defined in these files don't overlap with each other, or any real UIDs
   and GIDs on the host system.

So if you want to add another user ``bar``, ``/etc/subuid`` and
``/etc/subgid`` will look like:

.. code:: text

   foo:100000:65536
   bar:165536:65536

Resulting in the following allocation:

+------+----------+----------------------+
| User | Host UID | Sub UID/GID range    |
+======+==========+======================+
| foo  | 1000     | 100000 to 165535     |
+------+----------+----------------------+
| bar  | 1001     | 165536 to 231071     |
+------+----------+----------------------+

Inside a user namespace / container, ``foo`` and ``bar`` can now act as
any UID/GID between 0 and 65536, but these UIDs are confined to the
container. For ``foo`` UID 0 in the container will map to the host
``foo`` UID ``1000`` and ``1 to 65536`` will map to ``100000-165535``
outside of the container etc. This impacts the ownership of files, which
will have different IDs inside and outside of the container.

.. note::

   If you are managing large numbers of fakeroot mappings you may wish
   to specify users by UID rather than username in the ``/etc/subuid``
   and ``/etc/subgid`` files. The man page for ``subuid`` advises:

   "When large number of entries (10000-100000 or more) are defined in
   /etc/subuid, parsing performance penalty will become noticeable. In
   this case it is recommended to use UIDs instead of login names.
   Benchmarks have shown speed-ups up to 20x."

Filesystem considerations
=========================

Based on the above range, here we can see what happens when the user
``foo`` create files with the rootless ``--fakeroot`` feature:

+--------------------------------+----------------------------------+
| Create file with container UID | Created host file owned by UID   |
+================================+==================================+
| 0 (default)                    | 1000                             |
+--------------------------------+----------------------------------+
| 1 (daemon)                     | 100000                           |
+--------------------------------+----------------------------------+
| 2 (bin)                        | 100001                           |
+--------------------------------+----------------------------------+

Outside of the fakeroot container the user may not be able to remove
directories and files created with a subuid, as they do not match with
the user's UID on the host. The user can remove these files by using a
container shell running with fakeroot.

Network configuration
=====================

With rootless fakeroot, users can request a container network named
``fakeroot``.  
Other networks are restricted and can only be used by the real host root
user. By default the ``fakeroot`` network is configured to use a network
veth pair.

.. warning::

   Do not change the ``fakeroot`` network type in
   ``etc/{command}/network/40_fakeroot.conflist`` without considering
   the security implications.

.. note::

   Unprivileged installations of {Project} cannot use ``fakeroot``
   network as it requires privilege during container creation to set up
   the network.

.. _config-fakeroot:

Configuration with ``config fakeroot``
======================================

{Project} provides a ``config fakeroot`` command that
can be used by a root user to administer local system ``/etc/subuid``
and ``/etc/subgid`` files in a simple manner. This allows users to be
granted the ability to use {Project}'s fakeroot functionality without
editing the files manually. The ``config fakeroot`` command will
automatically ensure that generated subuid/subgid ranges are an
appropriate size, and do not overlap.

``config fakeroot`` must be run as the ``root`` user, or via ``sudo
{command} config fakeroot``, as the ``/etc/subuid`` and ``/etc/subgid``
files form part of the system configuration and are security sensitive.
You may ``--add`` or ``--remove`` user subuid/subgid mappings. You can
also ``--enable`` or ``--disable`` existing mappings.

.. note::

   Newer operating systems that support libsubid can
   :ref:`manage these mappings centrally for a cluster <managed-subuid>`.
   If you do not use that and you deploy {Project} to a cluster
   you will need to make
   arrangements to synchronize ``/etc/subuid`` and ``/etc/subgid``
   mapping files to all nodes.
   The `{command} config fakeroot` command only modifies the settings
   on the local machine.


Adding a fakeroot mapping
-------------------------

Use the ``-a/--add <user>`` option to ``config fakeroot`` to create new
mapping entries so that ``<user>`` can use the fakeroot feature of
{Project}:

.. code:: console

   $ sudo {command} config fakeroot --add dave

   # Show generated `/etc/subuid`
   $ cat /etc/subuid
   1000:4294836224:65536

   # Show generated `/etc/subgid`
   $ cat /etc/subgid
   1000:4294836224:65536

The first subuid range will be set to the top of the 32-bit UID
space. Subsequent subuid ranges for additional users will be created
working down from this value. This minimizes the change of overlap
with real UIDs on most systems.

.. note::

   The ``config fakeroot`` command generates mappings specified using
   the user's uid, rather than their username. This is the preferred
   format for faster lookups when configuring a large number of
   mappings, and the command can be used to manipulate these by
   username.

Deleting, disabling, enabling mappings
--------------------------------------

Use the ``-r/--remove <user>`` option to ``config fakeroot`` to
completely remove mapping entries. The ``<user>`` will no longer be able
to use the fakeroot feature of {Project}:

.. code:: console

   $ sudo {command} config fakeroot --remove dave

.. warning::

   If a fakeroot mapping is removed, the subuid/subgid range may be
   assigned to another user via ``--add``. Any remaining files from the
   prior user that were created with this mapping will be accessible to
   the new user via fakeroot.

The ``-d/--disable`` and ``-e/--enable`` options will comment and
uncomment entries in the mapping files, to temporarily disable and
subsequently re-enable fakeroot functionality for a user. This can be
useful to disable fakeroot for a user, but ensure the subuid/subgid
range assigned to them is reserved, and not re-assigned to a different
user.

.. code:: console

   # Disable dave
   $ sudo {command} config fakeroot --disable dave

   # Entry is commented
   $ cat /etc/subuid
   !1000:4294836224:65536

   # Enable dave
   $ sudo {command} config fakeroot --enable dave

   # Entry is active
   $ cat /etc/subuid
   1000:4294836224:65536


.. _managed-subuid:

*****************************************
 Centrally managed subuid/subgid mappings
*****************************************

When available on newer operating systems, {Project} supports the
``libsubid`` library (which comes from the
`shadow-utils package <https://github.com/shadow-maint/shadow>`_)
to use subuid and subgid mappings from an LDAP database shared within a
cluster of computers.  

To use this the cluster needs to be set up with a 
`FreeIPA <https://freeipa.org>`_ server that is
`configured <https://freeipa.readthedocs.io/en/latest/designs/subordinate-ids.html>`_
with the subordinate user and group ids.
In addition, the client machines need to have a line like the following in
``/etc/nsswitch.conf``:

.. code:: linuxconfig

    subid: sss
