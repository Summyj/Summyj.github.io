---
title: UiAutomator初体验(中)
date: 2021-08-05 11:20:35
update: 2021-08-03 11:20:35
tags: [uiautomatorviewer]
categories: [搬砖那些事儿, 自动化测试]
copyright: true
description: 利用uiautomatorviewer定位元素并编写代码。
top:
---

<img src="https://i.loli.net/2021/08/07/gVpdC1hMQHsrT64.png" >

{% note info %}
事实上，如何上手编写最基本的UiAutomator测试，[官网](https://developer.android.com/training/testing/ui-testing/uiautomator-testing) 上已经给出了设置步骤和简单的代码示例，只是没有从零开始介绍怎么创建一个完整的测试而已，所以我们可以基于官网文档，写一个可以在模拟器上运行的测试。
{% endnote %}

## 添加依赖

回到上篇博客创建好的测试项目，在app模块的build.gradle文件中，加上UiAutomator库的依赖：
{% codeblock lang:command %}
    dependencies {
        ...
        androidTestImplementation 'androidx.test.uiautomator:uiautomator:2.2.0'
    }
{% endcodeblock %}
添加之后Android Studio可能不会立刻下载依赖，所以为了确保可以使用uiautomator，需要在下图手动Apply一下：

![下载依赖](https://i.loli.net/2021/08/06/ljXOiHw7F5KQZIu.png)

## 定位元素

UI测试的第一步当然是定位元素，uiautomatorviewer工具可以做到这一点，它位于 {% label primary@android-sdk/tools/bin/ %} 目录，android-sdk就是下图中的sdk路径：

![sdk location](https://i.loli.net/2021/05/20/2eIfnzWbQY4VsNP.png)
打开终端，定位到上述目录中，然后运行uiautomatorviewer：

![运行uiautomatorviewer](https://i.loli.net/2021/08/06/1lOsYUNK7haAxnV.png)
如果上篇博客的环境都准备好了，就能打开uiautomatorviewer窗口，如果有已启动的设备，这里我打开了一个 [安卓模拟器](https://jmyblog.top/AppUI-AutoTest-1/#%E5%90%AF%E5%8A%A8Android-Emulator) ，点击窗口左上角第二个按钮，就能获取设备当前页面的screenshot，右侧是页面元素信息，通过这些信息，我们就可以定位元素了。
UiAutomator提供了findObject()方法定位UiObject元素，以定位上图页面底部Login按钮为例：

{% tabs 定位元素写法 %}
<!-- tab -->
Kotlin：
{% codeblock lang:command %}
    val loginButton: UiObject = device.findObject(
            UiSelector().text("Login").className("android.widget.TextView")
    )
{% endcodeblock %}

<!-- endtab -->
<!-- tab -->
Java：
{% codeblock lang:command %}
    UiObject loginButton = device.findObject(new UiSelector()
            .text("Login")
            .className("android.widget.TextView"));
{% endcodeblock %}

<!-- endtab -->
{% endtabs %}

## 编写代码

接下来我们就可以编写代码测试App了，我还是用了 [之前文章](https://jmyblog.top/AppUI-AutoTest-1/) 里的测试App，可以在 [这里](https://github.com/webdriverio/native-demo-app/releases) 下载，然后把它安装到模拟器里。
我们来编写最简单的两个Case，登录和注册。

![登录和注册页面](https://i.loli.net/2021/08/06/6wSmbHJQcOIKTgz.png)
{% note info %}
首先是登录，要实现登录操作，我们要切换到登录页面，之后输入邮箱和密码，再点击登录即可。
然后是注册，需要先切换到登录页面，再切换到注册tab页，之后输入邮箱、密码、确认密码字段，最后点击注册即可。
{% endnote %}
这里我只贴出一个步骤，是去打开app的登录页面，就使用上面的元素定义，其它步骤都可以参考这个完成：

![打开登录页面测试步骤](https://i.loli.net/2021/08/06/9UVPvcLlJqCKRzD.png)
其中，launchApp方法依然是 [官网提供](https://developer.android.com/training/testing/ui-testing/uiautomator-testing#accessing-ui-components) 的，先定义了一个device对象，通过该对象连接设备，然后再利用PackageName打开对应的App，最后我们定位元素并点击进入登录页面。
设备当前打开App的PackageName可以通过以下命令得到：
{% codeblock lang:command %}
    adb shell dumpsys window | grep -E 'mCurrentFocus'
{% endcodeblock %}
这就是我们使用Ui Automator编写的第一个可以运行的测试。

## 执行测试

有三种方式可以运行Ui Automator测试，第一种是直接在编辑器里点击运行图标：

![两个地方都可以点](https://i.loli.net/2021/08/06/LualXZYnq1R49Bv.png)
第二种方式是通过adb shell在命令行运行：
{% codeblock lang:command %}
    adb shell am instrument -w -m -e debug false -e class 'com.example.androidtest.ExampleInstrumentedTest#openLoginPage' com.example.androidtest.test/androidx.test.runner.AndroidJUnitRunner
{% endcodeblock %}
第三种方式也是在命令行运行，上篇博客提到，因为Ui Automator测试位于androidTest文件夹，是一种插桩测试，所以可以利用gradle直接运行，和mvn test执行测试的道理差不多：
{% codeblock lang:command %}
    ./gradlew connectedAndroidTest
{% endcodeblock %}
后两种运行方式，官网上也给出了 [详细介绍](https://developer.android.com/studio/test/command-line) ，并且提供了各个参数的含义。
值得一提的是，用第三种方式运行测试还会生成两个测试结果文件，一个是html格式，在 {% label info@path_to_your_project/module_name/build/reports/androidTests/connected/ %} 目录中：

![测试报告](https://i.loli.net/2021/08/06/S7AfZ3yGMFXTRYo.png)
另一个是xml格式，在 {% label info@path_to_your_project/module_name/build/outputs/androidTest-results/connected/  %} 目录中。

## PageObject

尽管我们已经写好了测试，但把所有的步骤都放在一个文件中显然不是good practice，所以我们可以按照Page Object模式将代码进行优化，把before方法、页面元素、操作步骤和测试分开，完成后的代码结构如下：

![PageObject](https://i.loli.net/2021/08/07/piOLVbxPScuAw5t.png)
其中，selectors包里是各个页面的元素，pages包则用来存放各个页面的操作方法，公用的方法比如launchApp都放在BasePage里，真正的测试用例则统一放在tests包里，我已将 [代码库](https://github.com/Summyj/UiAutomatorDemo) 上传到了github，不足之处还请大家批评指正。
以下是用三种方式执行测试的视频，直接点击编辑器图标运行大概12秒，用adb运行16秒，gradle运行也不过25秒：

<iframe height=498 width=510 src='https://player.youku.com/embed/XNTE5MDYyMjk2OA==' frameborder=0 'allowfullscreen'></iframe>