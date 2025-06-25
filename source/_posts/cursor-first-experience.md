---
title: Cursor初体验
date: 2025-06-24 15:00:13
tags: [AI, Cursor]
categories: 维护小破站
copyright: true
description: 用Cursor实现博客史诗级增强。
top:
---

{% img https://s2.loli.net/2025/06/24/xwOI9LBYG3dghrT.png %}

{% note default %}
最近公司在推 **[Cursor](https://www.cursor.com/)** AI代码编辑器，全员都在用，不得不说，目前这种和AI共创的模式确实是行业趋势，之前各种 TDD/BDD/DDD 现在也都被 **PDD 取代(拼多多即视感，但全称是Prompt Driven Development)**，达到 **‘AI做杂活，人来思考’** 的效果。所以我觉得科学技术是第二生产力，人类的创造力才是第一生产力。
{% endnote %}

其实Cursor流行好久了，但我在技术方面一直处在潮流后沿，也没有机会尝试，正好我也想升级博客，调整一下浏览效果，就用Cursor试试(一些公器私用)，然后打开了新世界的大门。

## 版本升级
### Hexo

npm 更新 可以看到实时
### Next
sub module  下次升级再看 好像也没什么大用 （都没关注更新的主题自己有什么有意思的功能
这样的话都没必要再更新主题了 之前就是因为看看有什么优化 现在有ai优化

## Next
### AI自动同步
主题配置 之前自己对比 现在用ai自动同步 解决错误变成和线上一样的 配置同步 然后接着优化风格 加自定义功能
### 主题优化
文章主体部分 mudeiem风格 我和AI都不知道想要啥样 于是开始拉扯 甲方
### 徽章
徽章 初心很好 虽然付费 但是金额是自己填的 1美元 上传到了GitHub source 自取 有博主设置了ai生成的文章总结也许我希望每个看到我博客的人 都可以不用那么的“赶时间” 看完之后也能有自己的总结和想法
### 音乐播放器
### 去广告
### 搜索插件
### AI优化
代码结构优化 图片懒加载 文件压缩 等
### 本地浏览器自动加载预览

对我这种上一篇博文还在去年11月的博主来说，好像也用不上(地狱笑话)

实现一个具体的功能还是得问好几遍优化才能成功，比如这俩，所以prompt怎么问很重要

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

### 其他标签

在 [Hexo标签](https://hexo.io/docs/tag-plugins.html) 和 [Next内置标签](https://theme-next.iissnan.com/tag-plugins.html) 可以找到。


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