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
上篇博客我们已经完成了Demo Project的代码优化, 这篇文章我们就利用Jenkins和GoCD这两种工具来实现代码的CI&CD集成。
{% endnote %}

## CI&CD介绍
### 是什么
### 为什么
### 怎么做
#### Jenkins
#### GoCD


--------------------

{% note warning %}
接下来就要开始项目集成的配置了，这里我用的是之前做workshop时创建的AutoTest项目，不是前两篇文章给大家举例的Automation项目，因为之前已经配置完了，再来一遍比较麻烦。但没有关系，我们不会对代码做改动，流程都是一样的。
{% endnote %}

## 集成Demo project到Jenkins
完成后的效果，小太阳标志：
<img src="https://i.loli.net/2020/05/17/Q5FMxDSWvgNUoXB.png" >
首先把本地的DemoProject推送到Github，然后请直接按照 [这篇文章的Jenkins部分](https://www.jianshu.com/p/28b7ae892ed1) 设置，已经写的很详细了，主要包括：

<span id="inline-toc">1.</span> Jenkins安装：在本地8080端口运行Jenkins并设置管理员账号
>小知识：WAR(Web应用程序归档，英語：Web application archive)，也是一种Java归档，存储XML文件、Java类、JSP和Web应用程序中的其他文件。

<span id="inline-toc">2.</span> Jenkins配置：添加JDK和Maven
<span id="inline-toc">3.</span> Jenkins添加GitHub server：Github生成token并在github的DemoProject项目里添加本地Webhook
{% note info %}
这部分Payload URL里的Jenkins server IP就是你电脑的IP，可以通过**ifconfig**命令获得，在结果的最后一行。
{% endnote %}
<span id="inline-toc">4.</span> Jenkins新建并配置Maven项目：绑定Github的DemoProject
<span id="inline-toc">5.</span> Jenkins运行Maven项目并查看结果

## 集成Demo project到GoCD
完成后的效果，绿色的pipeline：
<img src="https://i.loli.net/2020/05/26/eKa2fnP1oMQB7WL.png" >



## 参考资料
- [Maven + TestNG + Jenkins搭建自动化测试框架](https://www.jianshu.com/p/28b7ae892ed1)