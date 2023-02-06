---
slug: "/news/official-ppa-20230206"
date: "2023-02-06"
title: "Announcing Apptainer Official PPA for Ubuntu"
---

We are pleased and excited to announce that Apptainer official PPA for Ubuntu 
is now available!

Rocky Linux users have long benefited from the availability of Apptainer on
the EPEL repository. Apptainer, formerly known as Singularity, is widely used
in the HPC community. Ubuntu is the one another major distribution for
Apptainer users. Now there is great news for Ubuntu and Windows/WSL2/Ubuntu
Apptainer users! Apptainer pre-built binaries are now available on the PPA
for Ubuntu repository. Now you can install Apptainer using apt package
manager. This makes it easy to install and update Apptainer on Ubuntu and
Windows/WSL2/Ubuntu. This PPA supports 22.04 (jammy) and 20.04 (focal) on both
amd64 and arm64 architectures.

## Install Apptainer on Ubuntu
It's easy to install and update Apptainer on Ubuntu and also on
Ubuntu on WSL2/Windows.

### Default Installation

```
sudo add-apt-repository -y ppa:apptainer/ppa
sudo apt install -y apptainer
```

### Update Default Installation

```
sudo apt update
sudo apt install --only-upgrade -y apptainer
```

### Setuid Installation
In case you don’t have the user namespace enabled in the kernel:

```
sudo add-apt-repository -y ppa:apptainer/ppa
sudo apt install -y apptainer-suid
```

### Update Setuid Installation

```
sudo apt update
sudo apt install --only-upgrade -y apptainer-suid
```

## Install Aptainer on Rocky Linux
It’s easy to install and update Apptainer on Rocky Linux and also on
Rocky Linux 9.1 (arm64) virtual machine on macOS that runs on M1/M2 chips.


### Default Installation

```
sudo dnf install -y epel-release
sudo dnf install -y apptainer
```

### Update Default Installation

```
sudo dnf check-update
sudo dnf update -y apptainer
```

### Setuid Installation
In case you don’t have the user namespace enabled in the kernel:

```
sudo dnf install -y epel-release
sudo dnf install -y apptainer-suid
```

### Update Setuid Installation

```
sudo dnf check-update
sudo dnf update -y apptainer-suid
```
