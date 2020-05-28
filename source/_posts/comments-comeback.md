
---
title: 网站评论回家了
date: 2020-05-19 16:05:43
update: 2020-05-19 16:05:43
tags: [评论系统]
categories: 工具使用
copyright: true
description: 博客消失的评论终于找回来了。
top:
---

<img src="https://i.loli.net/2020/05/19/5qCbYiSNDszno3y.png" >

这张题图很能表示我现在激动的心情:laughing:

## 事情是这样的

{% note info %}
博客建立伊始，也就是2017年那个夏天，我就开始用livere评论系统。
后来出现过两次评论消失的情况，第一次是17/9，当时是因为改了博客的url，所以也就丢失了。
第二次不知道是啥时候，经常出现博客评论莫名消失的情况，所以只能在管理后台看到评论：
{% endnote %}

<img src="https://i.loli.net/2020/05/19/FO4KepHxIStEDLn.png" >

开始的时候觉得无所谓，后来时间长了，感觉评论还是挺重要的，否则老感觉博客没人访问一样冷冷清清:pensive:。
然后就开始搜解决办法，但好像没有遇到跟我相似情况的小伙伴，再加上工作忙(lan)慢慢这个事也就放下了。直到今天，我终于找回了我的评论。

## 解决

多亏了[这篇博客](https://vikifish.cn/2020/04/18/Hexo-theme-nexT-livere-comments-bug/#more)给出的解决办法：
{% note primary %}
其实第二次评论消失的原因是livere插件代码中的refer值设置问题。
refer是个参数，评论的添加与获取都是会带上这个参数的。而默认的refer值是根据当前页面的url来获取的，如果设置的不对，就会导致评论页面地址和网页实际地址不符合，因此文章的评论无法在页面显示。
所以改动插件代码(虽然以前的refer设置我也看不懂是个啥)：
{% endnote %}

<img src="https://i.loli.net/2020/05/19/sdVryhuHgqZnl15.png" >

我的评论就回来了！！！简直就是活生生的博客历史啊有没有，可以追溯到17年：
<img src="https://i.loli.net/2020/05/19/SrmgpshDyx3n7UV.png" >

但是第一次因为url改动而消失的评论(2017.9.11之前的)真的回不来了：
<img src="https://i.loli.net/2020/05/19/KCegVLdTGMYb7pO.png" >

所以，欢迎大家的热情评论呀～撒花花🎉🎉🎉

## 后续

突然发现livere不支持微信和QQ登录了，给官网发了消息在等回复。希望可以支持，否则就要考虑换个评论系统了，比如Valine啥的。
之前使用DaoVoice可以在线交流，很方便，但之前更新博客的时候不知道为毛一加上它，博客就不能显示，还在研究。。。
