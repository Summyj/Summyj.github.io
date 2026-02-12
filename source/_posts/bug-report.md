---
title: 缺陷分析指南
date: 2025-05-15 15:36:21
tags: [Bug Report, 缺陷分析]
categories: [搬砖那些事儿, 测试理论和实践]
copyright: true
description: 终于能把缺陷分析这事说清楚了。
top:
---

## 背景

{% note info %}
**缺陷分析** 是互联网产品开发中一个老生常谈的话题，也是敏捷开发团队非常重要的测试后移实践。旨在通过对开发周期内发现的产品缺陷做 **记录(Bug Report)** 和 **分析(Bug Analysis)**，清晰地了解产品质量现状，推动团队的质量和流程改进。
{% endnote %}

从前在工作中也做过缺陷分析，但是分析的维度比较简单，更多是为了展示 Bug Report，这就偏离了缺陷分析的目的，因为记录并生成 Bug Report 只是手段，通过 Bug Analysis 产出有效的改进 action 才是重点。

正好最近有一个契机，需要用 AI 来自动生成 Bug Report 做缺陷分析，所以深入研究了一下行业内认可的缺陷分析纬度都有哪些，以及实际项目中怎么记录和分析，形成了一套可以量化的标准。

## 缺陷记录
### 相关字段

以使用 Jira 做迭代管理的项目为例，除了卡片上的原生字段，还可以增加 **Custom Fields** 记录缺陷，以确保数据的可统计性和可追踪性。比如：

- **Bug Env**（缺陷环境）：单选下拉框，用于 Bug 卡，取值：*PROD/QA*，明确缺陷出现的环境。

- **Bug Sprint**（缺陷迭代）：下拉框，用于 Bug 卡，记录缺陷是由哪个迭代引入的。

- **Reflux Time**（回流次数）：数字文本框，用于所有类型的卡，标记迭代内的回流卡(下文有解释)，统计回流次数。

### 记录范围

以迭代为单位记录缺陷，记录范围包括：迭代内发现的 *非线上缺陷* 和 *线上缺陷*。

> **非线上缺陷（Bug Env = QA）**

迭代内发现的非线上缺陷，有 2 种情况：

<span id="inline-toc">1. 回流卡</span>

日常测试时发现由当前卡引入，且可以直接在当前卡修复的问题，需要将卡片回流到 In Progress(挪不挪卡都行)，标记 Reflux Time = 1。如果回流一次后测试还有问题，Reflux Time +1，所以迭代内卡片的 Reflux Time 总数，就可以代表迭代内卡片的缺陷总数。

<span id="inline-toc">2. 迭代内 bug 卡</span>

日常测试时发现非线上缺陷，但因为不在当前卡的 scope / effort 过大，需要新建 Bug 卡，标记 *Bug Env = QA && Bug Sprint = 当前迭代*，在迭代结束前和相关功能上线前修复。

> **线上缺陷（Bug Env = PROD）**

迭代内发现的所有线上缺陷都要新建 Bug 卡，并记录相关字段，线上问题并不一定是当前迭代引入的，有 3 种情况：

<span id="inline-toc">3. 当前迭代功能上线前发现的缺陷</span>

日常测试时发现的缺陷，因为优先级低、影响范围小，不影响上线，所以先不修，上线后就会成为线上缺陷。新建 Bug 卡，标记 *Bug Env = PROD*，因为是主动放手的线上缺陷，如果不想算在缺陷逃逸率里，可以不标记 Bug Sprint。

<span id="inline-toc">4. 当前迭代功能上线后发现的线上缺陷</span>

新建 Bug 卡，标记 *Bug Env = PROD && Bug Sprint = 当前迭代*。

<span id="inline-toc">5. Regression 测试发现的历史问题/突发的线上问题</span>

有可能是上个甚至上上个迭代引入的问题，新建 Bug 卡，标记 *Bug Env = PROD && Bug Sprint*。Bug Sprint 应该是导致该 Bug 产生的 Jira 卡 QA Done 的那个 Sprint，如果不知道是哪个卡引入的也可以直接标记大概的 Sprint。

## 缺陷分析

### 分析维度

通过 AI 推荐再结合自己的经验，以及可视化和可量化的要求，我总结了 4 个缺陷分析维度。

{% label info@1. Reflux Card Rate By Sprint %}
记录每个 Sprint 回流卡占比(迭代回流卡数/迭代总卡数)的趋势变化。

在 Jira 里，每个卡片的 Sprint 值可能有多个，按照项目实际情况，使用卡片被挪到 QA Done 时的 Sprint 值作为该卡的归属 Sprint 是比较合理的，如果有多个 QA Done Sprint 就取最新的值，即：**latest_qa_done_sprint**。

比如，Sprint1 的回流卡占比 = Sprint1 的回流卡数(latest_qa_done_sprint = Sprint1 & Reflux Time!=0) / Sprint1 的总卡数(latest_qa_done_sprint = Sprint1)

量化标准：*取稳定几个迭代的平均值作为目标值，Reflux Rate 应该低于目标值。*

{% label primary@2. Total Bugs By Sprint %}
记录每个 Sprint 总 bug 数的趋势变化。

比如，Sprint1 Total Bugs =  Sprint1 产生的线上 bugs(Bug Sprint=1 & Bug Env=PROD) + Sprint1 产生的非线上 bugs

Sprint1 产生的非线上 bugs = Sprint1 回流卡(latest_qa_done_sprint = Sprint1 & Reflux Time!=0) 的 Reflux Time 总数 + Sprint1 产生的迭代内 bug 卡数(Bug Sprint=1 & Bug Env=QA)

量化标准：*总缺陷数应该随着迭代时间趋于收敛，但因为每个迭代的工作量和功能复杂度不同，可能会有一些浮动，不过浮动应该在合理范围内。*

{% label danger@3. Prod Bug Escape Rate By Sprint %}
记录每个 Sprint 线上缺陷逃逸率(迭代产生的线上 bugs / 迭代产生的总 bugs)的趋势变化。

量化标准：*取稳定几个迭代的平均值作为目标值，Escape Rate 应该低于目标值。*

{% label success@4. Prod Bug Card AVG Fix Days %}
分优先级记录线上 bug 卡的平均修复时间。

量化标准：*为每种优先级设置修复时间目标值，比如 Highest 的线上 bug 应该 1-2 天内修复，Medium 的线上 bug 应该 3-5 天内修复等等，每种优先级的 Average Fix Days 应该低于目标值。*

### Bug Report

知道了怎么记录缺陷和每个缺陷分析维度的计算逻辑，就可以轻松的利用 AI 自动生成 Bug Report。目前我用过的工具有 [DX](https://getdx.com/) 和 Jira Dashboard:

- **DX** : 一种 BI(Business Intelligence) 工具，导入 Jira 数据后就可以利用它内置的 AI Tools，把每个缺陷分析维度的计算逻辑喂给它，自动生成查询语句和图表。
- **Jira Dashboard** : 利用 Jira 内置的 Dashboard 功能和 JQL 也可以实现自动生成图表。

### 缺陷分析

生成 Bug Report 之后，就可以按照以下 3 个步骤做缺陷分析，逐步开展质量改进计划：

>1.指标回顾

每个迭代结束后，观察 Total Bugs By Sprint 趋势，对照预设的目标值查看迭代的 Escape Rate / Prod bug Average Fix Time / Reflux Rate 维度数据，Total Bugs 趋势浮动异常或纬度数据不满足目标值时需要分析原因。

>2.原因分析

识别问题发生的根因，比如需求不清晰、开发遗漏、测试覆盖不足等，可以利用 5 Whys 分析法，​通过连续提问「为什么？」来寻找问题根源。

>3.Bug Report 分享讨论

在团队内定期分享讨论 Bug Report，推荐的会议场景：

- IPM(Iteration Planning Meeting)：Bug Report 的各项数据作为项目指标的一部分，和其他项目数据一起分享讨论。

- Retro(Sprint Retrospective)：Retro 时分享 Bug Report，和团队一起讨论。

- Bug Report Review Meeting：如果迭代的各个维度均严重偏离预期，可以举办一个专门的会议分享讨论。

>4.改进计划

和团队讨论后制定改进 Action，明确 Owner 持续跟进，必要时纳入团队工作流程，并在下次分享时回顾执行效果。如果一段时间内各个缺陷分析维度持续满足预期，就可以考虑适当调整目标值，提高预期，以持续改进。