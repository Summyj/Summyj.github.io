---
title: WebUI自动化测试框架Demo(上)
date: 2020-05-15 09:45:12
update: 2020-05-15 09:45:12
tags: [自动化测试]
categories: [学习小记]
copyright: true
description: Maven介绍，Demo Project Set Up.
top:
---

<a href="https://sm.ms/image/Fh1dMGlPyOWAKmI" target="_blank"><img src="https://i.loli.net/2020/05/15/Fh1dMGlPyOWAKmI.png" ></a>

{% note info %}
在前几篇博客中，博主分析了一个好的自动化测试框架应有的6大要素，也学习了Java的基础语法，这些都是为了准备Web UI 自动化测试框架Demo Project workshop产出的内容。
现在这个workshop已经结束了，所以想给大家分享一下全过程，概念加实操分为上中下三部分详细介绍。
{% endnote %}

## Maven 介绍

### 是什么

>[Maven](http://maven.apache.org/)是一个使用项目对象模型（POM）和一组插件来构建项目的项目管理工具。一旦熟悉了一个Maven项目，便知道所有Maven项目是如何构建的。这样可以节省浏览多个项目时的时间。
刚开始入门的时候，主要用到Maven的功能有：项目构建，管理，jar包下载。

**POM(Project object model)**:项目对象模型，可以通过一小段描述信息来管理项目的构建，报告和文档。
Maven属于java生态圈，为Java 技术开发项目提供服务。所以Maven的学习前提是要有 Java 基础相关。

### 为什么会出现

>我们想要一种标准的方式来构建项目，清晰地定义项目的组成，发布项目信息的简便方法，以及在多个项目之间共享JAR的方法。

{% note primary %}

清晰地定义项目的组成，发布项目信息: Maven用配置文件的方式对项目的描述、名称、版本号、项目依赖等等信息进行描述。使之项目描述结构清晰，任何人接手的成本比较低。

在多个项目之间共享JAR: 一个项目可能依赖于其他的项目和第三方的组件才能顺利完成，Maven提供了仓库的概念，让这些依赖项放进仓库中，项目想要从仓库中去取，其他项目组需要也从仓库中去取，不必每个人去开源项目的站点去苦苦搜寻了。

{% endnote %}

### 同类常见技术
- Ant
- Gradle
同类技术比较请看：http://blog.csdn.net/napolunyishi/article/details/39345995

### 哪些人不喜欢Maven

有人喜欢Maven，当然也有人不喜欢，外国朋友居多。主要有这么几种原因：

- 叛逆心理：不需要用Maven的时候还要被强迫使用

<a href="https://sm.ms/image/cw7APYDp8R4sQjI" target="_blank"><img src="https://i.loli.net/2020/05/18/cw7APYDp8R4sQjI.png" ></a>

- IDE对Maven的支持不可靠，不知道现在有没有好点
<a href="https://sm.ms/image/KHwzZ3a56eRVlqd" target="_blank"><img src="https://i.loli.net/2020/05/18/KHwzZ3a56eRVlqd.png" ></a>

- 逆反心理：Maven管的太宽

<a href="https://sm.ms/image/l43SBNcpdWHikYm" target="_blank"><img src="https://i.loli.net/2020/05/18/l43SBNcpdWHikYm.png" ></a>

- Maven阻碍创新
<a href="https://sm.ms/image/M6RpZLaYodNTiBO" target="_blank"><img src="https://i.loli.net/2020/05/18/M6RpZLaYodNTiBO.png" ></a>


### 怎么做

>下面我们使用maven来创建一个简单的java工程深入理解它的作用，体验一下Maven高度自动化构建项目的过程并熟悉一下常用的Maven命令：
mvn clean：表示运行清理操作（会默认把target文件夹中的数据清理）。，
mvn compile：将代码编译到target文件夹中。
mvn test：运行测试。
mvn package：运行打包。
mvn install：此命令会运行上述4个命令，因此将项目进行清理，编译，测试，打包。然后将打好的包安装到本地仓库中，以便其他的项目可以调用。

<span id="inline-toc">1.</span> 下载并解压maven
- 官网下载：https://maven.apache.org/download.cgi
- 百度网盘下载：http://pan.baidu.com/s/1hry0DJe

<span id="inline-toc">2.</span> 设置环境变量
Mac用户直接看这篇：https://www.jianshu.com/p/191685a33786
其他用户请自行百度。。。

<span id="inline-toc">3.</span> Maven项目构建过程练习

请按照下边的博客进行练习，人家已经写的很清楚了：
https://www.cnblogs.com/xdp-gacl/p/4051690.html
不过，这里有个坑：
- COMPILATION ERROR
Maven编译器是Maven系统内部的一个插件。在编译生命周期阶段，maven将采用pom中maven编译器插件中配置的Java版本去编译java代码。当我们未在pom中指定编译器插件时，它将采用maven版本随附的默认编译器插件。而默认编译器插件配置的Java版本有时可能太低不支持编译。所以我们应该在pom中指定一个较高的maven编译器插件版本：
{% codeblock lang:command %}
  <properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <maven.compiler.source>1.7</maven.compiler.source>
    <maven.compiler.target>1.7</maven.compiler.target>
  </properties>
{% endcodeblock %}


## Demo Project Set Up
### 创建Maven Project

<span id="inline-toc">1.</span> 装好JDK之后，打开IDEA，点击{% label info@File->New->Project->Maven %}，勾选“Create from archetype”，然后选择quick start：
<a href="https://sm.ms/image/fk5CHuj3VSzcxsK" target="_blank"><img src="https://i.loli.net/2020/05/15/fk5CHuj3VSzcxsK.jpg" ></a>archetype是原型的意思，这一步是为了创建以maven-archetype-quickstart为原型的Maven项目。

<span id="inline-toc">2.</span> 点击Next，命名项目，所有项目均可以自定义：
<a href="https://sm.ms/image/JzQ2vPyFL1tm7iA" target="_blank"><img src="https://i.loli.net/2020/05/15/JzQ2vPyFL1tm7iA.jpg" ></a>图中Artifact coordinates是工件坐标的意思，包括：
- GroupId：工件组名/资源包名
- ArtifactId：工件名，通常为项目名
- Version：项目版本号

<span id="inline-toc">3.</span> 命名为Automation，点击Next：
<a href="https://sm.ms/image/nuy6grKl4vSMkEd" target="_blank"><img src="https://i.loli.net/2020/05/15/nuy6grKl4vSMkEd.png" ></a>Properties里列出了项目的Artifact coordinates，还有项目原型maven-archetype-quickstart的Artifact coordinates。

**maven的.m2文件夹**

在上图中，我们可以看到User settings file和Local repository都定义在一个.m2文件夹中:
<a href="https://sm.ms/image/hBRzedQJP3CK4yT" target="_blank"><img src="https://i.loli.net/2020/05/18/hBRzedQJP3CK4yT.png" ></a>
- {% label info@.m2文件夹 %}：当使用maven命令的时候，maven才会创建.m2文件夹，里面存储maven的配置和构件。所以如果我们只是在电脑上下载安装了maven，你会发现在用户目录下不存在.m2文件夹，因为并没有让maven执行真正的任务。
- {% label info@.m2/settings.xml %}: maven配置文件。默认情况下.m2文件夹是没有setting.xml的，所以我们可以看到上图中的.m2文件夹并没有setting.xml。我们一般把Maven全局设置文件%MAVEN_HOME%/conf/settings.xml拷贝到这个文件夹下，修改成我们想要的用户设置：
<a href="https://sm.ms/image/UhTxj6nr7pcNe9V" target="_blank"><img src="https://i.loli.net/2020/05/18/UhTxj6nr7pcNe9V.png" ></a>
- {% label info@.m2/repository %}: 所有的maven构件，都存储在repository中。比如maven项目所有的jar包，下载后都会存放在此处。



<span id="inline-toc">4.</span>点击Finish后, Maven就开始引入默认插件和包，执行mvn archetype-quickstart:generate命令，下载maven-archetype-quickstart.jar文件的最新RELEASE版本并创建项目。这就是控制台输出的内容：
<a href="https://sm.ms/image/ejac3QP5tVzq6Ls" target="_blank"><img src="https://i.loli.net/2020/05/15/ejac3QP5tVzq6Ls.png" ></a>

**POM文件结构**

<a href="https://sm.ms/image/hPUczfRM4royl7T" target="_blank"><img src="https://i.loli.net/2020/05/18/hPUczfRM4royl7T.png" ></a>

- {% label info@Artifact coordinates %}：工件坐标，创建项目时指定的。
- {% label info@项目信息 %}：名称和url
- {% label info@项目属性 %}：编码/编译规则
- {% label info@依赖 %}：每个依赖的Artifact coordinates
- {% label info@插件 %}：包括Maven项目默认的插件，比如用于在本地Repository中安装jar的maven-install-plugin，用于编译代码/发布项目的maven-compiler-plugin/maven-deploy-plugin

**Maven生命周期**

Maven的生命周期是为了对所有的构建过程进行抽象，便于统一。就是什么时候干什么事，主要体现在Maven项目的所有插件逻辑，都是在Maven生命周期阶段中运行的：
<a href="https://sm.ms/image/2TgN4ZG5tfnlV1v" target="_blank"><img src="https://i.loli.net/2020/05/18/2TgN4ZG5tfnlV1v.png" ></a>一共有三个生命周期阶段：
- {% label info@clean lifecycle %}
此生命周期是在给工程做清理工作，它主要包含以下阶段：pre-clean(执行项目清理前所需要的工作), clean(清理上一次build项目生成的文件), post-clean(执行完成项目清理所需的工作)
- {% label info@default lifecycle %}
此生命周期是在编译部署工程，它主要包括initialize(初始化构建)，compile(编译)，deploy(部署)，process-sources(源代码处理)等阶段。
- {% label info@site lifecycle %}
此生命周期是在生成项目站点，它主要包含pre-site(执行一些生成项目站点前的准备工作), site(生成项目站点的文档), post-site(执行需完成站点生成的工作，如站点部署的准备工作), site-deploy(向制定的web服务器部署站点生成文件)

至此，Maven项目就创建完成了。

### 添加Selenium依赖

在IDEA点击{% label info@code->generate->dependency %}(或者在pom.xml文件里Ctrl+N->Dependency)，打开Maven Artifact Search窗口，这里可以搜索并添加依赖，搜索selenium, 因为我们是用java写代码，所以要加入selenium.java依赖包，选择任一版本：
<a href="https://sm.ms/image/N9yA8i1kGMqOJ6I" target="_blank"><img src="https://i.loli.net/2020/05/15/N9yA8i1kGMqOJ6I.png" ></a>
之后在pom.xml文件里就可以看到Selenium依赖已经添加了。显示红色因为还没有下载，所以我们要点击页面右上角的Maven小图标下载依赖包:
<a href="https://sm.ms/image/aYy6lZ4ML1UNdRS" target="_blank"><img src="https://i.loli.net/2020/05/15/aYy6lZ4ML1UNdRS.png" ></a>
下载完成后就可以看到相应依赖已经添加到项目的Extenral Libraries中了：
<a href="https://sm.ms/image/BAs3H5etboJ7Lxh" target="_blank"><img src="https://i.loli.net/2020/05/15/BAs3H5etboJ7Lxh.png" ></a>
下载的依赖文件也可以在创建项目时设置的**Local repository**路径里找到，默认是在{% label info@.m2/repository/ %}路径下。

### 下载WebDriver
有了Selenium依赖，我们还需要下载WebDirver，因为我们是用WebDriver开启浏览器测试。这里我们下载[Firefox](https://github.com/mozilla/geckodriver/releases)和[Chrome](https://chromedriver.chromium.org/downloads )的WebDriver，下载完成后在项目新建drivers文件夹放置，便于管理：
<a href="https://sm.ms/image/IisXJT1xD4q2yCG" target="_blank"><img src="https://i.loli.net/2020/05/15/IisXJT1xD4q2yCG.png" ></a>
{% note warning %}
注意，下载WebDriver之前，需要确保电脑上已经下载了对应的浏览器，否则是不能使用的。
{% endnote %}

### 编写并运行测试Case
到这里，我们所有的准备工作都做好了，在org.example包下新建{% label info@SeleniumTest.java %}文件，首先编写一个简单的测试case：
{% codeblock lang:command %}
//百度搜索Selenium
package org.example;

import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class SeleniumTest {

    @Test
    public void searchSelenium()
    {
        System.setProperty("webdriver.gecko.driver", "drivers/geckodriver");
        //指定要调用的WebDriver,也可以用Chrome
        //语法相应变为：System.setProperty("webdriver.chrome.driver", "drivers/chromedriver")

        WebDriver driver = new FirefoxDriver();

        driver.manage().window().maximize();
        driver.get("https://www.baidu.com/");
        driver.findElement(By.id("kw")).clear();
        driver.findElement(By.id("kw")).sendKeys("selenium");
        driver.findElement(By.id("su")).click();
        driver.quit();
    }
}
{% endcodeblock %}

运行成功之后，我们的Demo Project Set Up就结束了:
<a href="https://sm.ms/image/iDmgZtcjeTzqfEL" target="_blank"><img src="https://i.loli.net/2020/05/15/iDmgZtcjeTzqfEL.png" ></a>

## 参考资料
- [组织workshop同事的博客](https://www.jianshu.com/p/28b7ae892ed1)
- [Maven百度百科](https://baike.baidu.com/item/Maven)
- [Java构建工具：Ant vs Maven vs Gradle](https://blog.csdn.net/napolunyishi/article/details/39345995)
- [maven .m2文件夹在哪？](http://www.codingwhy.com/view/718.html)
- [.m2\setting.xml文件](https://www.cnblogs.com/easonjim/p/6827058.html)
- [maven是干嘛的？](https://www.zhihu.com/question/20104186)
- [Why I don’t Use Maven for my Java Projects](http://dustin.sallings.org/2010/04/01/why-not-maven.html)
- [Why I don’t like Maven](https://johlrogge.wordpress.com/2010/12/14/why-i-dont-like-maven/)
