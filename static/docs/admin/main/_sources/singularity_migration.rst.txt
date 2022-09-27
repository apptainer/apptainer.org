.. _singularity_migration:

############################
 Migrating From Singularity
############################

Since the community decided to `move the project into the Linux Foundation
<https://apptainer.org/news/community-announcement-20211130>`_ with the
constraint of a name change to the project, it has been a goal of the
project to minimize the impact to the user base. If you experience issues making
the move, please reach out to the `community <https://apptainer.org/help>`_ so
we can help you!


When migrating to {Project} from Singularity, Administrators that have
modified the system configurations of their installation and want {Project}
to have identical configuration will need to migrate the configurations they have
in place for Singularity to {Project} either manually or with configuration
management tools.

All system configuration files are typically located in ``/etc/singularity`` or
``/usr/local/etc/singularity`` when installed from a RPM/Deb package or source
respectively, but options passed during source installations could cause this to
be in another location. {Project} will store its configurations in similar
locations, but within a directory named ``{command}`` directory instead of
``singularity``.

All system configuration names, file formats, and parameters for {Project} are
identical to their Singularity counterparts with the exception of
``singularity.conf``, which has been renamed to ``{command}.conf`` as a part of
the project renaming. It is important to note that comments within some of the
configuration files have been changed with the rename as well. So, while you can
copy files around, we **recommend** applying the same configuration changes to
the new files instead of simply copying contents.

.. warning::

    Take care to not wipe out all configuration in the {Project} config
    directory as a part of your migration because it will remove configuration
    files that are new to the project like configurations for
    :ref:`checkpointing <dmtcp_configuration>`


If you are migrating from an installation with default configuration, you do not
need to perform any configuration migration as {Project} defaults have not been
changed.

.. note::

    The ``singularity`` configuration directory at the prefix corresponding to
    your ``{command}`` configuration directory (e.g. ``/etc/singularity`` or
    ``/usr/local/etc/singularity``) needs to be removed to prevent {Project}
    from producing a warning at runtime about the migration being incomplete.

However, a big change from Singularity is that {Project} does not
install a setuid-root component by default.  That means that either
user namespaces needs to be enabled or the setuid-root component needs
to be installed separately.  See the 
:ref:`User Namespaces & Fakeroot <userns>` section
or to find out about how to install the setuid-root component see the
:ref:`Installation <installation>` section.

Also see the user guide documentation about `Singularity compatibility
<{userdocs}/singularity_compatibility.html>`__ for information about how the
migration to {Project} will impact users.
