---
title: Java基础小练习
date: 2020-05-09 17:13:01
update: 2020-05-09 17:13:01
tags: Java
categories: [学习小记]
copyright: true
description: 重温了Java基础，奇怪的知识又增加了。
top:
---

<a href="https://sm.ms/image/hznIgy4mZYQ7Rwc" target="_blank"><img src="https://i.loli.net/2020/05/09/hznIgy4mZYQ7Rwc.png" ></a>

## 前言
由于工(yi)作(qing)原因，最近有很多学习的机会[手动狗头]。
测试小姐姐们聚在一起搞了个Java小培训，目的是为了练习用Java和Selenium搭建自动化测试框架。又重新回顾了Java的基础知识，包括：
- [Java1](https://www.imooc.com/learn/85): 数组/循环/运算符/方法
- [Java2](https://www.imooc.com/learn/124): 类/封装/继承/多态
- [Java3](https://www.imooc.com/learn/110): 异常/字符类/集合框架(Collection&Map)
温故知新，为了证明自己又学了一遍，以及不能让练习的代码白写，就有了这篇博客:see_no_evil:

## 代码练习

下边是学习过程中遇到的一些代码练习题，以及一些嗑过的知识点，总结一下。

### 模拟借书
{% codeblock lang:command %}
//练习点：try catch

    String[] books = {"中国通史", "围城", "沉默的大多数", "古文观止", "局外人"};

    public void CheckArg(int input)
    {
        if(!(input==1 || input==2))
            throw new IllegalArgumentException();
    }

    public void SearchWithNo()
    {

        Scanner sc = new Scanner(System.in);
        System.out.println("请输入图书序号：");
        int index = sc.nextInt();

        try{
            String name = books[index];
        }
        catch (ArrayIndexOutOfBoundsException e)
        {
            System.out.println("该序号不存在～");
        }

        System.out.println("找到了！图书为：" + books[index]);
    }

    public void SearchWithName()
    {
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入图书名称：");
        String name = sc.next();
        boolean flag = false;

        for (String book : books) {
            if(book.equals(name))
            {
                flag = true;
                break;
            }
        }

        if(flag)
            System.out.println("该图书存在～");
        else
            System.out.println("该图书不存在～");

    }

    public void Process(int arg)
    {
        if(arg == 1)
        {
            SearchWithNo();
        }
        else{
            SearchWithName();
        }
    }

    public static void main(String[] args) {

        HelloWorld hello = new HelloWorld();

        while (true)
        {
            System.out.println("请输： 1 -- 按照序号查找， 2 -- 按照书名查找");
            Scanner sc = new Scanner(System.in);
            try{
                int input = sc.nextInt();
                hello.CheckArg(input);
                hello.Process(input);
            }
            catch (InputMismatchException e)
            {
                System.out.println("请输入数字哦～");
            }
            catch (IllegalArgumentException e)
            {
                System.out.println("非法操作序号～");
            }
        }

    }
{% endcodeblock %}

### 校验邮件和文件名

{% codeblock lang:command %}
 //练习点：string类方法

    public void CheckFile(String file)
    {
        if(file.contains(".") && file.indexOf(".")!=0 && file.endsWith(".java"))
            System.out.println("文件名正确");
        else
            System.out.println("文件名无效");
    }

    public void CheckEmail(String email)
    {
        if(email.indexOf("@") < email.indexOf(".") && !email.endsWith("."))
            System.out.println("邮件名正确");
        else
            System.out.println("邮件名无效");
    }

    public static void main(String[] args) {

        HelloWorld hello = new HelloWorld();

        System.out.println("输入文件名：");
        Scanner sc = new Scanner(System.in);
        String file = sc.next();
        hello.CheckFile(file);

        System.out.println("输入邮件名：");
        Scanner sc1 = new Scanner(System.in);
        String email = sc1.next();
        hello.CheckEmail(email);

    }
{% endcodeblock %}

### 知识点

<span id="inline-toc">1. </span>深入理解对象引用及其赋值

{% codeblock lang:command %}
Vehicle veh1 = new Vehicle();
{% endcodeblock %}

[这篇文章](https://www.cnblogs.com/focuschen/articles/2497768.html)让我明白了上边的代码发生了什么。

<span id="inline-toc">2. </span>关于StringBuilder的equals方法

{% codeblock lang:command %}
    public static void main(String[] args) {
        StringBuilder s1 = new StringBuilder("123");
        String s2 = s1.toString();
        String s3 = s1.toString();
        System.out.println(s1.equals(s2)); //false, 由于StringBuilder类没有重写父类Object类的equals方法, 所以比较的还是s1和s2的地址，和==作用相同
        System.out.println(s1==s2); //编辑器报错，因为s1是StringBuilder类型，s2是String类型，不同类型的数据不能用==比较
        System.out.println(s2.equals(s3)); // true, String类重写了Object类的equals方法，比较的是s2和s3地址中的内容
        System.out.println(s2 == s3); //false, ==比较的是两个引用的地址
    }
}
{% endcodeblock %}

<span id="inline-toc">3. </span>通过重写Object超类的equals方法，实现比较两个类的内容相等

Object超类的equals方法调用了 == 比较两个对象的地址，但更多时候我们需要它来比较两个对象的内容，所以需要重写。这也是热门面试题之一。
怎么做，[这篇文章](https://blog.csdn.net/javazejian/article/details/51348320)写得很明白。

<span id="inline-toc">4. </span>[关于Map的Key和Value能不能为空](https://blog.csdn.net/ceovip/article/details/52963285)

其实还写了很多代码来着，不过就不贴了，自动化框架搭建好之后也会写博客总结的:muscle:


