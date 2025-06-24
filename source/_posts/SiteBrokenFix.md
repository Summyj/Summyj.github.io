---
title: 博客被停止访问之后
date: 2020-04-23 09:24:08
update: 2020-04-23 09:24:08
tags: [Hexo]
categories: [维护小破站]
copyright: true
description: 由于存在网路安全性问题，该站点已停止访问。
top: 
---

## 发生了什么

昨天更新了点博客内容，本地预览一切正常，然而推送之后，我的站点就没法访问了:scream:

{% img https://i.loli.net/2020/04/23/K4e1OfUkGpTt6BF.jpg %}

## 找原因

这次的错误和之前遇到的都不一样，一脸懵逼的我第一时间只能找Google和度娘问问，看有没有同病相怜的人和有可能的解决办法。然鹅，毛都没有，结果全是不相关的内容：
{% img https://i.loli.net/2020/04/23/lDyCkEzNxnZXL4g.png %}

虽然毫无头绪，但也只能尝试自己解决了，还是那句话，{% label info@遇到问题的时候，首先怀疑自己 %}。于是我就开始了自我怀疑之路：

### revert代码
因为不知道网站是什么时候被停止访问的，而且更新之前我并没有看站点的情况，所以也许在更新之前它是好的，所以我revert了代码：
{% codeblock lang:command %}
git reset --hard HEAD^
git push --force
{% endcodeblock %}
但结果还是一样:sob:

### 更新Hexo
既然不是代码的问题，而且它报的是网络安全性问题，所以决定从这个角度出发找原因，首先想到更新Hexo，说不定有相关安全漏洞修复，所以我更新了相关的package:
{% codeblock lang:command %}
npm outdated
npm install --save
{% endcodeblock %}
推送更新之后结果依旧不变:cry:

### 解决github发现的依赖稳定性问题
注意到推送远程仓库后，github有提示一些依赖包需要更新，旧的可能有安全威胁，所以按照github的建议更新了依赖包：
{% img https://i.loli.net/2020/04/23/ltorJI7sbPufejX.png %}嗯，问题依然没有解决:joy:

### 百度网站检测
继续细品报错{% label danger@由于存在网路安全性问题，该站点已停止访问 %}，虽然我坚信自己是个遵纪守法的好公民，没有在博客上发布什么黄赌毒信息，不过还是在百度站点管理平台检测了一下，期待能报个啥错，给我更多的信息：
{% img https://i.loli.net/2020/04/23/21VDnev6QHLpJIy.png %}然而结果出乎意料的优秀，也没有检测出啥恶意内容。hummm，度娘为我正身了:satisfied:

### 清理浏览器缓存
上边这么多尝试，都没有解决问题，我突然想到一个平时工作中经常用到的操作：{% label default@清缓存 %}，然后我终于看不到报错信息了，出现了一个相对熟悉的页面，而且有更多信息：
{% img https://i.loli.net/2020/04/23/v9PIwB1WMfQNymh.png %}值得注意的是这段话：
>This server could not prove that it is jmyblog.top; its security certificate is from
coding.me. This may be caused by a misconfiguration or an attacker intercepting your
connection.

3个关键字：**安全证书** **配置错误** **外部攻击**
于是我看了下现在的证书：
{% img https://i.loli.net/2020/04/23/kliwBJ8GtSrb1eR.png %}
虽然我很想假装自己能看懂，但我真的看不懂。外部攻击就更是一头雾水了，稍微有点了解的是**配置错误**这个关键字，而且提到了coding.me。这个我是知道的，因为博客是同时部署在github和coding上的。所以我决定去探索下。

### 探索Coding和Github
进入coding之后，我发现它的登录页面和代码远程库的url有变化，所以在本地改了推送的远程仓库。再推送一遍没报错，但网站依然无法访问。
然后我看了Coding的代码库静态网站配置，发现了一个奇怪的网站访问地址：
{% img https://i.loli.net/2020/04/23/MOt6ZUfaEBDjvLW.png %}
然后尝试打开：
{% img https://i.loli.net/2020/04/23/vZX9Ow1RbpmFWBo.png %}
简直是喜大普奔:smiley:，是可以访问的。这下心里的石头落下了一点，最起码有一个在线访问的url了。然而我记得之前coding静态网站的url和github一样，都是代码库的名字，当时域名解析的时候设置的记录值也是这个，但现在变了，解析当然就不生效了，所以要改域名解析设置。
但还是先看看github pages可不可以访问，因为之前配置了custom domain，而现在这个域名是不可访问的：
{% img https://i.loli.net/2020/04/23/FKD4f13LOMao9Wk.png %}
所以去掉custom domain，网站内容部署到github pages本来的url：
{% img https://i.loli.net/2020/04/23/KcJ4ilrSbXLqYsy.png %}
然后再看看部署log，也没问题：
{% img https://i.loli.net/2020/04/23/Ualby2E5DmYZxKX.png %}
也是可以访问的:
{% img https://i.loli.net/2020/04/23/C1UnyFq5ftrZeGb.png %}
好了，既然现在有两个线上的url都可以访问网站，那么就可以去改域名解析设置了，让这两个url都可以指向jmyblog.top这个域名，理论上问题应该就解决了。


## 成功解决

### 域名绑定coding

{% img https://i.loli.net/2020/04/23/Skv28M5PJiC1Fwo.png %}

首先按照上图中coding静态网站中自定义域名的设置要求，添加下面的CNAME记录，并把之前记录值为coding.me的解析删掉：
{% img https://i.loli.net/2020/04/23/KWhtRFA6QPTm4SM.png %}
然后输入绑定域名的时候，要求再添加一条TXT记录(这个忘记截提示信息的图了)，其中主机记录和记录值都是在提示信息给出的：
{% img https://i.loli.net/2020/04/23/iz1IX9s2cxyLm8D.png %}
并且成功在coding开启了自定义域名的强制Https访问，一开始SSL证书申请失败，后来按照网上的解决方案去域名解析把GitHub解析暂停就申请成功了。
有了上面这两条解析，jmyblog.top已经可以访问了，但是只绑定了coding静态网站，我们还需要绑定github静态网站，实现双部署。

### 域名绑定github
和最开始搭建网站的步骤一样，添加一条记录值为github.io的CNAME记录就好：
{% img https://i.loli.net/2020/04/23/ZpEigb5wcH1CNFQ.png %}
然后去github pages设置中，加上custom domain，并开启强制Https访问：
{% img https://i.loli.net/2020/04/23/3IaVCNKXE7WlP49.png %}
至此，coding pages和github pages都指向jmyblog.top这个域名了，而且都开启了强制Https，现在jmyblog.top已经可以用https访问了，也算是因祸得福:joy:
{% img https://i.loli.net/2020/04/23/9kO3dHV2iwbnRhe.png %}
而且现在的证书：
{% img https://i.loli.net/2020/04/23/O51DPZxStkeszNv.png %}
嗯，还是看不懂，不过问题解决了就行。
用百度站点工具再做一次Https认证，验证成功：
{% img https://i.loli.net/2020/04/23/8ucHwDNBkGzvEXZ.png %}
嗯，这下Https是真的了。
本站点最终的域名解析列表：
{% img https://i.loli.net/2020/04/23/RPNsrEyMSUV9uD1.png %}

