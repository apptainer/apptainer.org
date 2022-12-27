.. _installation:

##########################
 Installing {Project}
##########################

This section will guide you through the process of installing
{Project} {InstallationVersion} via several different methods. (For
instructions on installing earlier versions of {Project} please see
`earlier versions of the docs <https://apptainer.org/docs/>`_.)

***********************
 Installation on Linux
***********************

{Project} can be installed on any modern Linux distribution, on
bare-metal or inside a Virtual Machine.
It can even often be run nested inside another {Project} container
or inside some other container system.

System Requirements
===================

{Project} requires ~150MiB disk space once compiled and installed.

There are no specific CPU or memory requirements at runtime, though 
at least 2GB of RAM is recommended when building from source.

Full functionality of {Project} requires that the kernel supports:

-  **Unprivileged user namespaces** - (minimum kernel >=3.8, >=4.18
   or 3.10.0-1127 on RHEL7 recommended)
   Required to run containers without root or setuid privilege.
   The recommended versions are required for unprivileged SIF file
   mounts.

-  **OverlayFS mounts** - (minimum kernel >=3.18, >=5.11 recommended)
   Required for full flexibility in bind mounts to containers in suid
   mode, and to support persistent overlays for writable containers
   in suid mode.  Kernel 5.11 enables support for persistent overlay
   unprivileged, but otherwise fuse-overlayfs will be used for that.

Instructions to install without or with setuid privileges are below.
Please make sure you are familiar with the discussion on
`Setuid & User Namespaces <{userdocs}/security.html#setuid-user-namespaces>`_
in the Security section of the user guide, and the
:ref:`User Namespace Requirements <userns-requirements>`
in this guide.

Non-standard ldconfig / Nix & Guix Environments
-----------------------------------------------

If {Project} is installed under a package manager such as Nix or
Guix, but on top of a standard Linux distribution (e.g. RHEL or
Debian), it may be unable to correctly find the libraries for ``--nv``
and ``--rocm`` GPU support. This issue occurs as the package manager
supplies an alternative ``ldconfig``, which does not identify GPU
libraries installed from host packages.

To allow {Project} to locate the host (i.e. RHEL / Debian) GPU
libraries correctly, set ``binary path`` in ``{command}.conf`` to
point to the directory of the host's ``ldconfig`` before the
``$PATH:`` which is replaced by the user's PATH.
I.E., ``/sbin`` should be before any Nix or Guix
related path or the user's PATH.

Filesystem support / limitations
--------------------------------

{Project} supports most filesystems, but there are some limitations
when installing {Project} on, or running containers from, common
parallel / network filesystems. In general:

-  We recommend installing {Project} on local disk on each
   compute node.

-  If {Project} is installed to a network location, a
   ``--localstatedir`` should be provided on each node, and {Project}
   configured to use it.

-  The ``--localstatedir`` filesystem should support overlay mounts.

-  ``TMPDIR`` / ``{ENVPREFIX}_TMPDIR`` should be on a local filesystem
   wherever possible.

.. note::

   Set the ``--localstatedir`` location by by providing
   ``--localstatedir my/dir`` as an option when you configure your
   {Project} build with ``./mconfig``.

   Disk usage at the ``--localstatedir`` location is negligible (<1MiB).
   The directory is used as a location to mount the container root
   filesystem, overlays, bind mounts etc. that construct the runtime
   view of a container. You will not see these mounts from a host shell,
   as they are made in a separate mount namespace.

Overlay support
^^^^^^^^^^^^^^^

Some features of {Project}, such as the ``--writable-tmpfs`` and
``--overlay`` options, try to use the Linux ``overlay`` filesystem driver to
construct a container root filesystem that combines files from different
locations.
Not all filesystems can be used with the ``overlay`` driver,
so when containers are run from these filesystems some {Project}
features may not be available.

If the ``overlay`` kernel driver does not work, but the setuid flow
is not being used and unprivileged user namespaces are available, then
{Project} will use the ``fuse-overlayfs`` command if it can be found.
That works with additional filesystem types than the ``overlay``
kernel driver does not work with, and also works in cases where
older kernels do not support using the ``overlay`` driver unprivileged.

Overlay support has two aspects, referenced below:

-  ``lowerdir`` support for a filesystem allows a directory on that
   filesystem to act as the 'base' of a container. A filesystem must
   support overlay ``lowerdir`` for you be able to run {aProject}
   sandbox container on it, while using functionality such as
   ``--writable-tmpfs`` / ``--overlay``.

-  ``upperdir`` support for a filesystem allows a directory on that
   filesystem to be merged on top of a ``lowerdir`` to construct a
   container. If you use the ``--overlay`` option to overlay a directory
   onto a container, then the filesystem holding the overlay directory
   must support ``upperdir``.

Fakeroot with uid/gid mapping on Network filesystems
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

When {Project} is run using the :ref:`fakeroot <fakeroot>` option and
mappings are available in ``/etc/subuid`` and ``/etc/subgid`` then uids / gids
inside the container are mapped to different host uids / gids.

Most local filesystems (ext4/xfs etc.) have no problem with this
uid/gid mapping.
Most network filesystems (NFS/Lustre/GPFS etc.), however, only
support a single uid for each user. 
When additional user ids are attempted to be used the fileserver
will deny many operations, with 'permission denied' errors. 
This is currently a generic problem for rootless container
runtimes.

This is only a problem when sandbox images are stored on the network
filesystems.
For that case it is probably better to use one of the other fakeroot
modes that {Project} supports.
Alternatively, use SIF images instead of sandbox images because they
don't have the problem.

{Project} cache / atomic rename
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

{Project} will cache SIF container images generated from remote
sources, and any OCI/docker layers used to create them. The cache is
created at ``$HOME/.{command}/cache`` by default. The location of the
cache can be changed by setting the ``{ENVPREFIX}_CACHEDIR`` environment
variable.

The directory used for ``{ENVPREFIX}_CACHEDIR`` should be:

-  A unique location for each user. Permissions are set on the cache so
   that private images cached for one user are not exposed to another.
   This means that ``{ENVPREFIX}_CACHEDIR`` cannot be shared.

-  Located on a filesystem with sufficient space for the number and size
   of container images anticipated.

-  Located on a filesystem that supports atomic rename, if possible.

The {Project} cache is concurrency safe.
Parallel runs of {Project} that would create overlapping cache
entries will not conflict, as long as the filesystem used by
``{ENVPREFIX}_CACHEDIR`` supports atomic rename operations.

Support for atomic rename operations is expected on local POSIX
filesystems, but varies for network / parallel filesystems and may be
affected by topology and configuration. For example, Lustre supports
atomic rename of files only on a single MDT. Rename on NFS is only
atomic to a single client, not across systems accessing the same NFS
share.

If you are not certain that your ``$HOME`` or ``{ENVPREFIX}_CACHEDIR``
filesystems support atomic rename, do not run ``{command}`` in parallel
using remote container URLs. Instead use ``{command} pull`` to create
a local SIF image, and then run this SIF image in a parallel step. An
alternative is to use the ``--disable-cache`` option, but this will
result in each {Project} instance independently fetching the
container from the remote source, into a temporary location.

NFS
^^^

NFS filesystems support overlay mounts as a ``lowerdir`` only, and do
not support ``--fakeroot``.

-  Containers run from SIF files located on an NFS filesystem do not
   have restrictions.

-  In setuid mode, you cannot use ``--overlay`` to overlay a
   directory onto a container when the overlay (upperdir) directory is
   on an NFS filesystem.  
   In non-setuid mode with fuse-overlayfs it is allowed but will be read-only.

-  When building a container, or running a container with ``--fakeroot``, your
   ``TMPDIR`` / ``{ENVPREFIX}_TMPDIR`` should not be set to an NFS
   location.

-  You should not run a sandbox container with ``--fakeroot`` 
   from an NFS location.

Lustre / GPFS
^^^^^^^^^^^^^

Lustre and GPFS do not have sufficient ``upperdir`` or ``lowerdir``
overlay support for certain {Project} features, and do not support
``--fakeroot``.

-  In setuid mode, you cannot use ``--overlay`` or ``--writable-tmpfs`` with a
   sandbox container that is located on a Lustre or GPFS filesystem. SIF
   containers on Lustre / GPFS will work correctly with these options.
   It works with fuse-overlayfs in non-setuid mode.

-  In setuid mode, you cannot use ``--overlay`` to overlay a directory onto
   a container when the overlay (upperdir) directory is on a Lustre or GPFS
   filesystem.
   In non-setuid mode with fuse-overlayfs it is allowed but will be read-only.

-  When building a container, or running a container with ``--fakeroot``, your
   ``TMPDIR / {ENVPREFIX}_TMPDIR`` should not be a Lustre or GPFS
   location.

-  You should not run a sandbox container with ``--fakeroot`` from a
   Lustre or GPFS location.

FUSE-based filesystems
^^^^^^^^^^^^^^^^^^^^^^

The kernel overlay driver does not allow the upperdir to be a FUSE-based
filesystem, so in setuid mode that is disallowed.
It does work in non-setuid mode with fuse-overlayfs.


Install unprivileged from pre-built binaries
============================================

A script is available to make a relocatable unprivileged binary installation 
of {Project}, including all dependencies that are not normally installed
on Linux systems.  The script works on Red Hat Enterprise Linux-derived
systems, Fedora, Debian, and Ubuntu.

This is the easiest way to use it:

.. code::

    $ curl -s https://raw.githubusercontent.com/{orgrepo}/main/tools/install-unprivileged.sh | \
        bash -s - install-dir

where install-dir is the directory you want to install it into.
Once installed, you can run it with ``install-dir/bin/{command}``.

The script requires a few tools to be in the user's PATH that aren't
always available: ``curl``, ``rpm2cpio``, and ``cpio``.  If they are
not available and you do not have privileges to install them, you can
copy them from another compatible machine or you can run the script
on another machine and copy the installed files to the machine you
want them on.

Multiple architectures can be installed into the same directory on a
shared filesystem and it will automatically pick the correct
architecture when it runs.  
Architectures supported by EPEL and Fedora are supported.


Install from pre-built packages
===============================

Prebuilt packages are available for released versions of {Project} on
a variety of host operating systems.

Install RPM from EPEL or Fedora
-------------------------------

Multiple architectures of RPMs are available for Red Hat Enterprise
Linux and Fedora.

First, on Red Hat Enterprise Linux derived systems enable the EPEL
repositories like this:

.. code::

   $ sudo yum install -y epel-release

Then to install a non-setuid installation of {Project} do:

.. code::

   $ sudo yum install -y {command}

or for a setuid installation do:

.. code::

   $ sudo yum install -y {command}-suid

Install from GitHub release RPMs
--------------------------------

Alternatively, x86_64 RPMs are available on GitHub immediately after each
{Project} release and they can be installed directly from there.  For the
non-setuid installation:

.. code::

   $ sudo yum install -y https://github.com/{orgrepo}/releases/download/v{InstallationVersion}/{command}-{GitHubDownloadVersion}.x86_64.rpm

For the setuid installation do above command first and then this one:

.. code::

   $ sudo yum install -y https://github.com/{orgrepo}/releases/download/v{InstallationVersion}/{command}-suid-{GitHubDownloadVersion}.x86_64.rpm

Install Debian/Ubuntu packages
------------------------------

Pre-built Debian/Ubuntu packages are only available on GitHub and only
for the amd64 architecture.
For the non-setuid installation use these commands:

.. code::

    $ sudo apt-get update
    $ sudo apt-get install -y wget
    $ cd /tmp
    $ wget https://github.com/{orgrepo}/releases/download/v{InstallationVersion}/{command}_{InstallationVersion}_amd64.deb
    $ sudo apt-get install -y ./{command}_{InstallationVersion}_amd64.deb

For the setuid installation do above commands first and then these:

.. code::

    $ wget https://github.com/{orgrepo}/releases/download/v{InstallationVersion}/{command}-suid_{InstallationVersion}_amd64.deb
    $ sudo dpkg -i ./{command}-suid_{InstallationVersion}_amd64.deb

Install from Source
===================

To install from source, follow the instructions in `INSTALL.md
<https://github.com/{orgrepo}/blob/{repobranch}/INSTALL.md>`_
on GitHub.

Relocatable Installation
------------------------

An unprivileged (non-setuid) {Project} installation built from source is
relocatable. As long as the structure inside the installation directory
(``--prefix``) is maintained, it can be moved to a different location
and {Project} will continue to run normally.

Relocation of a setuid installation is not supported, as
restricted location / ownership of configuration files is important to
security.

Source bash completion file
---------------------------

If you installed from source, then
to enjoy bash shell completion with {Project} commands and options,
source the bash completion file (assuming the default installation prefix):

.. code::

   $ . /usr/local/share/bash-completion/completions/{command}

Add this command to your ``~/.bashrc`` file so that bash completion
continues to work in new shells. (Adjust the path if you installed
{Project} to a different location.)

Build an RPM
------------

If you use RHEL, CentOS or SUSE, building and installing {aProject}
RPM allows your {Project} installation be more easily managed,
upgraded and removed.  

The instructions on how to build the RPM from source are in a
`INSTALL.md section
<https://github.com/apptainer/apptainer/blob/main/INSTALL.md#building--installing-from-rpm>`_
on GitHub.

Build a Debian package
----------------------

Packaging for Debian and Ubuntu can also be built from source.
The instructions on how to do that are in a separate file `DEBIAN_PACKAGE.md
<https://github.com/apptainer/apptainer/blob/main/dist/debian/DEBIAN_PACKAGE.md>`_
on GitHub.


Testing & Checking the Build Configuration
==========================================

After installation you can perform a basic test of {Project}
functionality by executing a simple alpine container:

.. code::

   $ {command} exec docker://alpine cat /etc/alpine-release
   3.9.2

See the `user guide
<{userdocs}>`__ for more
information about how to use {Project}.

{command} buildcfg
--------------------

Running ``{command} buildcfg`` will show the build configuration of an
installed version of {Project}, and lists the paths used by
{Project}. Use ``{command} buildcfg`` to confirm paths are set
correctly for your installation, and troubleshoot any 'not-found' errors
at runtime.

.. code::

   $ {command} buildcfg
   PACKAGE_NAME={command}
   PACKAGE_VERSION={InstallationVersion}
   BUILDDIR=/home/dtrudg/Sylabs/Git/{command}/builddir
   PREFIX=/usr/local
   EXECPREFIX=/usr/local
   BINDIR=/usr/local/bin
   SBINDIR=/usr/local/sbin
   LIBEXECDIR=/usr/local/libexec
   DATAROOTDIR=/usr/local/share
   DATADIR=/usr/local/share
   SYSCONFDIR=/usr/local/etc
   SHAREDSTATEDIR=/usr/local/com
   LOCALSTATEDIR=/usr/local/var
   RUNSTATEDIR=/usr/local/var/run
   INCLUDEDIR=/usr/local/include
   DOCDIR=/usr/local/share/doc/{command}
   INFODIR=/usr/local/share/info
   LIBDIR=/usr/local/lib
   LOCALEDIR=/usr/local/share/locale
   MANDIR=/usr/local/share/man
   {ENVPREFIX}_CONFDIR=/usr/local/etc/{command}
   SESSIONDIR=/usr/local/var/{command}/mnt/session
   PLUGIN_ROOTDIR=/usr/local/libexec/apptainer/plugin
   APPTAINER_CONF_FILE=/usr/local/etc/apptainer/apptainer.conf
   APPTAINER_SUID_INSTALL=0

Note that the ``LOCALSTATEDIR`` and ``SESSIONDIR`` should be on local,
non-shared storage.

Test Suite
----------

The {Project} codebase includes a test suite that is run during
development using CI services.

If you would like to run the test suite locally you can run the test
targets from the ``builddir`` directory in the source tree:

-  ``make check`` runs source code linting and dependency checks

-  ``make unit-test`` runs basic unit tests

-  ``make integration-test`` runs integration tests

-  ``make e2e-test`` runs end-to-end tests, which exercise a large
   number of operations by calling the {Project} CLI with different
   execution profiles.

.. note::

   Running the full test suite requires a ``docker`` installation, and
   ``nc`` in order to test docker and instance/networking functionality.

   {Project} must be installed with suid in order to run the full test suite,
   as it must run the CLI with setuid privilege for the ``starter-suid``
   binary.

.. warning::

   ``sudo`` privilege is required to run the full tests, and you should
   not run the tests on a production system. We recommend running the
   tests in an isolated development or build environment.

********************************
 Installation on Windows or Mac
********************************

Linux container runtimes like {Project} cannot run natively on
Windows or Mac because of basic incompatibilities with the host kernel.
(Contrary to a popular misconception, MacOS does not run on a Linux
kernel. It runs on a kernel called Darwin originally forked from BSD.)

In order to use {Project} on these platforms, you can install Vagrant
Boxes via `Vagrant Cloud <https://www.vagrantup.com/>`__, one of
`Hashicorp's <https://www.hashicorp.com/#open-source-tools>`_ open
source tools, by following the instructions below. Then you can install
{Project} in the base VM of your choice by following the linux
:ref:`installation instructions <installation>` above.

Windows
=======

Install the following programs:

-  `Git for Windows <https://git-for-windows.github.io/>`_
-  `VirtualBox for Windows <https://www.virtualbox.org/wiki/Downloads>`_
-  `Vagrant for Windows <https://www.vagrantup.com/downloads.html>`_
-  `Vagrant Manager for Windows <http://vagrantmanager.com/downloads/>`_

Mac
===

{Project} is available via Vagrant (installable with `Homebrew
<https://brew.sh>`_ or manually)

To use Vagrant via Homebrew:

.. code::

   $ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
   $ brew install --cask virtualbox vagrant vagrant-manager
