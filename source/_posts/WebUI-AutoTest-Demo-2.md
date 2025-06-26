---
title: WebUI自动化测试框架Demo(中)
date: 2020-05-16 15:05:41
update: 2020-05-15 15:05:41
tags: [自动化测试, TestNG]
categories: [搬砖那些事儿]
copyright: true
description: Demo Project代码优化，TestNG介绍，TestNG注解基本使用。
top:
---

<img src="https://i.loli.net/2020/05/15/hVCWgPazcRirtLj.jpg" >

{% note info %}
上篇博客我们已经完成了Demo Project的Set Up, 这篇文章就来简单用TestNG的注解和testng.xml文件，使代码结构更清晰，并实现element object的good practice.
{% endnote %}

## TestNG介绍
### 是什么

    TestNG是一个开源的自动化测试框架， NG表示Next Generation。 
TestNG的灵感来源于Junit和Nunit,但其功能优于前面两个框架，例如TestNG支持依赖测试，测试分组等功能，并且它旨在涵盖所有类别的测试：单元测试，功能测试，端到端测试，集成测试等等。

### 同类技术对比

上篇博客中我们使用了Junit的注解@Test来识别测试代码，所以我们来看看TestNG和Junit的对比：
<img src="https://i.loli.net/2020/05/26/GD37i9WBUE52v8d.png" >可以看到TestNG比Junit支持的功能更多，比如分组测试，参数化测试等等。

### TestNG注解

TestNG注解可以标记测试方法，设置测试方法运行顺序，将测试分组，还能向方法体传参。

<span id="inline-toc">1.</span> 常见的TestNG注解

- @Test：最基本的注解，用来把方法标记为测试的一部分
- @BeforeTest：在所有测试之前运行
- @AfterTest：在所有测试执行之后运行
- @BeforeClass：在调用当前类之前运行
- @AfterClass：在调用当前类之后运行
- @BeforeMethod：在每个测试方法执行之前都会运行
- @AfterMethod：在每个测试方法执行之后都会运行
- @BeforeGroups：在调用属于该组的第一个测试方法之前运行
- @AfterGroups：在调用属于该组的最后一个测试方法执行之后运行 

<span id="inline-toc">2.</span> 注解运行顺序

TestNG运行时，顺序是这样的：

@BeforeSuite->@BeforeTest->@BeforeClass->{@BeforeMethod->@Test->@AfterMethod->@AfterClass->@AfterTest->@AfterSuite

其中{}内的有多少个@Test，就循环执行多少次。

<span id="inline-toc">3.</span> 传参注解

有时我们想要把测试数据当作参数传入测试方法，然后在别的地方定义参数对应的测试数据，这时就要用到TestNG的传参注解。

- @Parameters：描述如何将参数传递给@Test方法，下文中会用到。
- @DataProvider：当参数类型较为复杂时，@Parameters无法满足需要，此时可以利用@DataProvider传参标记一种方法来提供测试数据。该方法会返回一个Object二维数组或一个Iterator<Object[]>来提供复杂的参数对象。

### TestNG的xml文件

>testng.xml是TestNG的配置文件，以xml格式记录测试文件。xml文件里的tags可以帮助理解测试代码的结构，设置参数数据，还可以和注解配合使用决定测试代码的运行规则，包括测试方法的执行顺序，测试方法个数和分组等等。每一个tag都有自己的参数设置。

一个简单的testng.xml结构如下：
<img src="https://i.loli.net/2020/05/26/Xb75whadgGBYJ1x.png" >

    <suite></suite>

suite是testng.xml文档中最上层的元素，一个xml文件只能有一个suite，它是一个xml文件的根级。
suite tag的paraller和thread-count参数共同控制多线程运行，实现并发测试。paraller参数指定并发的级别，比如tests/classes/methods级别。thread-count参数指定线程个数。

    <test></test>

一个suite tag下可以有多个test tag，它是一个测试单元。

    <classes></classes>

方法选择器，要执行的方法写在这里。classes tag下必须包含执行的class，否则不会执行任何内容。

    <parameter></parameter>

提供测试数据，和@Parameters注解配合使用。
parameter tag可以声明在suite/tests/classes级别，在内层的parameter tag声明的变量会覆盖在外层声明的同名变量。

### 怎么做

TestNG的一般使用步骤是：
- 编写测试业务逻辑代码并添加TestNG的注解
- 在TestNG的xml文件配置测试信息(如果有需要的话)
- 运行TestNG的xml文件

下文的代码改造会详细介绍怎么做。

## 代码改造
### BeforeTest/AfterTest

要使用TestNG的注解，我们必须添加TestNG依赖，步骤和之前添加Selenium依赖相同：
<img src="https://i.loli.net/2020/05/15/19UmfH3uSvCMDLn.png" >
接下来就可以使用TestNG的BeforeTest和AfterTest这两个注解了，我们可以把之前代码中在测试开始之前执行的操作，比如设置WebDriver、打开测试url都放在BeforeTest中，把测试执行结束后退出Driver的操作放在AfterTest中，这样改造之后的代码如下：
{% codeblock lang:command %}
public class SeleniumTest {
    WebDriver driver;

    @BeforeTest
    public void beforeTest()
    {
        System.setProperty("webdriver.gecko.driver", "drivers/geckodriver");
        driver = new FirefoxDriver();
        driver.manage().window().maximize();
        driver.get("https://www.baidu.com/");
    }

    @Test
    public void searchSelenium()
    {
        driver.findElement(By.id("kw")).clear();
        driver.findElement(By.id("kw")).sendKeys("selenium");
        driver.findElement(By.id("su")).click();
    }

    @AfterTest
    public void afterTest()
    {
        driver.quit();
    }
}

{% endcodeblock %}

### 添加自定义testng.xml
在BeforeTest中，我们手动设置了测试浏览器和url，但标准的做法是将这种设置提出来变成参数传入，而具体的数据可以放在一个单独的文件中。testng.xml文件可以帮助我们实现这点。
首先，我们使用TestNG的Parameters注解，将browser和url这两个数据作为参数传入beforeTest做处理，这样改造后的beforeTest方法如下：
{% codeblock lang:command %}
    @Parameters({"browser", "url"})
    @BeforeTest
    public void beofreTest(String browser, String url)
    {
        switch (browser){
            case "chrome":
                System.setProperty("webdriver.chrome.driver", "drivers/chromedriver");
                driver = new ChromeDriver();
                break;
            case "firefox":
                System.setProperty("webdriver.gecko.driver", "drivers/geckodriver");
                driver = new FirefoxDriver();
                break;
            default:
                System.out.println("can't supply such browser.");
        }
        driver.manage().window().maximize();
        driver.get(url);
    }
{% endcodeblock %}
此时运行测试，因为我们没有在系统默认的testng.xml文件{% label info@temp-testng-customsuite.xml %}里定义browser和url这两个参数，所以不难猜到运行失败：
<img src="https://i.loli.net/2020/05/15/ogdLlYPhr54WEck.png" >
<img src="https://i.loli.net/2020/05/15/8W1a7Y6JSvNrT9Q.png" >
所以，有两种解决办法：
- 直接改动默认的testng.xml文件
- 新建自定义testng.xml文件，然后在pom.xml中指定此文件为默认的testng.xml
为了方便以后改动，我们采用第二种办法，新建testng.xml，使用{% label info@parameter %} tag定义browser和url参数：
<img src="https://i.loli.net/2020/05/17/vMOhB3FHkNRTnJK.png" >

此时我们可以在新建的testng.xml文件右键点击运行，就可以运行成功啦。
然后在pom.xml文件的maven-surefire-plugin里指定我们要引用的testng.xml，之后使用jenkins部署运行时就不会报错了：
{% codeblock lang:command %}
        <plugin>
          <artifactId>maven-surefire-plugin</artifactId>
          <version>2.22.1</version>
          <configuration>
            <suiteXmlFiles>
              <!--可以添加多个xml文件-->
              <file>testng.xml</file>
            </suiteXmlFiles>
          </configuration>
        </plugin>
{% endcodeblock %}

### 设置多个Test执行顺序
我们现在只有1个searchSelenium()的TestCase，如果有多个Test，它们的运行顺序会是怎样的呢？
为了找到答案，我们添加一个searchJava()的TestCase:
{% codeblock lang:command %}
    @Test
    public void searchJava()
    {
        driver.findElement(By.id("kw")).clear();
        driver.findElement(By.id("kw")).sendKeys("java");
        driver.findElement(By.id("su")).click();
    }
{% endcodeblock %}

<span id="inline-toc">1.</span> 在testng.xml中指定执行顺序

首先再回到我们自定义的testng.xml文件，可以发现有一个<methods> tag, 其中包含了所有要执行的test列表，我们把searchJava()也加进去：
{% codeblock lang:command %}
                <methods>
                    <include name="searchSelenium"/>
                    <include name="searchJava"/>
                </methods>
{% endcodeblock %}
运行testng.xml可以发现searchSelenium先执行，searchJava后执行。
那么把这两个方法在methods list里的顺序交换呢？
没错，又变成searchJava先执行，searchSelenium后执行了，所以我们可以通过**设置方法在methods list的顺序，达到指定方法执行顺序的目的。**

<span id="inline-toc">2.</span> 默认执行顺序

为了看到默认的执行顺序，我们先把methods list注释掉，再运行testng.xml。
可以看到依然是searchJava先执行，searchSelenium后执行。没错，默认的执行顺序是**将方法名按照字符串排序的方式执行**的：
<img src="https://i.loli.net/2020/05/17/tOuk64Mg3GCdB51.png" >

<span id="inline-toc">3.</span> 给testng注解加上priority顺序

其实，我们还可以通过**给方法的@Test直接后边加上priority参数**，数字小的先执行，达到设置执行顺序的目的。为了看到效果，我们将执行顺序设为和默认顺序相反：
<img src="https://i.loli.net/2020/05/17/Z6kA2HVbhOeJPUq.png" >
运行testng.xml之后，可以发现searchSelenium先执行，searchJava后执行。
{% note info %}
既然priority参数和上边的methods list都能设置执行顺序，那这两种方式谁的优先级更高呢？
{% endnote %}
为了解答这个问题，我们去掉testng.xml的注释，运行testng.xml观察效果：
<img src="https://i.loli.net/2020/05/17/geaxQjf2I4JXdqO.png" >
可以发现仍然是searchSelenium先执行，searchJava后执行。
>所以，priority参数方式要比methods list方式优先级高。

### testng.xml的多线程设置

多线程运行测试代码，可以减少运行时间，提高测试效率。实际应用中要按照设备/服务器属性进行设置。
我们可以通过在testng.xml添加**parallel**和**thread-count**参数达到多线程运行测试的目的：
其中：
- paralle: 表示线程级别
- thread-count: 线程个数
这里我们按照tests级别，将testng.xml改造如下：
{% codeblock lang:command %}
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "http://testng.org/testng-1.0.dtd">
<suite name="Default Suite" parallel="tests" thread-count="2">
    <parameter name="url" value="https://www.baidu.com/"></parameter>
    <test name="Automation1">
        <classes>
            <class name="org.example.SeleniumTest"></class>
            <parameter name="browser" value="chrome"></parameter>
        </classes>
    </test>
    <test name="Automation2">
        <classes>
            <class name="org.example.SeleniumTest"></class>
            <parameter name="browser" value="firefox"></parameter>
        </classes>
    </test>
</suite>
{% endcodeblock %}
为了让效果更明显，在每个@Test方法里加上：
{% codeblock lang:command %}
        System.out.println("Thread id is " + Thread.currentThread().getId());
        //打印出方法所在线程id
{% endcodeblock %}
接着运行testng.xml，可以看到不同test在不同的线程运行，同一test的测试在一个线程运行：
<img src="https://i.loli.net/2020/05/17/VlObW86dHQ2Y7ry.png" >

### Element Object
{% note info %}
在实际工作中，编写测试代码的时候，以beforeTest()和searchSelenium()方法为例，我们可以把beforeTest()/afterTest()这种公共方法提出来放在单独的文件中，searchSelenium()方法里的常用/公有元素也提出来放在单独的文件中，公共方法也可以提出来，以实现Element/Page Object，不把测试数据暴露在外边，这样就能更关注于测试代码的设计了。
{% endnote %}

根据上边的思想，我们将代码结构改动如下：
<img src="https://i.loli.net/2020/05/26/98npgJdoQbmlvTM.png" >
新建了两个class文件，SetUp和Functions。
SetUp.class用于存放beforeTest方法，然后在测试代码中调用：
{% codeblock lang:command %}
package org.example;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class SetUp {

    WebDriver driver;

    public WebDriver beofreTest(String browser, String url)
    {
        switch (browser){
            case "chrome":
                System.setProperty("webdriver.chrome.driver", "drivers/chromedriver");
                driver = new ChromeDriver();
                break;
            case "firefox":
                System.setProperty("webdriver.gecko.driver", "drivers/geckodriver");
                driver = new FirefoxDriver();
                break;
            default:
                System.out.println("can't supply such browser.");
        }
        driver.manage().window().maximize();
        driver.get(url);
        return driver;
    }
}
{% endcodeblock %}
Functions.class里是一些页面元素和操作这些元素的公共方法，也可以在测试代码里直接调用：
{% codeblock lang:command %}
package org.example;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class Functions {

    public By _searchBox = By.id("kw");
    public By _searchButton = By.id("su");

    public void searchText(WebDriver driver, String text)
    {
        driver.findElement(_searchBox).clear();
        driver.findElement(_searchBox).sendKeys(text);
        driver.findElement(_searchButton).click();
    }
}
{% endcodeblock %}

### TestNG Report
漂亮的测试报告是自动化测试中不可缺少的元素，TestNG也支持生成测试报告，在页面右上角找到Edit Configurations:
<img src="https://i.loli.net/2020/05/17/J4EibfRV2wcI9Du.png" >
在当前页面找到Listeners然后勾选"Use default reporters"选项，确认：
<img src="https://i.loli.net/2020/05/17/1iVejFuwCdcf7YB.png" >
再次右键运行testng.xml之后，可以看到项目目录自动生成的"test-output"文件夹，点击test-output文件夹下的index.html文件，在浏览器打开，就可以看到TestNG的测试报告了：
<img src="https://i.loli.net/2020/05/17/BrM578TpDidxc13.png" >

## 参考资料
- [Maven + TestNG + Jenkins搭建自动化测试框架](https://www.jianshu.com/p/28b7ae892ed1)