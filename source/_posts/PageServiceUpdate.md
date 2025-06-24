---
title: 博客Pages服务升级
date: 2021-06-08 16:54:05
update: 2021-06-08 16:54:05
tags: [CodingPages, GithubPages, 腾讯云]
categories: [维护小破站]
copyright: true
description: 想用自定义域名，可太难了。
top:
---

{% img http://ww1.sinaimg.cn/large/006UcYZmgy1graz9zi8goj61qm15oah202.jpg %}

## 事情是这样的

首先我的博客是同时部署在GithubPages和CodingPages上的，GithubPages提供国外访问，CodingPages加速国内访问。两个服务都加了我的自定义域名 {% label info@jmyblog.top %}，且都开启了Https。

两个服务给我的自定义域名申请的Https证书都是由国外的Let’s Encrypt机构签发，一般这个证书有效期只有三个月。由于我的域名解析设置，在证书快到期时，GithubPages可以帮我自动续申请证书，而CodingPages却不能，这就导致证书到期后在国内不能通过Https的方式访问我的博客，所以每次证书快到期时，我都要登录CodingPages [手动续申证书](https://jmyblog.top/HttpsUpdate/)。

去年的时候，CodingPages服务就一直给我发短信说是升级啥的，但我没有关注，我一直是个破罐子破摔的人，只要它没有停服，博客还能访问就懒的升级。
直到有一天我打开博客的时候出现异常，有时是直接访问不了：
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grazjgogovj624u10stbw02.jpg %}
有时是一些报错，好像是https证书过期之类：
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grazjzp6g2j61xo1g8n5f02.jpg %}
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grazkajnejj61ww15ywjr02.jpg %}
所以想先手动更新一波证书，然而登录Coding之后发现并不是证书的问题，而是CodingPage旧版直接停服了，必须更新才行：
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grazp0008pj62l20wuk0u02.jpg %}
于是新的一波折腾又开始了，为了以后温故知新，我把折腾过程全程截图保存了下来，就有了这篇博客。

## CodingPages升级腾讯云服务
### 绑定腾讯云账号

先按照升级提示绑定腾讯云账号，看来腾讯是和Coding有某种关系了(后来搜了下好像是CodingPages被腾讯收购了，以后底层全用腾讯云服务，Coding这边只是一个UI的壳子)，总之不管他们啥关系，先升级再说，账号绑定完成后又开启了新的关卡：
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grb00pbdghj62e80wkq9s02.jpg %}
然后按照指示一顿操作，终于可以使用新版Coding Pages了：
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grcyc2uyn8j62g812ijz702.jpg %}

### 旧版网站升级

由于我是要升级之前的网站，所以进入旧版网站列表，找到之前的静态网站，在右上角看到了「升级至新版」的入口：
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grcydne1euj62780kstcx02.jpg %}
于是果断进入，选择相应的网站类型，最开始我选择了自己使用的Hexo，后来部署报错了，是因为我并没有把Hexo的配置文件上传到仓库(因为里面有许多我自己使用的插件私钥和密码，不能上传到public的仓库中)。所以后来又选择了静态网站，才部署成功：
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grcyez5zm5j60qw0lhabu02.jpg %}
之后又按照提示，去阿里云更改域名的CNAME设置：
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grd41p2dwuj61ac0g840o02.jpg %}
完成设置后(顺便改了下网站名字)，新版的网站就开始部署了：
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grcygr10k3j61bs0mewha02.jpg %}
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grcyh19l0uj613r07y74z02.jpg %}
部署成功后，看到基本信息，有两个网站地址，一个是我的自定义域名，一个是CodingPages提供的访问域名：
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grd4c4r47uj625210cq8e02.jpg %}
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grcyhzt9osj624w0pudm002.jpg %}

### 申请腾讯云证书

切换到自定义域名页面，发现Https证书还在审核中：
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grcyk7l6l7j61620f2jtx02.jpg %}
点击「审核中」，就跳转到了腾讯云页面，新的关卡又增加了：
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grcykxfwymj61ag0ic0v902.jpg %}
所以根据提示步骤申请证书，进行域名验证：
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grcyl51q8ej61610j0n0502.jpg %}
去阿里云添加一条TXT的记录进行验证(证书申请成功后就可以删掉这条验证了)：
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grcyloweifj61040kuwg902.jpg %}
验证成功后，到了使用证书这一步，不过我们的证书其实已经签发成功了，并不需要自己手动安装，所以忽略掉后边的步骤：
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grcym15hk2j610y0p076f02.jpg %}
等到第二天再打开Coding页面，发现域名的证书审核已经通过了：
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grcymo4m6lj61620fsdid02.jpg %}
之后再访问博客，可以看到证书已经更新了，到期日为明年6/1:
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grd2yiir5aj61620gcjv002.jpg %}

### 探索腾讯云

在腾讯云工作台可以看到证书详情，可以看到它同时帮我们开启了www的subdomain访问方式：
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grd6tw6dw3j60ni0kuwfn02.jpg %}
也可以进行管理:
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grd6ueay7lj62ke0l0n2i02.jpg %}
域名管理：
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grd6uvk1caj619z08iabi02.jpg %}
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grd6v2r0blj614n0jeq5402.jpg %}
然而，世上没有免费的午餐，腾讯云的服务是要收费的，就在我刚开通一天后，它就给我发了欠费的信息：
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grd741nv9bj60bl0mwwgr02.jpg %}
虽然不贵，但比起之前免费的CodingPages服务，还是有些差距。而且这里的证书期限是一年，一年以后又不知道有啥幺蛾子，先这样吧，就这样破罐子破摔的凑合着用，我已经充值了10块钱，看它能花多少。

## GithubPages问题解决

到这里，CodingPages的升级已经完成了，然而我的博客还部署在了GithubPages，所以要再看看GithubPages的服务是否正常。不看不知道，一看吓一跳，果然有问题 {% label warning@Domain's DNS record could not be retrieved... %}：
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grcydajfznj61mk17oqba02.jpg %}
说我的DNS配置不对，要加CNAME。但是我有CNAME呀，不知道为啥有这个报错，于是为了解决这个报错，我开始了漫长的旅途。

### 百度&Google

首先，是在百度和谷歌寻找解决方案，找到了几种方案：
<span id="inline-toc">1.</span> [重新绑定域名](https://www.sawlove.com/github-custom-domain-use-https.html)：是说先把域名remove，然后再重新添加，但是没有解决我的问题。
<span id="inline-toc">2.</span> 加上www域名前缀：是说在代码库的CNAME文件里给域名加上www前缀，然后在域名解析里也加上www，最后绑定www前缀的域名。但还是没有解决我的问题。
<span id="inline-toc">3.</span> 让Github自己添加CNAME文件：是说绑定域名后Github会自动在代码库里加上CNAME文件，所以要先把CNAME文件删掉，再重新绑定域名等Github添加文件，然而我照做之后发现Github并没有自动给我添加CNAME文件，所以依然没有解决我的问题。

总之，折腾了半天，问题还是没有解决，瞧把我给折腾的：
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grd8vxs7z9j60qs1ac0wv02.jpg %}
而且遇到了更多的报错，比如{% label danger@Domain does not resolve to the GitHub Pages server... ：%}
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grd2vkp1gaj61lu0lg43f02.jpg %}
再比如：
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grd30evnlej61mc0fqadr02.jpg %}

真的累了，甚至想着就用github.io访问好了，GithubPages就不绑定域名了吧：
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grd2tkvgn8j626o0gw78b02.jpg %}

### 官方文档

想归想，问题还是要解决的。
既然网上的办法解决不了，就乖乖去看官方文档吧，于是直接点击报错信息里的learn more，打开官方文档，开始通读全文：[Managing a custom domain for your GitHub Pages site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
文档里提供了两种自定义域名的绑定配置方法，一种是subdomian，比如 www.example.com 或者 blog.example.com 这样的，显然我不是这种类型；另一种是apex domain，比如example.com这种的，那可不就是我的域名类型嘛，好，找到方向了。

### 问题解决
#### 配置apex domain

然后就按照文档里描述的apex domain的配置方法开始操作，直接跳到第五步：
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grda1c6edtj61bk0iatcw02.jpg %}
说让我添加A记录指向GithubPages提供的这些IP地址，好嘛，安排！：
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grda3xez8lj61qg0a8jte02.jpg %}
然后又让我用命令验证配置：
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grda6byoyhj61920h8gp102.jpg %}
没毛病：
{% img https://i.loli.net/2021/06/11/pmkCEzlanyQBiD5.png %}
接着让我加CNAME文件到我的代码库里：
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grdae57e55j618s05cgne02.jpg %}
这个本来就有，最后是可选项，开启强制Https，也打开了，但据说要等24小时：
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grdaihv34jj61a60d041302.jpg %}
好，所有的配置都没毛病，可以添加域名了，那你倒是说说，为毛这个错它还在？！！！：
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grd2vvzu3nj62am18agvy02.jpg %}
唉，心态崩了。
后来问题解决之后，冷静下来想想，此时报错可能有两个原因，一个是我没等够24小时，等够时间后check again应该就没错了；或者我不开启https应该也不会有错，但我还是想有https的，所以没有采取这种做法。
但是，我的关注点在这个报错，为毛我绑定的是没有www的域名，报错里却有www的subdomain?
好吧，接着看官方文档。

#### 配置www subdomain

官方文档上说，如果用的是apex domain，推荐再给它配置www subdomain，好吧，就按你推荐的来：
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grdb5pbocfj61a406stap02.jpg %}
上边还说，给apex domain配置www submain的前提是你已经按照上边的方法配置好了apex domain，虽然我的报错还在，但我认为自己还是配置好了apex domain的：
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grdb6kmrwgj619q05gjt502.jpg %}
所以按它说的接着来，第一步，域名解析里添加一个www的CNAME记录，指向 xxx.github.io：
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grdb79fv7hj619y0as42e02.jpg %}
安排：
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grdbb8h8q7j624805kt9v02.jpg %}
接着把代码库里的CNAME文件也加上www：
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grdbct4avzj62640n042t02.jpg %}
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grdbcyyp7nj624y0me42v02.jpg %}
第二步，命令验证配置是否正确：
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grdb7f8we4j61ac0dgad002.jpg %}
没毛病：
{% img https://i.loli.net/2021/06/11/LeoMy5p6SKGX71O.png %}
到这里，配置就已经结束了，激动人心的时候到来了，绑定我的www域名，竟然。。。。。成功了！！！！！小绿勾也打上了：
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grd30nk1faj60s40ku77202.jpg %}
而且也开启了Https，由于我配置www subdomain是在配置apex domain 24小时之后，此时是已经等够24小时的，所以可以开启Https没有报错。
血的教训告诉我们，官方文档是真的有用。所以遇到问题，还是先看看人家让你看的官方文档，然后再搜其他的办法。

## 为啥要用CodingPages
### CodingPages在哪

配置好了GithubPages，目前我的个人域名DNS设置是：
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grd3eg62esj61620gkadb02.jpg %}
通过命令再次验证DNS设置：
{% img https://i.loli.net/2021/06/11/JXKaRVnq3iC7GkQ.png %}
有没有发现什么问题？
是呀，CodingPages的作用在哪呢？验证到的DNS设置只指向了GithubPages服务，而且无论是访问 https://jmyblog.top 还是 https://www.jmyblog.top ，显示的Https证书都是Let’s Encrypt签发的：
{% img https://i.loli.net/2021/06/11/k4UF5refWqgYNCz.png %}

### CodingPages部署节点

然后再次探索CodingPages，发现它部署的节点是香港：
{% img https://i.loli.net/2021/06/11/8TQYjyKRqkbOnhw.png %}
想部署到其他节点还得备案才行：
{% img https://i.loli.net/2021/06/11/ltPUcyOdvebphfB.png %}
于是连接一个香港区域的VPN，然后再通过命令再次验证DNS设置，终于看到了指向CodingPages的信息和腾讯云签发的证书：
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grd2xyjpa7j616409ejtt02.jpg %}
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grd2yiir5aj61620gcjv002.jpg %}

### 腾讯云CDN加速

登录腾讯云，发现它对站点的加速和服务区域都是境外：
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grd6uvk1caj619z08iabi02.jpg %}
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grd6v2r0blj614n0jeq5402.jpg %}
想切换加速区域还是得备案才行，而且还得另付国内加速的费用：
{% img https://i.loli.net/2021/06/11/6N8ZSgoWrUtIQcb.png %}
{% img https://i.loli.net/2021/06/11/n5TdHZtcaL7Azs6.png %}

但是备案太麻烦了，而且就我这个小破站估计也没多少人看，孤芳自赏罢了，也不至于搞这么多服务。所以在已经有了GithubPages之外，我需要CodingPages的理由是什么呢？

### 使用CodingPages的理由

从前用CodingPages是想用它免费的国内加速服务，现在虽然不备案就不能加速了，但仔细想了想，虽然我不想备案，也不想开启高端的CDN加速服务，还是有一些理由让我使用它的：

<span id="inline-toc">1.</span> 博客内容推送到百度，理由如下：

{% img https://i.loli.net/2021/06/11/6p5iyxc4XZrM9Yo.png %}

<span id="inline-toc">2.</span> 一个备胎，为了保险起见，同时使用两个服务还是不错的，虽然它们的功能有一些重复。
<span id="inline-toc">3.</span> 虽然目前只有国外加速服务，好歹能给国外的朋友提高访问体验啊，而且万一以后又想备案呢，留条后路总没错。
<span id="inline-toc">4.</span> 虽然用它的理由的确乏善可陈，但是配都配好了，我上边折腾这么久也不能白折腾。

## 站点验证

到这里，博客配置就已经结束了，但还是要通过第三方工具验证博客的可访问性和速度。

### 百度收录

之前做了百度SEO优化，所以使用百度站长工具验证站点，首先是Https认证：
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grd2zj0qnrj61qk0s6ae502.jpg %}
没毛病，这Https是真的，再看看URL抓取：
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grd3hl9bjdj626i0wa0zl02.jpg %}
也没毛病，看来百度可以收录我网站的URL，访问抓取都可以，放心了。

### Google收录

也做过Google的SEO优化，所以使用Google站点工具，先连上站点验证所有权：
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grd2u22ec8j62l418kqah02.jpg %}
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grd2ugu9a6j62la12ewit02.jpg %}
然后再上传一次sitemap，确保Google可以抓取网站的URL:
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1grd3012an4j62co0sagq802.jpg %}
没毛病，看来也ok:
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1gre98vekm5j61j20xcjyc02.jpg %}

### 访问速度

通过 [这个网站](http://tool.chinaz.com/speedtest/) 可以检测博客的访问速度，在国内测速 https://jmyblog.top ，国际测速 https://jmyblog.top 和 https://www.jmyblog.top ， 结果都还不错：
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1gre9o9veadj61n41b411r02.jpg %}
{% img http://ww1.sinaimg.cn/large/006UcYZmgy1gre9omgv7sj61ne0suwjw02.jpg %}
{% img https://i.loli.net/2021/06/11/jIZwMAUEbsK4VPa.png %}
本来只是想记录自己是咋升级，咋解决问题的，结果却写了这么多:joy:，可能有一些自己的思考吧。先这样凑合着用吧，这样折腾完了，至少以后不用三个月再手动申请证书了。