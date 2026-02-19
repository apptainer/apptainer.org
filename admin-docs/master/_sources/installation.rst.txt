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

.. note::

    This is a long section; navigation of this page is done most
    easily by expanding the menus on the left.

{Project} requires ~200MiB disk space once compiled and installed.

There are no specific CPU or memory requirements at runtime, though 
at least 2GB of RAM is recommended when building from source.

Full functionality of {Project} requires that the kernel supports:

-  **FUSE** - Required to mount SIF files, for fuse-overlayfs
   on older kernels (see OverlayFS below), and for mounting ext3
   overlay filesystems.
   The kernels of all major Linux operating systems support FUSE by
   default, but system administrators must not disable it.  If system
   administrators do not want users to mount FUSE filesystems in the
   primary namespace, they can remove or not install the ``fuse``
   package which contains the privileged ``fusermount`` program.
   {Project} does not use ``fusermount`` in any mode.
   The bundled fuse programs do use the ``fuse3`` library, and
   {command} setuid mode requires the version of that library 
   package (called ``fuse3-libs`` on Enterprise Linux) to be >= 3.3.0.

-  **Unprivileged user namespaces** - (minimum kernel >=3.8, >=4.18 recommended)
   Required to run containers without root or setuid privilege.
   The recommended minimum version is required for unprivileged FUSE mounts.

-  **OverlayFS mounts** - (minimum kernel >=3.18, >=5.11 recommended)
   Used for creating missing bind mount paths and for writable overlays.
   Kernel 5.11 enables support for overlays unprivileged, but whenever
   the kernel OverlayFS driver doesn't work, fuse-overlayfs will be used
   instead.

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

-  ``TMPDIR`` / ``{ENVPREFIX}_TMPDIR`` should be on a local filesystem
   wherever possible.

-  If you install {Project} on a local disk on each compute node
   you will have the greatest chance of avoiding any limitations.

-  If {Project} is installed to a network location, it might work 
   with the default directory layout but depending on the network
   filesystem type (details below) you might run into problems.
   The kernel overlayfs is especially selective on which filesystem
   types it supports, but {Project} will fall back to fuse-overlayfs
   if the kernel overlayfs doesn't work so you might not notice it.
   The issue primarily affects the directory that can be changed by the
   ``--localstatedir`` option to the ``mconfig`` command when compiling
   from source.  If you have this issue, a solution may be to put most
   of the installation in the network location but then define
   ``--localstatedir`` to point to a directory that is on the local
   filesystem of all the nodes.

.. note::

   Set the ``--localstatedir`` location by providing
   ``--localstatedir my/dir`` as an option when you configure your
   {Project} build with ``./mconfig``.

   Disk usage at the ``--localstatedir`` location is negligible (<1MiB).
   The directory is used as a location to mount the container root
   filesystem, overlays, bind mounts etc. that construct the runtime
   view of a container. You will not see these mounts from a host shell,
   as they are made in a separate mount namespace.  Write access to this
   area is not needed but a ``lib/{command}/mnt/session`` directory
   needs to pre-exist in it.

Overlay support
^^^^^^^^^^^^^^^

Some features of {Project}, such as the ``--writable-tmpfs`` and
``--overlay`` options as well as creation of missing bind mountpoints,
use overlay mounts to construct a container root
filesystem that combines files from different locations. Overlay mounts may use
the Linux kernel overlay filesystem driver or the fuse-overlayfs userspace
implementation, depending on the workflow and support from the host kernel.

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

Overlays are mounted with the Linux kernel driver when:

- the upperdir is not an extfs image, and
- the upperdir is not a directory on an unsupported filesystem type
  (detailed later on this page), and
- {Project} is running either in setuid mode or in unprivileged / non-setuid
  mode when the kernel supports unprivileged overlay mounts.

Overlays are mounted with the fuse-overlayfs userspace implementation
in all other cases.

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

-  You cannot use ``--overlay`` to overlay a writable
   directory onto a container when the overlay (upperdir) directory is
   on an NFS filesystem.  
   It only works with a read-only overlay.

-  When building a container, or running a container with ``--fakeroot``, your
   ``TMPDIR`` / ``{ENVPREFIX}_TMPDIR`` should not be set to an NFS
   location.

-  You should not run a sandbox container with ``--fakeroot`` 
   from an NFS location.

Lustre / GPFS / PanFS
^^^^^^^^^^^^^^^^^^^^^

Lustre, GPFS, and PanFS do not have sufficient ``upperdir`` or
``lowerdir`` overlay support for certain {Project} features, and
do not support ``--fakeroot``.

- ``--overlay`` or ``--writable-tmpfs`` with a
  sandbox container (lowerdir) that is located on a Lustre, GPFS, or PanFS
  filesystem will use fuse-overlayfs.
  SIF containers on Lustre, GPFS, and PanFS will work
  correctly with the same overlay method as on any filesystem type.

- ``--overlay`` with an overlay (upperdir) directory on a Lustre,
  GPFS, or PanFS filesystem will use fuse-overlayfs, not the kernel
  overlay system.

- When building a container, or running a container with ``--fakeroot``, your
  ``TMPDIR / {ENVPREFIX}_TMPDIR`` should not be a Lustre, GPFS, or
  PanFS location.

FUSE-based filesystems
^^^^^^^^^^^^^^^^^^^^^^

The kernel overlay driver does not allow the upperdir to be a FUSE-based
filesystem, so those always use fuse-overlayfs.
A FUSE-based filesystem is used by default when the upperdir is an extfs
image.


Install unprivileged from pre-built binaries
============================================

A script is available to make a relocatable unprivileged binary installation 
of {Project}, including all dependencies that are not normally installed
on Linux systems.  The script works on current Red Hat Enterprise Linux-derived
systems, Fedora, SUSE/OpenSUSE, Debian, and Ubuntu.

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
By default it installs from the oldest supported EPEL version available,
for maximum compatibility when working with containers based on old
or new operating system distributions.


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

   $ sudo dnf install -y epel-release

Then to install a non-setuid installation of {Project} do:

.. code::

   $ sudo dnf install -y {command}

or for a setuid installation do:

.. code::

   $ sudo dnf install -y {command}-suid

Install from GitHub release RPMs
--------------------------------

Alternatively, x86_64 RPMs are available on GitHub immediately after each
{Project} release and they can be installed directly from there.  For the
non-setuid installation:

.. code::

   $ sudo dnf install -y https://github.com/{orgrepo}/releases/download/v{InstallationVersion}/{command}-{GitHubDownloadVersion}.x86_64.rpm

For the setuid installation do above command first and then this one:

.. code::

   $ sudo dnf install -y https://github.com/{orgrepo}/releases/download/v{InstallationVersion}/{command}-suid-{GitHubDownloadVersion}.x86_64.rpm

Install Debian packages
------------------------------

Pre-built Debian packages are only available on GitHub and only for the amd64 architecture. For the non-setuid installation on Debian 11 or 12 use these commands:

.. code::

    $ sudo apt update
    $ sudo apt install -y wget
    $ cd /tmp
    $ wget https://github.com/{orgrepo}/releases/download/v{InstallationVersion}/{command}_{InstallationVersion}_amd64.deb
    $ sudo apt install -y ./{command}_{InstallationVersion}_amd64.deb

For the setuid installation do above commands first and then these:

.. code::

    $ wget https://github.com/{orgrepo}/releases/download/v{InstallationVersion}/{command}-suid_{InstallationVersion}_amd64.deb
    $ sudo dpkg -i ./{command}-suid_{InstallationVersion}_amd64.deb

For Debian 13 do these commands instead 

.. code::

    $ sudo apt update
    $ sudo apt install -y wget
    $ cd /tmp
    $ wget https://github.com/{orgrepo}/releases/download/v{InstallationVersion}/{command}_{InstallationVersion}-trixie+_amd64.deb
    $ sudo apt install -y ./{command}_{InstallationVersion}-trixie+_amd64.deb

For the setuid installation do above commands first and then these:

.. code::

    $ wget https://github.com/{orgrepo}/releases/download/v{InstallationVersion}/{command}-suid_{InstallationVersion}-trixie+_amd64.deb
    $ sudo dpkg -i ./{command}-suid_{InstallationVersion}-trixie+_amd64.deb


Install Ubuntu packages
------------------------------

Pre-built Ubuntu packages are available on PPA (Personal Package Archive) for the amd64 and arm64 architectures on all current Ubuntu releases. 

First, on Ubuntu based containers install `software-properties-common` package to obtain `add-apt-repository` command. On Ubuntu Desktop/Server derived systems skip this step.

.. code::

    $ sudo apt update
    $ sudo apt install -y software-properties-common


For the non-setuid installation use these commands:

.. code::

    $ sudo add-apt-repository -y ppa:apptainer/ppa
    $ sudo apt update
    $ sudo apt install -y apptainer

For the setuid installation use ``apptainer-suid`` instead of ``apptainer``.

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

If you use RHEL, a RHEL derivate, or SUSE, building and installing {aProject}
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
(Contrary to a popular misconception, macOS does not run on a Linux
kernel. It runs on a kernel called Darwin originally forked from BSD.)

To run {Project} on a Windows or macOS computer, a Linux virtual machine
(VM) is required. There are various ways to configure a VM on both Windows and
macOS. On Windows, we recommend the Windows Subsystem for Linux (WSL2), and
on macOS, we recommend Lima.

Windows
=======

Recent builds of Windows 10, and all builds of Windows 11, include version 2 of
the Windows Subsystem for Linux. WSL2 provides a Linux virtual machine that is
tightly integrated with the Windows environment. The default Linux distribution
used by WSL2 is Ubuntu. It is straightforward to install {Project} inside
WSL2 Ubuntu, and use all of its features.

Follow the `WSL2 installation instructions
<https://docs.microsoft.com/en-us/windows/wsl/install>`__ to enable WSL2 with
the default Ubuntu 22.04 environment. On Windows 11 and the most recent builds
of Windows 10 this is as easy as opening an administrator command prompt or
Powershell window and entering:

.. code::

  wsl --install

Follow the prompts. A restart is required, and when you open the 'Ubuntu' app
for the first time you'll be asked to set a username and password for the Linux
environment.

You can then install {Project} from `source <#install-from-source>`_,
from the `Debian packages <#install-debian-packages>`_
on the {Project} release page,
or from the `Ubuntu PPA <#install-ubuntu-packages>`_.

GPU Support
-----------

WSL2 supports using an NVIDIA GPU from the Linux environment. To use a GPU from
{Project} in WSL2, you must first install ``libnvidia-container-tools``,
following the instructions in the `libnvidia-container documentation
<https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html>`__:

.. code::

  curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg \
  curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list | \
    sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | \
    sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list \
  sudo apt-get update
  sudo apt-get install -y nvidia-container-toolkit

Once this process has been completed, GPU containers can be run under WSL2 using
the ``--nv`` and ``--nvccli`` flags together:

.. code::

  $ {command} pull docker://tensorflow/tensorflow:latest-gpu

  $  {command} run --nv --nvccli tensorflow_latest-gpu.sif
  INFO:    Setting 'NVIDIA_VISIBLE_DEVICES=all' to emulate legacy GPU binding.
  INFO:    Setting --writable-tmpfs (required by nvidia-container-cli)
  ________                               _______________
  ___  __/__________________________________  ____/__  /________      __
  __  /  _  _ \_  __ \_  ___/  __ \_  ___/_  /_   __  /_  __ \_ | /| / /
  _  /   /  __/  / / /(__  )/ /_/ /  /   _  __/   _  / / /_/ /_ |/ |/ /
  /_/    \___//_/ /_//____/ \____//_/    /_/      /_/  \____/____/|__/
  You are running this container as user with ID 1000 and group 1000,
  which should map to the ID and group for your user on the Docker host. Great!
  {Project}> python
  Python 3.8.10 (default, Nov 26 2021, 20:14:08)
  [GCC 9.3.0] on linux
  Type "help", "copyright", "credits" or "license" for more information.
  >>> import tensorflow as tf
  >>> tf.config.list_physical_devices('GPU')
  2022-03-25 11:42:25.672088: I tensorflow/stream_executor/cuda/cuda_gpu_executor.cc:922] could not open file to read NUMA node: /sys/bus/pci/devices/0000:01:00.0/numa_node
  Your kernel may have been built without NUMA support.
  2022-03-25 11:42:25.713295: I tensorflow/stream_executor/cuda/cuda_gpu_executor.cc:922] could not open file to read NUMA node: /sys/bus/pci/devices/0000:01:00.0/numa_node
  Your kernel may have been built without NUMA support.
  2022-03-25 11:42:25.713892: I tensorflow/stream_executor/cuda/cuda_gpu_executor.cc:922] could not open file to read NUMA node: /sys/bus/pci/devices/0000:01:00.0/numa_node
  Your kernel may have been built without NUMA support.
  [PhysicalDevice(name='/physical_device:GPU:0', device_type='GPU')]

Note that the ``--nvccli`` flag is required to enable container setup using the
``nvidia-container-cli`` utility. {Project}'s simpler library binding
approach (``--nv`` only) is not sufficient for GPU support under WSL2.

Mac
===

{Project} is available via `Lima <https://lima-vm.io>`_ (installable with `Homebrew
<https://brew.sh>`_ or manually)

Lima launches Linux machines with automatic file sharing and port forwarding.
It uses native virtualization support provided by macOS Virtualization.Framework,
on platforms (such as Intel Macs) where that ("VZ") is not supported it uses QEMU.
The default Linux distribution used by Lima for {Project} template is Ubuntu.

To use Lima via Homebrew:

.. code::

   $ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   $ brew install lima

Then do ``limactl start template://apptainer`` and ``limactl shell apptainer``.

To customize cpus and memory on the VM, you can use ``--cpus 4`` and ``--memory 4``.

See the `lima "apptainer" template <https://github.com/lima-vm/lima/blob/master/templates/apptainer.yaml>`_
and the `lima "default" template <https://github.com/lima-vm/lima/blob/master/templates/default.yaml>`_
for more details.

By default, the host home directory is mounted as read-only in the guest,
but there is also a shared writable directory mounted in ``/tmp/lima``
that can be accessed both from the host and in the guest.

**********************
 Running inside Docker
**********************

{Project} can run nested inside a Docker container, but it requires 
some non-default options.

The simplest way to do it is with the docker ``--privileged`` option.
That enables {command} to run in both unprivileged mode and in suid
mode.

{Project} unprivileged mode can also be used inside docker without
enabling docker privileged mode, using these additional docker options:

.. code::

    --security-opt seccomp=unconfined --security-opt systempaths=unconfined --device /dev/fuse

The first option enables the ``unshare`` system call to work, which
{command} always needs.
The second options enables the {command} ``-p/--pid`` option (which is
implied by ``-C/--containall``).
The third option is needed for unprivileged FUSE mounts.

