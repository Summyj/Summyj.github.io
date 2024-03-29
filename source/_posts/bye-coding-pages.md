---
title: CodingPages的真面目
date: 2022-01-23 21:33:13
update: 2022-01-23 21:33:13
tags: [CodingPages, 腾讯云]
categories: 维护小破站
copyright: true
description: 使用腾讯云Serverless服务。
top:
---

<img src="https://cdn.jsdelivr.net/gh/Summyj/blogImageCDN/images/bye-coding-pages/0.jpeg" >

## CodingPages停服

CodingPages是一个国内的静态网站托管服务，与GithubPages类似，我在最开始搭建博客时就在用，它可以加速博客内容在国内的访问，同时由于GithubPages不能被百度爬虫，所以CodingPages作为替代品，可以方便进行百度收录，实现博客在国内的SEO。

去年就折腾过一次博客的 [Pages服务](https://jmyblog.top/PageServiceUpdate/) ，那时得知CodingPages被腾讯云收购了，也在腾讯云做了一些配置，让博客还能使用CodingPages。
前段时间我发现在晚上经常打不开博客内容，就算是GithubPages不稳定吧，可既然有CodingPages理论上不应该如此，但也没深究，也有小伙伴联系我说CodingPages的事，还推荐了gitee，我也依然不置可否：

<img src="https://cdn.jsdelivr.net/gh/Summyj/blogImageCDN/images/bye-coding-pages/6.jpg" height=500 width=250 alt="博客来访者的吐槽">

直到收到了CodingPages停服的消息：

<img src="https://cdn.jsdelivr.net/gh/Summyj/blogImageCDN/images/bye-coding-pages/5.jpg" height=300 width=240 alt="停服短信"> 

害，看来必须得搞一波了，首先进入Coding的项目详情，果然已经没了「静态网站」的入口，只能去腾讯云看看了。

## 腾讯云Serverless
### Serverless控制台

按照短信提示进入腾讯云Serverless控制台，发现了之前配置好的两个静态网站应用，其中，「Summyj.coding.me」是我在CodingPages的初始应用，「谁把钱丢了」是上次升级后的应用，也是停服之前在用的：

<img src="https://cdn.jsdelivr.net/gh/Summyj/blogImageCDN/images/bye-coding-pages/2.jpg" >

打开之前升级好的应用，发现开发部署和日志这两项置灰了，看不了细节：

<img src="https://cdn.jsdelivr.net/gh/Summyj/blogImageCDN/images/bye-coding-pages/4.jpg" >

没办法，只能重新搞了，但我对腾讯云的这个服务又不熟悉，所以搜了下 [咋用](https://github.com/serverless-components/tencent-website)，发现跟CodingPages的服务差不多，不难理解。

### 新建应用

所以直接开整，新建一个应用，依次是：

<img src="https://cdn.jsdelivr.net/gh/Summyj/blogImageCDN/images/bye-coding-pages/10.jpg" alt="选择静态网站">
<img src="https://cdn.jsdelivr.net/gh/Summyj/blogImageCDN/images/bye-coding-pages/11.jpg" alt="基础配置">
<img src="https://cdn.jsdelivr.net/gh/Summyj/blogImageCDN/images/bye-coding-pages/7.jpg" alt="选择代码托管">

保存之后就开始自动部署应用，然后就能用腾讯云分配的 [二级域名](https://jmyblog-top-1306110219.cos-website.ap-beijing.myqcloud.com/) 来访问博客了。

### CDN加速和自定义域名

到这里，就有了一个可以在国内稳定访问博客的链接，但是我还需要绑定自己的个人域名，然后设置CDN加速，和之前就没有什么区别了。然而，还是和之前一样的问题，无论是要用个人域名做源站域名还是CDN加速域名，都得搞我最讨厌的域名备案，害，想用个人域名，咋就这么难呢？

<img src="https://cdn.jsdelivr.net/gh/Summyj/blogImageCDN/images/bye-coding-pages/12.jpg">

之前不需要备案是因为应用的地域是香港(如下图)，大陆访问还是慢，相当于折腾了个寂寞：

<img src="https://cdn.jsdelivr.net/gh/Summyj/blogImageCDN/images/bye-coding-pages/4.jpg" >

这次我把地域设成了北京，所以要用个人域名，就得备案了，但我实在不想搞那玩意，没得办法，只能用腾讯云给的二级域名了，这样在GithubPages不稳定的时候，起码还有个备用链接可以访问博客。

到这里，加上之前的配置，博客的访问域名和对应证书如下：

{% note info %}
- [jmyblog.top](https://jmyblog.top) 
博客本来的域名，阿里云买的，算是博客主站，由GithubPages提供网站托管服务。
域名本身解析到了GithubPages，也开启了强制HTTPS，证书是Github给申请的，Let's Encrypt签发的证书，一般有效期是三个月，到期会自动续签。
- [https://jmyblog-top-1306110219.cos-website.ap-beijing.myqcloud.com](https://jmyblog-top-1306110219.file.myqcloud.com/) 
腾讯云的二级域名，现在算是博客在国内的副站，作为GithubPages国内访问不稳定时的备选，由腾讯云Serverless提供网站托管服务，证书是腾讯云默认证书，会自动续签。
{% endnote %}

## SEO验证

由于GithubPages不能被百度抓取，所以想参考 [之前的文章](https://jmyblog.top/BlogSEO/) 把腾讯云给的二级域名做一个百度收录。

### Google收录

之前为了解决 [GithubPages Warning](https://jmyblog.top/PageServiceUpdate/#GithubPages%E9%97%AE%E9%A2%98%E8%A7%A3%E5%86%B3) ，给主站域名加上了www前缀，当时没毛病，后来发现科学上网的时候，访问博客老是会自动加上这个前缀，然后页面就挂了，只有强制去掉www才能正常打开页面。
所以这次我直接在GithubPages里去掉了www前缀，虽然还是会有Warning，但至少页面不会挂了，之后我需要验证一下自己之前的Google收录是否正常，所以登陆管理台，发现一切ok：

<img src="https://cdn.jsdelivr.net/gh/Summyj/blogImageCDN/images/bye-coding-pages/18.jpg" alt="少的可怜的web点击量(怀疑都是我点的)">

<img src="https://cdn.jsdelivr.net/gh/Summyj/blogImageCDN/images/bye-coding-pages/19.jpg" alt="Google搜索域名验证">

<img src="https://cdn.jsdelivr.net/gh/Summyj/blogImageCDN/images/bye-coding-pages/20.jpg" alt="Google搜索博名验证">


### 百度收录
#### 主站

虽然不能抓取GithubPages，但是聊胜于无，我之前也做过百度的主站收录，就还好吧，只是发现无论是搜索域名还是博名，搜索结果要么很少，要么只能搜到别的结果，可能是因为我没交钱？

<img src="https://cdn.jsdelivr.net/gh/Summyj/blogImageCDN/images/bye-coding-pages/9.jpg" alt="百度搜索域名验证">

<img src="https://cdn.jsdelivr.net/gh/Summyj/blogImageCDN/images/bye-coding-pages/8.jpg" alt="百度搜索博名验证">

而且我试着抓取一篇文章，发现也可以抓到，hummm...所以百度不能抓取GithubPages是个谣言？

<img src="https://cdn.jsdelivr.net/gh/Summyj/blogImageCDN/images/bye-coding-pages/25.jpg" alt="百度抓取文章">
<img src="https://cdn.jsdelivr.net/gh/Summyj/blogImageCDN/images/bye-coding-pages/23.jpg" alt="百度sitemap抓取成功">

#### 副站

然后就是这次搞的副站了，验证站点所有权之后进入管理台，这个只能做手动收录，因为自动收录只能在主站做：

<img src="https://cdn.jsdelivr.net/gh/Summyj/blogImageCDN/images/bye-coding-pages/21.jpg" alt="副站手动收录">

完了之后同样做搜索验证，发现。。。啥也没有？

<img src="https://cdn.jsdelivr.net/gh/Summyj/blogImageCDN/images/bye-coding-pages/27.jpg" alt="搜了个寂寞">

但文章是能抓到的：

<img src="https://cdn.jsdelivr.net/gh/Summyj/blogImageCDN/images/bye-coding-pages/26.jpg" alt="副站抓取成功">

所以就这样吧，我也累了，本次折腾到此结束！


