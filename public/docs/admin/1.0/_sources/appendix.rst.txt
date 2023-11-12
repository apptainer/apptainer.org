.. _installed-files:

#################
 Installed Files
#################

An installation of {Project} {InstallationVersion}, performed as
root via ``sudo make install`` consists of the following files, with
ownership and permissions required to use the `setuid` workflow:

.. code::

   # Container session / state
   var/{command} root:root 755 (drwxr-xr-x)
   var/{command}/mnt root:root 755 (drwxr-xr-x)
   var/{command}/mnt/session root:root 755 (drwxr-xr-x)

   # Main executables
   bin/{command}  root:root 755 (-rwxr-xr-x)
   bin/run-singularity root:root 755 (-rwxr-xr-x)

   # Helper executables
   libexec/{command} root:root 755 (drwxr-xr-x)
   libexec/{command}/plugin root:root 755 (drwxr-xr-x)
   libexec/{command}/bin root:root 755 (drwxr-xr-x)
   libexec/{command}/bin/starter root:root 755 (-rwxr-xr-x)
   libexec/{command}/bin/starter-suid root:root 4755 (-rwsr-xr-x)
   libexec/{command}/cni root:root 755 (drwxr-xr-x)
   libexec/{command}/cni/firewall root:root 755 (-rwxr-xr-x)
   libexec/{command}/cni/portmap root:root 755 (-rwxr-xr-x)
   libexec/{command}/cni/tuning root:root 755 (-rwxr-xr-x)
   libexec/{command}/cni/host-device root:root 755 (-rwxr-xr-x)
   libexec/{command}/cni/vrf root:root 755 (-rwxr-xr-x)
   libexec/{command}/cni/dhcp root:root 755 (-rwxr-xr-x)
   libexec/{command}/cni/host-local root:root 755 (-rwxr-xr-x)
   libexec/{command}/cni/static root:root 755 (-rwxr-xr-x)
   libexec/{command}/cni/loopback root:root 755 (-rwxr-xr-x)
   libexec/{command}/cni/ptp root:root 755 (-rwxr-xr-x)
   libexec/{command}/cni/bandwidth root:root 755 (-rwxr-xr-x)
   libexec/{command}/cni/ipvlan root:root 755 (-rwxr-xr-x)
   libexec/{command}/cni/macvlan root:root 755 (-rwxr-xr-x)
   libexec/{command}/cni/sbr root:root 755 (-rwxr-xr-x)
   libexec/{command}/cni/bridge root:root 755 (-rwxr-xr-x)
   libexec/{command}/cni/vlan root:root 755 (-rwxr-xr-x)
   
   # {Project} configuration
   etc/{command} root:root 755 (drwxr-xr-x)
   etc/{command}/network root:root 755 (drwxr-xr-x)
   etc/{command}/network/10_ptp.conflist root:root 644 (-rw-r--r--)
   etc/{command}/network/20_ipvlan.conflist root:root 644 (-rw-r--r--)
   etc/{command}/network/00_bridge.conflist root:root 644 (-rw-r--r--)
   etc/{command}/network/40_fakeroot.conflist root:root 644 (-rw-r--r--)
   etc/{command}/network/30_macvlan.conflist root:root 644 (-rw-r--r--)
   etc/{command}/seccomp-profiles root:root 755 (drwxr-xr-x)
   etc/{command}/seccomp-profiles/default.json root:root 644 (-rw-r--r--)
   etc/{command}/remote.yaml root:root 644 (-rw-r--r--)
   etc/{command}/{command}.conf root:root 644 (-rw-r--r--)
   etc/{command}/global-pgp-public root:root 644 (-rw-r--r--)
   etc/{command}/capability.json root:root 644 (-rw-r--r--)
   etc/{command}/rocmliblist.conf root:root 644 (-rw-r--r--)
   etc/{command}/cgroups root:root 755 (drwxr-xr-x)
   etc/{command}/cgroups/cgroups.toml root:root 644 (-rw-r--r--)
   etc/{command}/ecl.toml root:root 644 (-rw-r--r--)
   etc/{command}/nvliblist.conf root:root 644 (-rw-r--r--)
   
   # Bash completion configuration
   etc/bash_completion.d root:root 755 (drwxr-xr-x)
   etc/bash_completion.d/{command} root:root 644 (-rw-r--r--)
