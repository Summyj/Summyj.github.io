---
title: Java类中的代码块执行顺序
date: 2017-11-06 21:10:25
update: 2017-11-06 21:10:25
tags: javaEE
categories: 学习小记
copyright: true
top:
---

代码实例分析java类中的代码块执行顺序.

# 一道笔试题 #

下面是一道阿里的java校招笔试题：

<!-- more -->

```java
    class HelloA
    {
    	//构造方法
    	public HelloA()
    	{
    		System.out.println("父类构造方法");
    	}
    	
    	//非静态代码块
    	{
    		System.out.println("父类非静态代码块");
    	}
    	
    	//静态代码块
    	static{
    		System.out.println("父类静态代码块");
    	}
    }
    
    class HelloB extends HelloA
    {
    	//构造方法
    	public HelloB()
    	{
    		System.out.println("子类构造方法");
    	}
    	//非静态代码块
    	{
    		System.out.println("子类非静态代码块");
    	}
    	
    	//静态代码块
    	static{
    		System.out.println("子类静态代码块");
    	}
    	
    }
    
    public class Test
    {
    	public static void main(String[] args) {
    		new HelloB();
    		new HelloB();
    	}
    }
```
请写出上述代码的输出，看完本文你就会有答案。

# 代码块分类及其执行顺序 #

## 代码块分类 ##

代码块，就是使用"{}"定义的一段代码，根据代码块定义的位置和关键字，可分为以下四种：

- 普通代码块：定义在类的方法中的代码块。
- 构造块：定义在类中的代码块（无修饰符）。
- 静态代码块：使用static修饰的，在类中定义的代码块。
- 同步代码块（与多线程有关，本文不涉及）

## 执行顺序（无继承） ##

看代码：

```java
    class Person
    {
    	
    	public Person()
    	{
    		System.out.println("非主类构造方法");
    	}
    	
    	{
    		System.out.println("非主类构造块,优于构造方法执行");
    	}
    	
    	static {
    		System.out.println("非主类静态块，优于构造块执行，无论产生多少实例化对象，只执行一次。");
    	}
    	
    }
    
    public  class Hello
    {
    	public Hello()
    	{
    		System.out.println("主类构造方法");
    	}
    	
    	public static void main(String[] args) 
    	{
    		System.out.println("----start----");
    		new Hello();
    		new Person();
    		new Person();
    		new Hello();
    		System.out.println("-----end-----");
    	}
    	
    	{
    		System.out.println("主类构造块");
    	}
    	
    	static{
    		System.out.println("主类静态块，优于主方法执行");
    	}
    }
```

**执行结果：**

![66](http://ou7wdump3.bkt.clouddn.com/%E6%89%A7%E8%A1%8C%E7%BB%93%E6%9E%9C.PNG)


**结论：**

![78](http://ou7wdump3.bkt.clouddn.com/%E5%9B%BE%E7%A4%BA.PNG)

**其中：**

- 主类静态块优于主方法执行。
- 无论生成多少类对象，静态块只执行一次。
- 主类和非主类的构造方法、构造块谁先执行取决于代码顺序，与主类/非主类无关。

## 执行顺序（有继承） ##

我们知道，在继承的情况下，子类在实例化时，首先调用父类的构造方法，然后再调用子类的构造方法。因此，结合上面的结论，我们就可以得出开始那道笔试题的结果。

>为了方便观察，对代码改动如下：

```java
    public class Test
    {
    	public static void main(String[] args) {
    		System.out.println("----start----");
    		System.out.println("---first---");
    		new HelloB();//first
    		System.out.println("---second---");
    		new HelloB();//second
    		System.out.println("-----end-----");
    	}
    }
```

答案在这里：

![77](http://ou7wdump3.bkt.clouddn.com/%E7%BB%A7%E6%89%BF%E5%90%8E%E7%BB%93%E6%9E%9C.PNG)