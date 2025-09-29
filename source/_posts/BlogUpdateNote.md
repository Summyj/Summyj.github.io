---
title: 升级博客，我太难了
date: 2019-12-02 13:52:15
update: 2019-12-02 13:52:15
tags: theme-next
categories: 维护小破站
copyright: true
description: 记录博客升级过程，方便以后参考。
top:
---

<img src="https://i.loli.net/2019/12/20/ONr3WMz74Rq5mBQ.png" alt="题图">
用Hexo和Next主题搭建博客已经两年多了，前段时间浏览一些其他小伙伴的博客，发现页面比我的好看许多。很多插件也都不适应了，遂更新一波。

# 咋升级 #

## 准备 ##

首先，来想一想都要更新什么。
第一个肯定是Hexo了。其次就是主题，我用的是Next。由于之前不仅更改了主题配置，还有一些插件和自定义配置改了源文件。最致命的是我已经忘记在哪改，改了啥了。所以：
<div class="note warning"><p>升级之前，先把博客备份一下，这样即使更新过程中出了问题，也不用怕。</p></div>

## 升级Hexo ##
博客根目录的package.json文件里，列出了hexo和一些依赖的版本(这是我已经升级过的)：
{% codeblock lang:json %}
{
  "name": "hexo-site",
  "version": "0.0.0",
  "private": true,
  "hexo": {
    "version": "4.0.0" ##当前Hexo版本
  },
  "dependencies": { ##各种插件版本
    "hexo": "^4.0.0",
    "hexo-algolia": "^1.3.1",
    "hexo-deployer-git": "^2.1.0",
    "hexo-filter-emoji": "^2.0.2",
    "hexo-generator-archive": "^1.0.0",
    "hexo-generator-baidu-sitemap": "^0.1.6",
    "hexo-generator-category": "^1.0.0",
    "hexo-generator-feed": "^2.1.1",
    "hexo-generator-index": "^1.0.0",
    "hexo-generator-searchdb": "^1.2.0",
    "hexo-generator-sitemap": "^2.0.0",
    "hexo-generator-tag": "^1.0.0",
    "hexo-helper-live2d": "^3.1.1",
    "hexo-leancloud-counter-security": "^1.4.1",
    "hexo-next-share": "github:theme-next/hexo-next-share",
    "hexo-renderer-ejs": "^1.0.0",
    "hexo-renderer-marked": "^2.0.0",
    "hexo-renderer-stylus": "^1.1.0",
    "hexo-server": "^1.0.0",
    "hexo-symbols-count-time": "^0.7.0",
    "hexo-wordcount": "^6.0.1",
    "live2d-widget-model-hijiki": "^1.0.5"
  }
}
{% endcodeblock %}
打开博客根目录，输入命令：
{% codeblock lang:command %}
npm outdated
{% endcodeblock %}
就会看到有哪些依赖和插件需要更新：
{% codeblock lang:command %}
Package              Current  Wanted  Latest  Location
hexo-filter-emoji      2.0.2   2.1.0   2.1.0  hexo-site
hexo-generator-feed    2.1.1   2.2.0   2.2.0  hexo-site
hexo-next-share        1.0.0     git     git  hexo-site
{% endcodeblock %}
修改package.json中对应条目的版本到最新版，比如将   "hexo-filter-emoji": "^2.0.2" 改成：   "hexo-filter-emoji": "^2.1.0"
然后保存修改，再输入命令保存更新并下载：
{% codeblock lang:command %}
npm install --save
{% endcodeblock %}
之后运行：
{% codeblock lang:command %}
hexo --version
{% endcodeblock %}
就可以看到当前hexo的版本已经到最新啦:v:
## 升级Next ##
之前Next的版本是**v5.x**, 而搜了下最新版已经到**v7.x**了。。。不过不慌，还是慢慢来:sunglasses:
### 官方文档 ###

>为了避免踩坑，先看[官方文档](https://github.com/theme-next/hexo-theme-next)肯定是个明智的选择。

跟随大佬的[指示](https://github.com/theme-next/hexo-theme-next/blob/master/docs/UPDATE-FROM-5.1.X.md)，Next主题v5.x之后更换了代码库。之前是原作者 iissnan's 的[个人仓库](https://github.com/iissnan/hexo-theme-next)，由于Next比较火，后来就成立了一个专门维护它的[组织](https://github.com/theme-next)。是一个很大的进步了，大佬们真棒。

代码库换了，那就不能用Git常规操作pull代码了。文档里给的建议是先不改动原有主题文件夹，将主题最新版本代码作为 {% label info@next-reloaded %} 单独克隆到themes/下边。在博客配置文件中，把主题设置为{% label info@next-reloaded %} 。然后就可以随时切换两个版本。

但我不是要切换呀，我是要更新啊，所以说之前所有的配置都得我自己手动去加去改了:sob: 可问题是我完全不记得自己都做了啥，万一改坏了怎么办:scream:于是Google一下，看看其他小伙伴有什么更好的操作，结果并没有发现更简单的方法，只能手动改了。

### 更改配置文件完成基础设置  ###

新版本的配置文件里，将之前许多格式做了改动，所以要按照新的格式来。
对比V5.x版本，新的Next主题将之前许多个性化的设置全都加到了配置文件里，只需打开开关即可，很好用。。
这样改完之后，博客基本上与之前一致了。

### 个性化设置 ###

#### 评论系统 ####
之前一直用的来必力，加载速度还可以。而且有评论时也会给我发邮件。直接在主题配置文件搜索“# LiveRe comments system”然后加上id就好了。

#### 文章浏览次数
这个以前用的是leancloud，也只需要加上id就好，不过这次加上之后并没有显示效果，而且console log报错：
<img src="https://i.loli.net/2019/12/03/prXyGdDzATYfIe5.png" alt="error">
不知道怎么解决，准备在github提issue，所以先弃用了。

#### Daovoice在线联系 ####
有很多小伙伴时通过Daovoice直接联系我的，这个也可以关注微信公众号接收消息。然而这次加上之后，导致博客页面空白，直接访问不了，console log也报错：
<img src="https://i.loli.net/2019/12/03/Hzag9KbwrZxIoRv.png" alt="error">
开始没定位到是这个的问题，找了好久。。。在网上搜也没找到解决办法，反正博客也有评论系统可以联系小伙伴，遂先弃用。

#### 博客宠物
就是右下角萌萌的小黑啦。
之前也已经下载 "hexo-helper-live2d" 和 "live2d-widget-model-hijiki"这两个依赖，在图中路径加上标记：
<img src="https://i.loli.net/2019/12/03/McVxzk9ivZfWGyX.png" alt="config">
然后在博客(非主题)配置文件加上下面的配置：
{% codeblock lang:command %}
#pet
live2d:
  enable: true
  scriptFrom: local
  pluginRootPath: live2dw/
  pluginJsPath: lib/
  pluginModelPath: assets/
  tagMode: true
  debug: false
  model:
    use: live2d-widget-model-hijiki ## 宠物依赖包的名字
  display:
    position: right ## 出现位置
    width: 150
    height: 300
  mobile:
    show: true
{% endcodeblock %}
之前小黑猫没显示，就是因为没有下载对应的宠物依赖包。所以要仔细看 live2d 的 README 呀。

#### 文章分享
新加入了分享文章的插件AddThis, 挺好用的。按照[这里的说明](https://www.addthis.com)配置就好了。然后把id加在配置文件里。

#### 网站底部运行时间
个人认为加上网站的运行时间还是很有意义的，看着博客已经运行这么多天，有种自豪感嘿嘿。
参考[这篇文章](https://ldgyyf.cn/2019/05/15/Hexo/%E4%B8%8D%E8%92%9C%E5%AD%90%E8%AE%BF%E5%AE%A2%E4%BA%BA%E6%95%B0%E7%BB%9F%E8%AE%A1%E5%92%8C%E5%8D%9A%E5%AE%A2%E8%BF%90%E8%A1%8C%E6%97%B6%E9%97%B4%E6%98%BE%E7%A4%BA/)完成的。
<img src="https://i.loli.net/2021/04/28/rjxPnYqmUCkwAv7.png" >

#### 酷炫标签云
根据插件[github说明](https://github.com/MikeCoder/hexo-tag-cloud/blob/master/README.ZH.md)配置就好了。
下载：
{% codeblock lang:command %}
npm install hexo-tag-cloud
{% endcodeblock %}

之后操作：

<img src="https://i.loli.net/2021/04/28/ZJfLhzbVkKuMnqa.png" >

 ```js
{% if site.tags.length > 1 %}
<script type="text/javascript" charset="utf-8" src="{{ url_for('/js/tagcloud.js') }}"></script>
<script type="text/javascript" charset="utf-8" src="{{ url_for('/js/tagcanvas.js') }}"></script>
<div class="widget-wrap">
    <h3 class="widget-title">Tag Cloud</h3>
    <div id="myCanvasContainer" class="widget tagcloud">
        <canvas width="250" height="250" id="resCanvas" style="width:100%">
            {{ list_tags() }}
        </canvas>
    </div>
</div>
{% endif %}
 ```

#### 背景图片
给博客加上一个背景图片。
网上很多教程都是在_custom.styl文件设置的，但新版本已经没有这个文件了，后来看了[更新说明](https://github.com/theme-next/hexo-theme-next/issues/1217)，里面有提到怎么把旧版本的所有自定义设置迁移到新版本，所以跟着人家说的设置就好了。
先在博客根目录下的Source文件夹里新建{% label info@_data %}文件夹，然后再创建{% label info@styles.styl %}文件，添加内容：
{% codeblock lang:command %}
body {
  background:url(你想加的背景图片url);
  background-attachment: fixed; //固定图片位置
  opacity: 0.9; //透明度设置
}
{% endcodeblock %}
之后在博客配置文件搜索关键字{% label info@custom_file_path %}去掉 style 的注释就好啦。

#### 侧边栏和首页文章圆角显示
{% note info %} 
“在大部分人的审美中，有弧度的圆角总是比没弧度的直角好看许多”
{% endnote %}

打开themes/hexo-theme-next/source/css/_variables/对应的scheme.styl文件，作如下修改：
{% codeblock lang:command %}
// 修改主题页面布局为圆角
$border-radius-inner            = 15px 15px 15px 15px;
$border-radius                  = 15px;

// 阅读全文按钮为圆角
$btn-default-radius           = 16px
$btn-default-bg               = white
$btn-default-color            = $text-color
$btn-default-border-color     = $text-color
$btn-default-hover-color      = white
$btn-default-hover-bg         = $black-deep
{% endcodeblock %}

#### 友情链接页面

参照 [这篇文章](https://blog.guanqr.com/study/blog/hexo-theme-next-customization/#%E6%B7%BB%E5%8A%A0%E5%8F%8B%E6%83%85%E9%93%BE%E6%8E%A5%E9%A1%B5%E9%9D%A2)设置的。

在 /themes/next/layout/ 目录下新建一个 links.swig 文件，内容和之前一样。
<img src="https://i.loli.net/2021/04/28/a2fDPAzZm7tFpes.png" >
<img src="https://i.loli.net/2021/04/28/HolOS3LvVzQ19ca.png" >

#### 改了下button的样式

<img src="https://i.loli.net/2019/12/20/YbyF2TEIoC6t187.png" alt="button css">
<img src="https://i.loli.net/2019/12/20/Kvh4otZz852yPWx.png" alt="button css">

#### 站点概览加了个音乐链接


Path: {% label info@themes/next/layout/_partials/sidebar/site-overview.swig %}

#### 右上角站点背景改颜色

Path: {% label info@themes/next/source/css/_schemes/Pisces/_header.styl %}
颜色可以自己改
{% codeblock lang:command %}
.site-meta {
  background-image: linear-gradient(to right, #db7093, #20B2AA, #4169E1);
}
{% endcodeblock %}

还需要改一下padding值：
<img src="https://i.loli.net/2021/04/28/icDvnY3fIPuWZAQ.png" >

手机端样式优化：
<img src="https://i.loli.net/2021/04/28/7ozZp239LEPDhW6.png" >
<img src="https://i.loli.net/2021/04/28/zZTBuPS6Hxt3AlF.png" >
<img src="https://i.loli.net/2021/04/28/JZWvNnXgEe9YTOV.png" >

#### 网站底部颜色修改
<img src="https://i.loli.net/2021/04/28/xv8WgPJUNjnb1uC.png" >
<img src="https://i.loli.net/2021/04/28/YnCLeHo73NMJ8gr.png" >

#### 修改主题页面宽度

路径：next/source/css/_schemes/Gemini/index.styl
{% codeblock lang:command %}
//page width start
header{ width: 70% !important; }
header.post-header {
  width: auto !important;
}
.container .main-inner { width: 70%; }
.content-wrap { width: calc(100% - 260px); }

.header {
  +tablet() {
    width: auto !important;
  }
  +mobile() {
    width: auto !important;
  }
}

.container .main-inner {
  +tablet() {
    width: auto !important;
  }
  +mobile() {
    width: auto !important;
  }
}

.content-wrap {
  +tablet() {
    width: 100% !important;
  }
  +mobile() {
    width: 100% !important;
  }
}
//page width end
{% endcodeblock %}


# 后续的更新 #

以后的更新应该就能用Git进行操作啦，毕竟换库太可怕了。

# 参考文章 #
- [将 Hexo 升级到 v3.5.0](https://tommy.net.cn/2018/02/26/upgrade-hexo-to-v3-5-0/)
- [Hexo NexT 6升级笔记](https://www.jianshu.com/p/e211e9119522)
- [Hexo博客建立标签云及效果展示](https://vic.kim/2019/05/23/Hexo%E5%8D%9A%E5%AE%A2%E5%BB%BA%E7%AB%8B%E6%A0%87%E7%AD%BE%E4%BA%91%E5%8F%8A%E6%95%88%E6%9E%9C%E5%B1%95%E7%A4%BA/)
- [hexo next主题优化，打造个人精致网站](http://eternalzttz.com/hexo-next.html)
- [Hexo-NexT 主题个性优化](https://blog.guanqr.com/study/blog/hexo-theme-next-customization/)