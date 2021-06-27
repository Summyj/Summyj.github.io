---
title: AppUI自动化测试第一弹
date: 2021-05-19 16:46:15
update: 2021-05-20 17:46:15
tags: [自动化测试]
categories: [搬砖那些事儿]
copyright: true
description: 环境准备以及测试项目的创建。
top:
---

<img src="https://i.loli.net/2021/05/19/AwIHB8nugEVPGRz.png" >

## 开始之前

博主之前有文章介绍了[WebUI自动化](https://jmyblog.top/WebUI-AutoTest-Demo-1/)，但相较于Web端，App的使用场景更多。所以博主又开发了系列课程，共4篇博客，带大家从0到1开始简单的AppUI自动化测试，并且将测试代码集成到CI，难度为入门级别，包含iOS和Android两个平台，内容详尽，包教包会哦(是和之前WebUI自动化博文一样，看也能看懂的程度哈哈哈哈)，本篇主要带大家配置环境，然后创建测试项目。

## 环境准备

<span id="inline-toc">1.</span> 首先，你需要有一个IDE，推荐使用[VS Code](https://code.visualstudio.com/download)。
<span id="inline-toc">2.</span> [下载安装](https://developer.apple.com/download/more/) Xcode(12.0.1)和Xcode command line tool(12.2 beta2)，直接下载后按照提示安装即可，这两个工具是为了iOS平台的自动化。安装可能需要一些时间，可以同时进行下边的步骤。
<span id="inline-toc">3.</span> 下载 [Android Studio](https://developer.android.com/studio) ，这是一个开发App的IDE，但我们不用它写代码，只是用它里边的一个工具，是为了Android平台的自动化。下载后打开以下设置确保sdk location正确：
![sdk location](https://i.loli.net/2021/05/20/2eIfnzWbQY4VsNP.png)
<span id="inline-toc">4.</span> 使用命令下载homebrew，这是一个下载工具，可以帮助下载别的依赖：
{% codeblock lang:command %}
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
{% endcodeblock %}
然后执行 {% label info@export HOMEBREW_NO_AUTO_UPDATE=true %} ，这样就不会每次用homebrew下载东西的时候它都自动更新了，最后执行 **brew -v** 检查你是否安装成功。
<span id="inline-toc">5.</span> 使用brew下载node：**brew install node**
<span id="inline-toc">6.</span> 使用brew下载jdk，依次执行：
{% codeblock lang:command %}
brew tap AdoptOpenJDK/openjdk
brew cask install adoptopenjdk11
{% endcodeblock %}
<span id="inline-toc">7.</span> 使用brew下载carthage：**brew install carthage**
<span id="inline-toc">8.</span> 下载 [Appium desktop](https://github.com/appium/appium-desktop/releases/tag/v1.20.2)
<span id="inline-toc">9.</span> 下载 Appium-Doctor：**npm install -g appium-doctor**
<span id="inline-toc">10.</span> 所有依赖都已经下载完啦，然后我们来设置环境变量，打开你本地的 .bash_profile 或者 .zshrc 文件，没有就新建一个，之后输入下边的设置，直接粘贴改动即可：
{% codeblock lang:command %}
export ANDROID_HOME=path/to/your/Android sdk (eg:/Users/usr/Library/Android/sdk)
export JAVA_HOME=/Library/Java/JavaVirtualMachines/adoptopenjdk-11.jdk
export PATH=~/bin:$PATH:/usr/local/bin:$ANDROID_HOME/platform-tools/:$JAVA_HOME/bin
export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/platform-tools
AAPT_HOME=/path/to/your Android sdk build-tools (eg:/Users/usr/Library/Android/sdk/build-tools/28.0，这里的28.0是我本地的版本，你需要打开对应目录查看自己的版本然后修改。)
export AAPT_HOME
export PATH=$PATH:$AAPT_HOME
{% endcodeblock %}
保存后执行 **source .bash_profile** 或者 **source .zshrc** 使配置生效。
<span id="inline-toc">11.</span> 最后执行 **appium-doctor** 命令查看你的环境是否已经准备完成，necessary的部分全部打绿勾就可以啦，如果上边的部分都做完了，应该是没有 ❌ 的，否则就要看对应的报错然后自行搜索解决哦：
![appium-doctor.png](https://i.loli.net/2021/05/20/DL9UPqaNYrgnGsQ.png)

## 创建测试项目

环境准备好了，就可以着手开始创建测试项目了，这里我们使用 [WebdriverIO](https://webdriver.io/docs/what-is-webdriverio) 来帮助我们初始化一个可以进行App自动化测试的项目，首先新增一个文件夹，之后进入该文件夹依次执行：
{% codeblock lang:command %}
npm init –y //在文件夹里生成一个package.json文件，记得之前WebdriverIO会默认生成的，后来好像没了，就自己手动添加一个
npm install --save-dev @wdio/cli //下载帮助我们初始化项目的wdio工具
{% endcodeblock %}
然后执行 **npx wdio config** 进入项目的初始化步骤，之后该程序会让我们选择各种自动化测试的工具和规范，比如选择测试框架、PageObject、测试报告类型、测试服务端等等，非常全面。这里我们按下边的设置来初始化我们的项目(上下键切换选项，空格键选中/取消选中选项，enter键选择)：

![config.png](https://i.loli.net/2021/05/20/oJhBqNp4asPAljC.png)

如果把一个 [自动化测试框架](https://jmyblog.top/AutoTest-FrameWork/) 比做车辆，那WebdriverIO就像是一个造车工厂，用各种不同的零件构造出各式各样的自动化测试框架。
完成后的项目结构应该如下图：
![project.png](https://i.loli.net/2021/05/20/p8ZGHsWCD5nPjbS.png)
其中有默认的测试代码示例，相关依赖也已经写入package.json里。
{% note info %}
观察示例代码，不难发现它使用的语言是javascript；采用pageobject模型，有示例的公共页面page.js、登陆页面login.page.js，login页面中还给出了selector和function的示例定义方法，所有页面都放在pageobjects文件夹中；一般我们会把所有页面的公共方法放在page.js；specs文件夹里有一个示例的e2e测试文件，在此文件中会引入各个页面并使用其方法编写测试步骤，describe/it/await等都是mocha框架的关键字。
{% endnote %}

我们需要再做一些改动使项目结构更加标准，在根目录新增app和config文件夹，然后把wdio.conf.js文件放入config文件夹中，app文件夹将用来存放测试app，改动之后的项目结构：

<img src="https://i.loli.net/2021/05/20/T2DvQJGWrgsYqlH.png" width="200" height="280">