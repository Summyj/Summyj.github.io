---
title: AppUI自动化测试第三弹-Android篇
date: 2021-05-23 18:15:19
update: 2021-05-24 18:15:19
tags: [Bitrise, Android]
categories: [搬砖那些事儿, 自动化测试]
copyright: true
description: 将代码库部署到Bitrise CI，实现Android平台的持续集成。
top:
---

![image.png](https://i.loli.net/2021/05/25/f8GPuvCgVNoA61q.png)

上篇博客我们完成了测试代码库在iOS平台的CI集成，这篇文章继续讲Android平台。没有看过前几篇的同学也不用担心，可以先fork [我的代码库](https://github.com/Summyj/AppUI-AutoTest) 和 [模拟的Android开发代码库](https://github.com/bitrise-io/sample-apps-android-sdk22) 到你的github账户，然后注册一个 [Bitrise](https://www.bitrise.io/) 账号即可。

## 创建Android应用

刚注册Bitrise的小伙伴可以选择standard plan -> add first app：
![image.png](https://i.loli.net/2021/05/24/ivXJu7KHpICV6Ay.png)
或者回到Dashboard页面，点击Add new app，选择第一项，就会出现创建App页面：
![image.png](https://i.loli.net/2021/05/24/daeLy83u7s15xvJ.png)
![image.png](https://i.loli.net/2021/05/24/7JP2ti1xsuGfvDE.png)
选择Privare后继续，然后是连接代码库，按照提示 Connect Github，连接之后你会看到自己所有的代码库：
![image.png](https://i.loli.net/2021/05/24/ZjReaio4EVXcyYl.png)
![image.png](https://i.loli.net/2021/05/24/RD9NF4ZMaQ2zwc6.png)
我们选择之前fork的Android应用代码库 **sample-apps-android-sdk22**，然后继续：
![image.png](https://i.loli.net/2021/05/26/KHQy36Wuvdk9mqX.png)
由于我们之后还需要Bitrise下载测试代码库，所以选择 I need to, 复制Bitrise提供给我们的SSH key添加到你的github setting里：
![image.png](https://i.loli.net/2021/05/26/X9xa5heLAZbzSrk.png)
保存之后选择i've added the SSH key，下一步将部署应用的分支命名为master后继续,此时Bitrise会配置你的App(如果有报错就再次选择master分支再部署):
![image.png](https://i.loli.net/2021/05/26/HV53lg6SA8bmLpj.png)
之后出现Android图标，说明它被识别为一个Android app，完成后我们直接点击Next&Next&Confirm走完这一步：
![image.png](https://i.loli.net/2021/05/26/v8qybjcYhpX5wFJ.png)
跳过app icon和webhook步骤，点击页面右上角finish按钮完成设置：
![image.png](https://i.loli.net/2021/05/26/V4r95zG1pHQkDBP.png)
之后页面跳转到Dashboard，Bitrise会跑第一次build，在页面右侧会看到你的App：
![image.png](https://i.loli.net/2021/05/26/2LIiTUCwEjbG1lu.png)
## 添加e2e workflow
依次点击页面右侧App -> Workflow ，进入Workflow编辑页面，点击 “+ Workflow” 新增一个名为e2e的 workflow：
![image.png](https://i.loli.net/2021/05/26/UEAFWjvYlk1NMpg.png)
然后自动进入该workflow的编辑页面，我们将在此workflow下载测试代码库并执行测试，页面左侧为该workflow的执行步骤和内容，Bitrise可能会默认预置一些步骤，点击左侧 + 号可以打开新增步骤页面，搜索你想要的步骤然后点击，它就会被添加到workflow里：
![image.png](https://i.loli.net/2021/05/24/N6P28sGVBMnU3T9.png)
接下来请依次添加以下步骤。

### 添加Emulator并等待启动
第一步是启动模拟器，由于模拟器启动很慢，所以把它放在第一步。且与iOS不同，Bitrise给Android emulator提供了等待启动的步骤，这样就不用担心模拟器连不上了。可以利用上面的方法在ALL选项里搜索到这一步，然后修改API Level, 这个值对应测试代码库文件 android.conf.js 里的platformVersion(10就是29，11就是30)：
![image.png](https://i.loli.net/2021/05/26/Qt6iFbkRIJjZMVq.png)
这一步不需要改动：
![image.png](https://i.loli.net/2021/05/26/nZP1lfE2az4DyCo.png)
### Activate SSH key& Git Clone

这两步不需要做任何改动，保持默认的配置就好，这两步通常为每个workflow最开始的两个步骤，是用SSH的方式下载主代码库，这里是指 **sample-apps-android-sdk22** 这个代码库：
![image.png](https://i.loli.net/2021/05/26/ZWX6gSilAVazqDu.png)

我们先保留以上四步，点击右上角保存按钮，之后回到应用页面，选择开始build，选择e2e workflow，然后开始Build:
![image.png](https://i.loli.net/2021/05/26/Tb4AgVXcCSvloQs.png)
请确保运行成功，一般不会有问题的哈，否则自行搜索解决哦：
![image.png](https://i.loli.net/2021/05/26/XtOwQhn29dKgubN.png)

### 克隆测试代码库
然后我们来下载测试代码库，搜索并添加一个Script步骤，内容如下，repo地址请换成自己的哦：
![image.png](https://i.loli.net/2021/05/26/2iJ5YMVmqOUFKsD.png)
然后进入上个build成功的详情页，直接点击rebuild即可：
![image.png](https://i.loli.net/2021/05/26/twh71nYu2szfMGI.png)
这里加上pwd的原因是要找到代码库在Bitrise服务器上的路径，这样就可以知道app的绝对路径了，同时也方便进行下边的步骤：
![image.png](https://i.loli.net/2021/05/26/qgQIob1tMZDPNjx.png)
然后需要改一下代码库里android.conf.js的app路径，这里我的代码库也已经改好了：
![image.png](https://i.loli.net/2021/05/26/Jj6OA1CUcwlz5Zo.png)
与iOS不同，在Bitrise配置时，这里deviceName的值不是某个具体设备名称，比如“iPhone 11”，而是固定的“emulator”。

### 下载代码库依赖
同样搜索并添加一个Script步骤，内容如下：
![image.png](https://i.loli.net/2021/05/26/Va9m3KDYjM6RTv4.png)

### 执行测试
终于到了关键的一步了，执行测试，添加Script步骤，内容如下：
![image.png](https://i.loli.net/2021/05/26/NDQk2PqSUI3vceo.png)
这次我们不直接运行rebuild，而是选择“Rebuild with remote access”，与iOS不同，Bitrise只给安卓提供了通过Terminal连接Bitrise的远程机器，在此机器上会运行我们的workflow：
![image.png](https://i.loli.net/2021/05/26/wfXjKMclDrLt1Jm.png)
按照Bitrise提供的地址和密码连接即可(每次运行地址和密码都会变)，但只能通过命令行访问，不能直观的看到机器，可以看到我们的测试代码库：
![image.png](https://i.loli.net/2021/05/26/FfLzO8Amj7BdxoN.png)
耐心等待，测试就会开始执行并且运行成功，虽然不能通过screen sharing连接服务器直观看到测试执行，但有了等待模拟器的步骤，只要测试代码没有问题，运行速度会很快且成功率高：
![image.png](https://i.loli.net/2021/05/26/Bk1JX5f4GgNlc38.png)

### 导出测试报告&部署到Bitrise
之后搜索添加test report和deploy步骤，就可以在每次运行后看到测试报告了，这里要改路径为下图：
![image.png](https://i.loli.net/2021/05/26/qP6WtDV8L7OAIzl.png)
这个就用系统默认的输入，不用改啥：
![image.png](https://i.loli.net/2021/05/26/u9ScPnVjtvyi57K.png)
运行后查看：
![image.png](https://i.loli.net/2021/05/24/RuSqzrx4bZyPcN5.png)
忽略这个iphone11的名字哈，不知道为啥会带上这个，本来应该是android-emulator之类的开头，不过不要在意这些细节哈哈哈，成功了就行：
![image.png](https://i.loli.net/2021/05/26/1scBq5ml7w4nAzO.png)
## 结束之后

AppUI自动化入门系列到这里就结束啦，不知不觉已经写了一万多字呢，虽然是机器写的，但是手也很酸呐哈哈哈。希望能给大家带来一些新知识和新启发，测试君冲鸭！！！