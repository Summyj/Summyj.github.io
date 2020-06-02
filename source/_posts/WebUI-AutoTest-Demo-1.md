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

<img src="https://i.loli.net/2020/05/15/Fh1dMGlPyOWAKmI.png" >

{% note info %}
在前几篇博客中，博主分析了一个好的自动化测试框架应有的6大要素，也学习了Java的基础语法，这些都是为了准备Web UI 自动化测试框架Demo Project workshop产出的内容。
现在这个workshop已经结束了，所以想给大家分享一下全过程，概念加实操分为上中下三部分详细介绍。
{% endnote %}

## Maven 介绍

### 定义

>[Maven](http://maven.apache.org/)是一个使用POM来构建项目的项目管理工具，它固化了软件开发中的一些最佳实践和模式(比如项目的目录模式，项目的依赖管理，再到整个项目的构建模式)。
所以一旦熟悉了一个Maven项目，就知道所有Maven项目是如何构建的，这样可以节省浏览多个项目时的时间。虽然Maven主要用于管理Java项目，但它也可以用于构建和管理C#，Ruby，Scala和其他语言编写的项目。

**POM(Project object model)**: 项目对象模型，可以通过一小段描述信息来管理项目的构建，报告和文档。

### 没有Maven之前

我们知道，Maven是一个项目管理工具。

但是项目管理是一个很抽象的概念，它既可以指技术上的管理手段，也可以指“以人为本”的非技术因素，那么Maven自然指的是前者了。为了更好的理解Maven的作用，就要知道没有Maven这类管理工具之前，开发团队是怎么做项目技术管理的。

{% note primary %}
以Java项目为例，在开发中，为了保证编译通过，我们会到处去寻找jar包。
有时当编译通过了，运行的时候，却发现"ClassNotFoundException"，我们想到的是，难道还差jar包？很难定位或避免jar包和依赖缺失的问题。
而且每个Java项目的目录结构都没有一个统一的标准，配置文件到处都是，单元测试代码到底应该放在哪里也没有一个权威的规范，项目构建过程无法准确定义，流程复杂。给项目的交接带来了困难。
{% endnote %}

基于这种种困难，我们希望有一种标准的方式来构建项目，清晰地定义项目的组成，简便的发布项目信息，以及实现在多个项目之间共享JAR。Maven这样的项目管理工具就应运而生了。

### 有了Maven以后

    不用到处去找项目依赖的jar包了

在pom文件列出项目依赖：提供自动下载，方便引入项目所需依赖 Jar 包。
仓库管理(本地仓库/远程仓库)：提供统一管理所有 Jar 包的工具，想要什么jar包直接从仓库中去取，不必每个人去开源项目的站点去苦苦搜寻了。

>**举个例子**
比如做酸菜鱼，可以直接去超市买酸菜鱼调料包，就不用自己去买各种配料了，也不用操心配料怎么配。Maven就是这个超市，只是它卖的不是酸菜鱼调料包，而是一个jar包已经和它有依赖关系的其他jar包。这样，就不用在项目开始前，去各个网站下载各种不同的jar包了，也不用考虑它们之间的依赖关系。

    目录结构标准化

Maven提供了一套标准的目录结构，下边是最基本的：
<img src="https://i.loli.net/2020/05/20/qPQsLF6JdGVuOic.png" width="300" height="250" >

    用配置文件描述项目信息

用配置文件的方式对项目的描述、名称、版本号、项目依赖等等信息进行描述。使项目描述结构清晰，任何人接手的成本比较低。

    用生命周期描述项目构建过程

用生命周期的概念进行项目构建，就是什么时候干什么事，下文中有详细介绍。

### 同类常见技术
- Ant+lvy: 用build.xml设置task，指定顺序，声明项目构建。使用Apache Ivy来处理Jar包的依赖(在ivy.xml中指定依赖)。
- Gradle: 用build.gradle文件声明项目构建，使用Groovy代替xml声明设置项目。

{% note info %}
**比较：**
Ant(2000)的主要优点在于对构建过程的控制上，可以自定义构建脚本。但除非是很小的项目，否则它的XML文件很快就大得无法管理。

Maven(2004)的主要优点是生命周期，而且提供自动下载jar包。但正因Maven“约定大于配置”的思想，很难写出复杂、定制化的构建脚本，牺牲了灵活性，甚至不如Ant。同样，用XML写的配置文件会变得越来越大。

Gradle(2012)结合了前两者的优点，它具有Ant的灵活，又有Maven的生命周期管理且易于使用，也提供自动下载jar包。而且它用一种基于Groovy的特定领域语言来声明项目设置，而不是传统的XML，语法更加短小精悍、易于理解。
{% endnote %}

### 怎么做

>常用的开发工具里面都集成了Maven，提供了图形化操作Maven项目的方式(可能有少许的Bug)，比较方便。下文Demo Project Set Up中会展示在IDEA中创建Maven项目。为了熟悉常用的Maven命令，这里我们就不用图形化操作这种方式，尝试使用本地maven创建一个简单的java工程,深入理解它的作用，体验一下Maven高度自动化构建项目的过程，并解释一些重要的概念。

#### Maven安装和环境变量配置
<img src="https://i.loli.net/2020/05/21/oZpv5dSm7J4yXgP.png" >

- [MacOS](https://www.jianshu.com/p/191685a33786)
- [Windows](https://www.jianshu.com/p/62a76daf5096)

#### 使用Maven项目模版快速创建java项目

**archetype(原型)**，是一个 Maven 插件，准确说是一个项目模板，它的任务是根据模板创建一个项目结构。我们将使用 quickstart 原型插件的RELEASE版本创建一个简单的 java 应用程序。在你想要生成Maven项目的文件夹(我就直接在桌面创建了)输入命令：

{% codeblock lang:command %}
mvn archetype:generate -DarchetypeArtifactId=maven-archetype-quickstart -DarchetypeVersion=RELEASE
{% endcodeblock %}

Maven将开始处理， 询问项目细节并确认设置，选择默认设置直接按Enter继续：
<img src="https://i.loli.net/2020/05/26/t7iC5AY8BeZdNuj.png" >
{% note primary %} 知识点来了

GroupId: 工件组名，顾名思义，这个应该是公司名或是组织名。一般由三个部分组成，每个部分之间以”.”分隔，第一部分是项目用途，比如用于商业的就是”com”，用于非营利性组织的就是”org”；第二部分是公司名，比如”tengxun”、”baidu”、”alibaba”；第三部分是你的项目名。

ArtifactId: 项目名

Version: 项目版本号，SNAPSHOT版本代表不稳定、尚处于开发中的版本。

package: 资源包名，默认为工件组名。

GroupId/ArtifactId/Version 合称为**Artifact coordinates(工件坐标)**：每一个 Jar包/插件/项目都需要定义一个唯一标识，方便管理维护，因此 Maven 使用 groupId, artifactId, versionId 三元素组成一个 Jar 的坐标。当我们依赖该 Jar 包时，同样需要指定该 Jar 包的坐标。
{% endnote %}

之后 Maven 就开始创建项目结构，显示如下:
<img src="https://i.loli.net/2020/05/26/DeYf9bPKNWta71l.png" >

现在桌面已经生成了Maven项目Hello, 它具有Maven标准的目录结构，还有Maven帮我们自动生成的App.java和AppTest.java文件：
<img src="https://i.loli.net/2020/05/26/TYhkuHLzJgdvsfw.png" >
<img src="https://i.loli.net/2020/05/26/dRIEoeAKfUGsizF.png" >

#### .m2文件夹

上文提到，Maven通过仓库统一管理jar包，包括本地仓库和远程仓库。Maven工作时，首先会从本地仓库中获取jar包，当无法获取指定jar包时，本地仓库会从远程仓库中下载jar包，并放入本地仓库以备将来使用。

Maven本地仓库的配置文件和本地jar包存放在.m2文件夹中:
<img src="https://i.loli.net/2020/05/18/hBRzedQJP3CK4yT.png" >
- {% label info@.m2文件夹 %}：当使用maven命令的时候，maven才会创建.m2文件夹，所以如果我们只是在电脑上下载安装了maven，你会发现在用户目录下不存在.m2文件夹，因为并没有让maven执行真正的任务。
- {% label info@.m2/settings.xml %}: maven配置文件。默认情况下.m2文件夹是没有setting.xml的，所以我们可以看到上图中的.m2文件夹并没有setting.xml。我们一般把Maven全局仓库设置文件%MAVEN_HOME%/conf/settings.xml拷贝到这个文件夹下，修改成用户仓库设置，后者优先级更高：
<img src="https://i.loli.net/2020/05/18/UhTxj6nr7pcNe9V.png" >
- {% label info@.m2/repository %}: maven项目所有的jar包，下载后都会存放在此处。

#### pom.xml文件结构解释

pom.xml配置文件是Maven的核心，它包含了项目的基本信息，用于描述项目如何构建，声明项目依赖，等等。
Maven工作时，会在当前目录中查找pom.xml并读取内容，获取所需的配置信息，然后执行目标。
这里我们用默认生成的pom.xml为例详细解释下它的结构：

{% codeblock lang:command %}
<!-- 当前Maven模型的版本号，对于Maven2和Maven3来说，它只能是4.0.0 -->

<?xml version="1.0" encoding="UTF-8"?>

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

<!-- 项目信息：坐标、版本、名称、url等等 -->

  <groupId>org.me.hello</groupId>
  <artifactId>Hello</artifactId>
  <version>1.0-SNAPSHOT</version>

  <name>Hello</name>
  <!-- FIXME change it to the project's website -->
  <url>http://www.example.com</url>

<!-- 定义项目的配置属性的，例如项目构建源码编码方，maven编译插件版本等等 -->

  <properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <maven.compiler.source>1.7</maven.compiler.source>
    <maven.compiler.target>1.7</maven.compiler.target>
  </properties>

<!-- 项目依赖及其坐标，相关jar包存放在.m2/repository下 -->

  <dependencies>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.11</version>
      <scope>test</scope>
    </dependency>
  </dependencies>

<!-- 构建项目需要的信息，包括Mave生命周期中的插件目标列表等等。  -->

  <build>
    <pluginManagement><!-- lock down plugins versions to avoid using Maven defaults (may be moved to parent pom) -->
      <plugins>
        <!-- clean lifecycle, see https://maven.apache.org/ref/current/maven-core/lifecycles.html#clean_Lifecycle -->
        <plugin>
          <artifactId>maven-clean-plugin</artifactId>
          <version>3.1.0</version>
        </plugin>
        <!-- default lifecycle, jar packaging: see https://maven.apache.org/ref/current/maven-core/default-bindings.html#Plugin_bindings_for_jar_packaging -->
        <plugin>
          <artifactId>maven-resources-plugin</artifactId>
          <version>3.0.2</version>
        </plugin>
        <plugin>
          <artifactId>maven-compiler-plugin</artifactId>
          <version>3.8.0</version>
        </plugin>
        <plugin>
          <artifactId>maven-surefire-plugin</artifactId>
          <version>2.22.1</version>
        </plugin>
        <plugin>
          <artifactId>maven-jar-plugin</artifactId>
          <version>3.0.2</version>
        </plugin>
        <plugin>
          <artifactId>maven-install-plugin</artifactId>
          <version>2.5.2</version>
        </plugin>
        <plugin>
          <artifactId>maven-deploy-plugin</artifactId>
          <version>2.8.2</version>
        </plugin>
        <!-- site lifecycle, see https://maven.apache.org/ref/current/maven-core/lifecycles.html#site_Lifecycle -->
        <plugin>
          <artifactId>maven-site-plugin</artifactId>
          <version>3.7.1</version>
        </plugin>
        <plugin>
          <artifactId>maven-project-info-reports-plugin</artifactId>
          <version>3.0.0</version>
        </plugin>
      </plugins>
    </pluginManagement>
  </build>
</project>

{% endcodeblock %}

**Maven生命周期**

Maven有三个标准的生命周期(clean/default/site)，每一个生命周期都有一个或多个插件目标，每个插件目标代表一个特定的任务/命令/生命周期阶段。所有的插件目标都在pom文件中保存。Maven的生命周期是为了对所有的构建过程进行抽象，便于统一。就是什么时候干什么事。

- {% label info@clean lifecycle %}


此生命周期是在给工程做清理工作，它包含以下阶段：pre-clean(执行项目清理前所需要的工作), clean(清理上一次build项目生成的文件), post-clean(执行完成项目清理所需的工作)等等。
在一个生命周期中，运行某个阶段的时候，它之前的所有阶段都会被运行，也就是说，如果执行“mvn clean”将运行pre-clean&clean两个生命周期阶段。

- {% label info@default lifecycle %}


这是 Maven 的主要生命周期，被用于构建应用。它主要包括项目的compile(编译)，test(测试)，package(打包)，install(安装)，deploy(部署)等阶段。

- {% label info@site lifecycle %}


Site生命周期是用来创建新的报告文档、部署站点等。它主要包含pre-site(执行一些生成项目站点前的准备工作), site(生成项目站点的文档), post-site(执行需完成站点生成的工作，如站点部署的准备工作), site-deploy(向制定的web服务器部署站点生成文件)等阶段。

#### 使用Maven编译项目

将App.java代码改动如下：

{% codeblock lang:command %}
package org.me.hello;

public class App 
{
    public String sayHello(String name){
        return "Hello "+name+"!";
    }
}
{% endcodeblock %}

将AppTest.java代码改动如下：

{% codeblock lang:command %}
package org.me.hello;

import static org.junit.Assert.*;

import org.junit.Test;

public class AppTest 
{

    @Test
    public void testApp(){
        App app = new App();
        String results = app.sayHello("gacl");
        assertEquals("Hello gacl!",results);        
    }

}
{% endcodeblock %}


进入Hello项目根目录执行 **mvn compile** 命令编译项目的java类:
<img src="https://i.loli.net/2020/05/26/qdcOrMWeVPR1Z3G.png" >
观察终端输出结果，可以看到：
- maven运行了default lifecycle的 resources&compile 两个生命周期阶段。因为在我们的pom文件中resources阶段是在compile之前的，所以compile阶段运行的时候，在它之前的resources阶段也会被运行。
- 我们在pom文件里添加了junit的依赖，如果本地仓库中没有相关的jar包，终端输出结果会包含去远程仓库下载的信息。由于我本地已经有了相关的jar包，所以这里终端输出结果中并没有下载相关依赖的内容。

这就是使用Maven自动编译项目的过程，可以看到Hello项目的根目录下多了一个 **target** 文件夹，这个文件夹就是编译成功之后Maven帮我们生成的目标文件夹，在target/classes路径下可以看到编译好的.class文件：
<img src="https://i.loli.net/2020/05/26/EXtn39ymWNbzh7V.png" >

#### 使用Maven清理项目
继续执行 **mvn clean** 命令清理项目，清理项目的过程就是把执行"mvn compile"命令编译项目时生成的target文件夹删掉：
<img src="https://i.loli.net/2020/05/26/G4twiEaUZbCeNQR.png" >

#### 使用Maven测试项目

执行 **mvn test** 命令测试项目，依次运行在它之前的resources、compile生命周期阶段，然后运行surefire插件，从中央仓库下载了一些相关的jar包，执行测试并输出报告：
<img src="https://i.loli.net/2020/05/26/tp7dlvLCeBzJW9F.png" >
在target文件夹下可以看到编译好的源代码和测试代码文件，和其他生命周期阶段运行后的一些目标文件夹：
<img src="https://i.loli.net/2020/05/25/evEHVoR4xmQ3q2g.png" >

#### 使用Maven打包项目

执行 **mvn package** 命令打包项目，依次执行在它之前的生命周期阶段，然后运行maven-jar-plugin插件打包项目：
<img src="https://i.loli.net/2020/05/26/kJN8EGcFpSMavTR.png" >
在target文件夹可以看到打包好的jar文件：
<img src="https://i.loli.net/2020/05/26/E35Msda4onlvbP9.png" >

#### 使用Maven安装项目

执行 **mvn install** 命令安装项目包到本地仓库，这样项目包可以用作其他本地项目的依赖。依次执行在它之前的生命周期阶段，然后执行install生命周期阶段：
<img src="https://i.loli.net/2020/05/26/uZDcXbNQ68KBe4C.png" >
在本地仓库就可以看到Hello项目的jar包了，路径就是它的包名：
<img src="https://i.loli.net/2020/05/26/5DRTF9OtZMoxXJ3.png" >

#### 使用Maven部署项目

执行 **mvn deploy** 命令将最终的项目包复制到远程仓库中与其他开发者和项目共享。这里因为我们是一个练习项目，就不运行这个命令了。

#### 组合使用Maven命令

不同生命周期的命令也可以组合使用，比如:

{% codeblock lang:command %}
mvn clean compile
mvn clean test
mvn clean package
mvn clean install
{% endcodeblock %}

<img src="https://i.loli.net/2020/05/26/YZhiaIcmGxTzVBF.png" >

#### 使用Maven生成的jar包

上面我们已经把Hello项目的jar包安装到了本地仓库，接下来我们练习下在别的项目中使用它，依然通过maven命令新建HelloFriend项目：
<img src="https://i.loli.net/2020/05/26/nSkF6D4fm3CyAWQ.png" >

将App.java改名为AppFriend.java，并添加如下代码：

{% codeblock lang:command %}
package org.me.hellofriend;

import org.me.hello.App; //引入hello项目的App.class

public class AppFriend {

    public String sayHelloToFriend(String name){
        
        App app = new App();
        String str = app.sayHello(name)+" I am "+this.getMyName();
        System.out.println(str);
        return str;
    }
    
    public String getMyName(){
        return "John";
    }
}
{% endcodeblock %}

将AppTest.java改名为AppFriendTest.java，并添加如下代码：

{% codeblock lang:command %}
package org.me.hellofriend;

import static org.junit.Assert.*;

import org.junit.Test;

public class AppFriendTest {

    @Test
    public void tesAppFriend(){
        
        AppFriend appFriend = new AppFriend();
        String results = appFriend.sayHelloToFriend("gacl");
        assertEquals("Hello gacl! I am John",results);
    }
}
{% endcodeblock %}

因为要使用Hello项目的jar包，我们在pom.xml里添加依赖：

{% codeblock lang:command %}
<dependency>
    <groupId>org.me.hello</groupId>
    <artifactId>Hello</artifactId>
    <version>1.0-SNAPSHOT</version>
</dependency>
{% endcodeblock %}

然后执行 **mvn test** 执行测试：
<img src="https://i.loli.net/2020/05/26/UMrVpTFjC9vyoiS.png" >
运行成功，说明Hello的jar包已经成功在HelloFriend项目里生效了。

## Demo Project Set Up
### 创建Maven Project

<span id="inline-toc">1.</span> 装好JDK之后，打开IDEA，点击{% label info@File->New->Project->Maven %}，勾选“Create from archetype”，然后选择quick start：
<img src="https://i.loli.net/2020/05/15/fk5CHuj3VSzcxsK.jpg" >

<span id="inline-toc">2.</span> 点击Next，命名项目：
<img src="https://i.loli.net/2020/05/15/JzQ2vPyFL1tm7iA.jpg" >

<span id="inline-toc">3.</span> 命名为Automation，点击Next：
<img src="https://i.loli.net/2020/05/15/nuy6grKl4vSMkEd.png" >

<span id="inline-toc">4.</span>点击Finish后, 项目就创建好了，控制台输出的内容和我们上文中用命令创建的时候终端输出内容是一样的：
<img src="https://i.loli.net/2020/05/15/ejac3QP5tVzq6Ls.png" >

### 添加Selenium依赖

在IDEA点击{% label info@code->generate->dependency %}(或者在pom.xml文件里Ctrl+N->Dependency)，打开Maven Artifact Search窗口，这里可以搜索并添加依赖，搜索selenium, 因为我们是用java写代码，所以要加入selenium.java依赖包，选择任一版本：
<img src="https://i.loli.net/2020/05/15/N9yA8i1kGMqOJ6I.png" >

>如果怎么都打不开Maven Artifact Search窗口，还可以打开maven [中央仓库](https://mvnrepository.com/) 的网站，首页搜索selenium，选择selenium.java依赖包版本，然后将依赖包代码粘贴到pom文件中：
<img src="https://i.loli.net/2020/06/02/2pWOkP4cG7TqfKA.png" >
<img src="https://i.loli.net/2020/06/02/CawP49RQxu3gUhL.png" >


之后在pom.xml文件里就可以看到Selenium依赖已经添加了。显示红色因为还没有下载，所以我们要点击页面右上角的Maven小图标下载依赖包:
<img src="https://i.loli.net/2020/05/15/aYy6lZ4ML1UNdRS.png" >
下载完成后就可以看到相应依赖已经添加到项目的Extenral Libraries中了：
<img src="https://i.loli.net/2020/05/15/BAs3H5etboJ7Lxh.png" >
下载的依赖文件也可以在创建项目时设置的**Local repository**路径里找到，默认是在{% label info@.m2/repository/ %}路径下。

### 下载WebDriver
有了Selenium依赖，我们还需要下载WebDirver，因为我们是用WebDriver开启浏览器测试。这里我们下载[Firefox](https://github.com/mozilla/geckodriver/releases)和[Chrome](https://chromedriver.chromium.org/downloads )的WebDriver，下载完成后在项目新建drivers文件夹放置，便于管理：
<img src="https://i.loli.net/2020/05/15/IisXJT1xD4q2yCG.png" >
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
<img src="https://i.loli.net/2020/05/15/iDmgZtcjeTzqfEL.png" >

## 参考资料
- [Maven + TestNG + Jenkins搭建自动化测试框架](https://www.jianshu.com/p/28b7ae892ed1)
- [Maven百度百科](https://baike.baidu.com/item/Maven)
- [Java构建工具：Ant vs Maven vs Gradle](https://blog.csdn.net/napolunyishi/article/details/39345995)
- [maven .m2文件夹在哪？](http://www.codingwhy.com/view/718.html)
- [.m2\setting.xml文件](https://www.cnblogs.com/easonjim/p/6827058.html)
- [maven是干嘛的？](https://www.zhihu.com/question/20104186)
- [如何通俗地理解 Gradle？](https://www.zhihu.com/question/30432152)
- [Maven菜鸟教程](https://www.runoob.com/maven/project-templates.html)
