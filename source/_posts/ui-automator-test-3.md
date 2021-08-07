---
title: UiAutomator初体验(下)
date: 2021-08-07 11:20:35
update: 2021-08-03 11:20:35
tags: [自动化测试, Bitrise]
categories: 搬砖那些事儿
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