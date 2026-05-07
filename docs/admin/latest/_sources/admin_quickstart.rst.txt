###################
 Admin Quick Start
###################

This quick start gives an overview of installation of {Project},
a description of the architecture of {Project}, and pointers
to configuration files. More information, including alternate
installation options and detailed configuration options can be found
later in this guide.

.. _{command}-architecture:

*******************************
 Architecture of {Project}
*******************************

{Project} is designed to allow containers to be executed as if they
were native programs or scripts on a host system. No daemon is required
to build or run containers, and the security model is compatible with
shared systems.

As a result, integration with clusters and schedulers such as Univa Grid
Engine, Torque, SLURM, SGE, and many others is as simple as running any
other command. All standard input, output, errors, pipes, IPC, and other
communication pathways used by locally running programs are synchronized
with the applications running locally within the container.

{Project} favors an 'integration over isolation' approach to
containers. By default only the mount and user namespaces are isolated for
containers, so that they have their own filesystem view. Access to
hardware such as GPUs, high speed networks, and shared filesystems is
easy and does not require special configuration. Default access to
user home directories, ``/tmp`` space, and installation specific
mounts makes it simple for users to benefit from the reproducibility
of containerized applications without major changes to their existing
workflows. Where more complete isolation is important, {Project}
can use additional Linux namespaces and other security and resource
limits to accomplish this.

.. _{command}-security:

************************
 {Project} Security
************************

See the `Security section <{userdocs}/security.html>`_ of the user guide.


**************
 Installation
**************

{Project} can be installed from source directly, by building an
RPM or Debian package from the source, or by downloading pre-built packages.
Linux distributions may also package
{Project}, but their packages may or may not be up-to-date with the
upstream version on GitHub.

To install from source, follow the instructions in `INSTALL.md
<https://github.com/{orgrepo}/blob/{repobranch}/INSTALL.md>`_
on GitHub.
Other methods are discussed in the :ref:`Installation
<installation>` section of this guide.

***************
 Configuration
***************

{Project} is configured using files under ``etc/{command}`` in
your ``--prefix``, or ``--syconfdir`` if you used that option with
``mconfig``. In a default installation from source without a
``--prefix`` set you will find them under
``/usr/local/etc/{command}``. In a default installation from RPM or Deb packages you will find them under ``/etc/{command}``.

You can edit these files directly, or using the ``{Project} config
global`` command as the root user to manage them.

``{command}.conf`` contains the majority of options controlling the
runtime behavior of {Project}. Additional files control security,
network, and resource configuration. Head over to the
:ref:`Configuration files <{command}_configfiles>` section where the
files and configuration options are discussed.

*********
 Testing
*********

You can run a quick test of {Project} using a small alpine container:

.. code:: console

   $ {command} exec docker://alpine cat /etc/alpine-release
   3.9.2

See the `user guide <{userdocs}>`__ for more
information about how to use {Project}.
