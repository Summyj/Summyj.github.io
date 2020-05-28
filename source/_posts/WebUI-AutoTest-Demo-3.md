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
在下面的配置过程中，我用了之前做workshop时创建的AutoTest项目做例子，不是前两篇文章给大家举例的Automation项目，因为之前已经配置完了，再来一遍比较麻烦。但没有关系，我们不会对代码做改动，流程都是一样的。
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

## 参考资料
- [Maven + TestNG + Jenkins搭建自动化测试框架](https://www.jianshu.com/p/28b7ae892ed1)
- [DevOps 元素周期表](https://devops.phodal.com/home)
- [阮一峰：CI&CD是什么](http://www.ruanyifeng.com/blog/2015/09/continuous-integration.html)