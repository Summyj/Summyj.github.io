---
title: 博客Next主题升级
date: 2021-06-16 10:46:28
update: 2021-06-24 10:46:28
tags: [next-theme, theme-next]
categories: [维护小破站]
copyright: true
description: 返璞归真式主题升级。
top:
---

## 事情是这样的

前几天在优化博客的浏览体验，过程中参考了一些同道博客，发现他们在聊Next主题的v8版本。因为我也用的是这个主题，但我只更新到了v7.8版本，而且浏览了官网，最新的就是v7.8版本，引起了我的疑惑🤔，然后就开始了解惑和升级之路。

## 解惑：theme-next&next-theme

我目前用的是 [theme-next](https://github.com/theme-next/) 团队提供的Next主题，最新的是我在用的v7.8版本：
![theme-next-v7.8](https://i.loli.net/2021/06/25/h54FWYfywklibjV.png)

浏览了同道博客，发现他们用的是 [next-theme](https://github.com/next-theme) 团队提供的Next主题，最新版本确实是v8.x：
![next-theme-v8](https://i.loli.net/2021/06/25/lpjf4UEsiXhkW8M.png)

那么问题来了，同一个主题为什么有两个团队在维护呢？作为一个合格的吃瓜群众🍉，我嗅到了一丝不寻常的气息，果然，有疑惑的不止我一个人：
![同样疑惑的吃瓜群众](https://i.loli.net/2021/06/25/5fkAD2LBXtCyWux.png)

紧接着我就找到了答案：
![原来是一场神仙打架](https://i.loli.net/2021/06/25/oliLXKknhpUQG51.png)

好了，疑惑没有了，虽然已经完成了对当前使用主题的一些优化，但为了与时俱进，还是决定使用新团队开发的Next主题，当然，我心中对大佬们的敬畏是一样的😂

## 升级之路

首先git clone新的 [next仓库](https://github.com/next-theme/hexo-theme-next) ，通读了read me，然后按照同道文章进行更新，参考了：[Hexo Next 主题 V7 升级 V8 记录](https://asurada.zone/post/Update-Next-From-V7-To-V8/)

### 修改配置文件

#### 基础配置

关于配置文件，新团队提出了 [Alternate Theme Config 存储配置](https://hexo.io/docs/configuration.html#Alternate-Theme-Config) 的概念，简单来说就是推荐两种方式存放主题配置文件：

1. 在博客根目录创建一个_config.next.yml 文件，将next主题的配置迁移到这里，然后在博客配置文件_config.yml里指向这个配置文件。
2. 直接在博客配置文件_config.yml里添加next主题的所有配置，在一个文件里同时管理博客配置和主题配置。

我参考的同道文章中使用的就是第一种方式，但我尝试之后，还是觉得之前配置方式(在主题目录和博客根目录管理各自的_config.yml)比较适合我，因为我只有一个主题，而且我一直都是这么做的，已经习惯了，所以上面两种我都不采取。

于是按照之前的做法，对比新旧next主题配置，直接更改 **next/_config.ym**l 里的内容，从上到下依次改动了：

{% note info %}
- 切换到Mist主题
- 修改网站图标
- 打开博文copyright
- 添加菜单栏
- 修改头像，打开圆角和旋转效果
- 添加社交链接
- 添加友链
- 修改网站底部信息
- 打开标签图标
- 开启博客赞赏并添加收款码
- 开启代码库复制按钮
- 开启浏览进度header bar
- 修改字体
- 开启图片fancybox和lazyload
- 开启livere评论
- 开启chatra chat
{% endnote %}

#### 高亮功能

这些配置大部分都只是把 next/_config.yml 文件里的toggle打开，把false改成true而已，非常方便，没什么可讲的。但有两个功能我觉得可以高亮一下，它们是：

{% label success@图片的fancybox功能 %}

开启fancybox只需要在_config.xml里搜索fancybox，然后将false改成true就可以了，简单到不可置信。之后就可以点开博客里的图片，而且还能切换查看上下图、幻灯片播放、查看图片列表，而且还可以看到图片下方的描述，简直了，什么神仙功能，大佬们太棒了❤️：

![fancybox](https://i.loli.net/2021/06/25/iMc3p7a8WSoGsdQ.png)

{% label success@chatra chat %}

事实上，之前使用的next主题也有这项配置，但一直没深入研究，不过这次使用之后也觉得超级方便！开启chatra chat只需要在_config.xml里搜索Chat Services，之后开启chat button展示，接着去chatra官网注册账号，把id加上就可以了，官网和找id的路径也在文件里注释了：

![开启chatra chat](https://i.loli.net/2021/06/25/yVWdFzJloPquMt9.png)

chatra官网中也可以进行个性化配置，包括默认回复的信息，展示文本等等：

![自定义弹窗展示文本](https://i.loli.net/2021/06/25/ikAVf1JdjSrOxYs.png)
![自定义用户信息表单](https://i.loli.net/2021/06/25/J1F2fexgbtGrQ8I.png)
![自定义默认回复信息](https://i.loli.net/2021/06/25/ykLIPbEMOqUQT3s.png)

至于使用成本，自注册之日起，会赠送10天的pro套餐，10天之后会回到免费套餐，但这并不影响简单使用，基本的聊天功能还是会支持的，所以还是推荐使用：
![价格信息](https://i.loli.net/2021/06/25/K7Sug1ksNRw8WyM.png)

Chat Services里列出的其它Chat服务tidio和gitter我也试了，但tidio貌似需要科学上网，gitter貌似只能群聊，隐私感体验较差，所以还是选择了chatra。

### 个性化设置

到这里，基本的配置就ok了，然而我之前还给主题加了一些 [个性化设置](https://jmyblog.top/BlogUpdateNote/?highlight=%E5%8D%87%E7%BA%A7#%E4%B8%AA%E6%80%A7%E5%8C%96%E8%AE%BE%E7%BD%AE) ，但这次不打算添加太多了，只留下一些必要的就可以，返璞归真。

{% label success@博客宠物 %}

首先就是我们博客右下角萌萌的小黑啦，依然是按照 [之前的文章](https://jmyblog.top/BlogUpdateNote/?highlight=%E5%8D%87%E7%BA%A7#%E5%8D%9A%E5%AE%A2%E5%AE%A0%E7%89%A9) ，在路径 /themes/next/layout/_layout.njk 尾部加上 **live2d()** 的标签就行。

{% label success@博客运行时间 %}

在博客底部加上运行时间真的很有仪式感，跳动的时间感觉博客是“活着的”，还是按照 [之前的文章](https://jmyblog.top/BlogUpdateNote/?highlight=%E5%8D%87%E7%BA%A7#%E7%BD%91%E7%AB%99%E5%BA%95%E9%83%A8%E8%BF%90%E8%A1%8C%E6%97%B6%E9%97%B4) 设置。

{% label success@校正livere评论的refer值 %}

之前由于livere评论的refer值不对，导致评论数据缺失，后来找回来并写了 [一篇文章](https://jmyblog.top/comments-comeback/) 讲述解决办法，所以还是按照这个解决办法，在路径 next/source/js/third-party/comments/livere.js 改动之后才能看到所有的评论数据:

{% codeblock lang:command %}
refer: 'jmyblog.top' + location.pathname
{% endcodeblock %}

## 升级后对比

新版Next主题内置了更多插件，只需要打开开关就能用，确实挺香的。这次升级我也把之前的Next_Gemini卡片式布局，切换到了现在的Next_Mist布局，博客展示更加返璞归真了，对比感觉还是现在的效果比较适合展示博客：

![之前是有点花里胡哨哈](https://i.loli.net/2021/06/24/ibkeCQwLaV9xsXd.jpg)

![现在沉稳多了](https://i.loli.net/2021/06/24/cHQjPZJUMAq5fta.png)

这段时间真折腾啊，又是升级博客服务，又是升级主题的，终于告一段落了，之后很长一段时间应该不会再有升级了。为了维护这个小破站，我真是操碎了心，接下来就是专注写作，多更新博客了。