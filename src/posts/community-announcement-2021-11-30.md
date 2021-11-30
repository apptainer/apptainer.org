---
slug: "/news/community-announcement-20211130"
date: "2021-11-30"
title: "Community Announcement"
---

The Singularity project has had a fantastic journey so far. It is the intention of myself (the project lead) as well as all current code committers, that this project must stay in the community interest, free from control of a single company. Singularity has already become a mature open source project as we've surpassed all of the original design goals of the project. It is time to take the project to the next level of maturity.

It is with great pleasure that I share with you that the Singularity project is officially moving into the Linux Foundation effective immediately. As part of this move, and to differentiate from the commercially controlled fork, we will be renaming the project to "Apptainer".

## Frequently Asked Questions

### How did we decide to do this?

Back in early October, a call was made to the Singularity community, and about 50 community members were updated as to what we were thinking and after a request for feedback, this path was 100% unanimously agreed upon.

### Why did we name it Apptainer?

The name Apptainer was put forth via vote. Two name choices were pretty close, but at the end, Apptainer prevailed considerably (the other name was "Relativity").

### Slack? Email Lists?

Apptainer has a new Slack [here](https://join.slack.com/t/apptainer/shared_invite/zt-z95o8dg3-_URQItov5W_8djlR2hNZWw) and we are considering how best to move the email list. Until the email list has been moved, it will continue at the current location (singularity@lbl.gov).

### What is the management structure?

As a Linux Foundation project, the primary management structure is the Technical Steering Committee (TSC) which is composed of the primary stakeholders and individuals responsible for commit access to the project. Currently this is Cedric Clerget, Dave Dykstra, Gregory Kurtzer, Ian Kaneshiro, and Krishna Muiriki. The TSC will follow the policies defined in the [Technical Charter](https://apptainer.org/technical-charter).

### Does this mean that Kurtzer is no longer the project lead?

Yes, Gregory Kurtzer is no longer project lead, but he is on the TSC.

### Is Singularity EOL?

No, Singularity IS Apptainer and Apptainer has a LONG life ahead!

### What will the first version be?

The first release of Apptainer will be 1.0 which will exist in a new repository at [https://github.com/apptainer/apptainer](https://github.com/apptainer/apptainer). The Singularity repository has been moved repository has been moved to [https://github.com/apptainer/singularity](https://github.com/apptainer/singularity) which will persist as an archive and be set to read-only after the first release of Apptainer.

### But Sylabs still has a Singularity, how does Apptainer relate to that?

When Sylabs forked the Singularity project, they chose not to rename their fork. This has created considerable confusion in the community and that confusion will just get worse over time. We decided to fix it amongst ourselves to take the rebranding hit which will resolve the confusion and allow Sylabs the right to continue using the Singularity name for their commercial product line.

### Will there be continual alignment between Sylabs' Singularity and Apptainer?

Initially, we anticipate yes, but over time we anticipate that the paths of the projects will diverge as both projects continue to mature. For Apptainer, there is significant interest in better alignment with LF and CNCF capabilities like Sigstore, ORAS, and CI/CD.

### What immediate changes will be implemented?

As part of this transition, only open community standard interfaces will be supported. As of right now, this will include removing the "Library" and "Remote Builder" support. However it would be preferable if these become open community maintained standards (not corporate controlled) so we can leave them intact and/or re-add them at a later date.

### What about backwards compatibility?

Apptainer will provide `singularity` as a command line link and will maintain as much of the CLI and environment functionality as possible. From the user's perspective, very little, if anything, will change.

### Will Sylabs rejoin the Apptainer project?

We certainly hope so, but it is up to them. They, like any other organization, are welcome to submit PRs to Apptainer and over time they may be considered for the TSC. Ideally, Sylabs would consider Apptainer to be their upstream source, contributing PRs to thsi community, and then take snapshots of this project for their own commercial products and add their own value-adds (e.g. Library, remote builder, etc..) on the Apptainer base.

### Will contributors need to sign a CLA?

No, we will not be requiring a Contributor License Agreement, but the Linux Foundation recommends using the simpler Developer Certificate of Origin (DCO) and we plan to use that.  [This article](https://drewdevault.com/2021/04/12/DCO.html) explains why a DCO is better and how it works.
