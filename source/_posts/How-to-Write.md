---
title: Hexo的一些写作标签
date: 2019-12-05 15:55:44
update: 2019-12-05 15:55:44
tags: [Hexo, Markdown]
categories: 工具使用
copyright: true
description: 整理一下Hexo和Next主题的写作标签，省的写的时候忘了。
top:
---

<img src="https://i.loli.net/2019/12/20/KfeTtUqLu93cMpN.png" alt="button css">

## Hexo/Next 标签

### 代码

效果：
{% codeblock lang:command %}
这是一行代码
{% endcodeblock %}

代码：
```C++  
{% codeblock lang:command %}
这是一行代码
{% endcodeblock %}
```

### 文本居中

效果：
{% cq %}
四郎，那年杏花微雨，你说你是果郡王。原来从那时起，一切便都是错的。
{% endcq %}

代码：
```C++  
{% cq %}
四郎，那年杏花微雨，你说你是果郡王。原来从那时起，一切便都是错的。
{% endcq %}
```

### note

效果：
{% note default %}
default
{% endnote %}
{% note primary %}
primary
{% endnote %}
{% note success %}
success
{% endnote %}
{% note info %}
info
{% endnote %}
{% note warning %}
warning
{% endnote %}
{% note danger %}
danger
{% endnote %}

_config 文件配置关键字：note, 我的配置如下：
{% codeblock lang:command %}
style: flat
icons: true
border_radius: 3
{% endcodeblock %}

代码：
```C++  
{% note default %}
default
{% endnote %}
{% note primary %}
primary
{% endnote %}
{% note success %}
success
{% endnote %}
{% note info %}
info
{% endnote %}
{% note warning %}
warning
{% endnote %}
{% note danger %}
danger
{% endnote %}
```

### label
_config 文件配置关键字：Label , 需要用的话把值设为true即可。
效果：
{% label default@默认 %}
{% label primary@主要 %}
{% label success@成功 %}
{% label info@信息 %}
{% label warning@警告 %}
{% label danger@危险 %}

代码：
```C++  
{% label default@默认 %}
{% label primary@主要 %}
{% label success@成功 %}
{% label info@信息 %}
{% label warning@警告 %}
{% label danger@危险 %}
```
### Tabs
效果：
{% tabs emoji %}
<!-- tab -->
:smile:
<!-- endtab -->
<!-- tab -->
:laughing:
<!-- endtab -->
<!-- tab -->
:relaxed:
<!-- endtab -->
{% endtabs %}


### 引用句子

代码：
```C++  
{% blockquote 王小波 http://www.bwsk.com/xd/w/wangxiaobo/hjsd/index.html 黄金时代 %}
那一天我二十一岁，在我一生的黄金时代。我有好多奢望。我想爱，想吃，还想在一瞬间变成天上半明半暗的云。
{% endblockquote %}
```

效果：
{% blockquote 王小波 http://www.bwsk.com/xd/w/wangxiaobo/hjsd/index.html 黄金时代 %}
那一天我二十一岁，在我一生的黄金时代。我有好多奢望。我想爱，想吃，还想在一瞬间变成天上半明半暗的云。
{% endblockquote %}

## 自定义标签
### 数字块
参考 [这个](https://blog.guanqr.com/study/blog/hexo-theme-next-customization/#%E6%95%B0%E5%AD%97%E5%9D%97) 设置。

效果：
<span id="inline-toc">1.</span>
<span id="inline-toc">2.</span>
<span id="inline-toc">3.</span>


## 参考文章
<span id="inline-toc">1.</span>[Hexo-NexT 主题个性优化](https://blog.guanqr.com/study/blog/hexo-theme-next-customization)
<span id="inline-toc">2.</span>[Hexo-Next搭建个人博客（主题优化）](https://yfzhou.coding.me/2018/08/27/Hexo-Next%E6%90%AD%E5%BB%BA%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2%EF%BC%88%E4%B8%BB%E9%A2%98%E4%BC%98%E5%8C%96%EF%BC%89/)