全面使用 ArchLinux 之旅
=====

by [PastLeo](https://pastleo.me), a little developer at [5xruby](https://5xruby.tw)

---

### CentOS => Debian / Ubuntu => ArchLinux

#### and macOS all the time...

---

![archlinux vs other](https://i.imgur.com/GHFhGVa.jpg?2)

<p style='font-size: 25px;'>
[modified from 『媽媽的一天快樂!』 - The Square Comics](https://www.facebook.com/thesquarecomics/photos/a.1883058891968500.1073741836.1443798492561211/1884775628463493)
</p>

---

### Computers I installed Arch

* VPS
* NAS
* Respberry Pi
* PC
* Laptop

---

### WHY?

---

![archwiki1](https://i.imgur.com/0Jrhx4Q.png)

---

![archwiki2](https://i.imgur.com/TOM9lwS.png)

---

![archwiki3](https://i.imgur.com/2Icw3o1.png)

[Mac - ArchWiki](https://wiki.archlinux.org/index.php/Mac)

---

#### WHY?

### Resource & Community

---

## 心得分享之一

### Installation

---

![arch-iso](https://i.imgur.com/5BTL5QI.jpg?1)

---

![ubuntu-install](https://i.imgur.com/WWHHNgS.png)

---

```
Arch Linux 4.15.6-1-ARCH (tty1)

archiso login: root (automatic login)
root@archiso ~ # _
```

---

```
Arch Linux 4.15.6-1-ARCH (tty1)

archiso login: root (automatic login)
root@archiso ~ # ls
install.txt
root@archiso ~ # _
```

### [Archlinux installation wiki](https://wiki.archlinux.org/index.php/installation_guide)

---

### Step 1: Connect to WIFI...

```shell=
iw dev
# list wifi card and get interface name,
# i.e. "wlp1s0"
ip link set wlp1s0 up
# activate the interface
iw dev wlp1s0 scan | less
# scan wifi access points,
# search for "SSID" inside less
wpa_supplicant -B -i wlp1s0 -c \
  <(wpa_passphrase SSID PW)
```

---

### Step 1: Connect to WIFI...

```shell=
# start the daemon and connect to the WIFI AP
dhcpcd wlp1s0
# get IP address
ping archlinux.org
# check if internet is available
```
---

### This is just a small part of my note

#### [My ArchLinux installation notes](https://hackmd.io/IR9az-g_RE2C3RmcHzmeEQ?view)

---

## 心得分享之二

### Play games that run only on Windows

---

### to play Windows games

#### [Dual boot with windows](https://wiki.archlinux.org/index.php/Dual_boot_with_Windows)

---

### Windows VM via KVM

#### with GPU passthrough

---

### Requirement

* a motherboard supporting IOMMU
* 2 GPUs
    * one for linux host
    * one for windows guest, this needs to support UEFI booting
* 2 monitors
* enough RAM

---

### things to do to get it work

* BIOS settings
* turn on kernel features
* [add grub entry to boot passing GPU](https://github.com/pastleo/kvm-gpu-passing/blob/master/example-etc/grub.d/11_gpu_vfio_linux)
* install required packages
* create windows VM, install windows
* configure virtual devices

---

### For performance

* GPU passthrough => PCI Host Devices
* physical disk for vm => virtio
* mouse & keyboard => evdev passthrough

[all together in a repo as note](https://github.com/pastleo/kvm-gpu-passing)

---

### how it looks like

![linux with windows VM](https://i.imgur.com/HA44t3i.jpg)

---

## 心得分享之三

## Pay Taiwan Income Tax

---

### Web!

![income tax support linux](https://i.imgur.com/ggwVis4.png)

---

### methods to verify

* 健保卡 <= 好像我也只能用這個
* 自然人憑證
* 戶口名簿 + 查詢碼

---

![health system 1](https://i.imgur.com/Ontp1XZ.png)

---

![health system 2](https://i.imgur.com/LvEU1oH.png)

---

### "run other distribution's program"

#### -

---

### "run other distribution's program"

#### => docker

---

### I am lazy

<p style='font-size: 32px;'>
[github.com/chihchun/personal-income-tax-docker](https://github.com/chihchun/personal-income-tax-docker/tree/master/2018)
</p>

<img src="https://i.imgur.com/yusgZn4.png" alt="personal-income-tax-docker" style="max-height: 45vh;">

---

### But it didn't work at the first time

![it should not work at the first time](https://img-9gag-fun.9cache.com/photo/adKA9ed_700bwp.webp)

---

### the docker run

```shell=
docker run -ti --rm \
...
-v /dev/bus/usb:/dev/bus/usb \
...
```

my card reader is not a usb device

---

### tech stack of this docker image

```
 ├── kernel api "/dev/..." <= linux kernel
 ├── pcscd <= in container
 ├── 健保卡網路服務 <= in container
 └── browser <= in container
```

---

### host pcscd

```shell=
sudo systemctl restart pcscd.service
pcsc_scan
```

https://wiki.archlinux.org/index.php/Smartcards

---

### solution

```
 ├── kernel api "/dev/..." <= linux kernel
 ├── pcscd <= use host service instead
 ├── 健保卡網路服務 <= in container
 └── browser <= in container
```

---

### solution

```shell=
docker run -ti --rm \
...
-v /run/pcscd:/run/pcscd \
...
```

---

## It worked on archlinux

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/eRhL_lajEzs?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

[summarized as a gist](https://gist.github.com/pastleo/c34bcfa883d624772e3ebcf0080c2eaa)

---

### recap

* why archlinux
* installation
* play games...via KVM
* pay income tax

---

### Thank you!

#### Any questions?
