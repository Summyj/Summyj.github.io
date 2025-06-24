---
title: UiAutomator初体验(上)
date: 2021-08-03 11:20:35
update: 2021-08-03 11:20:35
tags: [自动化测试, UiAutomator, Android]
categories: 搬砖那些事儿
copyright: true
description: UiAutomator介绍，环境准备和测试项目的创建。
top:
---

{% img https://i.loli.net/2021/07/31/hT5tpAjqk2xZN8L.png %}

>前段时间博主写了 [系列文章](https://jmyblog.top/AppUI-AutoTest/) 来介绍移动端的UI自动化，主要工具是Appium。之后发现Appium还是存在一些问题，比如定位不到元素、运行时间长等等。
后来又针对Android平台spike了其它的工具，比如Espresso、UiAutomator，它们都是安卓官网推荐的测试工具，参考了网上诸多文章，如 [Espresso vs Ui Automator](https://medium.com/@phamngocson.l13cla/espresso-vs-ui-automator-66af8232259d)。
结论是Espresso拥有更多高级的方法，但它对代码能力的要求比较高，所以对于一般QA来说难以使用，而UiAutomator更容易上手，所以我选择了UiAutomator，本来想用一篇博客介绍的，但篇幅太长，所以分了三篇博客分享。

## UiAutomator介绍

UiAutomator是什么呢？参考 [官网介绍](https://developer.android.com/training/testing/ui-automator) ：
{% note info %}
UI Automator 测试框架提供了一组 API，用于构建在用户应用和系统应用上执行交互的界面测试。通过 UI Automator API，您可以执行在测试设备中打开“设置”菜单或应用启动器等操作。UI Automator 测试框架非常适合编写黑盒式自动化测试，此类测试的测试代码不依赖于目标应用的内部实现细节。
{% endnote %}
hummm...官方介绍总是给人一种似懂非懂的感觉，不过问题不大，接下来我们通过实践来深入了解UiAutomator :wink:

## 环境准备

1.下载 [Android Studio](https://developer.android.com/studio)，下载后打开以下设置确保sdk location正确：

{% img https://i.loli.net/2021/05/20/2eIfnzWbQY4VsNP.png %}
2.下载 [JDK 8](https://github.com/AdoptOpenJDK/openjdk8-binaries/releases/download/jdk8u292-b10/OpenJDK8U-jdk_x64_mac_hotspot_8u292b10.pkg) ，这里版本一定要是8，否则打不开uiautomatorviewer工具。
3.下载 [swt](https://download.eclipse.org/eclipse/downloads/drops4/R-4.20-202106111600/) ，滑到页面底部找到这里，按照对应平台下载即可：

{% img https://i.loli.net/2021/08/04/k28chb6SsBjpIwH.png %}
这个也是为了打开uiautomatorviewer工具，因为uiautomatorviewer自带的swt包有一些问题，所以得自己下载一个，这个感觉是uiautomatorviewer的一个bug。
下载之后解压，然后把里面的swt.jar重命名为swt2.jar：

{% img https://i.loli.net/2021/08/04/WPT7VcmHapot1J5.png %}
进入上文的sdk location目录，然后再依次打开{% label primary@tools/lib/x86 %} 目录，可以看到uiautomatorviewer自带的swt包，然后复制刚才的swt2.jar到这里(我也不知道为啥不干脆替换掉原有的swt包)，下面的x86_64目录也要做同一操作：

{% img https://i.loli.net/2021/08/04/r2IeHSdCPiasYbn.png %}
4.所有依赖都已经下载完啦，然后我们来设置环境变量，打开你本地的 .bash_profile 或者 .zshrc 文件，没有就新建一个，之后输入下边的设置，直接粘贴改动即可：
{% codeblock lang:command %}
export JAVA_HOME=/Library/Java/JavaVirtualMachines/adoptopenjdk-8.jdk
export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
export ANDROID_HOME=path/to/your/Android sdk (eg:/Users/usr/Library/Android/sdk)
export PATH=~/bin:$PATH:/usr/local/bin:$ANDROID_HOME/platform-tools/:$JAVA_HOME/bin
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/platform-tools
AAPT_HOME=/path/to/your Android sdk build-tools (eg:/Users/usr/Library/Android/sdk/build-tools/28.0，这里的28.0是我本地的版本，你需要打开对应目录查看自己的版本然后修改。)
export AAPT_HOME
export PATH=$PATH:$AAPT_HOME
{% endcodeblock %}
保存后执行 **source .bash_profile** 或者 **source .zshrc** 使配置生效，然后执行 **java -version**，确保java版本正确。

## 创建测试项目

打开Android Studio创建新项目，因为我们是要写测试，而不是开发App，所以选择No Activity后继续，这里我把项目名和包名改成了自定义的，你也可以改成别的；项目语言有Java和Kotlin，其实两者非常相像，语法略有不同，这里我选了Kotlin，你也可以用Java，影响不大：

{% img https://i.loli.net/2021/08/04/1Hz826lcKeNWPwV.png %}
之后Android Studio会开始用Gradle构建你的项目，右下角可以看到进度，构建完成后，在页面左上角下拉框中切换到Project视图，可以看到项目结构：

{% img https://i.loli.net/2021/08/04/dgVfhKHEDsjRt95.png %}

## 熟悉项目结构

这是一个最基本的安卓项目代码结构，根目录和app模块各有一个build.gradle文件，我们重点关注 **app** 模块，src里有三个目录，main目录里一般存放App的activity文件，这里没有是因为我们前边选择了No Activity，不过这个与测试无瓜。
其他两个目录 **androidTest** 和 **test** 分别用来存放app的插桩测试(Instrumented tests)和单元测试，单元测试我们都知道，那什么是插桩测试呢？
同样引用 [官网介绍](https://developer.android.com/studio/test#test_types_and_location)：
{% note info %}
插桩测试，位于 module-name/src/androidTest/java/ 目录，这些测试在硬件设备或模拟器上运行。这些测试有权使用 Instrumentation API，可让您获取某些信息（例如您要测试的应用的 Context），并且可让您通过测试代码来控制受测应用。在编写集成和功能界面测试来自动执行用户交互时，或者当您的测试具有模拟对象无法满足的 Android 依赖项时，可以使用这些测试。
{% endnote %}
很明显，我们要写的就是这种测试，所以无论是UiAutomator测试，还是上文提到的Espresso测试，都应该写在各模块文件夹里的AndroidTest目录中。
