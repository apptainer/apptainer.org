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
bare-metal or inside a Virtual Machine. Nested installations inside
containers are not recommended, and require the outer container to be
run with full privilege.

System Requirements
===================

{Project} requires ~140MiB disk space once compiled and installed.

There are no specific CPU or memory requirements at runtime, though 2GB
of RAM is recommended when building from source.

Full functionality of {Project} requires that the kernel supports:

-  **OverlayFS mounts** - (minimum kernel >=3.18) Required for full
   flexibility in bind mounts to containers, and to support persistent
   overlays for writable containers.

-  **Unprivileged user namespaces** - (minimum kernel >=3.8, >=3.18
   recommended) Required to run containers without root or setuid
   privilege.

External Binaries
-----------------

{Project} depends on a number of external binaries for full
functionality. The methods that are used to find
these binaries have been standardized as below.

Configurable Paths
^^^^^^^^^^^^^^^^^^

The following binaries are found on ``$PATH`` during build time when
``./mconfig`` is run, and their location is added to the
``{command}.conf`` configuration file. At runtime this configured
location is used. To specify an alternate executable, change the
relevant path entry in ``{command}.conf``.

-  ``cryptsetup`` version 2 with kernel LUKS2 support is required for
   building or executing encrypted containers.

-  ``ldconfig`` is used to resolve library locations / symlinks when
   using the ``-nv`` or ``--rocm`` GPU support.

-  ``nvidia-container-cli`` is used to configure a container for Nvidia
   GPU / CUDA support when running with the experimental ``--nvccli``
   option.

For the following additional binaries, if the ``{command}.conf`` entry
is left blank, then ``$PATH`` will be searched at runtime.

-  ``go`` is required to compile plugins, and must be an identical
   version as that used to build {Project}.

-  ``mksquashfs`` from squashfs-tools 4.3+ is used to create the
   squashfs container filesystem that is embedded into SIF container
   images. The ``mksquashfs procs`` and ``mksquashfs mem`` directives in
   ``{command}.conf`` can be used to control its resource usage.

-  ``unsquashfs`` from squashfs-tools 4.3+ is used to extract the
   squashfs container filesystem from a SIF file when necessary.

Searching $PATH
^^^^^^^^^^^^^^^

The following standard utilities are always found by searching ``$PATH``
at runtime:

-  ``true``

-  ``mkfs.ext3`` is used to create overlay images.

-  ``cp``

-  ``dd``

-  ``newuidmap`` and ``newgidmap`` are distribution provided setuid
   binaries used to configure subuid/gid mappings for ``--fakeroot`` in
   non-setuid installs.

Bootstrap Utilities
^^^^^^^^^^^^^^^^^^^

The following utilities are required to bootstrap containerized
distributions using their native tooling:

-  ``mount``, ``umount``, ``pacstrap`` for Arch Linux.
-  ``mount``, ``umount``, ``mknod``, ``debootstrap`` for Debian based
   distributions.
-  ``dnf`` or ``yum``, ``rpm``, ``curl`` for EL derived RPM based
   distributions.
-  ``uname``, ``zypper``, ``SUSEConnect`` for SLES derived RPM based
   distributions.

Non-standard ldconfig / Nix & Guix Environments
-----------------------------------------------

If {Project} is installed under a package manager such as Nix or
Guix, but on top of a standard Linux distribution (e.g. CentOS or
Debian), it may be unable to correctly find the libraries for ``--nv``
and ``--rocm`` GPU support. This issue occurs as the package manager
supplies an alternative ``ldconfig``, which does not identify GPU
libraries installed from host packages.

To allow {Project} to locate the host (i.e. CentOS / Debian) GPU
libraries correctly, set ``ldconfig path`` in ``{command}.conf`` to
point to the host ``ldconfig``. I.E. it should be set to
``/sbin/ldconfig`` or ``/sbin/ldconfig.real`` rather than a Nix or Guix
related path.

Filesystem support / limitations
--------------------------------

{Project} supports most filesystems, but there are some limitations
when installing {Project} on, or running containers from, common
parallel / network filesystems. In general:

-  We strongly recommend installing {Project} on local disk on each
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

Various features of {Project}, such as the ``--writable-tmpfs`` and
``--overlay``, options use the Linux ``overlay`` filesystem driver to
construct a container root filesystem that combines files from different
locations. Not all filesystems can be used with the ``overlay`` driver,
so when containers are run from these filesystems some {Project}
features may not be available.

Overlay support has two aspects:

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

Note that any overlay limitations mainly apply to sandbox (directory)
containers only. A SIF container is mounted into the ``--localstatedir``
location, which should generally be on a local filesystem that supports
overlay.

Fakeroot / (sub)uid/gid mapping
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

When {Project} is run using the :ref:`fakeroot <fakeroot>` option it
creates a user namespace for the container, and UIDs / GIDs in that user
namespace are mapped to different host UID / GIDs.

Most local filesystems (ext4/xfs etc.) support this uid/gid mapping in a
user namespace.

Most network filesystems (NFS/Lustre/GPFS etc.) *do not* support this
uid/gid mapping in a user namespace. Because the fileserver is not aware
of the mappings it will deny many operations, with 'permission denied'
errors. This is currently a generic problem for rootless container
runtimes.

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
not support user-namespace (sub)uid/gid mapping.

-  Containers run from SIF files located on an NFS filesystem do not
   have restrictions.

-  You cannot use ``--overlay mynfsdir/`` to overlay a directory onto a
   container when the overlay (upperdir) directory is on an NFS
   filesystem.

-  When using ``--fakeroot`` to build or run a container, your
   ``TMPDIR`` / ``{ENVPREFIX}_TMPDIR`` should not be set to an NFS
   location.

-  You should not run a sandbox container with ``--fakeroot`` from an
   NFS location.

Lustre / GPFS
^^^^^^^^^^^^^

Lustre and GPFS do not have sufficient ``upperdir`` or ``lowerdir``
overlay support for certain {Project} features, and do not support
user-namespace (sub)uid/gid mapping.

-  You cannot use ``-overlay`` or ``--writable-tmpfs`` with a sandbox
   container that is located on a Lustre or GPFS filesystem. SIF
   containers on Lustre / GPFS will work correctly with these options.

-  You cannot use ``--overlay`` to overlay a directory onto a container,
   when the overlay (upperdir) directory is on a Lustre or GPFS
   filesystem.

-  When using ``--fakeroot`` to build or run a container, your
   ``TMPDIR/{ENVPREFIX}_TMPDIR`` should not be a Lustre or GPFS
   location.

-  You should not run a sandbox container with ``--fakeroot`` from a
   Lustre or GPFS location.

.. _install-dependencies:

Install from Source
===================

To use the latest version of {Project} from GitHub you will need to
build and install it from source. This may sound daunting, but the
process is straightforward, and detailed below.

If you have an earlier version of {Project} installed, you should
:ref:`remove it <remove-an-old-version>` before executing the
installation commands. You will also need to install some dependencies
and install `Go <https://golang.org/>`_.

Install Dependencies
--------------------

On Red Hat Enterprise Linux or CentOS install the following
dependencies:

.. code:: sh

   $ sudo yum update -y && \
        sudo yum groupinstall -y 'Development Tools' && \
        sudo yum install -y \
        openssl-devel \
        libuuid-devel \
        libseccomp-devel \
        wget \
        squashfs-tools \
        cryptsetup

On Ubuntu or Debian install the following dependencies:

.. code:: sh

   $ sudo apt-get update && sudo apt-get install -y \
       build-essential \
       uuid-dev \
       libgpgme-dev \
       squashfs-tools \
       libseccomp-dev \
       wget \
       pkg-config \
       git \
       cryptsetup-bin

.. note::

   You can build {Project} without ``cryptsetup`` available,
   but will not be able to use encrypted containers without it installed
   on your system.

.. _install-go:

Install Go
----------

{Project} is written primarily in Go, and you will need Go 1.16.12
or above installed to compile it from source.

This is one of several ways to `install and configure Go
<https://golang.org/doc/install>`_.

.. note::

   If you have previously installed Go from a download, rather than an
   operating system package, you should remove your ``go`` directory,
   e.g. ``rm -r /usr/local/go`` before installing a newer version.
   Extracting a new version of Go over an existing installation can lead
   to errors when building Go programs, as it may leave old files, which
   have been removed or replaced in newer versions.

Visit the `Go download page <https://golang.org/dl/>`_ and pick a
package archive to download. Copy the link address and download with
wget. Then extract the archive to ``/usr/local`` (or use other
instructions on go installation page).

.. code::

   $ export VERSION={GoVersion} OS=linux ARCH=amd64 && \
       wget https://dl.google.com/go/go$VERSION.$OS-$ARCH.tar.gz && \
       sudo tar -C /usr/local -xzvf go$VERSION.$OS-$ARCH.tar.gz && \
       rm go$VERSION.$OS-$ARCH.tar.gz

Then, set up your environment for Go.

.. code::

   $ echo 'export GOPATH=${HOME}/go' >> ~/.bashrc && \
       echo 'export PATH=/usr/local/go/bin:${PATH}:${GOPATH}/bin' >> ~/.bashrc && \
       source ~/.bashrc

Download {Project} from a release
-------------------------------------

You can download {Project} from one of the releases. To see a full
list, visit `the GitHub release page
<https://github.com/{orgrepo}/releases>`_. After deciding on a
release to install, you can run the following commands to proceed with
the installation.

.. code::

   $ export VERSION={InstallationVersion} && # adjust this as necessary \
       wget https://github.com/{orgrepo}/releases/download/v${VERSION}/{command}-${VERSION}.tar.gz && \
       tar -xzf {command}-${VERSION}.tar.gz && \
       cd {command}-${VERSION}

Checkout Code from Git
----------------------

The following commands will install {Project} from the `GitHub repo
<https://github.com/{orgrepo}>`_ to ``/usr/local``. This method
will work for >=v{InstallationVersion}. To install an older tagged
release see `older versions of the docs <https://apptainer.org/docs/>`_.

When installing from source, you can decide to install from either a
**tag**, a **release branch**, or from the **main branch**.

-  **tag**: GitHub tags form the basis for releases, so installing from
   a tag is the same as downloading and installing a `specific release
   <https://github.com/{orgrepo}/releases>`_. Tags are expected
   to be relatively stable and well-tested.

-  **release branch**: A release branch represents the latest version of
   a minor release with all the newest bug fixes and enhancements (even
   those that have not yet made it into a point release). For instance,
   to install v1.0 with the latest bug fixes and enhancements checkout
   ``release-1.0``. Release branches may be less stable than code in a
   tagged point release.

-  **main branch**: The ``main`` branch contains the latest,
   bleeding edge version of {Project}. This is the default branch
   when you clone the source code, so you don't have to check out any
   new branches to install it. The ``main`` branch changes quickly and
   may be unstable.

To ensure that the {Project} source code is downloaded to the
appropriate directory use these commands.

.. code::

   $ git clone https://github.com/{orgrepo}.git && \
       cd {command} && \
       git checkout v{InstallationVersion}

Compile {Project}
-------------------

{Project} uses a custom build system called ``makeit``. ``mconfig``
is called to generate a ``Makefile`` and then ``make`` is used to
compile and install.

To support the SIF image format, automated networking setup etc., and
older Linux distributions without user namespace support, {Project}
must be ``make install``ed as root or with ``sudo``, so it can install
the ``libexec/{command}/bin/starter-setuid`` binary with root
ownership and setuid permissions for privileged operations. If you need
to install as a normal user, or do not want to use setuid functionality
:ref:`see below <install-nonsetuid>`.

.. code::

   $ ./mconfig && \
       make -C ./builddir && \
       sudo make -C ./builddir install

By default {Project} will be installed in the ``/usr/local``
directory hierarchy. You can specify a custom directory with the
``--prefix`` option, to ``mconfig`` like so:

.. code::

   $ ./mconfig --prefix=/opt/{command}

This option can be useful if you want to install multiple versions of
{Project}, install a personal version of {Project} on a shared
system, or if you want to remove {Project} easily after installing
it.

For a full list of ``mconfig`` options, run ``mconfig --help``. Here are
some of the most common options that you may need to use when building
{Project} from source.

-  ``--sysconfdir``: Install read-only config files in sysconfdir. This
   option is important if you need the ``{command}.conf`` file or
   other configuration files in a custom location.

-  ``--localstatedir``: Set the state directory where containers are
   mounted. This is a particularly important option for administrators
   installing {Project} on a shared file system. The
   ``--localstatedir`` should be set to a directory that is present on
   each individual node.

-  ``-b``: Build {Project} in a given directory. By default this is
   ``./builddir``.

.. _install-nonsetuid:

Unprivileged (non-setuid) Installation
--------------------------------------

If you need to install {Project} as a non-root user, or do not wish
to allow the use of a setuid root binary, you can configure
{Project} with the ``--without-suid`` option to mconfig:

.. code::

   $ ./mconfig --without-suid --prefix=/home/dave/{command} && \
       make -C ./builddir && \
       make -C ./builddir install

If you have already installed {Project} you can disable the setuid
flow by setting the option ``allow setuid = no`` in
``etc/{command}/{command}.conf`` within your installation directory.

When {Project} does not use setuid all container execution will use
a user namespace. This requires support from your operating system
kernel, and imposes some limitations on functionality. You should review
the :ref:`requirements <userns-requirements>` and :ref:`limitations
<userns-limitations>` in the :ref:`user namespace <userns>` section of
this guide.

Relocatable Installation
------------------------

An unprivileged (non-setuid) {Project} installation is
relocatable. As long as the structure inside the installation directory
(``--prefix``) is maintained, it can be moved to a different location
and {Project} will continue to run normally.

Relocation of a default setuid installation is not supported, as
restricted location / ownership of configuration files is important to
security.

Source bash completion file
---------------------------

To enjoy bash shell completion with {Project} commands and options,
source the bash completion file:

.. code::

   $ . /usr/local/share/bash-completion/completions/{command}

Add this command to your ``~/.bashrc`` file so that bash completion
continues to work in new shells. (Adjust the path if you installed
{Project} to a different location.)

.. _install-rpm:

Build and install an RPM
========================

If you use RHEL, CentOS or SUSE, building and installing {aProject}
RPM allows your {Project} installation be more easily managed,
upgraded and removed.  You can build an RPM
directly from the `release tarball
<https://github.com/{orgrepo}/releases>`_.

.. note::

   Be sure to download the correct asset from the `GitHub releases page
   <https://github.com/{orgrepo}/releases>`_. It should be
   named ``{command}-<version>.tar.gz``.

After installing the :ref:`dependencies <install-dependencies>` and
installing :ref:`Go <install-go>` as detailed above, you are ready to
download the tarball and build and install the RPM.

.. code::

   $ export VERSION={InstallationVersion} && # adjust this as necessary \
       wget https://github.com/{orgrepo}/releases/download/v${VERSION}/{command}-${VERSION}.tar.gz && \
       rpmbuild -tb {command}-${VERSION}.tar.gz && \
       sudo rpm -ivh ~/rpmbuild/RPMS/x86_64/{command}-$VERSION-1.el7.x86_64.rpm && \
       rm -rf ~/rpmbuild {command}-$VERSION*.tar.gz

If you encounter a failed dependency error for golang but installed it
from source, build with this command:

.. code::

   rpmbuild -tb --nodeps {command}-${VERSION}.tar.gz

Options to ``mconfig`` can be passed using the familiar syntax to
``rpmbuild``. For example, if you want to force the local state
directory to ``/mnt`` (instead of the default ``/var``) you can do the
following:

.. code::

   rpmbuild -tb --define='_localstatedir /mnt' {command}-$VERSION.tar.gz

.. note::

   It is very important to set the local state directory to a directory
   that physically exists on nodes within a cluster when installing
   {Project} in an HPC environment with a shared file system.

Build an RPM from Git source
----------------------------

Alternatively, to build an RPM from a branch of the Git repository you
can clone the repository, directly ``make`` an rpm, and use it to
install {Project}:

.. code::

  $ ./mconfig && \
  make -C builddir rpm && \
  sudo rpm -ivh ~/rpmbuild/RPMS/x86_64/{command}-{InstallationVersion}.el7.x86_64.rpm # or whatever version you built

To build an rpm with an alternative install prefix set ``RPMPREFIX`` on
the make step, for example:

.. code::

   $ make -C builddir rpm RPMPREFIX=/usr/local

For finer control of the rpmbuild process you may wish to use ``make
dist`` to create a tarball that you can then build into an rpm with
``rpmbuild -tb`` as above.

.. _remove-an-old-version:

Remove an old version
=====================

In a standard installation of {Project} (when
building from source), the command ``sudo make install`` lists all the
files as they are installed. You must remove all of these files and
directories to completely remove {Project}.

.. code::

   $ sudo rm -rf \
       /usr/local/libexec/{command} \
       /usr/local/var/{command} \
       /usr/local/etc/{command} \
       /usr/local/bin/{command} \
       /usr/local/bin/run-singularity \
       /usr/local/share/bash-completion/completions/{command}

If you anticipate needing to remove {Project}, it might be easier to
install it in a custom directory using the ``--prefix`` option to
``mconfig``. In that case {Project} can be uninstalled simply by
deleting the parent directory. Or it may be useful to install
{Project} :ref:`using a package manager <install-rpm>` so that it
can be updated and/or uninstalled with ease in the future.

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

   {Project} must be installed in order to run the full test suite,
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
