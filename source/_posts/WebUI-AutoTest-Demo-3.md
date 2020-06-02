---
title: WebUI自动化测试框架Demo(下)
date: 2020-05-17 15:05:47
update: 2020-05-15 15:05:47
tags: [自动化测试]
categories: [学习小记]
copyright: true
description: 利用Jenkins/GoCD和Github实现Demo Project的CI集成。
top:
---

<img src="https://i.loli.net/2020/05/19/dKSi3gZFTJchr6P.png" >

{% note info %}
上篇博客我们已经完成了Demo Project的代码优化, 这篇文章我们就利用Jenkins和GoCD这两种工具来实现Demo Project的持续集成。
{% endnote %}

## CI&CD介绍
### 是什么
    持续集成CI(Continuous Integration)

持续集成指的是，频繁地（一天多次）将代码集成到主干。基本流程为：
- 提交代码
- 执行第一轮测试(单元/集成测试)
- 代码合到master


    持续交付(Continuous Delivery)

持续交付指的是，频繁地将软件的新版本，交付给质量团队或者用户，以供评审。如果评审通过，当前代码就是一个可以直接部署的版本。基本流程为：
- 代码集成完成
- 构建项目，将源码转换为可以运行的实际代码
- 执行第二轮测试(端到端/手工测试)



    持续部署(Continuous Deployment)

持续部署是持续交付的下一步，指的是代码通过评审以后，自动部署到生产环境。持续部署的目标是，代码在任何时刻都是可部署的，可以进入生产阶段。基本流程为：
- 持续交付流程完成
- 利用工具自动部署到生产环境

持续部署和持续交付的区别在于，前者可以自动化部署过程，后者只能手工部署。

### 怎么做
CI&CD的实现离不开自动化工具，比较流行的有关注持续集成的Jenkins/Travis CI/..., 关注持续交付/部署的GoCD等等。

## 使用Jenkins集成

>Jenkins 是一个开源软件项目，是基于 Java 开发的一种持续集成工具，用于监控持续重复的工作，旨在提供一个开放易用的软件平台，使软件的持续集成变成可能。

完成后的效果，小太阳标志：
<img src="https://i.loli.net/2020/05/17/Q5FMxDSWvgNUoXB.png" >
首先把本地的DemoProject推送到Github，然后请直接按照 [这篇文章的Jenkins部分](https://www.jianshu.com/p/28b7ae892ed1) 设置，已经写的很详细了，主要包括：

<span id="inline-toc">1.</span> Jenkins安装：在本地8080端口运行Jenkins并设置管理员账号
>小知识：WAR(Web应用程序归档，英語：Web application archive)，也是一种Java归档，存储XML文件、Java类、JSP和Web应用程序中的其他文件。

<span id="inline-toc">2.</span> Jenkins配置：添加JDK和Maven
<span id="inline-toc">3.</span> Jenkins添加GitHub server：Github生成token并在github的DemoProject项目里添加本地Webhook

>这部分Payload URL里的Jenkins server IP就是你电脑的IP，可以通过**ifconfig**命令获得，在结果的最后一行。


<span id="inline-toc">4.</span> Jenkins新建并配置Maven项目：绑定Github的DemoProject
<span id="inline-toc">5.</span> Jenkins运行Maven项目并查看结果

## 使用GoCD集成

    GoCD是一种开源工具，用于软件开发，可帮助团队和组织使软件的持续交付/部署(CD)自动化。

完成后的效果，绿色的pipeline：
<img src="https://i.loli.net/2020/05/26/eKa2fnP1oMQB7WL.png" >

### 下载GoCD Server&Agent

{% note primary %}
Server和Agent

GoCD的基础架构由Server和Agent组成，Server 负责配置和控制，Agent负责执行。

Server：控制一切配置，关联仓库，触发pipeline执行，配置每个Job对应的Agent，将Job分配给Agent去执行，整理信息判断该Stage的状态。
Agent：接收Server分配的Job，执行Job下的Task（运行命令、部署等），并将Job的状态报告给Server。
{% endnote %}

打开GoCD官网 [下载页面](https://www.gocd.org/download/#osx), 根据系统下载：
<img src="https://i.loli.net/2020/05/28/UmGMZHN7CudP5zJ.png" >
这里我们下载19.9.0版本，所以点击下方 show old releases按钮，下载Server&Agent:
<img src="https://i.loli.net/2020/05/28/tUZ5lM4WDznbroh.png" >
解压后放在新建的Pipeline文件夹下，就安装完成了：
<img src="https://i.loli.net/2020/05/28/TZPhSqW6frYkC7b.png" >

### 启动Server&Agent

首先确保自己安装了Java11, 然后切换到server目录执行：
{% codeblock lang:command %}
./bin/go-server console
{% endcodeblock %}
启动GoCD Server:
<img src="https://i.loli.net/2020/05/28/AgyOR9KpqYLvHPl.png" >
Server启动成功后，默认的端口号是 8153/8154 (HTTPS)，访问 https://localhost:8154 就可以看到GoCD Server页面啦：
<img src="https://i.loli.net/2020/05/28/roFANt8naqGH9SR.png" >
打开一个新的终端窗口，同样切换到agent目录执行：
{% codeblock lang:command %}
./bin/go-agent console
{% endcodeblock %}
启动GoCD Agent:
<img src="https://i.loli.net/2020/05/28/yRMoriNK2bQlqUh.png" >

### 创建Pipeline

回到Server页面，点击页面按钮，创建Pipeline。

    Pipeline: 管道，在GoCD里，Pipeline就像是一个工作流水线。它的结构如下所示：

<img src="https://i.loli.net/2020/05/28/T5nXiopQ4OAWVNC.png" >
首先指定Pipeline的Material，就是Demo Project在Github上的仓库地址：
<img src="https://i.loli.net/2020/05/28/wPsHAvpSVMeg3bh.png" >


    Material

用来触发Pipeline的条件，可以是代码的存储仓库，可以是其他Pipeline某个Stage执行成功后的产出。在这里，我们把Github仓库作为Material，如果有新的改动会触发Pipeline重新运行。


接着输入Pipeline名字，自定义就可以。这里我设为Auto:
<img src="https://i.loli.net/2020/06/01/WoS7B3KN4qYL8jF.png" >
输入Stage名字，这里我设为Test：
<img src="https://i.loli.net/2020/06/01/EAmzj12fKLsvOrt.png" >


    Stage

pipeline可以有多个Stage，每个Stage按照顺序执行，一个Stage Fail，则不会执行后边的Stage，pipeline也会是Fail状态。比如常见的这几个stage: Build，Package，Deploy，Smoke，FunctionTest


创建job和tasks，这里创建了一个名为run_tests的job, 并给它加上一个task，脚本命令:mvn test
<img src="https://i.loli.net/2020/06/01/6Oxp31ysZQ8goe7.png" >



    Job

一个Stage可以有多个Job，多个Job之间是相互独立的，一个Job失败，不会影响其他Job的执行，但是一个Stage中的任何一个Job失败，则这个Stage失败

    Task

一个Job由一个或多个Task组成，且Task按照顺序执行，一个Task fail，则后续的Task都不会被执行。Task就是Script，用命令行对代码进行进行编译，部署，或者运行测试。


点击"Save + Edit Full Config"按钮，保存pipeline并进入pipeline的设置界面，可以看到，它是按照 pipeline(Auto)-> stage(Test) -> job(run_tests)的结构展示的，在job的Tasks tab中，也已经加上了我们上边设置的mvn test：
<img src="https://i.loli.net/2020/06/01/l2WCYqejKFuw9hX.png" >
首先打开Auto pipeline设置，在Materials Tab下，可以看到我们设置的远程仓库地址：
<img src="https://i.loli.net/2020/06/01/hguki5Ctl8zaHST.png" >
接着点击上边的Url, 进入Edit Material页面，给Material加上一个Destination Directory，然后保存。因为在运行pipeline的时候，Server会从远程仓库克隆代码到Agent上去运行，需要设置Destination Directory，Server就会把克隆的的代码放进这个Destination Directory里，所以它的名字一般就是代码库的名字：
<img src="https://i.loli.net/2020/06/01/1VJ6r2bRQI3BLOx.png" width="340" height="380" >
接着进入job设置页面，点击右边的Tasks Tab：
<img src="https://i.loli.net/2020/06/01/l2WCYqejKFuw9hX.png" >
点击Custom Command按钮，进入Edit Custom Command task页面。将Working Directory设为我们刚才添加的Destination Directory，然后保存：
<img src="https://i.loli.net/2020/06/01/pwLmgRn7GHTEFlC.png" width="340" height="430" >
到这里，Pipeline就已经创建好了。

### 运行pipeline
#### 运行成功

回到Pipeline首页, 点击Pause按钮，取消pipeline的暂停状态，取消之后pipeline就会自动运行了：
<img src="https://i.loli.net/2020/06/01/jAINYbglrB7HFd2.png" width="340" height="300">
<img src="https://i.loli.net/2020/06/01/MbOUDyBxQjirYHZ.png" width="340" height="300">
如果我们的代码没有问题，前面的设置也做好了的话，在运行过程中应该会跳出chrome/firefox窗口测试。pipeline就会运行成功了(绿色的标志)：
<img src="https://i.loli.net/2020/06/01/XugQEJG6SR8wylx.png" width="340" height="300">

#### console log和本地目录结构解读
点击绿色状态条进入运行结果界面，里面有当前代码库的版本号，作者，以及comment信息；还可以在右侧看到运行历史，以后多次运行的时候，也可以看到之前的运行结果：
<img src="https://i.loli.net/2020/06/01/CPNkGsM58eKozlv.png" >
点击上图中的job名称run_tests，可以看到本次运行的console log:
<img src="https://i.loli.net/2020/06/01/fHeIkUuWD9Ynhc3.png" >
观察console log我们可以理解pipeline的运行流程：

<span id="inline-toc">1.</span> Server开始准备并克隆代码到Agent
<img src="https://i.loli.net/2020/06/01/3bL6KV7ivwufAcX.png" >
上图中，Agent会生成Auto/1/Test/1/run_tests文件夹记录本次运行信息，然后，Server克隆远程代码到Agent对应的Pipeline文件夹下：
<img src="https://i.loli.net/2020/06/01/xghnt9A7YDJWC4l.png" >
第一次运行之后，Server将会持续check远程仓库中的代码更新，并自动运行Pipeline，这是它的默认机制。 
<span id="inline-toc">2.</span> 设置环境变量
<img src="https://i.loli.net/2020/06/01/BUsoWfS85gyjxvk.png" >
<span id="inline-toc">3.</span> 在Agent运行task
准备工作做好之后，Server就会把Job分配给Agent去执行，这里是build代码并执行命令 **mvn test** , 输出内容在本系列第一篇博客介绍Maven的时候已经给大家 [剖析过了](https://jmyblog.top/WebUI-AutoTest-Demo-1/#%E4%BD%BF%E7%94%A8Maven%E6%B5%8B%E8%AF%95%E9%A1%B9%E7%9B%AE) :
<img src="https://i.loli.net/2020/06/01/UMBKXvbWL9siulE.png" >
<span id="inline-toc">4.</span> Agent将运行结果报告给Server
<img src="https://i.loli.net/2020/06/01/R3enSwrBATx1zYE.png" >
Agent将记录本次运行信息的文件夹Auto/1/Test/1/run_tests，上传到本地Server文件夹下：
<img src="https://i.loli.net/2020/06/01/eObyG4WmvJHg9hP.png" >

    Artifact

Artifact是运行Job的产出物，在Agent生成，由Server接收并保存。存放在上图的 **artifact** 文件夹下。
比如此次运行中Agent生成的Auto/1/Test/1/run_tests文件夹，就是由Server接收保存的。它有一个保存运行日志console.log的cruise-output文件夹：
<a href="https://sm.ms/image/mv1zS4twIC7d6G8" target="_blank"><img src="https://i.loli.net/2020/06/01/mv1zS4twIC7d6G8.png" ></a>
运行结束之后，在页面上也可以看到它：
<img src="https://i.loli.net/2020/06/01/IgyWiRALq1Kfh3x.png" >

### 利用Custom Tabs展示测试报告

我们已经理解了Artifact的概念，知道它是在Agent生成，由Server接收并保存的。

>还记得我们在本系列第二篇博客中提到的 [TestNG测试报告](https://jmyblog.top/WebUI-AutoTest-Demo-2/#TestNG-Report) 吗？它也是在Agent生成的，这里我们就新建一个Artifact来让Server接收Agent生成的TestNG测试报告，并利用Custom Tabs将它展示在页面上。

回到首页，点击Auto的设置按钮：
<img src="https://i.loli.net/2020/06/01/hrjgN7QpREdlCwZ.png" width="340" height="300">
进入Job run_tests的Artifacts Tab, 添加一个Test Artifact:
<img src="https://i.loli.net/2020/06/01/9tJCNTMsRaGWxqV.png" >
<img src="https://i.loli.net/2020/06/02/r3DHx1Oz9tKXmqv.png" >
这里的Source就是指Artifact在Agent的生成路径，由于Agent的Working Directory是AutoTest文件夹，所以这里我们用Agent本地文件夹的绝对路径 **AutoTest/target/surefire-reports** 来获得测试报告。
没错，Maven的surefire插件会帮我们保存TestNG测试报告index.html:
<img src="https://i.loli.net/2020/06/01/xuiPTJvkBZ9Rpsw.png" >
Destination就是Server存放测试报告的路径，这里是相对路径。我们指定TestResult文件夹来保存测试报告，它比较完整的路径是 run_tests/TestResult，和上文中artifact文件夹下的run_tests/cruise-output是同一级。

保存之后，切换到Custom Tabs下，新建TestResult Tab，用来展示我们获取的index.html文件，路径 **TestResult/surefire-reports/index.html** ：
<img src="https://i.loli.net/2020/06/02/Mvn2PpYIl7DfOaK.png" >

保存，然后再次运行Pipeline:
<img src="https://i.loli.net/2020/06/01/bTX3FeNJ5hqHPZ4.png" width="340" height="300">
<img src="https://i.loli.net/2020/06/01/tuKZHPbk3hoUlFe.png" width="340" height="300">
运行完成之后，在console log可以看到Agent上传测试报告的过程，首先是把surefire-reports文件夹下的内容上传到Server的TestResult文件夹，然后还上传了Agent自己生成的index.html测试报告到系统默认的testoutput文件夹：
<img src="https://i.loli.net/2020/06/01/1x34XyBNoG25imq.png" >

在Artifacts Tab可以看到多了两个artifact文件夹，TestResult文件夹是我们添加的，testoutput文件夹是系统默认生成的，它们都是test artifact：
<img src="https://i.loli.net/2020/06/01/BY1ikDzFc4Rl8Hf.png" width="370" height="500">
图中一共有3个index.html文件，图片下方的index.html和testoutput/result文件夹里的index.html是Agent自己生成的测试报告，内容一致，默认会放在名为testoutput的Test Artifact文件夹里。展示在Test Tab下：
<img src="https://i.loli.net/2020/06/01/Lzy8UaEvg5HcIFu.png" >
TestResult Tab里展示的是我们指定的surefire文件夹下的index.html文件：
<img src="https://i.loli.net/2020/06/01/odCli5zbFgDXpHN.png" >



### 其它的pipeline设置
以上都是最基本的GoCD使用，它还有很多比较高端的设置，这里再举几个例子。
<span id="inline-toc">1.</span> Label Template
pipeline的build number可以自己配置，默认是1/2/3。实际项目中，build number一般会表示特定的含义，比如版本号等等：
<img src="https://i.loli.net/2020/06/02/JNd7UVsXEutA2qy.png" >
<span id="inline-toc">2.</span> Timer Settings
可以设置触发Pipeline的运行时间，有固定的语法，比如 ‘0 0 10 ? * MON-FRI’ 就是让pipeline在周内每天早上10点整运行：
<img src="https://i.loli.net/2020/06/02/MY8bkZ7LoXTAVtz.png" >
<span id="inline-toc">3.</span> Agent的Resource标签
当有多个Agent时，可能每个Agent有不同的配置，不同的空间大小，根据Agent的不同，可以通过设置Resource标签指定Job在某一类的Agent上执行：
<img src="https://i.loli.net/2020/06/01/KOsPSIf9gWkwGYD.png" >



## 参考资料
- [Maven + TestNG + Jenkins搭建自动化测试框架](https://www.jianshu.com/p/28b7ae892ed1)
- [DevOps 元素周期表](https://devops.phodal.com/home)
- [阮一峰：CI&CD是什么](http://www.ruanyifeng.com/blog/2015/09/continuous-integration.html)