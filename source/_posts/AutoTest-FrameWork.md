---
title: 浅谈自动化测试框架
date: 2020-05-13 16:08:42
update: 2020-05-13 16:08:42
tags: [自动化测试]
categories: [搬砖那些事儿]
copyright: true
description: 什么是自动化测试框架，一个好的自动化测试框架通常需要什么元素。
top:
---

<img src="https://i.loli.net/2020/05/15/yHdcTpMbsvJB2zh.jpg" >


## 前言

去年公司有资深测试同事分享了如何搭建一个好的自动化测试框架Session，听了以后特别受启发。
入职以来一直都是用着项目上现成的框架使用，平时也只是写写测试代码，搬搬砖。虽然也有想过深入了解一下，但因为拖(lan)延(ai)症一直没实践:see_no_evil:
恰好最近QA小姐姐们组织了一个搭建自动化测试框架的workshop，自己走了一下流程，感触更深了，所以想结合去年的Session内容总结一下，这样以后也可以参考。

## 是什么

写过自动化测试的小伙伴们一定接触过诸如Selenium/Appium/..的自动化测试工具，这类UI测试工具提供了定位、操控页面元素的功能，从而实现UI自动化。
这些工具也内嵌了失败重试、智能等待机制，所以它们也叫做{% label
default@"自动化测试框架"
%}，但一个完善的自动化测试框架，仅仅做到这些是远远不够的，所以它们只是**自动化测试框架的MVP版本**。

### 自动化测试框架的MVP版本

怎么理解自动化测试框架的MVP版本呢？

试想要生产一辆交通工具，从造轮子开始到成品需要下边几个过程，这样才能成功：

<im src="https://i.loli.net/2020/05/14/sVS2y3nXflDgowB.png" >

如果把搭建自动化框架类比成生产交通工具的过程，那上述的Selenium/Appium/..等{%
label default@"自动化测试框架"
%}相当于只是一辆自行车，离我们想要的大货车(完善的自动化测试框架)差距还比较大：

<img src="https://i.loli.net/2020/05/14/jCBKgVplGJZkM1n.png" >

以Web UI自动化为例，一般来说，MVP版本的自动化测试框架结构如下：

<img src="https://i.loli.net/2020/05/14/3iMYrD2jC8R7O5U.png" alt="题图" height="370" width="400">

{% note info %} 基本做法是：写好一条test case, 里面定位了页面元素，定义元素行为。最后利用WebDriver 实现测试目标。{% endnote %}

比如下面利用Selenium在百度搜索selenium字符串的代码：

{% codeblock lang:command %} public void searchSelenium() { 
        System.setProperty("webdriver.gecko.driver", "drivers/geckodriver");

        WebDriver driver = new FirefoxDriver();

        driver.manage().window().maximize();
        driver.get("https://www.baidu.com/");
        driver.findElement(By.id("kw")).clear();
        driver.findElement(By.id("kw")).sendKeys("selenium");
        driver.findElement(By.id("su")).click();
        driver.quit();
    }
{% endcodeblock %}
<br>

### 自动化测试框架的完善版本

<br>
<br>

还是以Web UI自动化为例，一般来说，相对完善的自动化测试框架结构如下：

<img src="https://i.loli.net/2020/05/14/tTnUyI9VsHY4N1q.png">

可以看到，跟MVP版本相比，相对完善的自动化测试框架结构还多了Test Suite/Middle layer等元素，下面我们来说一下这些元素指的是什么。
<br>

<br>


<span id="inline-toc">1.</span> Test Suite

<br>

允许将测试代码中公用的数据比如浏览器，测试url等等提出来放在单独的文件中，便于进行测试环境转换、DDT(Data
Driven Testing)、KDT(Keyword Driven Testing)等Good
practice，TestNG等工具就可以实现这一点，还可以利用Page Object实现结构化目录。

<br>
<br>

<span id="inline-toc">2.</span> TestCase&MiddleLayer

<br>

好的框架也需要支持易用的Assertion、Error handling、Preposition &
Postposition机制。还应该实现BDD(Business/Behavior Driven
Development)，写出更语义化的测试代码，Cucumber就是一个支持BDD的测试工具。

<br>
<br>


<span id="inline-toc">3.</span> Element Object/Locator definition

<br>

测试框架应该支持多种定位页面元素的方法，比如根据元素属性(Id, CSS,
xPath…)定位，也有支持图像识别/像素识别来定位元素的工具，比如网易就有开发一些此类型的工具，常用于游戏测试。

<br>
<br>

<span id="inline-toc">4.</span> Operation Driver

<br>

UI测试工具经常用到WebDriver来操控页面元素，所以一个好的测试框架应该提供稳定的操作WebDriver的方法，还需要兼容不同的浏览器和操作系统。并能提供开放接口，允许用户添加自定义的WebDriver操作方法。

<br>
<br>

<span id="inline-toc">5.</span> Utilities

<br>

需要提供一些实用的机制和工具，比如提供日志、智能等待机制，还有对文件/数据库/网络/OS的操作，此外，还要支持模拟器和截图功能。

<br>
<br>


<span id="inline-toc">6.</span> Assistance

<br>

自动化框架还需要有更多辅助功能，比如CI/CD的集成、并行机制、失败重试机制，以及输出漂亮的测试报告。

<br>
<br>


{% note primary %}
总的来说，一个完善的自动化测试框架应该是灵活的、稳定的，而且是容易维护的，全面考虑上边这6个元素会帮助我们达到这个目的。
然而，现在我们熟知的一些“自动化测试框架”比如selenium, Cucumber, TestNG等等，都只涵盖了这6大要素的部分功能。所以更多的时候，一个完善的自动化测试框架会是多个工具的集合，比如Selenium+Cucumber+GoCD, Selenium+TestNG+Jenkins等等，具体选择什么工具要看实际情况。
这样我们就能生产出拉风的大货车啦：
{% endnote %}

<img src="https://i.loli.net/2020/05/14/8xZPSG624mRkAaL.png" >


## 怎么做

设计搭建自动化测试框架是{% label warning@测试架构师 %}或者{% label
warning@高级测试工程师 %}们重点关注的内容，这当然不是一件容易的事。 {% note
primary
%}首先需要收集项目自身的编程语言、平台、系统架构、预算等相关信息，然后拿着这些信息再综合考虑上边列出的6大要素进行技术选型，这需要测试架构设计者在每个要素中，都至少熟悉1-2种测试工具，有的方面还需要熟悉2-3种，然而这并非一日之功，尽管有的功能涵盖了多个要素。
而搭建过程中用到的构建部署工具，比如Maven/Gradle/...，也是测试架构设计者需要熟悉的。
所以一个测试工程师，需要在多方面有所涉猎，且熟悉多种测试工具，才可以根据项目情况设计出最适合的自动化测试框架。
{% endnote %} 

同时，不同的测试方式，也需要有不同的自动化测试框架。上边我们只以WebUI自动化为例，提到了常用的Selenium/Appium。那对于别的测试方式，比如性能测试而言，也有它自己的自动化测试工具。所以，学海无涯呀，我们只能苦作舟了:joy:

虽然要"苦作舟"，但我们也不用太慌，正如编程语言都是共通的一样，同一领域的测试工具也都是共通的，所以只有在我们学习新领域的工具时才会"苦作舟"，熟悉了一个工具之后，再去看相似的工具，就会轻松很多，也会很容易的对比多个工具的优劣了:muscle:


## 参考资料
- 同事去年讲Session的PPT...


