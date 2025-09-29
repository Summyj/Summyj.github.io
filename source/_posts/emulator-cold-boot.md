---
title: 安卓模拟器快速冷启动
date: 2021-07-15 09:54:40
update: 2021-08-03 09:54:40
tags: [emulator, Android]
categories: [搬砖那些事儿, 自动化测试]
copyright: true
description: 通过保存snapshot快速冷启动安卓模拟器。
top:
---

{% note info %}
问题
{% endnote %}

博主最近搬砖，发现安卓模拟器有一些小bug，最常见的是App打不开，得冷启动模拟器后，卸载App重新安装才可以。由于项目暂时用不了真机，只能在模拟器测试，所以经常遇到这个问题，每次都得重复这个步骤：{% label primary@冷启动模拟器->卸载App->安装App %}。

{% note info %}
解决
{% endnote %}

首先冷启动模拟器：

![Cold Boot](https://i.loli.net/2021/08/03/rTQ1wObeRgiEqya.png)
卸载测试App，之后点击模拟器右侧菜单栏 **...** 按钮进入高级设置，然后进入Snapshots选项，点击TAKE SNAPSHOT：

![TAKE SNAPSHOT](https://i.loli.net/2021/08/03/JYDru2NTiqeoG8Q.png)
之后可以看到新的snapshot，这里我命名为quickboot：

![命名snapshot](https://i.loli.net/2021/08/03/ZEwqUF9OSnTQaI6.png)
打开AVD Manager页面，编辑刚才的模拟器，在高级设置中选择通过snapshot启动模拟器，点击finish：

![编辑设置](https://i.loli.net/2021/08/03/dl2a1SJIHDR6knA.png)
最后再打开编辑页面检查一遍，确保设置正确，我自己设置的时候，发现这里要选择两次才可以，感觉又是AVD Manager的一个bug。
设置完成后，以后再打开模拟器测试，就是一个干净的测试环境了，只需要再安装测试App就可以了，再也不用经常手动冷启动了。


