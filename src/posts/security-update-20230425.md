---
slug: "/news/security-update-20230425"
date: "2023-04-25"
title: "Announcing Apptainer security update 1.1.8"
---

Apptainer [release version 1.1.8](https://github.com/apptainer/apptainer/releases)
includes a response to a high severity vulnerability,
[CVE-2023-30549](https://github.com/apptainer/apptainer/security/advisories/GHSA-j4rf-7357-f4cg)
that affects all setuid-root installations of earlier versions of Apptainer
and all versions of Singularity.
The vulnerability is that setuid-root installations elevate the severity
of vulnerabilities in the ext4 filesystem driver, which OS vendors 
generally do not deal with urgently because normally they can only
be exploited by already privileged users.
An example vulnerability is linked in the advisory which has not been
patched on older operating systems at all, including RHEL7, Debian 10,
and Ubuntu 20.04.
The response in apptainer-1.1.8 is to add new `allow setuid-mount` options
including one for `extfs` that is disabled by default.
That disables the use of ext3 mounts including for overlays or binds
when in setuid-root mode, while leaving them enabled for unprivileged
user namespace mode.

The Apptainer Technical Steering Committee encourages all users to
upgrade soon to apptainer-1.1.8, especially those that have setuid-root
installations.
For those who do have setuid-root installations, we also encourage
you to switch to a rootless installation if that works for you.
