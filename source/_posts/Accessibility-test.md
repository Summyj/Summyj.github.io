---
title: 网络无障碍
date: 2020-02-19 16:38:19
update: 2020-01-19 16:38:19
tags: [网络无障碍]
categories: [学习小记]
copyright: true
description: 唠唠网络无障碍那些事儿。
top:
---

![Accessibility](https://i.loli.net/2020/01/19/LBdwixRJcjbS7NK.png)

## 背景

由于工作原因，博主最近在做{% label info@网络无障碍测试 %}，之前也听说过，但是没有实践。深入了解之后才发现网络无障碍已经有很成熟的标准和实践了，研究了一天，所以想把自己的发现跟大家分享一下(所以说公司真是一个涨姿势的好地方)。

## 定义
### 温情版定义
这个世界上，有一些人听不见，有的人看不见，也有人肢体有障碍。
互联网时代，手机不离身。娱乐、交流、还有许多生活应用都可以通过网络进行。在网络给我们带来快乐和便利的同时，是否也会想到上述特殊人群也需要这些呢？所以，{% label info@网络无障碍要求所有人都可以平等、无障碍的访问互联网应用和内容，让世界充满爱:blush: %}
### 专业版定义
网络无障碍听起来是很温情，然而作为一名IT民工，温情之余，也还是要干(ban)活(zhuan)的。
所以要支持网络无障碍，在开发互联网应用时，就必须得加上这么一个功能:point_down:
> 网络无障碍辅助功能（Accessibility，也被称为 {% label danger@a11y %}，因为以 A 开头，以 Y 结尾，中间一共 11 个字母，这种命名方式可以说很想不到了:joy:）是一种可以帮助所有人获得服务的设计和创造。无障碍辅助功能是使得辅助技术正确解读网页的必要条件。

## 需求

上边提到了网络无障碍辅助功能，那么在做功能之前我们需要干什么呢？当然是了解需求。

{% note info %}
[WCAG标准(Web Content Accessibility Guidelines)](https://www.w3.org/Translations/WCAG21-zh-20190311/) 是由权威组织 **W3C(万维网联盟)** 于1999年推出的网络无障碍指南。目前已经更新到了2.1版本，此版本最近的更新在2019/3/11。
里边提出了Web内容应当遵守的4大准则，并且根据网站对这些准则的实施情况分为**A、AA、AAA** 3种一致性水平。
{% endnote %}

WCAG标准相当于一个网络无障碍相关的需求集合，但在实际工作中，网络无障碍的需求要根据具体情况而定，一般会从这两个角度出发提出需求：
- 需求1: 从WCAG标准的一致性水平角度出发，要求实现A/AA/AAA水平。
- 需求2: 从人类本体对无障碍访问的需求角度出发，要求实现有看不见/听不见/色弱等身体缺陷人群，也能访问页面。

有时候也会把这两种角度结合在一起提出需求，比如实现A水平，也要实现身体缺陷人群的访问，所以需求是可定制的。

## 开发

对于开发而言，网络无障碍的支持主要由{% label info@前端童鞋 %}们来实现。
在实际项目中，一般来说无障碍不会作为网站的原始需求，更多是作为一种改进，但无论是否原始需求，开发童鞋需要做的是：
{% tabs Step%}
<!-- tab -->
非原始需求跳到第二步。了解一些基础的WCAG编码实践，可以参考[React官方网站](https://zh-hans.reactjs.org/docs/accessibility.html)给出的编码建议。
<!-- endtab -->
<!-- tab -->
使用下文的开发辅助工具和浏览器检测工具改代码。
<!-- endtab -->
<!-- tab -->
交给测试仙女姐姐之前，自己做做下文中的简易手工测试。
<!-- endtab -->
{% endtabs %}

## 测试
{% note warning %}
在测试之前，我们需要谨记：任何工具都不能告诉我们web内容是否真的做到了网络无障碍，只有**人**才能确定真正的无障碍性。但这些工具可以帮助我们**评估**网页内容的无障碍性。
{% endnote %}
### 测试工具
#### 可在IDE使用的开发辅助工具
<span id="inline-toc">1.</span>IDE智能检测
<span id="inline-toc">2.</span>[eslint-plugin-jsx-a11y 插件](https://github.com/evcohen/eslint-plugin-jsx-a11y)
<span id="inline-toc">3.</span>[react-axe组件](https://github.com/dequelabs/react-axe)，可以直接把无障碍访问的发现显示在控制台中

#### 浏览器检测工具
凡是浏览器中检测网络无障碍的测试工具，都离不开[aXe-core](https://github.com/dequelabs/axe-core)，它可以对应用进行自动及端至端无障碍性测试，还包含了对Selenium的集成。可以选择下列工具的一个或多个测试。

<span id="inline-toc">1.</span>[浏览器的无障碍辅助功能检测器Audits/LightHouse(基于aXe引擎)](https://developers.google.com/web/tools/chrome-devtools/accessibility/reference#pane)

<a href="https://sm.ms/image/fSNGUDpKB5WgI3l" target="_blank"><img src="https://i.loli.net/2020/04/22/fSNGUDpKB5WgI3l.jpg" alt="lighthouse.jpg" width="300" height="400"></a>

<span id="inline-toc">2.</span>无障碍访问性检测器aXe(基于aXe-core组件)，可以添加[浏览器插件](https://chrome.google.com/webstore/detail/axe-web-accessibility-tes/lhdoppojpmngadmnindnejefpokejbdd)，也可以下载[安装包](https://www.deque.com/axe/)。相比较Audits检测报告更详细。

<span id="inline-toc">3.</span>无障碍辅助的[浏览器插件WebAIM WAVE](https://chrome.google.com/webstore/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh)(Web Accessibility Evaluation Tool)

<span id="inline-toc">4.</span>无障碍测试工具[Pa11y](https://pa11y.org/)，可以自己配置测试基于的WCAG版本和一致性水平，也可以用来做持续集成。

#### 简易手工测试
已经有了上面的自动化检测工具，为什么还需要手工测试呢？如果你认为在LightHouse得到100分或者aXe/WAVE检测无error就意味着网站已经完全做到访问无障碍。那就Too Young Too Simple了。因为自动化工具只会返回那些最常见和最容易修复的可访问性问题的检测报告。正如axe引擎开发团队DequeLabs提到的那样：
{% note info %}
The downside of the DevTools accessibility audit is that's only half of the story. Your page may have scored a 94 in accessibility according to Lighthouse, but it's only telling you the results of automated testing. You also have to perform manual accessibility testing to really know where you stand.
{% endnote %}
简易的无障碍手工测试，主要用到下面两种工具：
<span id="inline-toc">1.</span>键盘
使用 Tab 和 Shift+Tab 来切换页面元素，用空格/enter键定位元素，比如下拉框等等。从而实现浏览整个页面。
<span id="inline-toc">2.</span>屏幕阅读器
{% note primary %}
在使用屏幕阅读器之前，先想想自己是否为屏幕阅读器正确标记了页面的元素？屏幕阅读器通过识别页面上的无障碍辅助对象来帮助用户浏览页面，这些对象均包含在无障碍辅助功能树中，它是DOM树的一个子集：
{% endnote %}
<a href="https://sm.ms/image/dEF7fwu1TxXbtWg" target="_blank"><img src="https://i.loli.net/2020/04/22/dEF7fwu1TxXbtWg.jpg" ></a>
不同设备，不同浏览器都有内置的屏幕阅读器设备，自己根据需求百度下:satisfied:

### 持续集成

<span id="inline-toc">1.</span>将像[axe-core](https://github.com/dequelabs/axe-core)这样的库合并到自动化测试套件中，集成到pipeline。
<span id="inline-toc">2.</span>[将Pa11y集成到pipeline](https://cruft.io/posts/automated-accessibility-testing-node-travis-ci-pa11y/)

### 专业测试机构
除了开发团队，也有一些专业的网络无障碍测试机构，这些机构的员工大多都是有身体缺陷的人，他们会用自己的测试设备和个人体验帮助提升网站的可访问性。

## 参考资料
<span id="inline-toc">1.</span>[W3C-Web Content Accessibility Guidelines](https://www.w3.org/Translations/WCAG21-zh-20190311/)
<span id="inline-toc">2.</span>[React-无障碍辅助功能](https://zh-hans.reactjs.org/docs/accessibility.html)
<span id="inline-toc">3.</span>[Accessibility Reference](https://developers.google.com/web/tools/chrome-devtools/accessibility/reference#pane)
<span id="inline-toc">4.</span>[How To Do an Accessibility Review](https://developers.google.com/web/fundamentals/accessibility/how-to-review)
<span id="inline-toc">5.</span>[Pa11y tutorials](https://pa11y.org/tutorials/)
<span id="inline-toc">6.</span>[Accessibility Testing with pa11y](https://bitsofco.de/pa11y/)
<span id="inline-toc">7.</span>同事在项目Space的文档>.<


