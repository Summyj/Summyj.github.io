---
title: 测试策略浅谈
date: 2020-09-01 15:54:38
update: 2020-11-27 15:54:38
tags: [测试策略,敏捷]
categories: 搬砖那些事儿
copyright: true
description: 揭秘敏捷团队的测试策略设计以及QA的工(ban)作(zhuan)日常。
top:
---

<img src="https://i.loli.net/2020/11/27/Nt7m4suaOyUPfBV.png" >

{% note info %}
前段时间，有同事分享了一些测试策略设计的内容，讲的很不错。并且自己也是最近才开始接触一些新的项目，之前都是中途加入项目工作，没有全面思考过测试策略的东西，所以感触比较深。于是记了点笔记和自己的心得，这样后续再加入一些新项目，也不会手足无措了。
{% endnote %}

## Foreword：前言

每一个测试小朋友进入到全新的项目时，肯定有很多{% label info@问号 %}，比如：

- 这是一个什么样的项目？
- 是一个旧项目的改造还是一个全新的项目？
- 是某个产品的一部分，还是独立的一个产品？如果是一部分，是上游，还是下游，还是中间？
- 这个项目的用户群体是什么样？用户群体的数量？
- 这个项目的周期是多久？多久发一次版，每个版本分为几个阶段？
- 这个项目要做哪些方面的测试？
- 这个项目有几个QA？
…

其实，这些问题都是包含在测试策略中的。

## What？测试策略是什么

>**测试策略**一般是针对一个整体产品或者版本，制定出的包含质量保证策略、测试范围、测试方法、测试计划管理、测试分层、测试重点和难点、测试执行过程管理、环境策略、Showcase管理、风险识别等方面的**设计文档**。

好的测试策略可以提升团队的质量水平和QA团队的工作效率，在敏捷软件开发生命周期的每一个阶段都能发挥作用。

## When？什么时候设计测试策略

{% note primary %}
测试策略的设计，一般在需求分析(Inception)阶段开始，与技术设计并行，并且在需求分析阶段不断补充和完善。需要在测试阶段开始之前闭环。
{% endnote %}

## Who？谁应该参与测试策略设计

    测试策略是由项目的QA团队输出，团队成员参与评审的。

由于敏捷开发是一种重实践，轻文档的开发模式。所以个人认为不必写出多么详尽的文档，重要的是考虑全面，列出关键点，和团队成员一起讨论，达成共识，且在后续的开发测试过程中注意与测试策略保持一致。

## How

上文提到了测试策略是由许多方面的集合，接下来就分别聊聊它们。

### 敏捷团队的质量保证策略

首先就是敏捷团队的质量保证策略，其实这就是许多非QA角色眼中的**狭义测试策略**，展示了敏捷开发中每个阶段团队如何协作来保证产品质量。个人认为这个是最基本的质量保证标准，每个敏捷团队都应该做好。

<img src="https://i.loli.net/2020/11/30/TpxlCFQ4uYWa58s.png" >

<span id="inline-toc">1.</span> **故事分析**
BA与客户沟通清楚需求后，编写故事卡，并和QA结对写AC，或者写完AC找QA review. 
<span id="inline-toc">2.</span> **故事启动**
BA组织团队成员一起讨论开发内容，澄清需求。
<span id="inline-toc">3.</span> **故事开发**
Dev同学按照需求写代码，确保单元测试的覆盖率满足要求。QA同学编写测试用例和自动化测试。
<span id="inline-toc">4.</span> **故事验收**
团队成员一起在正确的环境进行deskCheck，确保代码通过AC，满足基本需求。并再次检查单元测试的覆盖率是否满足要求。
<span id="inline-toc">5.</span> **故事测试**
QA同学进行测试，将发现的问题与BA、开发沟通并修复，直到产品行为满足需求。
<span id="inline-toc">6.</span> **故事演示**
所有故事卡测试通过后，团队组织showcase邀请客户一起查看产品功能，并对showcase中客户提出的优化建议进行记录，确定优先级后放入相应迭代开发范围。如果离上线还有一段时间，也可以组织团队成员进行BugBash，最好邀请客户，提前识别更多问题。
<span id="inline-toc">7.</span> **故事上线**
当所有Bug和优先级高的优化问题都已解决后，用户故事就可以上线了。上线后，对应用户故事的生命周期就已经终结。线上发现的问题在确定优先级后，建立新的用户故事，放入对应迭代开发范围。

{% note default %}
上线之后，团队应该回顾分析上个迭代的开发测试情况，可以一起查看迭代的**Sprint report**和**Bug report**。
{% endnote %}

    Sprint report
    

Sprint report是敏捷开发管理工具Jira的一个功能，如下图，纵轴是迭代内所有故事卡的点数，横轴是迭代时间。两周一个迭代，体现了迭代内随时间推移故事卡开发的情况：

<img src="https://i.loli.net/2020/12/01/vEqDKlLMYz6fA3X.png" >

灰色线条是在迭代开始后，默认生成的一条该迭代的理想开发速率线，灰色地带是周末，所以没有变化(这也可以看出敏捷开发是不提倡加班的:joy:)。红色是迭代开发的真实情况，健康的敏捷开发，**红线的趋势应该是和灰线基本一致的**。
上图就是因为两周内并不能完成迭代任务，所以又延迟了两周，此时就应该分析为什么会导致这种情况，是对需求理解不够，点数估计少了呢，还是别的原因，从而避免以后再发生同样的情况。
这里我再贴几张迭代的Sprint report，都是我之前经历过的真实敏捷迭代(所以我都经历了什么:sob:抱走心酸的自己:persevere:)，大家可以自己尝试分析，导致下边几种情况的可能原因：
<img src="https://i.loli.net/2020/12/01/tueAgQEZ9byo4la.png" >
<img src="https://i.loli.net/2020/12/01/xSCBPQ9MJzLVTHb.png" >
其实之前也有两条线一致的时候，但那已经是很久之前了。。。。


    Bug report

Bug report是对迭代内发现问题的总结，由QA同学产出，如何做好Bug report可以参考[ThoughtWorks洞见-Bug Report该怎么做?](https://mp.weixin.qq.com/s/OVqTsk6OJ_xi5Q4iWtKkUg)


### 测试范围和重难点分析

>**测试范围**的确定需要分析软件周期各个阶段的需求目标，了解客户期望和产品的用户群体，主要包括以下几个方面：

    功能

- 业务功能
- API功能
- 数据一致性
- ...
  

    性能

- 接口性能
- 单接口并发和非并发访问性能，混合场景并发访问性能
- 页面性能
- 常用操作页面响应时间，非常用操作页面响应时间
- ...
  

    安全

- API访问权限
- 数据访问权限
- 数据传输安全
- 数据存储安全
- 异常信息展示安全
- 日志信息安全
- ...
  

    易用性

- 页面展示的引导性
- 操作的便捷性
- 返回信息的易理解性
- ...
  

    兼容性

- 操作系统兼容
- 数据库兼容
- 浏览器兼容
- 应用软件兼容
- ...
  

    可维护性
- 软件的安装和升级是否可以很容易的完成
- 核心操作是否都有日志记录
- ...
  

    可靠性

- 接口加锁和释放
- 接口失败重试
- 服务重启后数据恢复
- 大数据处理能力
- 页面重复操作禁止
- ...
  

    稳定性

- 长时间访问系统，系统在响应时间，资源使用方面的情况
- ...

**以上这些方面，确定之后要求BA在写卡以及QA测卡时都要注意覆盖到。**

>**测试重难点**确定后，需要多增加对应模块的回归测试，开发也应该增加单元测试的覆盖率。

    测试重点

- 需求的核心功能
- 经常变化的部分
- 与其他系统相互影响的部分
  

    测试难点
- 相对不够独立的部分
- 处理过程较复杂的部分

### 测试方法与分层

{% note info %}
明确测试范围，时间和人力之后，还应该根据需求的变化来确定**测试方法**，决定是否需要自动化测试。然后再按照 [测试金字塔原理](https://jmyblog.top/Test-Pyramid/) 决定每种测试方法的比重。
{% endnote %}

### 测试计划管理

>测试计划管理是指按照团队的上线计划，确定具体的测试时间，包括迭代内测试、集成测试、回归测试、验收测试。

### 测试执行过程管理

主要包括：

- 测试计划制定和管理：按照测试计划安排的时间执行测试，避免延期
- 测试用例编写和管理：自动化用例编写以及自动化代码重构
- 测试过程记录和管理：我的做法是在每张卡里记录自己的测试环境，场景以及是否通过，疑问等等
- 测试结果管理：发现的缺陷管理，比如新建缺陷卡，Bug report等

### 环境策略

>稳定的环境是高效开发和测试的先决条件，个人人为在开发之前就应该配置好环境以及流水线等基础设施，主要用到的环境有：

- DEV环境：Dev自测和联调使用，deskCheck环境
- QA环境：QA日常测试使用
- UAT环境：用户验收测试
- 其他环境：按照项目情况准备安全环境、性能测试环境等等

### 风险识别与解决

>主要是识别敏捷开发流程中的质量风险。

<img src="https://i.loli.net/2020/12/01/rjD83zVIi9e4wHq.png" >

<span id="inline-toc">1.</span> **需求阶段**

R: 需求频繁变更，对产品的需求理解不准确有偏差。
S: 多和用户沟通，争取更充分的研发时间和测试时间，或者把提出的功能放到下一个版本中实现。提供验收环境给客户，需要的话也可以提供测试环境给客户，这样客户可以随时看到产品进展。

<span id="inline-toc">2.</span> **开发阶段**

R: 代码质量达不到相应要求，bug多，模块开发没有统一设计。
S: 提升单元测试覆盖率，进行code diff，与TL讨论更多提升代码质量的方式，确定好标准。

<span id="inline-toc">3.</span> **测试阶段**

R: 测试经验不足，用例设计不到位，对业务不熟悉、不了解用户如何操作该产品；测试时间短，测试环境与生产环境的不一致，不稳定。
S: 找BA或开发review测试用例，与开发一起pair单元测试场景；找熟悉产品的人员进行业务培训，增加人力，尽可能模拟用户使用的环境，在测试的时候尽量和用户沟通要到用户真实的数据进行测试。

<span id="inline-toc">4.</span> **上线阶段**

R: 上线环境准备不充足，与其他服务或系统有上线依赖。
S: 提前准备上线脚本、上线配置文档，上线前测试；提前识别上线依赖。


### Showcase管理

>与客户、团队成员确定多久进行一次showcase，Showcase以什么样的方式进行。确定好每次showcase的owner，推荐的做法是轮流主持。

### BugBash管理

参考 [BugBash知多少](https://jmyblog.top/BugBash/) 和 [如何成功的组织Bug bash](https://mp.weixin.qq.com/s/S5cOjQkyvpFxpfew_exZrA)。

### 遗留问题记录

>记录测试策略中还需要明确和后续更新的部分。

## The End：写在最后

以上就是测试策略应该包含的内容，果然像海一样宽广:dizzy_face:，不过在敏捷开发中，产品的质量是渗透到每一个开发阶段的，所有团队成员都应该为质量负责，愿每一个QA都能开心的工(ban)作(zhuan)。