.. _security:

###########################
 Security in {Project}
###########################

First please see the `Security section <{userdocs}/security.html>`_ of
the user guide.

*********************************
 Configuration & Runtime Options
*********************************

System administrators who manage {Project} can use configuration
files to set security restrictions, grant or revoke a user's
capabilities, manage resources and authorize containers etc.

For example, the :ref:`Execution Control List <execution_control_list>` file
allows restricting usage of SIF containers based on their signature
and the key used to sign them.

Configuration files and their parameters are :ref:`documented for
administrators here <{command}_configfiles>`.

When running a container as root, {Project} can apply hardening rules using
seccomp and apparmor.  Please see the `Security Options section
<{userdocs}/security_options.html>`_ of the user guide.

Limits on resource usage by containers can be enforced using cgroups. On systems
that use cgroups v1, only the root user can set resource limits. On systems that
use cgroups v2 and systemd, all users can apply resource limits as long as the
system is configured for delegation.

By default, EL9, Ubuntu 22.04, Debian 11, Fedora 31 and newer use cgroups v2 and
are configured for delegation so that unprivileged users will be able to use the
``--apply-cgroups`` and other resource limit flags of {Project} without
further configuration.

On EL8 and Ubuntu 20.04 it is possible to setup a compatible configuration by
following the 'Enabling cgroup v2' and 'Enabling CPU, CPUSET, and I/O
delegation' steps at the `rootless containers website
<https://rootlesscontaine.rs/getting-started/common/cgroup2/>`_

See the `Limiting Container Resources section
<{userdocs}/cgroups.html>`_ of the user guide
for more details of how to apply cgroups limits to containers at runtime.
