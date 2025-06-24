---
title: 测试课程学习笔记第一弹：自动化测试理论
date: 2020-01-17 16:23:03
update: 2020-01-17 16:23:03
tags: [学习笔记, 自动化测试]
categories: [搬砖那些事儿]
copyright: true
description: 当我们说自动化测试的时候，到底在说什么？
top:
---

{% img https://i.loli.net/2019/11/19/bKwNRZ3XJYpPyI5.png %}

>近段时间报名了一个自动化测试课程，首先学习了自动化测试理论。有很多也是我目前在做的，还有一些之前没有了解到。所以想整理一下，分点描述。
{% label success@绿色 %}是我目前在做的，{% label warning@黄色 %}是在实践但没有深入了解的，{% label danger@红色 %}是我没有了解或者没有实践的。

## 分层测试体系

也就是说自动化测试，要根据 {% label success@测试金字塔 %}分层来做。之前我写了 [这篇文章](http://jmyblog.top/Test-Pyramid/) 总结了一下。 

## 自动化测试场景

  - {% label success@冒烟测试 %}：check主要功能
  - {% label success@功能测试 %}：自动化case覆盖功能
  - {% label danger@验收测试 %}：兼容性测试，可用性测试，无障碍测试等，这部分我目前是Manual测试
  - {% label danger@性能测试 %}： 测试性能/卡顿/应用健壮性，这部分也没了解过，我目前没做过

## 对自动化测试的错误观点和假“瓶颈”
澄清了一些对自动化测试常见的错误观点，还有我们“以为”的瓶颈:wink:

<span id="inline-toc">1.</span> {% label success@UI和业务流程变更导致自动化测试代码不可用 %}

这种问题其实是一种Technical debt.
比如一般UI自动化测试，都是根据 **id/class** 等属性定位页面元素，然后对页面进行测试的。然而，这些元素并非一成不变，这就导致需要频繁更换，使代码变得难以维护，此时我们可以在写测试的时候，要求开发给元素加上一个固定的 **QA-hook**，这样就不用频繁更换了。

<span id="inline-toc">2.</span> {% label danger@UI自动化测试只能模拟人工 %}

另一种说法是“UI自动化测试”就是机器点点点。
按课程所说，UI自动化测试发展到现在是有3个阶段：
{% note default %}
- {% label success@传统自动化测试 %}：就是我现在做的，写常规测试，加断言，需要用例维护。可以帮助做回归测试。
- {% label danger@自动探索测试 %}：可以利用自动化对新功能进行测试，也可以对老功能做回归。没有接触过。
- {% label danger@codeless方向及智能生成测试用例方向 %}：自动智能化生成case，不用写代码就可以完成自动化测试。也没有接触过。
{% endnote %}

## 根据分层测试体系控制自动化场景和规模

就是在项目开发上线整个流程中的自动化测试实践，主要是三个部分：
<span id="inline-toc">1.</span> {% label success@核心用例自动化覆盖 %}
写Smoke测试覆盖核心功能，这块已经实践了。
<span id="inline-toc">2.</span> {% label success@基础回归自动化覆盖 %}
老功能用自动化覆盖，也实践了。
<span id="inline-toc">3.</span> {% label success@新功能手工测试 %}
这块其实说的有点笼统，应该是对新功能做一些不能自动化的测试，比如探索测试，可用性测试等等。基础的功能测试应当提前写好自动化case去覆盖。

## 如何高效落地自动化

以移动端自动化测试为例，要做到三点：
<span id="inline-toc">1.</span> {% label warning@了解待测产品和平台 %}
移动端有Android/iOS/App/小程序等应用，我是没有深入了解其差异的。而Desktop端有哪些应用也并没有了解。
<span id="inline-toc">2.</span> {% label warning@精通好的测试框架 %}
比如Selenium(虽然是TW开发的), Appium等等，前者目前在用，但远远谈不上精通。后者完全无了解。
<span id="inline-toc">3.</span> {% label warning@掌握一些自动化测试代码编写技巧和关键点 %}
比如PageObject模型，TDD，智能等待，失败重试机制。这些 Good Practice 项目上在用，但自己没有深入了解。


## 常用自动化测试框架

- {% label warning@Web应用自动化 %}：Selenium
- {% label danger@App手机应用自动化 %}：Appium
- {% label danger@PC端的应用的GUI自动化 %}：Unkown
- {% label danger@微信小程序自动化 %}：App+Web测试技术的外延形态
- {% label danger@智能设备自动化 %}：Unknown

## 自动化遍历测试和探索测试工具

是指能够以自动化的方式对 app 进行充分的功能遍历以探索 bug 的工具，以移动端为例。

- {% label danger@Android原生Monkey %}
- {% label danger@百度 SmartMonkey %}
- {% label danger@腾讯 NewMonkey %}
- {% label danger@阿里 Macaca 的 NoSmoke %}
- {% label danger@Google出品的 AppCrawler %}

## The End

{% note info %}
这么多的红色和黄色，主要是一些新型工具的学习，看来真是学海无涯啊:relieved:
{% endnote %}