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
### 代码标签

代码：
```C++  
{% codeblock lang:command %}
这是一行代码
{% endcodeblock %}
```
效果：
{% codeblock lang:command %}
这是一行代码
{% endcodeblock %}

### 文本居中标签
代码：
```C++  
{% cq %}
四郎，那年杏花微雨，你说你是果郡王。原来自那时起，一切便都是错的。
{% endcq %}
```
效果：
{% cq %}
四郎，那年杏花微雨，你说你是果郡王。原来自那时起，一切便都是错的。
{% endcq %}

### note标签

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

### label标签
_config 文件配置关键字：Label , 需要用的话把值设为true即可。

代码：
```C++  
{% label default@默认 %}
{% label primary@主要 %}
{% label success@成功 %}
{% label info@信息 %}
{% label warning@警告 %}
{% label danger@危险 %}
```
效果：
{% label default@默认 %}
{% label primary@主要 %}
{% label success@成功 %}
{% label info@信息 %}
{% label warning@警告 %}
{% label danger@危险 %}
