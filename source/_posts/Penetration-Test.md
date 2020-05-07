---
title: 渗透测试初识
date: 2020-05-04 15:16:47
update: 2020-05-04 15:16:47
tags: [渗透测试, OWASP]
categories: [学习小记]
copyright: true
description: 好想成为一个酷酷的黑客啊。
top:
---

<a href="https://sm.ms/image/e9Yd8ylbkxcJhOE" target="_blank"><img src="https://i.loli.net/2020/05/06/e9Yd8ylbkxcJhOE.jpg" ></a>

本文参考 [怎么学习新东西](https://github.com/judasn/hexo-blog/blob/master/2016/02/My-Learning-Way.md) 书写。

## 是什么 ##

{% label info@百科定义： %} 为了证明网络防御按照预期计划正常运行而提供的一种机制。
<enter></enter>
{% label info@通俗定义： %} 通过模拟黑客攻击的方式检查目标信息安全运行状况的方法。


## 为什么 ##
{% label primary@解决啥问题 %}
找到目标信息安全防护中存在的问题，汇总研究，加固不足之处，提升目标安全等级。
{% label primary@没有它之前怎么做 %}
只是按照规范要求定期更新安全策略和程序，时时给系统打补丁，用安全软件确保所有补丁都已打上，但并没有进行全面检测和评估。
## 怎么做 ##

### 百科示例流程 ###

<span id="inline-toc">1.</span> 测试之前

分析测试风险，制定测试方案初稿，通过后与被测机构签订测试协议，确定：
- 测试方法(黑盒/白盒/灰盒)
- 目标(服务器/数据库/Web网站...)
- 测试细节(是否允许数据损坏/接内网还是外网/...)

<span id="inline-toc">2.</span> 测试过程

{% label success@信息收集 %}

测试者利用各种公开信息收集目标的网络资产(如域名、IP、服务器、人员组织架构等)，需要熟练使用各种网络信息工具。

{% label success@技术测试 %}

针对收集到的网络资产进行详细的漏洞测试，比如针对Web系统做SQL注入、命令执行、XSS攻击等。
需要熟悉各种测试工具，比如burpsuite等等。

{% label success@人员测试 %}

对人员的安全意识进行测试，如发送钓鱼邮件、欺骗人员获得某种口令等。(之前在公司就收到过内部测试故意发出来的钓鱼邮件，幸好我机智没有点开，否则可能要被谈话)

<span id="inline-toc">3.</span> 测试之后

测试者对测试结果进行汇总，并产出报告，交付给目标的管理员。然后帮助目标修复漏洞，修复完成后进行复测，检查漏洞是否修复完毕。

### 视频/文档教程 ###

[这里](https://www.imooc.com/learn/1032) 有一个渗透测试免费入门视频教程.

### Demo实战 ###

因为渗透测试是需要在征得被测机构同意后进行的测试活动，作为一个遵纪守法的好公民，我找到了一个知名的Web渗透测试练习应用程序，它就是 [juice shop](https://github.com/bkimminich/juice-shop#docker-container-----):
<a href="https://sm.ms/image/qzf5HgmRUFyc6Kj" target="_blank"><img src="https://i.loli.net/2020/05/06/qzf5HgmRUFyc6Kj.png" ></a>
它是由权威组织 [OWASP](https://owasp.org/) 推出的一款web应用程序，里面包含了最常见也最重要的Web安全漏洞，而且会根据新技术不断更新，在 [这里](https://pwning.owasp-juice.shop/) 你可以获得如何开始在juice shop玩耍的教程。下边是我自己实践过的几个例子：

<span id="inline-toc">1.</span> 利用前端漏洞提交零星反馈

未评分时反馈页面提交按钮是不可点击的，然而浏览页面代码可以发现，{% label primary@disable=true %} 用来控制提交按钮是否可点击，那我们就删掉它，达到提交零星评价的目的。

<iframe height=498 width=510 src='https://player.youku.com/embed/XNDY2MTQyNjQxMg==' frameborder=0 'allowfullscreen'></iframe>


<span id="inline-toc">2.</span> 通过暴露的ftp文件夹访问机密文件

要访问机密文件，那我们就得找到机密文件的路径。首先我们浏览网站页面，看有没有什么特殊链接可以点击，然后在“关于我们”页面中发现了一个文案贱贱的链接，点开之后就可以发现有一个隐藏的ftp文件夹，可以浏览里面的机密文件。

<iframe height=498 width=510 src='https://player.youku.com/embed/XNDY2MjgwODAwOA==' frameborder=0 'allowfullscreen'></iframe>


<span id="inline-toc">3.</span> 利用sql报错登录管理员账户

首先打开登录页面，按照sql注入一般操作，输入特殊字符单引号，然后输入任意密码，点击登录之后，会发现页面有一个异常报错。就顺便解决了报错处理不当的挑战。
然后在login请求中找到具体SQL报错信息：
{% codeblock lang:command %}
SELECT * FROM Users WHERE email= 'xxx' AND password = 'xxx' ......
{% endcodeblock %}
由此我们可以根据这个信息，构造万能密码 {% label primary@' or 1-- %}, 第一个单引号用来隔断email后边的单引号， 然后加上逻辑条件或 or，给出数字1让条件永远为真，再用 -- 注释掉后边的语句。
输入任意密码，点击登录，就可以登录成功了，而且根据挑战成功提示，登录的还是管理员账号，可以算是意外之喜了。

<iframe height=498 width=510 src='https://player.youku.com/embed/XNDY2MjkxNzA4NA==' frameborder=0 'allowfullscreen'></iframe>


<span id="inline-toc">4.</span> 浏览代码访问管理员页面

上一条我们已经登录了管理员账号，但浏览网站后却发现和普通账号登录之后的显示并没有什么区别，这可不行，我们既然登录了管理员账号，一定是要找到一些管理员才有权限访问的东西的。但页面又找不到什么信息，所以先从网站源文件入手。
打开网站resource, 发现一个{% label primary@main.js %}的代码文件，并尝试搜索admin, 结果找到了类似于路径的信息，根据其他路径的显示，我们可以直接加上后缀 {% label primary@administration %} ，回车之后进入管理员页面，并解决挑战。

<iframe height=498 width=510 src='https://player.youku.com/embed/XNDY2MjgxNzQ4MA==' frameborder=0 'allowfullscreen'></iframe>

<span id="inline-toc">5.</span> 编辑请求访问别人的购物车

打开管理员页面，我们可以发现有很多已注册的用户。所以我们就来实现登录用户Jim看到管理员的购物车信息。
首先看一下管理员的购物车请求和里面都有啥，可以看到请求的url是 {% label primary@rest/basket/1 %}, 记住它。
然后登出管理员，同样利用SQL注入构造登录字符串 {% label primary@email' and 1-- %} 登录Jim的账号。此时也解决了登录jim的挑战。
{% note info %}
其实还有别的方式可以登录jim, 比如利用burpsuite爆破直接破解密码，这个我还没学会，不过上边的免费课程会讲到burpsuite的使用。
还可以利用社会工程学的方式，通过回答jim账号的安全问题(你最年长的兄弟名字是啥)来登录账号，官网给出的解释是由jim可以想到一个知名的演员叫James, 通过百科可以查到他的兄弟名字，然后就解答了问题。这点我不能理解，也想不到，或许是文化不同吧，不过这个例子也一定程度上反映了社会工程学是怎么用的。
{% endnote %}

登录Jim之后我们就看他的购物车请求是{% label primary@rest/basket/2 %}， 然后通过charles工具给这个请求打个断点，刷新页面之后，将请求改为{% label primary@rest/basket/1 %}，发送之后就可以在登录jim账号的情况下，看到管理员的购物车了，挑战解决成功。

<iframe height=498 width=510 src='https://player.youku.com/embed/XNDY2MjgxMzE0NA==' frameborder=0 'allowfullscreen'></iframe>

## 参考资料

- [结合OWASP Top 10 初识安全测试](https://www.jianshu.com/p/24a39068dbf9)
- [OWASP Juice Shop 实战报告与解析](http://shaobaobaoer.cn/archives/510/owasp-juice-shop#0x03_Information_Leakage)