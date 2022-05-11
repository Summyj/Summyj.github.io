---
title: 真.Charles抓包配置大全
date: 2021-07-05 15:12:00
update: 2021-07-05 15:12:00
tags: Charles
categories: 搬砖那些事儿
copyright: true
description: Broswer/iOS/tvOS/Android.
top:
---

## 添加Charles Keychain
### 下载Charles CA

打开Charles，依次点击菜单栏 {% label primary@Help - SSL Proxying - Install Charles Root Certificate%}：
![下载CharlesCA到本地](https://i.loli.net/2021/07/06/6E3AXOaWcfgodDT.png)

### 信任Charles CA

之后打开电脑的 Keychain Access，搜索 “Charles” 找到Charles CA，然后设置它为始终信任：
![设置信任证书](https://i.loli.net/2021/07/06/SEqwaRA6sGPQ3zl.png)

## 浏览器抓包

打开Charles, 确保 {% label primary@Proxy-macOS Proxy%}设置是开启(打勾)的，开启之后Charles左边的请求列表里应该会出现一些请求信息，这些都是电脑上正在发出的请求，没有的话建议重启电脑再打开Charle，开启macOS Proxy。

打开浏览器在你想要抓取请求的测试网站里做一些操作，直到在Charles请求列表里看到你要抓取的请求，此时还需要开启SSL Proxy你才能看到请求的具体信息，否则会有下图的提示：

![需要开启SSL提示](https://i.loli.net/2021/07/07/orQJheFv2mKna91.png)

鼠标选中想要抓取的请求域名，右键在选项列表中开启 SSL Proxy，然后就可以正常抓取Https请求了，如果只想关注这个请求，也可以在右键的选项列表中选中Focus，其他的请求就会被分组到Other Hosts：

![右键选项列表](https://i.loli.net/2021/07/07/chOZeBxnHwtNSyM.png)

打开{% label primary@Proxy-SSL Proxy Settings%}，也可以对所有在抓取的请求地址进行管理：
![SSL Proxy Settings](https://i.loli.net/2021/07/07/fVdGbDXUhPlejHg.png)

## iOS抓包
### iOS Simulator
#### 下载Charles CA

打开Charles，依次点击菜单栏 {% label primary@Help - SSL Proxying - Install Charles Root Certificate in iOS Simulators%}：
![下载CharlesCA到iOS Simulator](https://i.loli.net/2021/07/07/kzsAhKJD8icNY5M.png)
之后Charles会弹出添加成功的提示：
![添加成功提示](https://i.loli.net/2021/07/07/L1mPro8s7UZxARI.png)
打开iOS Simulator，进入{% label primary@Settings - General%}，此时应该有一个 **Profile** 选项显示：
<img src="https://i.loli.net/2021/07/07/c1x7tjPR8S9EI3Q.png" width = "230" height = "500" alt="CA Profile">
如果没有的话， 开启Charles的 {% label primary@Proxy-macOS Proxy%}设置，再打开Simlator的Safari浏览器，输入 **chls.pro/ssl**，手动下载Charles，之后再去{% label primary@Settings - General%}就可以看到Profile了，里面就是下载的Charles CA:
![手动下载CharlesCA到iOS Simulator](https://i.loli.net/2021/07/07/9KhcPUoGeL7s3Vu.png)

#### 安装Charles CA

点击上边下载好的Charles CA，一路点击安装即可，直到CA为Verified：
![安装Charles CA到iOS Simulator](https://i.loli.net/2021/07/07/U19N8bHGYKpifIc.png)

#### 信任Charles CA

去{% label primary@Settings - General - About - Certificate Trust Settings%}，打开Charles CA的信任按钮就好了：
<img src="https://i.loli.net/2021/07/07/6B19UTo7jVrYIia.png" width = "230" height = "500" alt="信任CA">

#### 抓取Simulator请求

打开Charles, 确保 {% label primary@Proxy-macOS Proxy%}设置是开启的，再打开Simulator在你想要抓取请求的测试应用里做一些操作，确保你可以在Charles的请求列表里看到相关信息，如果看不到，可以试试重启Simulator。
抓取请求和上文 [浏览器抓包](https://jmyblog.top/charles-connect/#%E6%B5%8F%E8%A7%88%E5%99%A8%E6%8A%93%E5%8C%85) 一致。

![抓取Simulator请求](https://i.loli.net/2021/07/07/7ihUkHImbWsKJfV.png)

### iOS 真机
#### 设置Wifi Proxy

打开Charles，点击 {% label primary@Help - SSL Proxying - Install Charles Root Certificate on a Mobile device or Remote Broswer %}:
![Charles Proxy](https://i.loli.net/2021/07/07/GLb9lJ2gQIWaUY1.png)
之后会打开一个弹窗，上边是你的本地IP和Charles默认端口，先别关掉它：
![Proxy Detail](https://i.loli.net/2021/07/07/98VG6rC3EPwIx4n.png)
打开真机以下设置，将代理配置改成手动，Server和端口号填写和上面弹窗中的一致，保存设置：
<img src="https://cdn.jsdelivr.net/gh/Summyj/blogImageCDN/images/charles-connect/1.jpg" width = "500" height = "500" alt="设置Wifi Proxy">
回到Charles，此时应有一个确认连接的弹窗，点击允许：
![允许连接](https://cdn.jsdelivr.net/gh/Summyj/blogImageCDN/images/charles-connect/2.jpg)

#### 下载Charles CA

打开Safari浏览器(最好打开隐私窗口)，输入 **chls.pro/ssl**，下载Charles CA：
<img src="https://cdn.jsdelivr.net/gh/Summyj/blogImageCDN/images/charles-connect/4.jpg" width = "500" height = "500" alt="下载CharlesCA">

#### 安装Charles CA

进入 {% label primary@Settings - General%}，此时应该有一个 **Profile Downloaded** 选项显示，点击进入，按照下图安装即可，直到CA为Verified：
![安装CharlesCA](https://cdn.jsdelivr.net/gh/Summyj/blogImageCDN/images/charles-connect/6.pic.jpg)

#### 信任Charles CA

去{% label primary@Settings - General - About - Certificate Trust Settings%}，打开Charles CA的信任按钮就好了：
<img src="https://cdn.jsdelivr.net/gh/Summyj/blogImageCDN/images/charles-connect/3.jpg" width = "230" height = "500" alt="信任CharlesCA">

#### 抓取Simulator请求

与 [上文](https://jmyblog.top/charles-connect/#%E6%8A%93%E5%8F%96Simulator%E8%AF%B7%E6%B1%82) 一致。

## tvOS抓包
### AppleTV 模拟器
#### 下载Charles CA

在下图页面选择 “Save Charles Root Certificate” 选项下载Charles证书保存到本地，比如桌面啥的：

![下载CharlesCA并保存](https://i.loli.net/2021/07/06/6E3AXOaWcfgodDT.png)

#### 信任Charles CA

打开AppleTV模拟器，将下载的Charles证书手动拖到模拟器里，进入 Seetings -> General -> About 设置页面，此时下方应有一个证书信任的选项，点击后开启Charles证书的信任Toggle，就完成配置了。

#### 抓取Simulator请求

与 [上文](https://jmyblog.top/charles-connect/#%E6%8A%93%E5%8F%96Simulator%E8%AF%B7%E6%B1%82) 一致。

### AppleTV 真机

WIP

## Android抓包
### Android Emulator
#### 设置Wifi Proxy

打开Charles，点击 {% label primary@Help - SSL Proxying - Install Charles Root Certificate on a Mobile device or Remote Broswer %}:
![Charles Proxy](https://i.loli.net/2021/07/07/GLb9lJ2gQIWaUY1.png)
之后会打开一个弹窗，上边是你的本地IP和Charles默认端口，先别关掉它：
![Proxy Detail](https://i.loli.net/2021/07/07/98VG6rC3EPwIx4n.png)
先确保模拟器网络连接正常，之后去 {% label primary@Settings-Network & internet-WiFi%}，可以看到连接到了**AndroidWifi**，然后按照下图设置此Wifi的Proxy，点击Wifi后的设置按钮，点击铅笔图标，将Proxy设置为Manual，Hostname和Port就是上边弹窗里对应的值：
![设置Wifi Proxy](https://i.loli.net/2021/07/07/Z159rMfjOetoEuS.png)

#### 下载Charles CA

打开模拟器的Chrome浏览器，输入 **chls.pro/ssl**，之后弹出下载Charles CA的提示框，选择下载：
<img src="https://i.loli.net/2021/07/07/Pfxc64zlbBUF97y.png" width = "230" height = "500" alt="下载CA">
如果没有网络，尝试冷启动模拟器，看模拟器下拉框中有没有关于Wifi的限制连接提示，点击之后选择仍要连接，应该就有网了，之后再去浏览器下载CA：
<img src="https://i.loli.net/2021/07/07/7M98LEFyqQSitXa.png" width = "650" height = "550" alt="连接网络">
如果这样还是下载不了，那么打开Charles，点击点击 {% label primary@Help - SSL Proxying - Save Charles Root Certificate %} 将Charles CA下载到本地:
![Save Charles Root Certificate](https://i.loli.net/2021/07/07/i2JhtF56X9kWI8L.png)
然后手动将文件拖到模拟器，也是一样的。

#### 安装Charles CA

进入模拟器{% label primary@Settings - Security - Encryption&credentials%}。

>Android 11:

选择Install a certificate，点击CA certificate，选择Install anyway，最后点击下载的Charles CA文件，就可以安装成功了：
![Android11安装Charles CA](https://i.loli.net/2021/07/07/JcGMQ2ysOYE1WlH.png)

>其它版本

选择 Install from SD card，你就会看到上面下载的Chares CA文件，点击进行安装，名字可以随便写，Credential Use选择VPN and apps：
![安装Charles CA](https://i.loli.net/2021/07/07/Hpjz6bJVlr8L4eT.png)

安装完成之后去{% label primary@Encryption&credentials-User credentials%} 和 {% label primary@Encryption&credentials-Trusted credentials%}应该都可以看到安装成功的Charles CA文件：
<img src="https://i.loli.net/2021/07/07/5hSwycPTOI1rjqN.png" width = "600" height = "550" alt="Charles CA">

#### 信任Charles CA

这里是个大坑，很重要，根据 [Charles官方文档](https://www.charlesproxy.com/documentation/using-charles/ssl-certificates/) 的Android部分所述 ，由于Charles证书是用户安装的，而Android 7.0以后，系统默认不信任用户安装的证书。所以即使我们安装了Charles证书，也并不能成功进行抓包，此时有两种解决办法：

- 办法一：使用官网做法，在你要抓包的应用程序源代码中添加配置文件，使该应用程序信任用户安装的Charles证书。
- 办法二：将Charles证书的属性更改为系统安装的证书，从根本上解决问题，但是网上能找到的成功案例不多，不过适用于无法改动应用源代码的同学。

这里我用的办法一，添加配置文件，按照官网说的做就行，在代码库的 **res/xml/** 路径添加network_security_config.xml文件，内容如下：

{% codeblock lang:command %}
<network-security-config> 
  <debug-overrides> 
    <trust-anchors> 
      <!-- Trust user added CAs while debuggable only -->
      <certificates src="user" /> 
    </trust-anchors> 
  </debug-overrides> 
</network-security-config>
{% endcodeblock %}

之后在Manifest.xml里添加下边的reference就行:

{% codeblock lang:command %}
<?xml version="1.0" encoding="utf-8"?>
<manifest ... >
    <application android:networkSecurityConfig="@xml/network_security_config" ... >
        ...
    </application>
</manifest>
{% endcodeblock %}

这里只配置了应用的debug版本，作改动后重新build代码，之后将生成的debug版本.apk文件安装到模拟器，这时信任Charles CA就设置成功了。

#### 抓取Emulator请求

打开Charles, 然后**关闭** {% label primary@Proxy-macOS Proxy%}设置，其它内容按照上文iOS部分的抓取Simulator请求做就行了，这里不再赘述。

### Android真机

WIP

## 利用Breakpoints修改并发送请求
### 设置Breakpoints

通过设置Breakpoints，我们可以修改请求的Request和Response, 鼠标定位到你想要修改的请求，之后右键勾选BreakPints即可，之后再次进行相同请求时，就会出现编辑请求的页面，可以修改Request和Response：
![设置Breakpoints](https://i.loli.net/2021/07/07/chOZeBxnHwtNSyM.png)

### 管理Breakpoints

打开{% label primary@Proxy-Breakpoints Settings%}，可以打开管理Breakpoints的弹窗，里面包括已经设置Breakpoints的url，以及Breakpoints的类型：Request和Response
![Breakpoints Settings](https://i.loli.net/2021/07/07/3G1OlPSApsaek2b.png)
如果只想修改请求的Request或Response，只需要勾选对应的选项即可：
![设置具体抓取类型](https://i.loli.net/2021/07/07/pzOy7Cq2HEDlXrT.png)
