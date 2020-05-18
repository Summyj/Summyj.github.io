---
title: WebUI自动化测试框架Demo(下)
date: 2020-05-17 15:05:47
update: 2020-05-15 15:05:47
tags: [自动化测试]
categories: [学习小记]
copyright: true
description: 利用Jenkins和Github实现Demo Project的CI集成。
top:
---

<a href="https://sm.ms/image/Nmv3zSFWsTljeZn" target="_blank"><img src="https://i.loli.net/2020/05/15/Nmv3zSFWsTljeZn.png" ></a>

## Jenkins介绍

GoCD

## Demo project 集成
首先把本地的DemoProject推送到Github，然后请直接按照参考资料的Jenkins部分设置，已经写的很详细了，主要包括：
<span id="inline-toc">1.</span> Jenkins安装：在本地8080端口运行Jenkins并设置管理员账号
>小知识：WAR(Web应用程序归档，英語：Web application archive)，也是一种Java归档，存储XML文件、Java类、JSP和Web应用程序中的其他文件。

<span id="inline-toc">2.</span> Jenkins配置：添加JDK和Maven
<span id="inline-toc">3.</span> Jenkins添加GitHub server：Github生成token并在github的DemoProject项目里添加本地Webhook
{% note info %}
这部分Payload URL里的Jenkins server IP就是你电脑的IP，可以通过**ifconfig**命令获得，在结果的最后一行。
{% endnote %}
<span id="inline-toc">4.</span> Jenkins新建并配置Maven项目：绑定Github的DemoProject
<span id="inline-toc">5.</span> Jenkins运行Maven项目并查看结果
这里是我的Jenkins，已经有小太阳啦：
<a href="https://sm.ms/image/Q5FMxDSWvgNUoXB" target="_blank"><img src="https://i.loli.net/2020/05/17/Q5FMxDSWvgNUoXB.png" ></a>


## 参考资料
- [组织workshop同事的博客](https://www.jianshu.com/p/28b7ae892ed1)