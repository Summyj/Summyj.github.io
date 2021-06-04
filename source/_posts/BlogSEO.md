---
title: 站点的SEO优化
date: 2020-04-23 15:53:13
update: 2020-04-23 15:53:13
tags: [SEO]
categories: [工具使用]
copyright: true
description: 博客内容是怎么推送到谷歌和百度搜索引擎的。
top:
---
<img src="https://i.loli.net/2020/04/23/MgrbW6S4h9tI1yf.png" width="600" height="400">

虽然博客一直都有做SEO优化，但经常忘记细节，所以需要写篇博客记录一下，以后可以温故知新。

## 百度SEO
### 站点管理平台
登录[百度站点管理平台](https://ziyuan.baidu.com/linksubmit/index)添加站点域名，然后验证站点。
验证站点有几种方式，包括下载文件验证，CNAME验证等，我做了CNAME验证：
<img src="https://i.loli.net/2020/04/23/CPt9byQOAZ8fDBV.png" >验证之后，就可以通过百度站点管理平台管理自己的网站了：
<img src="https://i.loli.net/2020/04/23/krGdctXzCf7hjxM.png" >

### 博客内容推送

{% note warning %}
由于Github对百度爬虫进行了屏蔽，因此百度是爬取不到Github上的页面的，如果你把网站也部署到了Coding上，那百度就可以抓取到。所以看下面的内容之前，需要确保网站部署到了coding。
{% endnote %}
在站点管理平台可以选择博客内容推送方式，自动和手动。自动推送有三种，我同时做了sitemap和主动推送(实时)两种方式。
<span id="inline-toc">1.</span> Sitemap推送方式
>站点地图即sitemap，是一个页面，上面放置了网站上需要搜索引擎抓取的所有页面的链接。站点地图可以告诉搜索引擎网站上有哪些可供抓取的网页，以便搜索引擎可以更加智能地抓取网站。

安装百度站点地图生成插件：
{% codeblock lang:command %}
npm install hexo-generator-baidu-sitemap --save
{% endcodeblock %}
在博客根目录config文件添加配置：
{% codeblock lang:command %}
baidusitemap:
  path: baidusitemap.xml
{% endcodeblock %}
然后执行{% label info@hexo g -d %}，public目录里就会生成baidusitemap.xml文件，这就是生成的站点地图。里面包含了网站上所有页面的链接，搜索引擎通过这个文件来抓取网站页面。同时检查线上是否能打开，这里是我的[baidusitemap.xml文件](https://jmyblog.top/baidusitemap.xml)。
然后提交线上链接到站点管理平台：
<img src="https://i.loli.net/2020/04/23/DwL9Xf8JmRWVoF6.png" >显示正常状态之后，Sitemap推送方式就安排上了。
<span id="inline-toc">2.</span> 主动推送(实时)方式
主动推送最为快速的提交方式，是被百度收录最快的推送方式。通过安装插件实现：
{% codeblock lang:command %}
npm install hexo-baidu-url-submit --save
{% endcodeblock %}
安装结束后在博客根目录config文件添加配置：
{% codeblock lang:command %}
baidu_url_submit:
  count: 5 				     ## 提交最新的五个链接
  host: www.93bok.com 	     ## 百度站长平台中注册的域名
  token: xxx	             ## 准入秘钥
  path: baidu_urls.txt 		 ## 文本文档的地址， 新链接会保存在此文本文档里
{% endcodeblock %}
一定要确保_config.yml文件中url的值和百度站长平台注册的域名相同，我的全都是https://jmyblog.top 
然后在config文件远程部署配置部分，加上：
{% codeblock lang:command %}
-  type: baidu_url_submitter	
{% endcodeblock %}
![image.png](https://i.loli.net/2021/06/03/iftVTs69SjhUZlc.png)
然后执行{% label info@hexo g -d %}，就可以实现每次部署自动推送文章啦：
<img src="https://i.loli.net/2020/04/23/Z2LcdRlzXjutg4h.png" width="400" height="200">
{% note info %}
推送原理：
新链接的产生， hexo generate 会产生一个文本文件，里面包含最新的链接
新链接的提交， hexo deploy 会从上述文件中读取链接，提交至百度搜索引擎
{% endnote %}

### 收录验证
输入{% label success@site: 域名 %}，如果能在搜索结果中看到你的网站内容，就说明百度收录成功啦：
<img src="https://i.loli.net/2020/04/23/kpSBwdDFtXmcbNJ.png" >

## Google SEO
### 站点管理平台
和百度一样，谷歌也有 [站点管理平台](https://search.google.com/search-console/sitemaps) (没有梯子请自备)，登录google账号之后同样添加站点域名，然后验证站点。
站点验证也有几种方式，下载文件验证，CNAME认证等等。由于我的CNAME认证失败，所以选择了下载文件验证，放在主题source文件夹即可，放在根目录应该也是可以的：
<img src="https://i.loli.net/2020/04/23/lVcSnUo2JhNYXgI.png" width="420" height="500">
然后执行然后执行{% label info@hexo g -d %}将新添加的文件推送到线上，点击验证，就可以通过谷歌站点管理平台管理自己的网站了：
<img src="https://i.loli.net/2020/04/23/bOoYU7w5SvIzZj9.png" >

### 博客内容推送
目前只做了sitemap推送方式，网上也大多是这种方式，不知道有没有其它方法。
安装谷歌站点地图生成插件：
{% codeblock lang:command %}
npm install hexo-generator-sitemap --save
{% endcodeblock %}
在博客根目录config文件添加配置：
{% codeblock lang:command %}
sitemap:
  path: sitemap.xml
{% endcodeblock %}
然后执行{% label info@hexo g -d %}，public目录里就会生成sitemap.xml文件，这里是我的[sitemap.xml文件](https://jmyblog.top/sitemap.xml)。
然后提交线上链接到谷歌站点管理平台：
<img src="https://i.loli.net/2020/04/23/W4Ud5el38Y7pXt2.png" >显示Success之后，Sitemap推送方式就安排上了.

### 收录验证
同样输入{% label success@site: 域名 %}，如果能在搜索结果中看到你的网站内容，就说明谷歌收录成功啦：
<img src="https://i.loli.net/2020/04/23/4GxXKmyO1bAc7PN.png" >

## 参考资料
[Hexo提交百度和Google收录站点](https://www.93bok.com/Hexo%E6%8F%90%E4%BA%A4%E7%99%BE%E5%BA%A6%E5%92%8CGoogle%E6%94%B6%E5%BD%95%E7%AB%99%E7%82%B9/)