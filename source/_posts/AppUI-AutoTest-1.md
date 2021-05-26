---
title: AppUI自动化测试第二弹
date: 2021-05-20 16:46:15
update: 2021-05-21 14:06:15
tags: [自动化测试]
categories: [学习小记]
copyright: true
description: 利用模拟器和Appium定位App元素，编写测试代码。
top:
---

![image.png](https://i.loli.net/2021/05/24/BaDFwHCvbWk8g1x.png)

上篇博客我们创建好了测试项目，本篇博客就带大家编写测试代码，然后利用模拟器运行。

## Appium Desktop

熟悉了测试项目的结构后，我们就可以按照相同的代码格式编写自己的测试代码啦。
首先我们想一想，UI测试的第一步是什么呢？当然是定位元素。
对于Web应用，我们可以直接使用浏览器的开发者工具inspector定位页面元素：
![image.png](https://i.loli.net/2021/05/20/LWRPKYaSbQji4yH.png)
然而我们的测试对象是App，怎么定位App里的元素呢？答案是利用Appium和模拟器。
打开我们下载的Appium desktop应用：
<img src="https://i.loli.net/2021/05/20/Xb2R1rJf3PNDEkV.png" width="350" height="300" >
选择 Start Server, Appium Server就运行起来啦:
![image.png](https://i.loli.net/2021/05/20/r27GjW6cAdwHtSK.png)
鼠标hover到右上角的🔍图标，出现tip提示 **Start Inspector Session**，很明显这就是我们用来定位App元素的工具啦，点击之后出现下图窗口：
![image.png](https://i.loli.net/2021/05/20/t3b2iRPjNBOpW8x.png)
这里我们只关注当前的Tab窗口，其它部分不做介绍。在这个窗口中，我们可以通过设置 **Desired Capabilities** 来启动一个iOS/Android模拟器，Desired Capabilities是一系列模拟器配置项的集合，分为iOS和Android两个平台，有很多配置项，有两个平台公共的也有各平台单独的配置，完整的配置项列表在这里：[Appium Desired Capabilities](http://appium.io/docs/en/writing-running-appium/caps/index.html#appium-desired-capabilities)。

下边我们使用5个公共的Desired Capabilities配置项分别启动iOS和Android的模拟器：platformName、platformVersion、deviceName、automationName、app，他们分别代表操作系统名称、操作系统版本、设备名称、自动化引擎名称、app路径，想更多的了解这五个配置项可以看上边的配置项列表。

## iOS

### 启动iOS Simulator

首先执行 **xcrun instruments -s** 命令来查看Xcode提供给我们所有的iOS模拟器种类，包括设备名称和操作系统版本等等：

![image.png](https://i.loli.net/2021/05/20/eJZMpn3ayOgB78i.png)

然后选择一个模拟设备，按照json格式新增一个Desired Capabilities，这里我们以iPhone 11为例，粘贴下边的Desired Capabilities到Appium Start Inspector窗口，然后点击Save As按钮保存这个配置，这里我把它保存为iOS：
![image.png](https://i.loli.net/2021/05/20/VdDgGbmSFpCOUea.png)

{% codeblock lang:command %}
{
  "platformName": "iOS",
  "platformVersion": "14.0",
  "deviceName": "iPhone 11",
  "automationName": "XCUITest",
  "app": ""
}
{% endcodeblock %}

然后它就可以在 Saved Capability Sets 窗口里看到啦，以后可以单独对它做修改。
然而我们还缺少一个app字段，它是我们测试app的绝对路径，WebdriverIO给初学者提供了iOS和Android两个平台的 [demo app](https://github.com/webdriverio/native-demo-app/releases)，它们具有现代App的代码结构，非常适合用来做App测试：
![image.png](https://i.loli.net/2021/05/20/Ayx3YSEpuZlFc8a.png)
下载完成后，把.apk文件和解压后的.app文件都放入项目的app文件夹中，之后修改Desired Capabilities里的app路径为绝对路径，然后保存：
![image.png](https://i.loli.net/2021/05/20/wJlyN5mUjLFdXeM.png)
点击Start Session后，稍等片刻，就能看到模拟器启动并出现元素定位窗口，测试app已被打开：
![image.png](https://i.loli.net/2021/05/20/kTL578EawBCpRno.png)
元素定位窗口由两部分组成，左侧为App视图，右侧为代码和元素视图，在左侧视图中点击App元素，对应的元素信息就会出现在右侧视图，比较常用的是Xpath，但也可以用id/class来定位元素：
![image.png](https://i.loli.net/2021/05/20/cDygiatb1qG3EX2.png)
元素定位窗口的App视图只能展示一个页面，不能通过点击直接切换App页面。要做到这一点，我们只能先切换模拟器页面，之后点击元素定位窗口上方的刷新图标，新的页面视图才会出现：
![image.png](https://i.loli.net/2021/05/20/ihJ7OZzbE2rFXYV.png)

### 编写代码
到这里，我们已经能够定位iOS平台的App元素了，然后我们来编写测试代码，这里我们来编写最简单的两个Case，登录和注册。
{% note info %}
首先是登录，要实现登录操作，我们首先要切换到上边的登录页面，之后输入邮箱和密码，再点击登录即可。
然后是注册，需要切换到上边的登录页面，然后切换到注册tab页，之后输入邮箱、密码、确认密码字段，最后点击注册即可。
{% endnote %}

回到VSCode，登录页面已被定义，且已有示例的selector写法，通过定位元素，我们可以按照示例定义页面元素的selector，再新增方法对元素进行操作，最后在e2e.js中调用页面方法完成测试。

![image.png](https://i.loli.net/2021/05/20/MLUTP2BbmGR76Op.png)

大家可以按照这个思路自己编写测试代码，这里我就不贴代码了，不过可以访问 [我的代码库](https://github.com/Summyj/AppUI-AutoTest) 看到示例代码，将内容copy到对应文件夹(results文件夹只用copy result.txt)，其中ios.conf.js就是我们上边设置的Desired Capabilities，要在编辑器里运行代码我们必须得加上它，将其修改成你本地的配置即可，这里我有两个app路径，其中一个(没注释的)与后边集成CI步骤有关，可以先注释掉：
![image.png](https://i.loli.net/2021/05/26/SrQML96uvleWqBX.png)

最后运行 **npm run test:ios**(这是我的自定义命令，可以在package.json文件里看到它的定义) 执行测试，运行前请确保Appium desktop已退出，运行视频：

<iframe height=498 width=510 src='https://player.youku.com/embed/XNTE1ODA3OTk3Ng==' frameborder=0 'allowfullscreen'></iframe>

测试报告是利用junit做的，可以在 wdio.conf.js 文件里查看：
![image.png](https://i.loli.net/2021/05/26/nhUuXidOpwWzZ9G.png)

## Android
### 启动Android Emulator
打开我们下载的Android Studio，进入编辑页面，点击右上角AVD Manager图标打开模拟器窗口：
![image.png](https://i.loli.net/2021/05/20/wiFyJgqWZXbDAmG.png)
这里会列出所有可以使用的安卓模拟器，初次打开时，可能没有Virtual Device，可以通过“Create Virtual Device”来创建一个，创建时下载OS版本需要一些时间哦，如果有默认的Virtual Device就不用下载了。然后启动你的安卓模拟器：

![image.png](https://i.loli.net/2021/05/24/n1865FmjlbKyupU.png)

安卓模拟器右侧是一些菜单项，包括开关机、音量、旋转等等，以及一些高级设置，可以访问 [在Android模拟器上运行应用](https://developer.android.com/studio/run/emulator) 了解更多。

接着和iOS一样，在Appium desktop里新增Virtual Device对应的Desired Capabilities，然后Save as保存它，下边是我保存的配置，需要修改成和你的模拟器一致：

![image.png](https://i.loli.net/2021/05/24/TM3skJ47iDX8l9b.png)

{% codeblock lang:command %}
{
  "platformName": "Android",
  "platformVersion": "10.0",
  "deviceName": "Pixel_3_XL_API_29",
  "automationName": "UiAutomator2",
  "app": "你的安卓app绝对路径，应该在app文件夹里"
}
{% endcodeblock %}

保持你的安卓模拟器启动状态，然后Start Session，就会看到和刚才iOS一样的元素定位窗口，测试app已在模拟器中打开：

![image.png](https://i.loli.net/2021/05/24/MoekacB4D9TAtsu.png)

事实上，你可以同时打开iOS和Android的模拟器和元素定位窗口，一起定位iOS和Android的元素：

![image.png](https://i.loli.net/2021/05/24/R6yJCZVgfUNwQB5.png)

### 编写代码

到这里，我们已经能够定位Android平台的App元素了，同样可以按照之前的思路自己编写登录注册的测试代码，事实上只需要修改上边iOS的Selector为Android格式即可。
也可以访问 [我的代码库](https://github.com/Summyj/AppUI-AutoTest) 看到示例代码，将android.conf.js内容修改成你本地的配置即可，这里我有两个app路径和两个deviceName，多出的两个(没注释的)同样与后边集成CI步骤有关，可以先注释掉：
![image.png](https://i.loli.net/2021/05/26/dvgs5SKQrHXEkUh.png)

最后运行 **npm run test:android**(这是我的自定义命令，可以在package.json文件里看到它的定义) 执行测试，运行前请确保Appium desktop已退出，也要确保安卓模拟器为启动状态，运行视频：

<iframe height=498 width=510 src='https://player.youku.com/embed/XNTE1ODA3NzE4MA==' frameborder=0 'allowfullscreen'></iframe>

## 更多内容

上面我们使用模拟器和两个demo app，利用Appium inspector完成了登录注册功能的自动化测试。当然，只懂得这些是远远不够的，首先我们知道，当代App有几种类型：**Native app**、**Web app**以及**Hybrid app**，这三者的区别是什么、如何测试显然是一个重要的课题，网上已经有许多文章讲述它们的区别，比如 [这篇文章](https://www.jianshu.com/p/a40fefcadc94) ，所以我就不再赘述了。

而除了login页面，demo app也提供了其它不同类型的页面，比如WebView、Swipe等生活中常见的页面类型。同样，针对于此demo app，WebDriverIO提供了 [示例代码库](https://github.com/webdriverio/appium-boilerplate)，也包括iOS和Android两个平台，里面有包含以下类型的测试示例代码：
- 测试native app
- 测试webview
- 在手机端利用Safari/Chrome执行浏览器测试
- 利用Sauce Labs Service、BrowserStack两个云服务平台提供的真机/模拟器执行测试

每一种测试类型都有对应的config文件，但此代码库用的不是mocha框架，而是jasmine框架。而且虽然它测试了两个平台，但由于只是selector不同，所以通过配置不用重复定义页面，一个页面可以被两个平台调用，感兴趣的同学可以深入学习。

完成后别忘了把代码推送到Github哦，方便进行下一步的CI集成。
