---
title: AppUI自动化测试第三弹-iOS篇
date: 2021-05-21 16:46:15
update: 2021-05-24 15:09:15
tags: [自动化测试]
categories: [搬砖那些事儿]
copyright: true
description: 将代码库部署到Bitrise CI，实现iOS平台的持续集成。
top:
---

![image.png](https://i.loli.net/2021/05/24/C63wHlmUE5o4Nh8.png)

通过前两篇博客我们有了一个测试代码库，没有的话可以直接fork [我的代码库](https://github.com/Summyj/AppUI-AutoTest) 到你的github账户，之后就可以进行CI集成啦，本来是想iOS和Android一起讲的，但篇幅太长，就分开了，多图预警。。。

## Bitrise介绍

[Bitrise](https://www.bitrise.io/) 是一款CI工具，与同领域其它工具，比如Jenkins/GoCD/Travis CI的不同在于它是专门用来部署手机应用的，它内置了很多手机应用开发的插件，可以帮助开发团队快速搭建环境、构建部署应用，并执行测试。此外，简洁易懂的UI也是它的一大优势。

由于Bitrise是一个部署App的工具，所以我们需要一个App开发代码库，Bitrise提供给我们两个可以使用的代码库，把它们fork到你的github就行：[iOS](https://github.com/bitrise-io/sample-apps-ios-simple-objc) 和 [Android](https://github.com/bitrise-io/sample-apps-android-sdk22)。

由于步骤不尽相同，所以两个平台分开讲，开始之前请先注册一个Bitrise账号，然后登录，选择standard plan，你会看到如下页面：
![image.png](https://i.loli.net/2021/05/24/ivXJu7KHpICV6Ay.png)

## 创建iOS应用
选择 add first app，会进入创建应用页面，选择自己的Bitrise账号，然后选择Private后继续：
![image.png](https://i.loli.net/2021/05/24/7JP2ti1xsuGfvDE.png)
下一步是连接代码库，按照提示 Connect Github，连接之后你会看到自己所有的代码库：
![image.png](https://i.loli.net/2021/05/24/ZjReaio4EVXcyYl.png)
![image.png](https://i.loli.net/2021/05/24/RD9NF4ZMaQ2zwc6.png)
我们选择之前fork的iOS应用代码库 **sample-apps-ios-simple-objc**，然后继续：
![image.png](https://i.loli.net/2021/05/24/835XDmsRhif7PCl.png)
由于我们之后还需要Bitrise下载测试代码库，所以选择 I need to, 复制Bitrise提供给我们的SSH key添加到你的github setting里：
![image.png](https://i.loli.net/2021/05/24/XJkaPhegf62cK1Y.png)
保存之后选择i've added the SSH key，下一步将部署应用的分支命名为master后继续,此时Bitrise会配置你的App(如果有报错就再次选择master分支再部署):
![image.png](https://i.loli.net/2021/05/26/HV53lg6SA8bmLpj.png)
之后出现iOS图标，说明它被识别为一个iOS app，完成后我们选择 app-store 为导出方式：
![image.png](https://i.loli.net/2021/05/24/XuqvxZcNVnSl5LE.png)
编辑以下设置，然后点击confirm后继续：
![image.png](https://i.loli.net/2021/05/24/lvsUiuCqImEkZga.png)
跳过app icon和webhook步骤，点击页面右上角finish按钮完成设置：
![image.png](https://i.loli.net/2021/05/24/zNgWhZAep1suL8t.png)
之后页面跳转到Dashboard，Bitrise会跑第一次build，在页面右侧会看到你的App：
![image.png](https://i.loli.net/2021/05/24/R1lQBKVOtpTN9JX.png)
## 添加e2e workflow
依次点击页面右侧App -> Workflow ，进入Workflow编辑页面，点击 “+ Workflow” 新增一个名为e2e的 workflow：
![image.png](https://i.loli.net/2021/05/24/pDifPg2hGw9ROcl.png)
然后自动进入该workflow的编辑页面，我们将在此workflow下载测试代码库并执行测试，页面左侧为该workflow的执行步骤和内容，Bitrise可能会默认预置一些步骤，点击左侧 + 号可以打开新增步骤页面，搜索你想要的步骤然后点击，它就会被添加到workflow里：
![image.png](https://i.loli.net/2021/05/24/N6P28sGVBMnU3T9.png)
接下来请依次添加以下步骤。

### Activate SSH key& Git Clone

这两步不需要做任何改动，保持默认的配置就好，这两步通常为每个workflow最开始的两个步骤，是用SSH的方式下载主代码库，这里是指 **sample-apps-ios-simple-objc** 这个代码库。

### 添加Simulator
第三步是启动模拟器，就像在本地运行测试一样，我们需要用模拟器执行测试。由于模拟器启动很慢，所以把它放在第三步，可以利用上面的方法搜索到这一步，然后修改Device Model、OS version、Platform，这三个值分别对应测试代码库文件 ios.conf.js 里的deviceName、platformVersion、platformName，在我的代码库里它就对应下图的值: 
![image.png](https://i.loli.net/2021/05/24/Qr9CitX4TwjNEae.png)

我们先保留以上三步，点击右上角保存按钮，之后回到应用页面，选择开始build，选择e2e workflow，然后开始Build:
![image.png](https://i.loli.net/2021/05/24/eJPU6g3AQf52cHy.png)
请确保运行成功，一般不会有问题的哈，否则自行搜索解决哦：
![image.png](https://i.loli.net/2021/05/24/6bvo2qVZQJiLUrM.png)

### 克隆测试代码库
然后我们来下载测试代码库，搜索并添加一个Script步骤，内容如下，repo地址请换成自己的哦：
![image.png](https://i.loli.net/2021/05/24/YJTKr2nZFby1P6j.png)
然后进入上个build成功的详情页，直接点击rebuild即可：
![image.png](https://i.loli.net/2021/05/24/FWTqsZHCjLbR3p5.png)
这里加上pwd的原因是要找到代码库在Bitrise服务器上的路径，这样就可以知道app的绝对路径了，同时也方便进行下边的步骤：
![image.png](https://i.loli.net/2021/05/24/mzqBDbnFk3ew2rx.png)
然后需要改一下代码库里ios.conf.js的app路径，这里我的代码库也已经改好了：
![image.png](https://i.loli.net/2021/05/24/pFK1HIQv2aDBmiR.png)

### 下载代码库依赖
同样搜索并添加一个Script步骤，内容如下：
![image.png](https://i.loli.net/2021/05/24/HSrBmEPCRUysTuD.png)

### 配置WebDriver Agent
还是搜索并添加一个Script步骤，内容如下：
![image.png](https://i.loli.net/2021/05/24/XBCVvrxsTWOpLIl.png)

### 执行测试
终于到了关键的一步了，执行测试，添加Script步骤，内容如下：
![image.png](https://i.loli.net/2021/05/24/D1iT3QGEnmtxu4d.png)
其实上边几步是可以合到一步的，但为了方便定位错误，我们分的越细越好。这次我们不直接运行rebuild，而是选择“Rebuild with remote access”，这样我们就可以通过Terminal或者Screen sharing连接到Bitrise的远程机器了，在此机器上会运行我们的workflow：
![image.png](https://i.loli.net/2021/05/24/HLoqAcZhWnmKfTv.png)
 - Screen Sharing方式
Mac电脑搜索Screen Sharing，然后按照上图提供的地址和用户名密码连接即可，不用保存密码，因为每次运行地址和密码信息都不一样：
![image.png](https://i.loli.net/2021/05/24/LkcajHwsOi2NGdJ.png)
![image.png](https://i.loli.net/2021/05/24/2XTuhMC4RzvL1dj.png)
连接成功后，可以看到模拟器已经启动并安装好了测试app：
![image.png](https://i.loli.net/2021/05/24/owjWUS7AJXz2CcO.png)
 - Terminal方式
按照Bitrise提供的地址和密码连接即可，但只能通过命令行访问，不能直观的看到机器：
![image.png](https://i.loli.net/2021/05/24/UClrYfRTsPz9pvN.png)
![image.png](https://i.loli.net/2021/05/24/8tuIP7OLKgi5b3R.png)

可以看到测试已经开始运行，并尝试连接模拟器：
![image.png](https://i.loli.net/2021/05/24/SqhAMYJP6HG91KL.png)
然而，在Bitrise远程机器上启动模拟器太慢了，即使我们把初始化simulator的步骤放在第三步，但无法确定它是否成功启动，所以在执行测试时也经常连不上模拟器。只能延长等待时间或者重试次数(这里会重试前10次，每次5分钟左右)，但也还是经常连不上，然后测试就会挂掉，目前我没找到解决方式(也可能是我网络太差或者bitrise免费版会有一些限制)，这算是一个痛点了，在我之前的Build里，只有两次测试执行成功：
![image.png](https://i.loli.net/2021/05/24/reWRbGQHMacCt72.png)

### 导出测试报告&部署到Bitrise
之后搜索添加test report和deploy步骤，就可以在每次运行后看到测试报告了，这里要改路径为下图：
![image.png](https://i.loli.net/2021/05/24/4ZJHWCGgRUzjb8m.png)
这个就用系统默认的输入，不用改啥：
![image.png](https://i.loli.net/2021/05/24/k1DOBazSQie7v2R.png)
运行后查看：
![image.png](https://i.loli.net/2021/05/24/RuSqzrx4bZyPcN5.png)
成功：
![image.png](https://i.loli.net/2021/05/24/qQFKNkY5IfhjuTO.png)
失败：
![image.png](https://i.loli.net/2021/05/24/wvBzbI3ya4tWUHQ.png)