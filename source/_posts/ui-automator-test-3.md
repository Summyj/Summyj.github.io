---
title: UiAutomator初体验(下)
date: 2021-08-07 11:20:35
update: 2021-08-03 11:20:35
tags: [Bitrise]
categories: [搬砖那些事儿, 自动化测试]
copyright: true
description: 持续集成，将代码部署到Bitrise CI。
top:
---

<img src="https://i.loli.net/2021/08/07/XE59SbdlRZBJ7iW.png" >

{% note info %}
上篇博客我们用UiAutomator编写了一个可以用命令行运行的测试，那它就肯定可以集成到CI上，没有完成的同学也不用担心，可以先fork [我的代码库](https://github.com/Summyj/UiAutomatorDemo) 和 [模拟的Android开发代码库](https://github.com/bitrise-io/sample-apps-android-sdk22) 到你的github账户，然后注册一个 [Bitrise](https://www.bitrise.io/) 账号即可。
{% endnote %}

## 创建Android应用

这里直接复用 [之前博客](https://jmyblog.top/AppUI-AutoTest-3/#%E5%88%9B%E5%BB%BAAndroid%E5%BA%94%E7%94%A8) 相同部分的内容，按照步骤做就可以了。

## 添加UiAutomator workflow

依次点击页面右侧App -> Workflow ，进入Workflow编辑页面，点击 “+ Workflow” 新增一个名为UiAutomator的 workflow：

![新建workflow(忽略这里的名字哈)](https://i.loli.net/2021/05/26/UEAFWjvYlk1NMpg.png)
然后自动进入该workflow的编辑页面，我们将在此workflow下载测试代码库并执行测试，页面左侧为该workflow的执行步骤和内容，Bitrise可能会默认预置一些步骤，点击左侧 + 号可以打开新增步骤页面，搜索你想要的步骤然后点击，它就会被添加到workflow里：

![添加执行步骤(忽略这里的名字哈)](https://i.loli.net/2021/05/24/N6P28sGVBMnU3T9.png)
接下来请依次添加以下步骤。

### Activate SSH key& Git Clone

这两步通常为每个workflow最开始的两个步骤，不需要做任何改动，保持默认的配置就好，意思是说用SSH的方式下载主代码库，这里是指上面fork的模拟的Android开发代码库：

![下载主代码库](https://i.loli.net/2021/08/07/bqzS9O2DV1BgE6h.png)

### 克隆测试代码库

第三步是下载测试代码库，搜索并添加一个Script步骤，直接git clone即可，repo地址请换成自己的哦，Bitrise会把测试代码库下载到$BITRISE_SOURCE_DIR，也就是/bitrise/src/这个目录下：

![下载测试代码库](https://i.loli.net/2021/08/07/VG2rC7TZIXcsRMA.png)

### 添加安卓模拟器

然后是创建并启动模拟器，和在本地运行测试一样，运行之前得确保模拟器开启，这里我将默认的API Level改成了29，因为比较常用：

![创建模拟器](https://i.loli.net/2021/08/07/JwTigPXExe2um97.png)

### 等待模拟器启动

接着等待模拟器启动，默认是等待5分钟，这里我增加到了10分钟：

![等待模拟器启动](https://i.loli.net/2021/08/07/5QtKkLRU28N4jnY.png)

### 安装测试App

接下来就是在模拟器里安装App了，我把测试App也保存到了代码库里，这里使用adb install命令来安装指定位置下的apk文件：

![安装Apk](https://i.loli.net/2021/08/07/JzEcfoVBwQGT4Yb.png)

### 执行测试

终于到了关键的一步了，执行测试，上篇博客中提到可以用两种命令执行测试，一个是gradle，一个是adb，因为用gradle执行可以生成一个测试报告，为了方便接下来的步骤，这里选择用gardle：

![执行测试](https://i.loli.net/2021/08/07/CYS2gtmpMWDaqw1.png)

### 导出测试报告&部署到Bitrise

之后搜索添加test report和deploy步骤，就可以在每次运行后看到测试报告了，上篇博客同样提到gradle执行测试后，会生成html和xml两种格式的测试报告，由于Bitrise只能解析xml格式的测试报告，所以改路径为下图xml文件所在位置，接着添加depoly步骤后才能运行之后看到测试报告，不需要做任何改动，保持默认的配置就好：

![导出测试报告](https://i.loli.net/2021/08/07/DhFivjswpXt5m8n.png)

### 添加环境变量

有时候为了安全考虑，代码里不能明文存储像账号密码之类的测试数据，所以这里我将账号密码保存成Bitrise的环境变量：

![Bitrise添加环境变量](https://i.loli.net/2021/08/07/mq2bJtDaAT9QGlu.png)
接着在代码里用getenv()方法获取环境变量即可，本地运行的话再赋个值就可以了：

![获取环境变量](https://i.loli.net/2021/08/07/Zqv796Dt3docrXP.png)

## 运行workflow
### 运行过程

万事皆备，就可以运行workflow了，点击右上角保存按钮，之后回到应用页面，选择开始build，选择UiAutomator workflow，然后开始Build：

![首次运行workflow((这里是之前文章里的图))](https://i.loli.net/2021/05/26/Tb4AgVXcCSvloQs.png)
以后再运行，可以像上边一样设置Build，更方便的是进入上个build的详情页，直接点击rebuild就可以再次运行了：

![Rebuild(这里是之前文章里的图)](https://i.loli.net/2021/05/26/twh71nYu2szfMGI.png)
也可以选择“Rebuild with remote access”，Bitrise给安卓应用提供了远程机器，在此机器上会运行我们的workflow：
![Rebuild with remote access(这里是之前文章里的图)](https://i.loli.net/2021/05/26/wfXjKMclDrLt1Jm.png)
可以按照Bitrise提供的地址和密码连接该机器(每次运行地址和密码都会变)。

### 运行结果

如果上面的步骤都设置正确，应该是可以运行成功的，失败的话大概率应该是上边配置不对，自行解决哦：

![运行结果](https://i.loli.net/2021/08/07/uIFs2vK5nBQTROf.png)
![测试报告](https://i.loli.net/2021/08/07/UwucB8XYFqzDGLk.jpg)
一共10分钟，测试跑了3分半左右，但真正执行测试的时间应该只有几十秒，其他都是在下载依赖：

![测试日志](https://i.loli.net/2021/08/07/WxzDIfAoq1N7bTU.png)
然后发现模拟器安装测试APP这一步花的时间很长，通常得5分钟左右：

![安装apk日志](https://i.loli.net/2021/08/07/1dZblQcaHUkRDuI.png)
有时时间更长甚至会失败，没找到解决办法，但失败的情况比较少，重跑就行，所以先不管了：

![安装失败](https://i.loli.net/2021/08/07/XmsRVoIEP8lzq4a.png)

### 尝试用adb运行测试

试过不导出测试报告，用adb在CI执行测试，但会报一个互斥锁的错误，感觉在CI上太难连到模拟器了，上边在模拟器安装apk的步骤也很费劲，所以最好不用adb命令吧。

![adb运行](https://i.loli.net/2021/08/07/MTudktDJ41ZcO6G.png)

## UiAutomator vs Appium

UiAutomator初体验到这里就结束了，因为之前我也写过用Appium进行移动端UI自动化测试的系列文章，所以感受到了很多不同，具体在以下几个方面。

### 上手方面

这是Appium的 [环境准备](https://jmyblog.top/AppUI-AutoTest/#%E7%8E%AF%E5%A2%83%E5%87%86%E5%A4%87) ，这是UiAutomator的 [环境准备](https://jmyblog.top/ui-automator-test/#%E7%8E%AF%E5%A2%83%E5%87%86%E5%A4%87) ，UiAutomator是更快更简洁的，依赖更少；这是Appium创建的 [测试项目](https://jmyblog.top/AppUI-AutoTest/#%E5%88%9B%E5%BB%BA%E6%B5%8B%E8%AF%95%E9%A1%B9%E7%9B%AE) ，这是UiAutomator创建的 [测试项目](https://jmyblog.top/ui-automator-test/#%E5%88%9B%E5%BB%BA%E6%B5%8B%E8%AF%95%E9%A1%B9%E7%9B%AE) ，还是UiAutomator更快更方便。

这是Appium用来定位元素的 [Appium Desktop](https://jmyblog.top/AppUI-AutoTest-1/#Appium-Desktop) ，这是UiAutomator用来定位元素的 [uiautomatorviewer](https://jmyblog.top/ui-automator-test-2/#%E5%AE%9A%E4%BD%8D%E5%85%83%E7%B4%A0) ，还是UiAutomator更方便，不用设置Desired Capabilities，但界面其实没人家好看。

这是利用Appium [写的代码](https://jmyblog.top/AppUI-AutoTest-1/#%E7%BC%96%E5%86%99%E4%BB%A3%E7%A0%81) ，这是用UiAutomator [写的代码](https://jmyblog.top/ui-automator-test-2/#%E7%BC%96%E5%86%99%E4%BB%A3%E7%A0%81) ，这里写的是同样的测试用例，其实是差不多的，只是语言不同而已。不过对于Webview，Appium还需要切换context，UiAutomator则可以直接操作Webview，不用手动切换context，这会大大减少测试运行的时间和出错率。

Appium适用于iOS和Android两个平台，UiAutomator是只针对Android的，其实Appium在Android平台底层用的也是UiAutomator作为自动化引擎，从Desired Capabilities的配置就可以发现：

![android capabilities](https://i.loli.net/2021/08/07/y9QTpiPKDWul81b.png)
所以UiAutomator相当于是安卓原生的一个自动化测试框架，iOS也有自己原生的UI测试框架XCUITest，它也是Appium在iOS平台底层引用的自动化引擎：

![ios capabilities](https://i.loli.net/2021/08/07/9GQvkLTlxMgU8Zt.png)

### 运行时间

再来看看运行时间，还是贴出两个框架的运行视频，这里写的同样的测试用例，先来看UiAutomator用三种方式运行测试的视频，最长的时间是用gradle运行，大概25秒，最短只需要12秒：
<iframe height=498 width=510 src='https://player.youku.com/embed/XNTE5MDYyMjk2OA==' frameborder=0 'allowfullscreen'></iframe>

再来看Appium运行视频，是用npm命令跑，大概23秒，看起来和UiAutomator差不多，但更复杂的场景还是UiAutomator更快的。

<iframe height=498 width=510 src='https://player.youku.com/embed/XNTE1ODA3NzE4MA==' frameborder=0 'allowfullscreen'></iframe>

### CI配置

这是Appium的 [CI配置过程](https://jmyblog.top/AppUI-AutoTest-3/#%E6%B7%BB%E5%8A%A0e2e-workflow) ，这是UiAutomator的 [CI配置过程](https://jmyblog.top/ui-automator-test-3/#%E6%B7%BB%E5%8A%A0UiAutomator-workflow) ，看着虽然也差不多，但亲测其实Appium步骤更多，因为要切换Webview，后续还要加一步下载chrome webdriver，而UiAutomator则不用。

### 个人体验

{% note info %}
两个框架各有优劣，可以根据实际需求选择，我自己体验下来还是Ui Automator更方便一些，不过两个框架我都是初次使用，目前除了webview之外我也没遇到别的复杂场景，或许有的方面Appium会更胜一筹，继续学习吧，碰到之后我也会写博客分享的。
{% endnote %}
