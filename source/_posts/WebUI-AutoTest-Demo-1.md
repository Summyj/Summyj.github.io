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

>[Maven](http://maven.apache.org/)是一个项目管理工具，它包含了一个项目对象模型 (Project Object Model)，一组标准集合，一个项目生命周期(Project Lifecycle)，一个依赖管理系统(Dependency Management System)，和运行插件的逻辑。

**POM(Project object model)**:项目对象模型，可以通过一小段描述信息来管理项目的构建，报告和文档。
Maven属于java生态圈，为Java 技术开发项目提供服务。所以Maven的学习前提是要有 Java 基础相关。

### 同类常见技术
- Ant
- Gradle
同类技术比较：http://blog.csdn.net/napolunyishi/article/details/39345995

### 为什么会出现

当时有一些项目（有各自Ant build文件），仅有细微的差别，而JAR文件都由CVS来维护。
于是希望有一种标准化的方式构建项目，一个清晰的方式定义项目的组成，一个容易的方式发布项目的信息，以及一种简单的方式在多个项目中共享JARs。


## Demo Project Set Up
### 创建Maven Project

<span id="inline-toc">1.</span> 装好JDK之后，打开IDEA，点击{% label info@File->New->Project->Maven %}，勾选“Create from archetype”，然后选择quick start:
<a href="https://sm.ms/image/fk5CHuj3VSzcxsK" target="_blank"><img src="https://i.loli.net/2020/05/15/fk5CHuj3VSzcxsK.jpg" ></a>
archetype(原型)，创建以maven-archetype-quickstart为原型的Maven项目。


<span id="inline-toc">2.</span> 点击Next，命名项目，所有项目均可以自定义：
<a href="https://sm.ms/image/JzQ2vPyFL1tm7iA" target="_blank"><img src="https://i.loli.net/2020/05/15/JzQ2vPyFL1tm7iA.jpg" ></a>
Artifact coordinates：工件坐标
"GroupId" 工件组名/资源包名
"ArtifactId" 工件名，通常为项目名
"Version" 项目版本号




<span id="inline-toc">3.</span> 命名为Automation，点击Next，：
<a href="https://sm.ms/image/nuy6grKl4vSMkEd" target="_blank"><img src="https://i.loli.net/2020/05/15/nuy6grKl4vSMkEd.png" ></a>
Properties里列出了项目的Artifact coordinates，还有项目原型maven-archetype-quickstart的Artifact coordinates。
.m2文件？，"User settings file"和"Local repository" 可以自定义？，它们各自是用来干啥？：






<span id="inline-toc">4.</span>点击Finish, Maven项目就创建完成了：
<a href="https://sm.ms/image/ejac3QP5tVzq6Ls" target="_blank"><img src="https://i.loli.net/2020/05/15/ejac3QP5tVzq6Ls.png" ></a>
页面显示下载文件 啥？
引入默认插件，执行mvn archetype-quickstart:generate命令，下载maven-archetype-quickstart.jar文件的最新RELEASE版本并创建项目。

**POM文件结构：**
<a href="https://sm.ms/image/hPUczfRM4royl7T" target="_blank"><img src="https://i.loli.net/2020/05/18/hPUczfRM4royl7T.png" ></a>

- Artifact coordinates：工件坐标，创建项目时指定的。
- 项目信息：名称和url
- 项目属性：编码/编译规则
- 依赖：每个依赖的Artifact coordinates
- 插件：包括Maven项目默认的插件，比如用于在本地Repository中安装jar的maven-install-plugin，用于编译代码/发布项目的maven-compiler-plugin/maven-deploy-plugin

**Maven生命周期**

Maven的生命周期是为了对所有的构建过程进行抽象，便于统一。主要体现在Maven项目的所有插件逻辑，都是在Maven生命周期阶段中运行的：
<a href="https://sm.ms/image/2TgN4ZG5tfnlV1v" target="_blank"><img src="https://i.loli.net/2020/05/18/2TgN4ZG5tfnlV1v.png" ></a>一共有三个生命周期阶段：
- clean lifecycle
- default lifecycle
- site lifecycle


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
