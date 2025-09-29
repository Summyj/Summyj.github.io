---
title: 给博客的Https证书续期
date: 2020-07-30 21:23:05
update: 2020-07-30 21:23:05
tags: [Https]
categories: 维护小破站
copyright: true
description: 道路千万条，安全第一条。
top:
---

<img src="https://i.loli.net/2020/08/01/R4f1SvM9Q6wNID3.png" >

## 事情是这样的

前几天突然发现博客的Https证书失效了，网站又被标记成了{% label danger@不安全 %}。

找到了之前写过关于申请证书的[文章](https://jmyblog.top/SiteBrokenFix/)，发现是在coding pages里申请的证书：

<img src="https://i.loli.net/2020/04/23/Skv28M5PJiC1Fwo.png" >

之前的证书状态正常，现在进去一看，证书状态已经失效了。点了页面上重新申请的按钮，结果申请失败。

网上搜索了下报错信息，我果然不是一个人，但大家的情况又跟我不一样，所以一时也没找到合适的解决办法。

这个时候突然发现自己之前写的文章有这么一句话：

    一开始SSL证书申请失败，后来按照网上的解决方案去域名解析把GitHub解析暂停就申请成功了。

好像之前遇到过申请失败的问题，所以按照这个操作，先去把GitHub解析暂停，再点击申请证书，这下成功了，刷新了下博客，证书的有效期已经更新到10月底了：

<img src="https://i.loli.net/2020/07/30/aLlXtRmycKpk2Ji.png" >

我得意的笑 :grin:

## 知其所以然

问题是解决了，但是作为一个好学的孩子，不但要知其然，还要知其所以然。

首先，Coding Pages给我们申请的证书有效期是三个月，是由 [Let's Encrypt](https://letsencrypt.org/zh-cn/getting-started/) 签发的，它是国外一个免费的证书颁发机构（CA）。

{% note info %}
Let's Encrypt的官网说：

要从 Let’s Encrypt 获取您网站域名的证书，您必须证明您对域名的实际控制权。您可以在您的 Web 主机上运行使用 ACME 协议的软件来获取 Let’s Encrypt 证书。
{% endnote %}

这个意思简单，就是说你得证明这个域名是你的，我们才给你发证书。那咋证明呢？其实也简单，只要Let’s Encrypt能在国外通过访问站点获得域名验证信息，就能验证域名所有权了。

但是根据我的域名解析设置，Coding Pages的解析线路是默认，Github Pages解析线路是境外，所以根据域名解析规则，{% label primary@Let's Encrypt在国外只能访问到Github Pages的域名验证信息，而无法访问Coding Pages的域名验证信息。 %}
所以Coding Pages在帮我们申请证书时，就无法通过Let's Encrypt的域名验证，证书也就申请不到了：

<img src="https://i.loli.net/2020/04/23/RPNsrEyMSUV9uD1.png" >

所以这就是为什么用Coding Pages申请证书时，需要先把Github Pages的解析暂停掉了。不过别忘了证书申请成功之后，再把Github Pages的解析重新启动哦。

## 参考资料

<span id="inline-toc">1.</span> [Github+Coding国内外博客双线部署并支持全站https](https://zwen.net/githubcodingblog.html)
<span id="inline-toc">2.</span> [hexo 托管到coding，pages申请ssl/tls证书失败](https://blog.csdn.net/dataiyangu/article/details/83374438)

