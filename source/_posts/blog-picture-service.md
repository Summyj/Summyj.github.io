---
title: Github+jsDelivr创建个人图床
date: 2021-11-19 09:49:24
update: 2021-11-19 09:49:24
tags: [图床, Github, jsDelivr, CDN]
categories: 维护小破站
copyright: true
description: 啧，太香了。
top:
---

<img src="https://cdn.jsdelivr.net/gh/Summyj/blogImageCDN@1.1/images/blog-picture-service/1.jpg" >

## 关于图床

俗话说「无图言X」，图片就相当于博客的灵魂，非常重要。

在Hexo博客里插入图片，一般用html和markdown两种格式，指定图片路径之后才能展示在页面上，这里又有两种方式：
- 图片保存在Github代码仓库，直接指定仓库里的图片路径来访问。
- 图片上传到「图床」，获取图片外链，用外链来展示图片。

Github单个仓库的容量限制在1G左右，所以把图片保存在代码仓库，不但占用资源，而且由于GithubPages是国外服务，在国内访问加载慢，容易导致图片挂掉。

所以用图床服务，是明智的选择。一个好的图床，应该保证图片在国内外访问的稳定性，而且还能做一个图片仓库，保存博客的图片，起到文件备份的作用。

然而，同时满足这两个要求的图床，都是收费的，而且要做域名备案，比如七牛云等；作为一个怕麻烦的穷逼，这显然不是我的option，年少无知的时候用过七牛云，没想到用的只是一个测试外链，结果期限一到图片全挂了，真是血的教训。

之后我一直都用的免费图床，比如微博图床、PicGo等等，但各有各的槽点，写这篇文章之前我用的是 [SM.MS](https://sm.ms/)，使用很方便，虽然加载速度尚可，可有时图片也会挂，而且它无法做文件备份，所以一直以来我的博客图片都像在裸奔，十分没有保障。

今天终于有闲暇再折腾图床了，然后我就发现了Github+jsDelivr的图床创建方式。

## Github+jsDelivr

- Github: 谁人不知
- [jsDelivr](https://www.jsdelivr.com/): 一个开源、免费的CDN工具

{% note info %}
简而言之，就是说在Github上创建一个专门用来保存博客图片的仓库，把图片的github链接传给jsDelivr，生成一个CDN图片外链，然后再插入到博客里。
这样，就生成了自己的图床，图片上传到github，文件备份可以放心了；访问图片时有jsDelivr做CDN加速，速度也ok了，它不香吗？
虽然图片还是保存在github仓库，有1个G的容量限制，但且不说博客图片啥时候才能到1个G，就算1个G，还可以再新建一个github库来存。
{% endnote %}

具体做法请直接看参考文章第一篇，人说的挺清楚了，我就不啰嗦了。


## 参考文章

- [免费CDN：jsDelivr+Github 使用方法](https://zhuanlan.zhihu.com/p/76951130)
- [一次艰难的图床选择经历(MWeb+PicGo+Github)](https://www.jianshu.com/p/a200f116c3ce)

## 更新

一点都不香了！！！这个有50M的限制。。。到了图片就访问不了了：

![不香了](https://s2.loli.net/2022/05/28/8Qm2D7XIKtTJcey.png)

所以目前还是用回 [SM.MS](https://sm.ms/) ，现在有Dashboard可以管理图片了：

![DashBoard](https://s2.loli.net/2022/05/28/Zt68ySuJb9YOhpD.png)

还有5G的存储，也算靠谱了：

![5GLimit](https://s2.loli.net/2022/05/28/pu3Be61SJDdrf9j.png)
