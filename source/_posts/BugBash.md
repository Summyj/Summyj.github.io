---
title: BugBash知多少
date: 2020-03-15 10:10:19
update: 2020-03-27 10:10:19
tags: [BugBash]
categories: [项目实践]
copyright: true
description: 啥是BugBash，以及如何做好一次BugBash。
top:
---

![bugbash.jpeg](https://i.loli.net/2020/04/22/yAYns8QTWjpUgi7.jpg)

## 啥是BugBash

其实说白了，BugBash就是大家来找茬的过程，找谁的茬呢，当然是要上线的新功能。

{% codeblock lang:command %}
时间：产品上线前一两周，测试结束之后。
地点：最好找个会议室，线上也行
人物：参与产品开发的所有人，主要包括开发，测试，产品经理，客户，相关Team人员
事件：大家一起找bug
{% endcodeblock %}

所有比较重要的功能或者改动比较大的功能都应该有Bug Bash(除了一些非常小的功能)。Bug Bash发现的不一定只是Bug，有时也可以提出对某些功能的改进建议。

## 如何做好一次BugBash
### 在BugBash之前
- 确定好每次Bug Bash的Owner。
- Owner需要了解这个功能的业务需求并将其整理到Bug Bash文档中 。
- BugBash文档的内容应当包含：被测功能简单介绍、主要测试场景及其checkpoints、测试数据、测试任务分配、结果讨论。
- Owner在书写完Bug Bash文档之后，可以将内容发送给团队成员一起查看是否有需要补充其他内容。
- Owner需要提前收集使用产品的用户设备信息，用使用率较高的设备/浏览器/终端来做BugBash。


### 在BugBash会议中
- Owner可以把Bug Bash会议时间控制在1-1.5h之内，用30-50min的时间进行探索性测试，剩余的时间讨论发现的问题。
- 每个在BugBash中发现的Bug/Improvement，都应由发现问题的人来建卡记录Bug细节和修复这个Bug需要的时间。
- 每个在BugBash中发现的Bug/Improvement，Owner都需要与客户/产品经理沟通确定哪些Bug需要修复，并确定好优先级。如果他们都未参加Bug Bash会议，也可以会议再沟通。


### 在BugBash之后
- Bug Bash的Owner应当跟踪所有Bug的状态{% label default@TO DO %}/{% label warning@IN PROGRESS %}/{% label success@DONE %}并及时更新在文档里，更新完成之后将修复结果分享给团队。


## 我的BugBash模版
### 基本信息
![image.png](https://i.loli.net/2020/04/22/g8jDuA79mFJcU6b.png)

### 被测功能简单介绍
简单介绍此次BugBash要测的Feature或者Function。必要的话还可以demo展示。
### 主要测试场景及其checkpoints
描述主要测试场景，和每个测试场景需要注意的测试点。
![image.png](https://i.loli.net/2020/04/22/ltR1Eo5hSfi6DrC.png)

### 测试数据
提前准备测试需要的各种数据和账号，确认每个参会的人有权限访问和进行测试。
![image.png](https://i.loli.net/2020/04/22/pZeGR83to2XPhmF.png)

### 测试任务分配
给每个参会小伙伴分配测试任务，包括测试设备、测试数据分配，有时也可以包括测试场景分配，按照具体情况而定。
![image.png](https://i.loli.net/2020/04/22/FGkZLP2TosCfBc3.png)


### 结果讨论
测试完成后，将所发现的问题逐个进行讨论，补全表格中空缺内容随后可直观的根据表格查看该Bug的状态和优先级。
![image.png](https://i.loli.net/2020/04/22/hw3XUxQl9cEzZYK.png)