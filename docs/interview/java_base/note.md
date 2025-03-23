## 0. Java特点 & 程序执行过程

- 面向对象

- 支持多线程

- 跨平台

- 垃圾内存回收机制，不用手动释放内存

**程序执行过程**：java源文件 => 通过java编译器编译成字节码文件(.class文件) => 由Java虚拟机(JVM)解释运行

**一些规定**：

- 一个源文件最多只能有一个public类，且文件名和类名要保持一致

- 严格区分大小写

- Java程序的执行入口：main()

```
public static void main(String args[]) {…}
```

## 2. 数据类型

**基本数据类型**：

byte、short、int、long（1字节、2字节、4字节、8字节）

float、double（4字节、8字节）

char（2字节）

boolean（1字节）

**引用类型**：

数组(Array)、类(class)、接口(interface)

**基本类型**和**对象的引用**在**栈内存**中分配，而**对象本身**存储在**堆内存**中

## 3. 包装类

=> 把基本类型数据转换为对象

每个Java基本类型在java.lang包中都有一个对应的包装类

> boolean => Boolean
> 
> byte => Byte
> 
> char => Character
> 
> short => Short
> 
> int => Integer
> 
> long => Long
> 
> float => Float
> 
> double => Double

**String类型转换int类型**

```
Integer.parse(String)
```

**int和Integer的互换**

```
int a = 10;
//int转Integer
Integer b = new Integer(10);
Integer c = Integer.valueof(30);
//Integer转int
int d = b.intValue()
```

## 4. BigDecimal

基本数据类型 `double` 和 `float` 用于表示浮点数，但它们只能提供有限的精度

BigDecimal提供超16位有效精度的浮点数运算

```
BigDecimal b1 = new BigDecimal(Double.toString(0.05));   
BigDecimal b2 = new BigDecimal(Double.toString(0.01));   
double kk=  b1.add(b2).doubleValue(); 
BigDecimal b3 = new BigDecimal(Double.toString(4.015));   
BigDecimal b4 = new BigDecimal(Double.toString(100)); 
double kkc=b3.multiply(b4).doubleValue();
```

## 5. 小案例

输入一个整数，转成32位的二进制，并取出第四位到低八位

```
import java.util.Scanner;

public class Digits {
    public static void main(String[] args) {
        Scanner s=new Scanner(System.in);
        System.out.print("请输入一个整数：");
        int n=s.nextInt();
        String str=Integer.toBinaryString(n);    //求整数的二进制
        while(str.length()<32) {                //不足32位前面补0
            str="0"+str;
        }
        System.out.print("低第4位-低第8位：");    
        System.out.print(str.substring(24,29));
    }
}
```

## 6. Math类和Random类

Math.ceil(double d) 不小于d的最小整数

Math.floor(double d) 不大于d的最大整数

double random() 产生0~1之间的随机数double

**案例**：随机生成0-9这10个数字，每次生成，数字排列顺序都不一样

```
public class RuanJianPan {
    public static void main(String[]argv) {
        int a[]=new int[10];
        for(int i=0;i<a.length;i++) {
            a[i]=(int)(Math.random()*10);
            for(int j=0;j<i;j++) {
                if(a[i]==a[j]) {
                    i--;            //随机生成了重复的就重新生成
                }
            }                    
        }
        for(int num:a)
            System.out.print(num+" ");
        System.out.println();
    }
}
```

## 7. 日期处理

### 7.1 Date类

使用new Date()创建的对象可以获取本地当前时间，精确到毫秒

```
Date date=new Date();
System.out.print(" 当前时间"+date);
System.out.print(" 年份"+(date.getYear()+1900));
System.out.print(" 月份"+(date.getMonth()+1));
System.out.print(" 日"+(date.getDate()));
```

**时间的格式化**

用DataFormat 的子类SimpleDateFormat 来实现时期的格式化

```
Date date=new Date();
SimpleDateFormat time=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
System.out.print("当前时间"+time.format(date));
```

### 7.2 Calendar类

java.util.Calendar类是一个抽象类  

抽象类**不能采用new实例化**，但我们可以使用Calendar类的static方法getInstance()初始化一个日历对象，如：  

`Calendar calendar =Calendar.getInstance();  `

**set()和get()方法**可用来设置和读取日期的特定部分，比如年、月、日、时、分和秒等

**案例**：给出一个人出生日期，求出他从出生到现在过了多少天？

getTime() 方法可返回距 1970 年 1 月 1 日之间的毫秒数

```
import java.util.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Scanner;

public class CountDay {
    public static void main(String[] args) {
        Scanner s=new Scanner(System.in);
        System.out.print("请输入你的生日：");
        String birth=s.nextLine();
        Date current_time=new Date();    //记录当前时间
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
        Date birth_day = null;
        try {
            birth_day = formatter.parse(birth);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        long days=(current_time.getTime()-birth_day.getTime())/(3600*24*1000);
        System.out.println("从出生到今天经历了"+days+"天。");
        s.close();                        //关闭输入流
    }
}
```

## 8. 面向对象

### 8.1 三大特性

- 封装：将数据和操作这些数据的方法绑定在一起，对外部隐藏内部细节，只暴露有限的接口供外部访问。

- 继承：允许子类继承另一个父类的属性和方法，子类可以扩展父类或修改的行为。

- 多态：指同一个方法调用可以根据对象的不同类型而表现出不同的行为。实现：①不同子类用不同方式去覆盖父类的方法（继承） ②不同子类用不同方式去实现同一个接口（抽象类）③方法重载（在同一个类中，方法名相同，但参数的个数、类型或顺序不同）。

- 多态的优点：代码的扩展性强，可以通过添加新的子类实现多态，而无需修改现有代码。

### 8.2 接口和抽象类

- 共同点：都不能被实例化

- 区别：①一个类只能继承一个抽象类，但是能实现多个接口 ②抽象类可以包含抽象方法和具体方法，而接口在java8之前的方法都是未实现的，java8之后，允许接口有default方法（由实现接口的类继承，该类的对象可直接调用）和static方法（需要通过接口名调用，不能通过对象来调用）

### 8.3 类的定义

```
[类的修饰符] class 类名 [extends 父类名] [implements 接口名] {
...
}
```

**类成员变量**

访问控制修饰符

|           | 同一个类中 | 同一个包中 | 不同包中的子类 | 不同包中的非子类 |
| --------- | ----- | ----- | ------- | -------- |
| private   | √     |       |         |          |
| 默认        | √     | √     |         |          |
| protected | √     | √     | √       |          |
| public    | √     | √     | √       | √        |

非访问控制修符

- 静态变量static：属于类的变量，可以直接根据类名调用

- 最终变量final：值在程序的执行过程中不会改变 

- 易失变量volatile：可能同时被多个线程所控制和修改

### 8.4 包(Package)

防止同名类名的冲突

### 8.5 方法的重载和重写

重载：方法名相同，但方法的参数类型、参数顺序、参数个数不同，返回值类型可以不同

重写：子类重写父类的方法，返回值类型和形参都不能改变

### 8.6 单例模式

只能产生一个对象，不允许产生多个对象

```
public class Singleton{
    private static Singleton  instance=null;  

    private Singleton(){                      
    }

    public static Singleton newInstance(){
        return instance==null?instance=new Singleton():instance;
    }

    public static void main(String[] args) {
        Singleton s1=Singleton.newInstance();
        Singleton s2=Singleton.newInstance();
    }
}
```

### 8.7 instanceof 判断对象类型

```
ClsSuper o2=new ClsSub(3,2);
if(o2 instanceof ClsSub){
    System.out.println(“o2 是ClsSub类型”);
}
```

### 8.8 练习

**例1**：创建一个学生类，至少包含：  

属性：name，sex，age  

一个构造方法（带三个参数，对name，sex，age三属性初始化）

3个成员方法（setAge用于设置年龄，getAge用于获取年龄，outInfo()用于输出学生信息) ）

测试程序：  

①创建2个具体学生对象  

②使每个学生年龄加1(要求用成员方法实现)  

③判断学生年龄是否小于20，是则打印出此相关信息

```
public class Student {
    String name, sex;
    int age;
    //构造方法
    Student(String name,String sex,int age){
        this.name = name;
        this.sex = sex;
        this.age = age;
    }    
    void setAge(int age) {
        this.age = age;
    }
    int getAge() {
        return age;
    }
    void outInfo() {
        System.out.println("name = "+ name + "\nsex = "+sex+"\nage = "+age);
    }
    static void judge_print(Student s) {
        if(s.getAge()<20) {        
            System.out.println("输出：");
            s.outInfo();
        }
    }
    public static void main(String[] args) {
        //第一题
        Student s1=new Student("ZhangSan","男",18);    //创建两个对象
        Student s2=new Student("Lisi","女",25);
        s1.setAge(s1.age+1);                        //年龄加一
        s2.setAge(s2.age+1);
        judge_print(s1);                            //判断打印
        judge_print(s2);    
    }
}
```

**例2**：创建一个研究生类GraduateStudent，该类继承于Student类，为其添加：  

(1)两个私有属性：专业specially和导师teacher  

1个构造方法：带有5个参数的构造方法(对所有属性初始化)  

方法：specially属性和teacher属性的相关set和get方法  

(2)方法的覆盖:重写Student类中的方法outInfo输出研究生相关信息  

测试程序：  

(1)创建1个具体学生对象，1个研究生对象  

(2)打印输出两个对象的相关信息。

```
public class GraduateStudent extends Student{
    private String speciality,teacher;
    //构造函数
    GraduateStudent(String name, String sex, int age, String speciality, String teacher){
        super(name,sex,age);
        this.speciality=speciality;
        this.teacher=teacher;
    }
    //set和get方法
    void setSpeciality(String speciality) {
        this.speciality = speciality;
    }
    String getSpeciality() {
        return speciality;
    }
    void setTeacher(String teacher) {
        this.teacher = teacher;
    }
    String getTeacher() {
        return teacher;
    }
    //输出
    void outInfo() {
        System.out.println("\nname = "+ name + "\nsex = "+sex+"\nage = "+age
                +"\nspeciality = "+speciality+"\nteacher = "+teacher);
    }
    public static void main(String[] args) {
        //第二题
        Student s= new Student("QianQi","女",26);
        GraduateStudent g = new GraduateStudent("WangWu","男",26,"CS","WangYiXiong");
        s.outInfo();
        g.outInfo();
    }
}
```

**例3**：定义一个抽象类–形状类。其中包括求形状面积的抽象方法。继承该抽象类，定义三角形、矩形、圆形。分别创建一个三角形、矩形、圆形存入一个数组，将数组中各类图形的面积输出。

```
abstract class Shape{
    double area;
    abstract public double getArea();
}

class Triangle extends Shape{
    double area;
    int a,h;
    public Triangle(int a,int h) {
        this.a=a;
        this.h=h;
    }
    public double getArea() {
        area = a*h/2;
        return area; 
    }
}

class Rectangle extends Shape{
    double area;
    int w,h;
    public Rectangle(int w,int h) {
        this.w = w;
        this.h = h;
    }
    public double getArea() {
        area = w*h;
        return area; 
    }
}

class Circle extends Shape{
    double area;
    int r;
    public Circle(int r) {
        this.r=r;
    }
    public double getArea() {
        area = Math.PI*r*r;
        return area; 
    }
}

public class Test {
    public static void main(String[] args) {
        Shape s[] = new Shape[3];
        s[0] = new Triangle(5,10);
        s[1] = new Rectangle(5,10);
        s[2] = new Circle(5);
        System.out.println("三角形面积："+s[0].getArea());
        System.out.println("矩形面积："+s[1].getArea());
        System.out.println("圆形面积："+s[2].getArea());
    }
}
```

**例4**：定义一个接口，其中包含一个display()方法用于显示信息：通知类、汽车类、广告类均要实现该接口，以显示“通知内容”、“汽车油量”、“广告信息”，试编程实现并测试类的设计。创建的对象用接口引用，并通过接口引用变量执行display()方法。

```
interface Message{
    void display();
}

class Notices implements Message{
    public void display() {
        System.out.println("It's time to hand in the assignment!");
    }
}

class Cars implements Message{
    public void display() {
        System.out.println("The gas consumption is only 20L left!");
    }
}

class Advertisement implements Message{
    public void display() {
        System.out.println("Enjoy Coca-Cola.");
    }
}

public class TestInterface {
    public static void main(String[] args) {
        Message[] mm= { new Notices(),new Cars(),new Advertisement() };
        for(int i=0;i<mm.length;i++) {
            mm[i].display();
        }
    }
}
```

## 9. 字符串

### 9.1 String类

存储和处理字符串常量

**常用方法**：

- length() 返回字符串长度

- charAt(int index) 返回字符串的第index个字符

- substring(int beginindex) 

- substring(int beginindex, int endindex)

- replace(char oldChar, char newChar)

- startWith(String prefix)

- endWith(String suffix)

- indexOf(char ch) 字符串中单个字符的查找

- indexOf(String str) 字符串中子串的查找

- toLowerCase()、toUpperCase() 字符大小转换

- trim() 去除多余空格

- String.valueOf(int n)、String.valueOf(float n)  数字转换为字符串

- Double.parseDouble(String s)、Integer.parseInt(String s)、Float.parseFloat(String s) 字符串转换为数字

- split(String str) 字符串分隔 `String s="34,55,78,12,90,81,63,84";String sa[]=s.split(",")`

- toString(int i,int radix) 将整数i转换为radix进制的数字字符串 `String s=Integer.toString(34,16);`

- String和char[]类型互相转换

```
char[] cs = "Hello".toCharArray(); // String -> char[]
String s = new String(cs);         // char[] -> String
```

### 9.2 StringBuffer类

存储和操作字符串变量

String类是字符串常量类，初始化后就不能进行修改，而String Buffer类是**字符串缓冲区**，不仅可以接受修改，还可以读入整个文件

**初始化**

```
StringBuffer sb1 = new StringBuffer();
StringBuffer sb2 = new StringBuffer(30);
StringBuffer sb3 = new StringBuffer(“StringBuffer”);
```

**扩充**

```
StringBuffer  s = new StringBuffer("abcdefg");
StringBuffer   s1 = s.append("hh");//s的值为:"abcdefghh"、s1的值为:"abcdefghh"
StringBuffer  s2 = s.append(123.45);//s的值为:"abcdefghh123.45"、s2的值为:"abcdefghh123.45"
```

**String与StringBuffer之间的相互转换**

从String到StringBuffer

```
StringBuffer b = New StringBuffer(“abcd”)
```

从StringBuffer到Strin

```
String str = b.toString()
```

**案例**：**统计一个句子中单词出现的次数**  

例如：“if it is to be it is up to me to delegate”  

统计:{if=1,it=2,is=2,to=3,be=1,up=1,me=1,delegate=1}

```
public class CountWords {
    public static void main(String[] args) {
        String s = "if it is to be it is up to me to delegate";
        String words[] = s.split(" ");
        int count = 0;
        System.out.print("统计:{");
        for(int i=0;i<words.length;i++) {
            if(words[i] != "") {
                count++;
                System.out.print(words[i] + "=");
            }        
            for(int j=i+1;j<words.length;j++) {
                if(words[i].equals(words[j])) {
                    words[j]="";
                    count++;
                }
            }
            if(words[i] != "") {
                System.out.print(count);
                if(i<words.length-1) {
                    System.out.print(",");
                }
            }        
            count = 0;
        }
        System.out.print("}");
    }
}
```

## 10. 正则表达式

对正则表达式的处理集中在以下两个类：

**java.util.regex.Pattern** 模式类：用来表示一个编译过的正则表达式。  

**java.util.regex.Matcher** 匹配类：用模式匹配一个字符串所表达的抽象结果。

**常用符号**

- 句点.：匹配单个字符，包括空格、Tab字符甚至换行符。

- 方括号[]：匹配括号里的字符集，但只能匹配一个。t[aeio]n => tan、ten...

- 圆括号()：加上|符号可匹配多个字符。t(a|e|i|o| oo)n => tan、toon

- ^：匹配字符串的开始，在方括号中，该符号表示不想要匹配的字符

- $：匹配字符串的结束

- \\：转义字符

- 贪婪量词：可以匹配多次
  
  - *：0次或多次
  
  - +：1次或多次
  
  - ?：0次或1次
  
  - {n}：n次
  
  - {n,m}：n次到m次之间

- 快捷符号
  
  - \\\：反斜杠
  
  - \d：数字，相当于[0-9]
  
  - \D：非数字，[0-9]之外的字符
  
  - \n：换行
  
  - \t：制表符
  
  - \s：空白字符
  
  - \S：非空白字符

**正则在Java中的使用**

①构造一个模式  => Pattern p=Pattern.compile("[a-z]*");  

②建造一个匹配器  => Matcher m = p.matcher(str);  

③进行判断，得到结果  => boolean b = m.matches()

**例1：** 写出长度为8-10的用户密码（密码以26个字母开头、中间可以包含数字字符、26个字母、下划线）的正则式

```
import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Secret {
    public static void main(String[] args) {
        String reg = "([a-z]|[A-Z])([a-z]|[A-Z]|[0-9]|[_]){7,9}";
        Pattern pattern = Pattern.compile(reg);
        Scanner s =new Scanner(System.in);
        System.out.print("请输入用户密码：");
        String str = s.nextLine();
        Matcher matcher=pattern.matcher(str);  
        if(matcher.matches()) 
            System.out.println("密码合法"); 
        else  
            System.out.println("密码不合法");
        s.close();
    }
}
```

## 11. 线程

**程序** 代表一个静态的对象，是内含指令和数据的文件，存储在磁盘或其他存储设备中  

**进程** 代表一个动态的对象，是**程序的一次执行过程**，存在于系统的**内存**中。

**线程** 是运行于某个进程中，用于完成某个具体任务的顺序控制流程，一个进程包含一个或多个线程

- 创建和注销线程的开销，比进程少得多

- 进程可独立运行，线程不拥有系统资源，所以不能独立运行

- 进程之间是互相独立的，通信比较困难，线程间的通信要快得多

**线程有两个缺陷**

- 死锁：多个线程在执行过程中 ，都等待对方释放资源，但没有一个线程能够继续执行时，就会发生死锁。
  
  - 打破循环等待：为所有资源编号，线程必须按编号顺序请求资源。
  
  - 确保资源可抢占：允许线程强制从其他线程抢占资源。

- 饥饿：一个线程永久性地占有资源，使得其他线程得不到该资源
  
  - 优先级调整：为长时间等待的线程提高优先级，确保它们能够获得资源

**java创建线程**

**①继承Thread类并重载run方法**

```
class FirstThread extends Thread {
  public void run() {...}
}
class SecondThread extends Thread {
 public void run() {...}
}

public class ThreadTest1 {
  public ThreadTest1() {
      FirstThread first = new FirstThread();
      SecondThread second = new SecondThread();
      first.start();second.start();
    }
    public static void main(String[] args) {
      new ThreadTest1();
    }
}
```

**②通过定义实现Runnable接口的类，进而实现run方法**

```
public class SimpleRunnable implements Runable{ 
    private String message;

    public SimpleRunnable(String message){ 
      this.message = message; 
    } 

    public void run(){ 
      System.out.println(message); 
    }

    public static void main(String args[]){ 
      SimpleRunnable r1=new SimpleRunnable("Hello"); 
      Thread t1=new Thread(r1); 
      t1.start(); 
    } 
}
```

**java.lang.Thread 类中的五个方法**

-  run()：该方法用于线程的执行。你需要重载该方法，以便让线程做特定的工作  

- start()：该方法使得线程启动run()方法  

- stop()：该方法同start()方法的作用相反，用于停止线程的运行  

- suspend()：该方法同stop()方法不同的是，它并不终止未完成的线程，而只是挂起线程，以后还可恢复  

- resume()：该方法重新启动已经挂起的线程

**锁**

在访问和修改共享资源时，加锁可以**保证操作的原子性**，即确保资源的状态在多个步骤中不会被其他线程干扰，从而维护数据的一致性。**例如**：假设有一个银行账户，初始余额为1000元，有两个线程同时进行：读取账户余额=> 扣除100元 => 更新余额写回账户 的操作，如果没有锁，两个线程可能读到的初始余额都为1000，扣除100，都更新为900写回账户，而实际上应该更新为800。

## 12. 集合

=> 存储数据的容器，集合里存放**对象**，而非基本数据类型

**数组和集合都是容器，有何不同?**

①数组长度固定，集合长度可变  
②数组只能存放相同类型的数据，集合可以存放不同类型的数据  
③数组可存放简单数据类型的数据和对象，集合只能存放对象

**两种类型的容器**  

- Collection：一组各自独立的元素，包括List, Set  

- Map: 成对的key-value对象

**接口的层次关系**

- Collection => Set => SortedSet

- Collection => List

- Map => SortedMap

### 12.1 对象集合Set

**① Set接口 - Collection接口的子接口**

Set中的元素**无顺序**，存储的对象**不允许重复**  

常用实现类：**HashSet**、**LinkedHashSet** => 采用哈希散列算法存储元素

**② SortedSet接口 - Set接口的子接口**

具有**排序**功能的Set，默认将元素按照升序排列

**例**：用HashSet实现软键盘上的10个随机数字

```
import java.util.HashSet;
import java.util.Set;

public class SoftKeyBoard {
    public static void main(String[] args) {
         int[] Keyboard =new int[10];
         Set<Object> s=new HashSet<Object>();
         int index=0;
         while(s.size()<10){
             int temp=(int)(10*Math.random());
            if(s.add(temp+"")){
                Keyboard[index]=temp;
                 System.out.print(temp+" ");
                index++;
            }
        }
    }
}
```

### 12.2 对象列表List

**①ArrayList类**

以动态数组的形式对List接口提供了实现，查询高效，插入删除低效。

```
public class ListDemo1 {
    public static void main(String args[]) {
        List list = new ArrayList();
        for (int i = 1; i <= 10; i++)
            list.add(i + " * " + i + " = " + i * i);
        Iterator iter = list.iterator();
        while (iter.hasNext())
            System.out.println(iter.next());
    }
}
// 遍历List中的元素
for(int i=0; i<list.size(); i++){
    System.out.println(list.get(i));    
}
```

**②LinkedList类**

以双向链表的形式对List接口提供了实现，插入删除高效，查询低效。

### 12.3 对象映射Map

以**键值对**的形式存储和管理数据

Map接口常用实现类：**HashMap**（允许存储null键和null值，线程不安全），**Hashtable**（不允许存储null键和null值，线程安全的）

```
// 添加元素
Map  map  =  new  HashMap();
String  s1 = “hello”;
String  s2 = new String(“java”);
map.put(new Integer(1), s1);
map.put(new Integer(2), s2);

// 删除元素
map.remove(1);  //根据key值删除
map.remove(s2); //根据value对象删除

// 遍历所有key
Object[] keys = map.keySet().toArray();
for(int i=0;i<keys.length;i++){
    System.out.println("key: "+keys[i]);
}
//遍历所有value
Object[] values = map.values().toArray();
for(int i=0; i<values.length; i++){
     System.out.println("value: "+values[i]);
}

//遍历所有映射
Object[] entrys = map.entrySet().toArray();
for(int i=0;i<entrys.length;i++){
    Map.Entry entry = (Map.Entry)entrys[i];
    System.out.println(entry.getKey()+“ : "+entry.getValue());
}
```

**例**：统计句子中每种单词的个数

```
import java.util.*;
public class MapDemo1 {
     private static final Integer ONE = new Integer(1);
     public static void main(String args[]) {
          Map m = new HashMap();
          for (int i=0; i<args.length; i++) {
                Integer freq = (Integer) m.get(args[i]);
                m.put(args[i], (freq==null ? ONE:new Integer(freq.intValue() + 1)));
          }
          System.out.println(m.size()+" distinct words detected:");
          System.out.println(m);
    }
}
```

## 13. 异常处理

**异常**(Exception)是程序执行过程中出现的非正常事件，即各种意外情况。

比如说：

① 用户输入出错
② 所需文件找不到
③ 运行时磁盘空间不够
④ 内存不够
⑤ 算术运算错 (数的溢出，被零除…)
⑥ 数组下标越界

**异常处理机制**：我们对异常进行捕获并处理，即使程序在运行时发生了错误，也可以继续运行。

![Snipaste_2024-09-22_09-27-28.png](assets/371293c09c9f46339717e9bcd6cd76d4eb02d84c.png)

**Throwable类**是所有异常类的父类。它分为两个子类：Error类和Exception类。  

**Error类**包括动态链接失败、虚拟机出错等异常，该类异常Java不要求捕获，同时系统也**不会抛出该类异常**  

**Exception类**是指程序代码中要处理的异常

| 系统定义的异常                        | 异常的解释        |
| ------------------------------ | ------------ |
| ClassNotFoundException         | 未找到要装载的类     |
| IOException                    | 输入输出错误       |
| ArithmrticException            | 算术运算错误，如除数为0 |
| NullPointerException           | 空指针访问        |
| ArrayIndexOutOfBoundsException | 数组访问越界       |
| FileNotFoundException          | 文件找不到        |
| NumberFormatException          | 数字格式错误       |

**异常处理程序块**

```
try{
} catch{
} finally{
}
```

无论异常发生否，finally部分的语句均要执行，即使try或catch块中有return，程序也是先执行finally块再返回

**处理方式**

①在方法内部对异常进行捕获处理

```
try {
    // 可能抛出异常的代码
    int result = 10 / 0;
} catch (ArithmeticException e) {
    // 处理除以零的异常
    System.out.println("Cannot divide by zero!");
}
```

②在方法内部不处理，将异常处理的责任传递给调用者

```
public void divide(int a, int b) throws ArithmeticException {
    if (b == 0) {
        throw new ArithmeticException("Division by zero.");
    }
    int result = a / b;
    System.out.println("Result: " + result);
}

public static void main(String[] args) {
    MyDivision myDivision = new MyDivision();
    try {
        myDivision.divide(10, 0);
    } catch (ArithmeticException e) {
        System.out.println(e.getMessage());
    }
}
```

**自定义异常**

```
public class MyException extends Exception{
…
}
```

系统定义的异常可以由系统在执行过程中自动抛出，而用户自定义的异常，则需要在程序中通过**throw语句**抛出

```
try {
    throw new MyException("…");
} catch() {
    ...
}
```

## 14. 文件输入输出

在Java程序中，对于数据的输入/输出操作以 **流** （stream）方式进行

**字节流**(byte stream)：一个字节(8bit)一个字节读/写  

**字符流**(character stream)：一个字符一个字符读/写

字节流可以处理一切文件(图像、视频、音频等文件)，而字符流只能处理纯文本文件（如TXT文件）

**为什么要有字符流？**

Java中字符是采用Unicode标准，Unicode 编码中，一个英文为一个字节，一个中文为两个字节  
如果使用字节流处理中文，如果一次读写一个字符对应的字节数就不会有问题，一旦将一个字符对应的字节分裂开来，就会出现乱码了。为了更方便地处理中文这些字符，Java就推出了字符流。

在Java.io包中，包含了两个**文件类**，用来记载文件信息  

- **File类**，以**顺序**的方式访问文件  

- **RandomAccessFile**，以**随机**的方式访问文件

**两种文件读取/写入类**  

- FileInputStream/FileOutputStream (字节流)  

- FileReader/FileWriter (字符流)

**例**

```
import java.io.*;
public class Copy {
    public static void main(String[] args) throws IOException {
        File inputFile   = new File(“original.txt");
        File outputFile = new File(“result.txt");
        FileReader in   = new FileReader(inputFile);
        FileWriter out  = new FileWriter(outputFile);
        int c;
        while ((c = in.read()) != -1)
           out.write(c);
        in.close();
        out.close();
    }
}
```

**Java对象序列化**

当两个进程在进行远程通信时，彼此可以发送各种类型的数据。无论是何种类型的数据，都会以**二进制序列**的形式在网络上传送。发送方需要把这个Java对象转换为字节序列，才能在网络上传送；接收方则需要把字节序列再恢复为Java对象。

**序列化**：把Java对象转换为字节序列的过程  
**反序列化**：把字节序列恢复为Java对象的过程
