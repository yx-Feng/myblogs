### 1. Java基础

**（1）基本数据类型和引用数据类型有什么不同**

基本数据类型：

- 直接存储在**栈内存**中，占用固定大小的内容空间

- 内存分配：静态分配、自动回收

引用数据类型：

- 对象存储在**堆内存**中，变量保存的是指向对象的引用（内存地址），这个引用存储在栈中

- 内存分配：动态分配，通常由 **JVM的垃圾回收机制** 管理，负责回收不再使用的对象。

**（2）异常**

异常（Exception）是指程序在执行过程中遇到的错误或不可预见的情况，通常会导致程序的正常执行中断。

Java中的异常大体上分为两类：

- 受检异常（Checked Exception）：程序在编译时必须处理的异常。
  
  包括：`IOException`、`SQLException`、`ClassNotFoundException`等。

- 非受检异常（Unchecked Exception）：程序运行时可能出现的异常。
  
  包括：`NullPointerException`、`ArrayIndexOutOfBoundsException`、`ArithmeticException`等。

异常处理机制：

- try-catch-finally
  
  ```
  try {
      // 可能引发异常的代码
  } catch (Exception e) {
      // 异常处理代码
  } finally {
      // 清理资源的代码
  }
  ```

- throws
  
  ```
  public void myMethod() throws Exception {
      // 代码逻辑
  }
  ```

**（3）反射**

反射（Reflection）是Java的一项强大功能，它允许程序在运行时动态地获取类的信息、创建对象、调用方法、访问字段等，而不需要在编译时知道相关类的具体信息。

①获取Class对象

```
Class<?> clazz = Class.forName("com.example.MyClass");
```

②通过反射获取类的构造函数

```
Constructor<?> constructor = clazz.getConstructor(String.class);
Object obj = constructor.newInstance("parameter");
```

**（4）面向过程和面向对象的区别**

**面向过程**：以过程（即函数）为中心的编程方式，关注操作和步骤的顺序。将问题分解为一系列步骤或过程，逐步实现。

**面向对象**：以对象为中心的编程方式，将问题分解为对象，每个对象具有状态（属性）和行为（方法），通过封装、继承和多态等特性构建复杂系统。

**（5）重载和重写的区别**

**重载**：在同一个类中，方法名称相同，但参数类型或参数个数不同。

**重写**：在子类中定义与父类方法同名、同参数的实例方法，以实现子类特定的功能。

**（6）抽象类和接口的区别**

**抽象类**：一种不能被实例化的类，允许包含抽象方法（没有实现的方法）和已实现的方法。通过 `extends` 关键字继承；一个类只能继承一个抽象类。

**接口**：一种纯抽象类，只能包含抽象方法（Java 8 后可以有默认方法和静态方法）。通过 `implements` 关键字实现；一个类可以实现多个接口。

**（7）final关键字怎么用**

在 Java 中，`final` 关键字用于表示不可更改的特性：

- 修饰变量时表示值不可变（基本类型值固定，引用类型地址固定）

- 修饰方法时表示方法不能被子类重写

- 修饰类时表示类不能被继承

**（8）介绍Object类，Object类有哪些方法**

在 Java 中，`Object` 类是所有类的基类。每个类直接或间接继承自 `Object`，无论是用户自定义类还是 Java 提供的标准库类。

- `equals(Object obj)`：用于比较两个对象是否相等。默认实现是比较对象的引用地址，通常需要在子类中重写以实现内容比较。

- `hashCode()`：返回对象的哈希值，配合 `equals` 方法使用，通常需要重写来确保相同的对象具有相同的哈希值。

- `toString()`：返回对象的字符串表示，默认是类名加上对象的哈希码，通常会在子类中重写以提供更有意义的描述。

- `getClass()`：返回对象的运行时类（`Class` 对象），用于获取类的元信息。

- `clone()`：用于创建对象的浅拷贝。`Object` 类默认实现了浅拷贝机制，需要实现 `Cloneable` 接口来调用此方法。（对象的浅拷贝（Shallow Copy）是指复制一个对象时，只复制对象的基本字段和引用类型字段的引用，而不复制引用类型字段所指向的实际对象）

**（9）Java了解哪些IO模型？**

①同步阻塞IO：调用IO操作时，线程会被阻塞，直到有数据可以进行读写操作。

②同步非阻塞IO：调用read()或write()时，如果数据没有准备好，方法立即返回，不阻塞线程。

③异步IO：当应用程序发起 IO 请求时，不需要等待操作完成，而是立即返回，操作结果通过回调机制（Callback）通知应用程序。

**（10）Java中的静态内部类**

在Java中，静态内部类（Static Nested Class）是定义在另一个类内部的类，并使用 `static` 修饰。

静态内部类不依赖于外部类的实例。它可以在没有外部类对象的情况下被实例化。

将内部类放在外部类中可以更好地体现它们之间的关系（比如一个外部类Car和一个静态内部类Engine）。它使得相关类的逻辑更加紧密，便于管理和阅读。

```
public class OuterClass {
    private static String staticOuterField = "Outer static field";
    private String instanceOuterField = "Outer instance field";

    // 静态内部类
    public static class StaticNestedClass {
        public void display() {
            // 可以访问外部类的静态成员
            System.out.println(staticOuterField);
            // 无法直接访问外部类的非静态成员
            // System.out.println(instanceOuterField); // 编译错误
        }
    }

    public void createNested() {
        StaticNestedClass nested = new StaticNestedClass();
        nested.display();
    }
}

public class Main {
    public static void main(String[] args) {
        // 直接实例化静态内部类
        OuterClass.StaticNestedClass nestedClass = new OuterClass.StaticNestedClass();
        nestedClass.display();
    }
}
```

**（11）equals方法和==方法有什么不同**

`==` 用于比较基本数据类型的值或两个对象引用是否指向同一内存位置。

`equals()` 方法用于比较对象的**内容**是否相同。

**（12）说一下java equals，何时要重写**

在 Java 中，`equals` 是 `Object` 类的一个方法，用于比较两个对象是否相等。

默认情况下，`Object` 类的 `equals` 方法是比较对象的内存地址，也就是判断两个对象是否是同一个实例。

而在某些情况下，我们希望**比较对象的内容是否相等**，这时就需要重写 `equals` 方法。

假设我们有一个 `Person` 类，需要根据人的名字和年龄来判断两个 `Person` 对象是否相等。我们重写 `equals` 方法如下：

```
import java.util.Objects;

public class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // 重写 equals 方法
    @Override
    public boolean equals(Object obj) {
        // 如果是同一个对象，直接返回 true
        if (this == obj) {
            return true;
        }
        // 如果 obj 是 null 或者类型不同，返回 false
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        // 强制转换为 Person 对象
        Person person = (Person) obj;
        // 比较两个对象的字段
        return age == person.age && Objects.equals(name, person.name);
    }

    // 重写 hashCode 方法
    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }

    // 其他方法如 getter、setter 等
}
```

**（13）java创建对象有哪些方式**

- 使用 new 关键字

- 通过工厂类或单例模式提供的特定方法创建对象。

- 通过调用 `Object` 类的 `clone` 方法创建对象，要求类实现 `Cloneable` 接口。

- 反射：在运行时动态创建和操作对象，通过 `Class.forName()` 获取类的 `Class` 对象。
  
  - 平时，我们通过直接调用构造器或方法（如 `new ClassName()`）创建对象，编译期就已经固定了类及其调用方式。
  
  - 但在某些情况下（如加载外部模块或插件系统），类的具体名称和结构可能在运行时才确定。这就需要在运行时动态地处理这些类。

**（14）深拷贝和浅拷贝的区别**

浅拷贝：复制的是引用地址，指向同一个对象。

深拷贝：复制的是独立的对象副本。修改其中一个不会影响另一个。

### 2. Java集合

**（1）谈谈对java集合的理解**

Java 集合（Java Collections）是 Java 语言提供的一套工具类和接口，用于存储、操作和管理一组数据。位于 `java.util` 包下。

主要包括 **Collection** 接口 和 **Map** 接口。

Collection接口有三个主要的子接口：List接口、Set接口、Queue接口。

- List接口：有序、可重复的集合，常见实现类：ArrayList、LinkedList、Vector。

- Set接口：无序、不可重复的接口，常见实现类：HashSet、TreeSet、LinkedHashSet。

- Queue接口：用于模拟队列这种先进先出（FIFO）的数据结构，常见的实现类有： LinkedList、PriorityQueue。

Map接口：存储键值对（key - value）的集合，常见的实现类有 HashMap、TreeMap 和 LinkedHashMap。

**（2）哪些集合是线程安全的?**

- List接口
  
  - ArrayList：基于数组，线程不安全
  
  - LinkedList：基于双向链表，线程不安全
  
  - **Vector**：与ArrayList类似，线程安全。

- Set接口
  
  - HashSet：基于HashMap实现，线程不安全
  
  - TreeSet：基于红黑树实现，线程不安全

- Map接口
  
  - HashMap：基于哈希表，线程不安全
  
  - **Hashtable**：类似HashMap，但是所有方法都同步了，线程安全

**（3）集合迭代器了解吗**

Java 中的 **集合迭代器** 是一种遍历集合元素的机制。

迭代器（`Iterator`）接口提供了访问集合元素的统一方式，它定义了遍历集合的操作，使得我们可以顺序访问集合中的每个元素，而无需了解集合的具体实现细节。

在 Java 中，集合类（如 `List`、`Set`、`Queue` 等）都可以通过迭代器进行遍历。

`Iterator` 是一个接口，定义了遍历集合元素的方法，主要方法有：

- hasNext()：检查集合中是否还有下一个元素。如果有下一个元素，返回 `true`，否则返回 `false`。
- next()：返回集合中的下一个元素。如果没有元素，抛出 `NoSuchElementException`。
- remove()：删除当前返回的元素。调用 `next()` 方法后，才可以调用 `remove()`，否则会抛出 `IllegalStateException`。

```
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class IteratorExample {
    public static void main(String[] args) {
        // 创建一个 ArrayList
        List<String> list = new ArrayList<>();
        list.add("Apple");
        list.add("Banana");
        list.add("Cherry");

        // 获取集合的迭代器
        Iterator<String> iterator = list.iterator();

        // 使用迭代器遍历集合
        while (iterator.hasNext()) {
            String fruit = iterator.next();
            System.out.println(fruit);
        }
    }
}
```

**（4）arraylist和linkedlist的区别**

都是 Java 中常用的列表集合类

**ArrayList**：基于**动态数组**实现。它使用一个**连续的内存块**存储数据，当数组容量不足时，会自动扩容，增加新的空间。读取速度快，插入和删除元素慢。

**LinkedList**：基于**双向链表**实现，每个元素都存储有前后节点的引用（指针），从而支持双向遍历。**不需要连续的内存空间**。读取速度较慢，插入和删除速度快。

**（5）Hashmap的底层数据结构**

**数组 + 链表 + 红黑树**

`HashMap` 的底层首先是一个 **数组**，称为哈希桶。每个数组元素称为一个 **桶（bucket）**，用于存储键值对 (`Entry` 或 `Node` 对象)。它使用了哈希函数（hash function）将键映射到哈希桶（bucket）中。所以查找性能为O(1)。

如果两个键计算出的哈希值相同（发生**哈希冲突**），`HashMap` 会在对应的桶位置上形成一个 **链表**。在较早的Java版本（如 Java 7），链表是解决哈希冲突的主要方式。当发生冲突时，新元素将追加在链表的尾部。

从 **Java 8** 开始，为了提高在大量哈希冲突时的性能，`HashMap` 引入了 **红黑树**。当链表长度超过一定阈值（默认是 8）时，链表会**转化为红黑树**，以提升查找效率。

红黑树是一种自平衡的二叉搜索树，保证了在最差情况下的时间复杂度为 `O(log n)`，从而避免链表过长带来的效率问题。

**（6）介绍一下hashmap，它是不安全的，怎么办**

`HashMap`底层是基于哈希表实现的，利用哈希函数将键映射到对应的索引位置上。

**非线程安全**：在多线程环境中，`HashMap`的并发操作（如`put()`、`get()`）可能导致不一致的数据状态，甚至导致死循环等问题。

如何解决 `HashMap` 的线程安全问题

- 使用 `Hashtable`：`Hashtable`是`HashMap`的线程安全版本，每个方法都使用了`synchronized`关键字。

- 使用 `ConcurrentHashMap`：`ConcurrentHashMap`是一个线程安全的哈希表，是`HashMap`的一个改进版本，专门为多线程环境设计。`ConcurrentHashMap`采用分段锁机制，将数据分为多个段，每个段可以独立加锁，减少了锁竞争，从而提高了并发性能。

**（7）hashmap和hashtable区别**

`HashMap` 适合单线程或不需要线程安全的场景，性能较高；`Hashtable` 是线程安全的，但性能较低。

**HashMap**：**非线程安全**，它在多线程环境下不保证一致性，因此多个线程同时访问和修改 `HashMap` 可能导致数据不一致。

**Hashtable**：**线程安全**，内部对方法进行了同步处理（通过 `synchronized`），因此它在多线程环境中是安全的，但同步开销较大，性能较低。

（通过**同步机制**，可以确保在同一时间只有一个线程访问某一段代码或资源，其他线程必须等待该资源被释放后才能访问）

**（8）了解过 ConcurrentHashMap 吗**

JDK 1.7 的 ConcurrentHashMap 采用 Segment 分段锁，多个线程可以并发访问不同的 Segment（一个 `Segment` 可以包含多个桶（数组元素）），提高并发能力。

- `ConcurrentHashMap` 由多个 Segment（段） 组成，类似于一个小型的 `HashMap`。

- 每个 `Segment` 维护一部分数据，并使用 `ReentrantLock` 进行加锁，保证线程安全。

- 每个 `Segment` 内部使用 **数组 + 链表** 存储数据。

JDK 1.8 的 ConcurrentHashMap 摒弃了 `Segment` 分段锁的设计，采用了数组 + 链表 + 红黑树的数据结构，与 `HashMap` 的结构类似，锁的粒度细化到桶（`bin`）级别。

采用 CAS + Synchronized 机制，在高并发情况下进一步优化，减少了锁的粒度，提高了吞吐量。

**CAS（比较并交换）**

`CAS` 是一种无锁算法，它包含三个操作数：内存位置（V）、预期原值（A）和新值（B）。如果内存位置的值与预期原值相匹配，那么处理器会自动将该位置值更新为新值。否则，处理器不做任何操作。整个比较并交换的操作是原子性的。

应用场景：在 `ConcurrentHashMap` 中，`CAS` 主要用于初始化数组、扩容时的节点迁移等操作。例如，在初始化数组时，多个线程可能会同时尝试初始化，使用 `CAS` 可以确保只有一个线程能够成功初始化，其他线程会重试。

**Synchronized**

`Synchronized` 是 Java 中的关键字，用于实现同步机制，确保同一时刻只有一个线程能够访问被 `Synchronized` 修饰的代码块或方法。

应用场景：在 `ConcurrentHashMap` 中，`Synchronized` 主要用于对桶（`bin`）进行加锁，当多个线程同时访问同一个桶时，会使用 `Synchronized` 对该桶进行加锁，从而保证线程安全。

**（9）ConcurrentHashMap和HashMap吞吐量比较**

单线程环境：`HashMap` 性能更优，因为它没有额外的加锁开销。`ConcurrentHashMap` 由于涉及锁的操作，性能稍低。

多线程环境：`HashMap` 在多线程环境下可能会发生数据竞争，如果多个线程同时修改 `HashMap`，可能会导致 死循环、数据丢失 等问题。`ConcurrentHashMap` 采用 细粒度锁，吞吐量更高。

**（10）使用hashmap时，如果只重写了equals没有重写hashcode会出现什么问题**

`HashMap` 使用键的 `hashCode()` 值来确定存储位置，如果只重写 `equals()`，两个对象可能在逻辑上是相等的（`equals()` 返回 `true`），但如果它们的 `hashCode()` 值不同，则 `HashMap` 会认为它们属于不同的桶，导致**无法正确地定位或替换已有元素**。

### 3. JVM

**（1）jvm的结构**

Java虚拟机（JVM）是Java平台的核心部分，负责执行Java字节码并提供运行环境。JVM的结构可以分为多个主要组件，每个组件都有其特定的功能。

- **类加载子系统**（Class Loader Subsystem）：负责将Java类加载到内存中，并进行验证（验证字节码的合法性）、准备（分配内存并初始化类变量）和解析（将符号引用转换为直接引用）。

- **运行时数据区**（Runtime Data Area）：JVM在运行时会创建几个数据区来管理数据，这些数据区包括：
  
  - **方法区（Method Area）**：存放已加载类的信息、常量池、字段和方法数据等，所有线程共享。
  - **堆（Heap）**：用于存放对象实例和数组，是垃圾回收器的主要工作区域。所有线程共享堆。
  - **栈（Stack）**：每个线程都有自己的Java虚拟机栈，用于存储局部变量、操作数栈和方法调用的相关信息。栈帧的压入和弹出操作与方法调用和返回密切相关。
  - **程序计数器（Program Counter Register）**：每个线程都有一个程序计数器，用于记录当前线程所执行的字节码行号。
  - **本地方法栈（Native Method Stack）**：与Java栈类似，但用于存放本地方法的相关信息。

- **执行引擎**（Execution Engine）：负责执行JVM中的字节码。

- **垃圾回收器**（Garbage Collector）：自动管理内存，回收不再使用的对象，防止内存泄漏。

- **本地接口**（Native Interface）：与其他编程语言（如C/C++）的本地方法交互，提供与底层操作系统或硬件的接口。

**（2）了解JVM调优吗**

**堆内存设置**：通过 `-Xms` 和 `-Xmx` 参数设置堆的初始大小和最大大小

**选择合适的垃圾回收器**：Java 提供了多种垃圾回收器，可以根据应用特点选择适合的垃圾回收策略：

- **Serial GC**：单线程垃圾回收，适合单线程应用或小内存的环境。
- **Parallel GC**：多线程垃圾回收，适合多线程环境，追求高吞吐量。
- **CMS GC**（Concurrent Mark Sweep）：低延迟回收器，适合需要低延迟的应用。
- **G1 GC**（Garbage-First GC）：适合大内存、多 CPU 核心的应用环境，兼顾延迟和吞吐量，Java 9 之后推荐为默认 GC。

**编译优化**：调整 JIT（Just-In-Time） 编译的行为，例如 -XX:CompileThreshold 参数决定方法何时被编译成本地代码。当 JIT 编译器监测到某个方法被频繁调用时，便会将该方法的字节码编译成本地代码（机器代码），并将其缓存。此后每次调用这个方法时，JVM 直接执行已编译的机器码，不再解释字节码，从而提高执行速度。`-XX:CompileThreshold` 指定了方法被调用的次数阈值。

**（3）jvm的内存划分**

Java 虚拟机（JVM）在运行时将内存划分为多个区域，每个区域有特定的用途。

- 程序计数器（Program Counter Register）：记录当前线程执行的字节码指令的地址或行号。

- 虚拟机栈（Java Virtual Machine Stack）：存储方法执行的相关信息，包括局部变量、操作数栈、方法出口等。

- 本地方法栈（Native Method Stack）：与虚拟机栈类似，但用于存放本地方法（如使用 JNI 调用的 C/C++ 代码）。

- 堆（Heap）：存储对象实例和数组，是垃圾回收的主要区域。

- 方法区（Method Area）：用于存放已被加载的类信息、常量、静态变量、即时编译器编译后的代码等数据。

- 运行时常量池（Runtime Constant Pool）：方法区的一部分，存放编译期间生成的字面量和符号引用。

- 前三个，每个线程都有独立的。后三个，所有线程都共享。

### 4. Java锁

**（1）讲一下对 Java 锁的了解**

Java 中的锁主要用于控制多个线程对共享资源的访问，确保线程安全。

**基于锁的获取与释放方式**

- 隐式锁（内置锁）：通用synchronized关键字实现的一种线程同步机制。当一个线程进入被synchronized修饰的方法时，会自动获得对象级别的锁，退出该方法时则会自动释放这把锁。

- 显示锁（ReentrantLock、ReentrantReadWriteLock、StampedLock）：由 `java.util.concurrent.locks.Lock`接口及其诸多实现类提供的同步机制。相较于隐式锁，显式锁提供了更为多样化的锁操作选项，包括：支持线程在等待锁时可被中断、根据先后顺序分配锁资源的公平锁与非公平锁机制。

- synchronized 和 lock 的区别
  
  - synchronized：关键字、隐式锁、方法或代码块执行完毕后自动释放、不可中断
  
  - lock：类、显式锁、需要手动加锁和解锁、可中断

**基于对资源的访问权限**

- 独占锁：是一种同步机制，它确保在任一时刻，最多只有一个线程可以获得锁并对受保护的资源进行访问或修改。

- 共享锁：许多个线程同时读取共享资源，但不允许任何线程修改资源。

**基于锁的获取公平性**

- 公平锁：当多个线程尝试获取锁时，锁的分配遵循“先请求先服务”，这意味着等待时间最长的线程将优先获得锁，有效避免线程饥饿的问题。

- 非公平锁：当多个线程尝试获取锁时，锁的分配不遵循“先请求先服务”，而是允许任何等待锁的线程在锁被释放时尝试获取。在某些场景下可以提高系统的并发性能，因为它不强制线程排队等待。

**基于对共享资源的访问方式**

- 悲观锁：它假设在并发环境下，多个线程对共享资源的访问极有可能发生冲突，因此在访问资源之前，先尝试获取并锁定资源，直到该线程完成对资源的访问并释放锁，其他线程才能继续访问。

- 乐观锁：乐观锁假设在多线程环境中，冲突发生的可能性较小，因此在访问数据时不加锁，而是在操作结束时检查数据是否被其他线程修改过。

**（2）volatile关键字的主要作用，以及它为什么线程不安全？**

volatile关键字的作用就是保证共享变量的**可见性**，也就是说，一个线程读变量，总是能读到它在内存中的最新的值，也就是说不同线程看到的一个变量的值是相同的。

使用volatile保证线程安全，需要满足两个条件：①对变量的写操作不依赖于当前值 ②该变量没有包含在其它变量的不变式中

其他情况下volatile并不能保证线程安全问题，因为volatile并不能保证变量操作的原子性。

**（3）synchronized是独占锁吗？可以修饰静态方法？**

`synchronized` 是独占锁。独占锁也称为互斥锁，它在同一时刻只允许一个线程持有该锁并访问共享资源。

`synchronized` 可以修饰静态方法。`synchronized` 修饰静态方法时，使用的锁是该类的 `Class` 对象，所有该类的实例共享这个锁。

```
public class SynchronizedStaticMethodExample {
    // 使用 synchronized 修饰静态方法
    public static synchronized void staticMethod() {
        // 方法体
    }
}
```

**（4）synchronized和volatile的区别**

`synchronized`和`volatile`都是用来实现线程安全的关键字，但它们的功能和使用场景有所不同。

**synchronized**

- 用于对某个方法或代码块进行加锁，确保同一时间只有一个线程可以执行被锁的代码，从而实现互斥访问。

- 可保证可见性和原子性。

- 适合有复杂逻辑、需要多步操作的共享资源的访问保护。

**volatile**

- 保证变量的可见性，确保线程读取到的是最新的变量值，而非缓存值。

- 只能保证可见性，**不保证原子性**。例如，`count++`这种操作不能用`volatile`实现安全。
  
  - `count++`实际上包含了三个步骤：读取、修改、写入，这些操作并不是原子的。
  
  - 虽然`volatile`保证了`count`的可见性，但不能保证在多个线程并发执行时的正确性。

- 适合用于简单的状态标志，例如状态开关、标志变量等，不需要多步操作的共享数据。

**（5）volatile和synchronized的底层原理**

**volatile 的底层原理**

- 使用 `volatile` 修饰的变量在被修改后，会强制刷新到主内存。

- 每次线程读取 `volatile` 变量时，都直接从主内存中读取，而不是从线程的工作内存（CPU 缓存）中读取。

**synchronized的底层原理**

- `synchronized` 确保线程在释放锁前，会将工作内存中的数据刷新到主内存。获取锁的线程会将缓存数据标记为无效，从而强制从主内存中重新加载数据。

- 由于 `synchronized` 是排他锁，只有一个线程可以访问临界区代码，确保了操作的原子性。

**（6）volatile会不会造成线程阻塞**

不会。

在 Java 中，`volatile` 是一个轻量级的同步机制，主要有两个作用：

- 保证变量的可见性：在多线程环境下，每个线程都有自己的工作内存，变量的值会先从主内存拷贝到工作内存中进行操作，操作完成后再写回主内存。使用 `volatile` 修饰的变量，当一个线程修改了该变量的值，会立即将修改后的值刷新到主内存中，并且会使其他线程工作内存中该变量的副本失效，从而保证其他线程能够立即看到最新的值。
- 禁止指令重排序：在 Java 编译器和处理器为了提高性能，可能会对指令进行重排序。使用 `volatile` 修饰的变量，会在编译和运行时禁止特定类型的指令重排序，保证代码的执行顺序符合程序员的预期。

线程阻塞通常是指线程在执行过程中由于某种原因（如等待锁、等待 I/O 操作完成等）而暂停执行，进入阻塞状态，直到满足特定条件后才会继续执行。`olatile` 关键字只是保证了变量的可见性和禁止指令重排序，它并不涉及线程的阻塞和唤醒机制。

**（7）volatile和synchronized是否能被编译器优化**

编译器通常不会对 `volatile` 变量进行优化，编译器和 JVM 会对 `synchronized` 代码块或方法进行一些优化，以提高性能。例如：

**锁粗化**：如果一系列的连续操作都对同一个对象加锁和解锁，编译器会将这些锁操作合并成一个更大范围的锁，减少加锁和解锁的次数。

```
public class LockCoarseningExample {
    private Object lock = new Object();

    public void method() {
        synchronized (lock) {
            // 操作 1
        }
        synchronized (lock) {
            // 操作 2
        }
    }
}
```

编译器可能会将上述代码优化为：

```
public class LockCoarseningExample {
    private Object lock = new Object();

    public void method() {
        synchronized (lock) {
            // 操作 1
            // 操作 2
        }
    }
}
```

**锁消除**：如果编译器通过逃逸分析发现某个锁对象只能被一个线程访问，不存在多线程竞争的情况，就会将锁操作消除。

```
public class LockEliminationExample {
    public void method() {
        Object lock = new Object();
        synchronized (lock) {
            // 操作
        }
    }
}
```

由于 `lock` 对象只在 `method` 方法内部使用，不会被其他线程访问，编译器可能会将 `synchronized` 块消除。

**（8）synchronized锁升级过程**

- **偏向锁（Biased Locking）**
  
  - 如果某线程多次获得同一把锁，则偏向锁允许其直接进入临界区而不进行加锁操作。
  
  - 偏向锁适用于没有锁竞争的场景，降低了线程获取锁的开销。

- **轻量级锁（Lightweight Locking）**：
  
  - 当多个线程尝试竞争锁时，升级为轻量级锁。
  
  - 轻量级锁使用 CAS（Compare-And-Swap）操作实现线程安全，而不涉及操作系统的线程调度。避免线程阻塞。

- **重量级锁（Heavyweight Locking）**：
  
  - 当锁竞争激烈时，升级为重量级锁，依赖操作系统的 Mutex（互斥锁）实现（当多个线程竞争同一把锁时，会涉及到线程的阻塞和唤醒操作）。
  
  - 重量级锁会导致线程进入阻塞状态，性能开销较大。

**（9）原子性和可见性是什么**

**原子性**：是指一个操作是不可分割的，要么完整地执行完毕，要么不执行（在多线程环境下）。原子操作意味着在操作的过程中，任何其他线程都不能看到操作处于中间状态。

**可见性**：确保一个线程对共享变量的修改能够被其他线程立即看到。在多线程环境下，一个线程对某个变量的修改可能存储在其本地缓存中，而其他线程无法立即看到这个修改。

**为什么需要保证可见性，是什么问题导致的？**

为了确保一个线程对共享变量的修改能够被其他线程及时看到，避免因线程之间对共享数据的视图不一致而导致程序出现错误或不正确的行为。 

**（10）ReentrantLock底层实现**

`ReentrantLock` 是 Java 并发包（`java.util.concurrent.locks`）中一个可重入的互斥锁，它的底层主要基于 `AbstractQueuedSynchronizer`（AQS）实现。

`ReentrantLock` 内部使用一个继承自 AQS 的静态内部类 `Sync` 来实现锁的同步机制。

`Sync` 有两个子类 `FairSync`（公平锁）和 `NonfairSync`（非公平锁），分别用于实现公平锁和非公平锁的逻辑。

AQS 是一个用于构建锁和同步器的框架，它使用一个整型的状态变量 `state` 来表示锁的状态，通过一个双向链表来管理等待线程。

### 5.线程池

**（1）在 Java 中，线程池怎么创建？**

通常使用 `Executors` 工厂类中的静态方法。

```
// 创建一个固定大小的线程池
ExecutorService executorService = Executors.newFixedThreadPool(5);


// 创建一个单线程池
ExecutorService executorService = Executors.newSingleThreadExecutor();
```

**（2）线程池的作用**

管理和复用线程，从而有效地减少线程创建和销毁的开销，提高程序性能。

在线程池中，多个任务可以被并发执行，因为线程池能够管理多个线程并行处理任务。

**（3）为什么要用动态性线程池**

主要是为了**在任务量变化时灵活调整线程数量**，优化资源利用，通过复用线程，避免频繁创建和销毁线程，提高系统的效率和吞吐量。在高负载时，它能增加线程处理任务，低负载时则减少线程，节省资源。

**（4）提交任务流程**

①提交任务：调用`execute()`方法（无返回值）或者`submit()`方法（有返回值）来提交任务。

②选择合适的线程：线程池内部有一个任务队列（`BlockingQueue`），线程池通过不同的线程选择策略将任务分配到线程中。如果线程池中有空闲线程，任务会直接分配给空闲线程。如果线程池中的线程都在工作，那么任务会被放入队列中等待执行。

③线程执行任务：一旦线程空闲出来，或者任务从队列中取出，线程池会选择合适的线程来执行任务。任务执行完成后，线程会被回收或复用。

④任务执行完成：如果任务是通过`submit()`提交的，返回的`Future`对象可以用来获取任务执行结果、检查是否完成或取消任务。

**（5）线程的状态**

新建（New）、就绪（Runnable）、正在运行（Running）、阻塞（Blocked）、等待（Waiting）、超时等待（Timed Waiting）、终止（Terminated）

**（6）线程池的实现原理**

线程池是一种用于管理和复用线程的机制，在 Java 中，`java.util.concurrent` 包提供了强大的线程池支持，以 `ThreadPoolExecutor` 类为核心。

线程池主要包含以下几个**核心组件**

- 线程池管理器：负责创建、管理和销毁线程池，包括线程池的初始化、线程的分配和回收等操作。

- 工作线程：线程池中的线程，它们从任务队列中获取任务并执行。

- 任务队列：用于存储待执行的任务，当线程池中的线程都在忙碌时，新提交的任务会被放入任务队列中等待执行。

- 任务提交者：负责向线程池提交任务。

线程池的**工作流程**

当一个任务提交到线程池时，线程池会按照以下步骤进行处理：

- 判断核心线程数：首先检查线程池中的线程数量是否小于核心线程数（`corePoolSize`）。如果是，则创建一个新的线程来执行该任务。

- 检查任务队列：如果线程池中的线程数量已经达到核心线程数，将任务放入任务队列中等待执行。

- 判断最大线程数：如果任务队列已满，再检查线程池中的线程数量是否小于最大线程数（`maximumPoolSize`）。如果是，则创建一个新的线程来执行该任务。

- 执行拒绝策略：如果线程池中的线程数量已经达到最大线程数，且任务队列也已满，此时会执行拒绝策略来处理新提交的任务。

**（7）线程池的核心参数**

- corePoolSize（核心线程数）：线程池保持的最小线程数。

- maximumPoolSize（最大线程数）：线程池允许创建的最大线程数。

- keepAliveTime（线程空闲时间）：当线程池中的线程数超过核心线程数时，多余的空闲线程在 `keepAliveTime` 时间内会被终止。

- workQueue（工作队列）：用来保存待执行任务的阻塞队列。

- handler（拒绝策略）。

**（8）线程池如何设置核心线程数**

1. 通过 `ThreadPoolExecutor` 类的构造函数来设置。
   
   该构造函数中的corePoolSize参数对应于核心线程数。

```
int corePoolSize = 5; // 设置核心线程数
int maximumPoolSize = 10; // 设置最大线程数
long keepAliveTime = 60L; // 设置空闲线程的最大存活时间
TimeUnit unit = TimeUnit.SECONDS; // 时间单位为秒
BlockingQueue<Runnable> workQueue = new ArrayBlockingQueue<>(50); // 设置任务队列

ThreadPoolExecutor executor = new ThreadPoolExecutor(
    corePoolSize,
    maximumPoolSize,
    keepAliveTime,
    unit,
    workQueue
);
```

2. 使用 `Executors.newFixedThreadPool` 创建固定大小的线程池

```
int poolSize = 5; // 设置固定线程池大小（核心线程数即为 poolSize）
ExecutorService executor = Executors.newFixedThreadPool(poolSize);
```

**（9）线程池的拒绝策略**

线程池的拒绝策略（Rejection Policy）是指当线程池中的任务数量达到最大值且所有工作线程都在忙碌时，如何处理新提交的任务。

- **AbortPolicy（默认策略）**：当任务被拒绝时，直接抛出 `RejectedExecutionException` 异常，阻止系统正常工作。

- **CallerRunsPolicy**：当任务被拒绝时，由提交任务的线程（调用 `execute` 方法的线程）来执行该任务。

- **DiscardPolicy**：当任务被拒绝时，直接丢弃该任务，不会抛出任何异常，也不会有任何提示。

- **DiscardOldestPolicy**：当任务被拒绝时，丢弃任务队列中最老的任务（即队列头部的任务），然后尝试重新提交当前任务。

- 除了这四种内置的拒绝策略，你还可以通过实现 `RejectedExecutionHandler` 接口来自定义拒绝策略。

**（10）线程池线程出异常，主线程怎么感知**

①使用 `Future` 对象获取异常信息

当使用 `ExecutorService.submit()` 方法提交任务时，会返回一个 `Future` 对象。可以通过调用 `Future.get()` 方法来获取任务的执行结果，若任务执行过程中抛出异常，`get()` 方法会将该异常重新抛出，主线程可以捕获该异常。

```
import java.util.concurrent.*;

public class FutureExceptionHandling {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newSingleThreadExecutor();
        Future<?> future = executor.submit(() -> {
            // 模拟抛出异常
            throw new RuntimeException("线程执行过程中出现异常");
        });

        try {
            // 获取任务结果
            future.get();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println("线程被中断: " + e.getMessage());
        } catch (ExecutionException e) {
            // 获取任务抛出的异常
            Throwable cause = e.getCause();
            System.out.println("任务执行出现异常: " + cause.getMessage());
        }

        executor.shutdown();
    }
}
```

②可以继承 `ThreadPoolExecutor` 类，重写 `afterExecute` 方法，在任务执行完成后检查是否抛出异常。

```
import java.util.concurrent.*;

public class AfterExecuteExceptionHandling extends ThreadPoolExecutor {
    public AfterExecuteExceptionHandling(int corePoolSize, int maximumPoolSize, long keepAliveTime, TimeUnit unit, BlockingQueue<Runnable> workQueue) {
        super(corePoolSize, maximumPoolSize, keepAliveTime, unit, workQueue);
    }

    @Override
    protected void afterExecute(Runnable r, Throwable t) {
        super.afterExecute(r, t);
        if (t == null && r instanceof Future<?>) {
            try {
                Future<?> future = (Future<?>) r;
                if (future.isDone()) {
                    future.get();
                }
            } catch (CancellationException ce) {
                t = ce;
            } catch (ExecutionException ee) {
                t = ee.getCause();
            } catch (InterruptedException ie) {
                Thread.currentThread().interrupt();
            }
        }
        if (t != null) {
            System.out.println("任务执行出现异常: " + t.getMessage());
        }
    }

    public static void main(String[] args) {
        AfterExecuteExceptionHandling executor = new AfterExecuteExceptionHandling(
                1, 1, 0L, TimeUnit.MILLISECONDS,
                new LinkedBlockingQueue<>()
        );

        executor.submit(() -> {
            // 模拟抛出异常
            throw new RuntimeException("线程执行过程中出现异常");
        });

        executor.shutdown();
    }
}
```

③自定义 `ThreadFactory` 捕获异常

可以自定义 `ThreadFactory`，在创建线程时为线程设置 `UncaughtExceptionHandler`，当线程抛出未捕获的异常时，会调用该处理器进行处理。

```
import java.util.concurrent.*;

public class CustomThreadFactoryExceptionHandling {
    public static void main(String[] args) {
        ThreadFactory customThreadFactory = r -> {
            Thread thread = new Thread(r);
            thread.setUncaughtExceptionHandler((t, e) -> {
                System.out.println("线程 " + t.getName() + " 出现异常: " + e.getMessage());
            });
            return thread;
        };

        ExecutorService executor = new ThreadPoolExecutor(
                1, 1, 0L, TimeUnit.MILLISECONDS,
                new LinkedBlockingQueue<>(),
                customThreadFactory
        );

        executor.submit(() -> {
            // 模拟抛出异常
            throw new RuntimeException("线程执行过程中出现异常");
        });

        executor.shutdown();
    }
}
```

### 6. 线程

**（1）java中的多线程，如何实现的**

**继承 `Thread` 类**：重写 `run()` 方法，定义线程的行为。启动线程时，通过 `start()` 方法来启动。

**实现 `Runnable` 接口**：创建一个实现 `Runnable` 接口的类，重写 `run()` 方法。将 `Runnable` 实例传递给 `Thread` 对象，再调用 `start()` 方法启动。

**使用 `ExecutorService` 创建线程池**：`ExecutorService` 提供了创建和管理线程池的功能，常见线程池包括 `FixedThreadPool`、`CachedThreadPool` 等。通过线程池执行线程时，使用 `execute()` 或 `submit()` 方法提交任务。

**（2）讲讲ThreadLocal**

`ThreadLocal` 是一种线程隔离机制，它提供了一种方式来确保每个线程都有一个独立的变量副本。

每个线程通过 `ThreadLocal` 获取的变量是线程私有的，其他线程无法访问。

适用于线程需要维护独立状态的场景，常见的例子有：数据库连接、用户会话、线程安全的计数器等。

```
public class ThreadLocalExample {
    // 创建一个 ThreadLocal 变量，每个线程都有独立的副本
    private static ThreadLocal<Integer> threadLocalCount = ThreadLocal.withInitial(() -> 0);

    public static void main(String[] args) throws InterruptedException {
        Runnable task = () -> {
            // 获取当前线程的计数器值
            int count = threadLocalCount.get();
            count++;
            // 设置当前线程的计数器新值
            threadLocalCount.set(count);
            System.out.println(Thread.currentThread().getName() + " count: " + threadLocalCount.get());
        };

        Thread thread1 = new Thread(task);
        Thread thread2 = new Thread(task);
        Thread thread3 = new Thread(task);

        thread1.start();
        thread2.start();
        thread3.start();

        thread1.join();
        thread2.join();
        thread3.join();
    }
}
```

**（3）Java多线程怎么等待其他线程的结果**

1. 使用 `Thread.join()`

`join()` 方法使当前线程等待另一个线程完成后再继续运行。

```
public class JoinExample {
    public static void main(String[] args) throws InterruptedException {
        Thread thread = new Thread(() -> {
            System.out.println("Thread is running...");
            try {
                Thread.sleep(2000); // 模拟工作耗时
                System.out.println("Thread completed.");
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });

        thread.start();
        System.out.println("Waiting for thread to complete...");
        thread.join(); // 等待 thread 完成
        System.out.println("Main thread continues...");
    }
}
```

2. 使用 `CountDownLatch`

`CountDownLatch` 是一个并发工具类，用来实现线程之间的协调，确保一定数量的线程完成后再继续。

```
import java.util.concurrent.CountDownLatch;

public class CountDownLatchExample {
    public static void main(String[] args) throws InterruptedException {
        CountDownLatch latch = new CountDownLatch(2);

        Runnable task = () -> {
            try {
                System.out.println(Thread.currentThread().getName() + " is working...");
                Thread.sleep(2000); // 模拟任务耗时
                System.out.println(Thread.currentThread().getName() + " completed.");
            } catch (InterruptedException e) {
                e.printStackTrace();
            } finally {
                latch.countDown(); // 减少计数
            }
        };

        new Thread(task).start();
        new Thread(task).start();

        System.out.println("Waiting for tasks to complete...");
        latch.await(); // 阻塞，直到计数为 0
        System.out.println("All tasks completed. Main thread continues.");
    }
}
```

**（4）线程为什么需要本地内存，不直接读主内存**

线程需要本地内存是为了**提高性能**，因为主内存（RAM）访问速度慢，而本地内存（通常对应CPU缓存）访问快，可以减少线程频繁访问主内存的开销。

**（5）怎么解决i++的线程安全问题**

在多线程环境中，`i++` 操作存在线程安全问题，因为 `i++` 不是原子的，它实际上包含了三个步骤：

1. 读取变量 `i` 的当前值。
2. 将值增加 1。
3. 将增加后的值写回到 `i`。

可能会发生以下问题：

- **竞争条件**：两个线程读取到相同的 `i` 值，然后分别增加 1 并写回，最终 `i` 的值增加了 1，但实际上应该增加 2。

**解决**

- 使用 `synchronized` 关键字。可以确保同一时刻只有一个线程执行 `i++` 操作，从而避免线程安全问题。

```
private int i = 0;

public synchronized void increment() {
    i++;
}
```

- 使用 `AtomicInteger` 类（原子操作）

Java 提供了 `AtomicInteger` 类，它提供了原子性的加法操作。`AtomicInteger` 使用底层硬件的原子指令来保证线程安全，避免了锁的使用，通常比 `synchronized` 更高效。

```
import java.util.concurrent.atomic.AtomicInteger;

private AtomicInteger i = new AtomicInteger(0);

public void increment() {
    i.incrementAndGet(); // 等同于 i++
}
```

**（6）死锁**

死锁（Deadlock）是指在多线程或多进程的程序中，两个或多个进程（或线程）相互等待对方释放资源，从而导致所有进程或线程都无法继续执行的情况。锁通常发生在以下四个条件同时满足时：

- **互斥条件（Mutual Exclusion）**：某些资源是不可共享的，必须由一个进程或线程独占。例如，打印机、文件等设备在同一时刻只能被一个线程占用。

- **持有并等待条件（Hold and Wait）**：一个进程已经持有了一些资源，并且还在等待获取其他被其他进程占用的资源。

- **非抢占条件（No Preemption）**：已分配给进程的资源，不能强行抢占，必须等到进程自己释放资源。

- **循环等待条件（Circular Wait）**：存在一种进程的循环等待关系。例如，进程A等待进程B释放资源，而进程B等待进程C释放资源，进程C又等待进程A释放资源。

死锁的预防和解决方法：

- **资源分配策略**：为了避免死锁，可以设计合理的资源分配策略，比如按顺序请求资源，避免出现循环等待。

- **死锁避免**：采用死锁避免算法，如银行家算法，通过动态检查进程资源请求的安全性，避免进入不安全的状态。

**（7）进程、线程和协程区别，进程与线程的上下文切换区别**

- **进程（Process）**：是操作系统分配资源的基本单位，是正在运行的程序的实例。每个进程拥有独立的内存空间、文件描述符、堆栈等资源。
- **线程**：是进程的执行单位，也叫做轻量级进程。一个进程可以有多个线程，它们共享同一进程的资源（如内存空间、文件描述符等），但每个线程有自己的堆栈和寄存器等上下文信息。线程之间的切换由操作系统负责。栈空间大，切换成本高。
- **协程**：由程序自身控制的轻量级线程，协程的切换在用户态完成，不依赖操作系统内核。栈空间小，切换成本低。

**进程与线程的上下文切换区别**

- 进程是操作系统分配资源的基本单位，拥有独立的内存空间和资源，进程间相互独立，上下文切换需要保存和恢复更多的信息，如内存管理和文件描述符，因而开销较大。
- 而线程是进程的执行单位，多个线程共享同一进程的内存空间和资源，而线程上下文切换只涉及少量的CPU寄存器和堆栈指针等，开销较小。

### 7. Java的设计模式有哪些

设计模式是指：面对同类软件工程设计问题，总结出来的设计经验，一种通用的解决方案

创建型模式：用于对象的创建，包括单例、工厂等模式

- 工厂方法

工厂方法模式定义了一个用于创建对象的接口，但由子类决定实例化哪个类。工厂方法将对象的创建延迟到子类。

```
// 产品接口
interface Product {
    void doSomething();
}

// 具体产品类
class ConcreteProductA implements Product {
    public void doSomething() {
        System.out.println("Product A is doing something");
    }
}
class ConcreteProductB implements Product {
    public void doSomething() {
        System.out.println("Product B is doing something");
    }
}

// 工厂接口
interface Creator {
    Product createProduct();
}

// 具体工厂类
class ConcreteCreatorA implements Creator {
    public Product createProduct() {
        return new ConcreteProductA();
    }
}
class ConcreteCreatorB implements Creator {
    public Product createProduct() {
        return new ConcreteProductB();
    }
}

// 使用工厂方法创建产品
public class FactoryMethodExample {
    public static void main(String[] args) {
        Creator creatorA = new ConcreteCreatorA();
        Product productA = creatorA.createProduct();
        productA.doSomething();  // 输出: Product A is doing something
    }
}
```

- 抽象工厂

抽象工厂模式提供一个接口，用于创建一系列相关或依赖的对象，而无需指定具体类。它提供了多个工厂方法来生成不同类型的产品。

```
// 抽象产品接口
interface Button {
    void render();
}

interface Checkbox {
    void paint();
}

// 具体产品类
class WinButton implements Button {
    public void render() {
        System.out.println("Rendering Windows Button");
    }
}

class WinCheckbox implements Checkbox {
    public void paint() {
        System.out.println("Painting Windows Checkbox");
    }
}

class MacButton implements Button {
    public void render() {
        System.out.println("Rendering Mac Button");
    }
}

class MacCheckbox implements Checkbox {
    public void paint() {
        System.out.println("Painting Mac Checkbox");
    }
}

// 抽象工厂接口
interface GUIFactory {
    Button createButton();
    Checkbox createCheckbox();
}

// 具体工厂类
class WinFactory implements GUIFactory {
    public Button createButton() {
        return new WinButton();
    }
    public Checkbox createCheckbox() {
        return new WinCheckbox();
    }
}

class MacFactory implements GUIFactory {
    public Button createButton() {
        return new MacButton();
    }
    public Checkbox createCheckbox() {
        return new MacCheckbox();
    }
}

// 使用抽象工厂
public class AbstractFactoryExample {
    public static void main(String[] args) {
        GUIFactory factory = new WinFactory();
        Button button = factory.createButton();
        Checkbox checkbox = factory.createCheckbox();
        button.render();
        checkbox.paint();
    }
}
```

- 单例

单例模式确保一个类只有一个实例，并提供全局访问点。

- 建造者

建造者模式将一个复杂对象的构建过程与其表示分离，使得同样的构建过程可以创建不同的表示。

```
// 产品类
class Car {
    private String engine;
    private String wheels;

    public void setEngine(String engine) {
        this.engine = engine;
    }

    public void setWheels(String wheels) {
        this.wheels = wheels;
    }

    public String toString() {
        return "Car with " + engine + " engine and " + wheels + " wheels";
    }
}

// 建造者接口
interface CarBuilder {
    void buildEngine();
    void buildWheels();
    Car getResult();
}

// 具体建造者
class SportsCarBuilder implements CarBuilder {
    private Car car = new Car();

    public void buildEngine() {
        car.setEngine("Sports engine");
    }

    public void buildWheels() {
        car.setWheels("Sports wheels");
    }

    public Car getResult() {
        return car;
    }
}

// 导演类
class Director {
    private CarBuilder builder;

    public Director(CarBuilder builder) {
        this.builder = builder;
    }

    public Car construct() {
        builder.buildEngine();
        builder.buildWheels();
        return builder.getResult();
    }
}

// 使用建造者模式
public class BuilderExample {
    public static void main(String[] args) {
        CarBuilder builder = new SportsCarBuilder();
        Director director = new Director(builder);
        Car car = director.construct();
        System.out.println(car);
    }
}
```

- 原型

原型模式通过复制现有的对象来创建新的对象，而不是通过构造函数来创建。它用于避免重复的创建操作，并提高性能。

适用场景：

- 当对象的创建成本较高时，可以通过复制现有对象来提高效率。
- 当对象之间有较复杂的依赖关系时，使用原型模式更合适。

```
// 原型接口
interface Prototype {
    Prototype clone();
}

// 具体原型类
class ConcretePrototype implements Prototype {
    private String name;

    public ConcretePrototype(String name) {
        this.name = name;
    }

    public Prototype clone() {
        return new ConcretePrototype(this.name);
    }

    public String toString() {
        return "Prototype: " + name;
    }
}

// 使用原型模式
public class PrototypeExample {
    public static void main(String[] args) {
        ConcretePrototype prototype = new ConcretePrototype("Original");
        ConcretePrototype clone = (ConcretePrototype) prototype.clone();
        System.out.println(clone);  // 输出: Prototype: Original
    }
}
```

结构型模式：用于描述对象之间的组合关系，包括代理、享元等模式

- 适配器、装饰器、代理、外观、桥接、组合、享元

行为型模式：用于描述对象之间的通信和责任分配，包括模板方法、观察者、责任链等模式

- 策略、模板方法、观察者、迭代子模式、责任链模式、命令模式、备忘录模式、状态模式、访问者模式、中介者模式、解释器模式
5. MVCC的原理，以及MVCC解决了哪些问题

MVCC 的核心思想是，**每个事务看到的数据是该事务开始时数据库的一个快照**，即使其他事务正在修改数据，事务依然会看到一致的数据视图。通过这种方式，多个事务可以并发执行，同时避免了常见的并发问题，如脏读、不可重复读和幻读。

**MVCC**（Multiversion Concurrency Control，多版本并发控制）

- **读写冲突**。在传统的**锁机制**中，读操作和写操作之间会发生冲突，例如，当一个事务正在写入数据时，另一个事务如果要读取同一数据，可能会被阻塞。MVCC 通过提供**数据快照（为每个事务提供不同版本的快照数据）**，让读操作无需等待写操作完成，从而避免了读写操作之间的冲突，提高并发性能。

- **脏读**：避免读取到其他事务未提交的数据。MVCC 为每个事务提供**一致的读视图**，即一个事务在执行过程中，总是能看到事务开始时的数据版本。避免一个事务在读操作中看到其他事务的未提交数据，解决了**脏读**的问题，保证了读操作的一致性。

- **幻读**：幻读是指在一个事务中执行相同的查询，可能会因为其他事务的插入导致结果集不一致。MVCC 通过管理事务的版本号，保证在同一个事务中，**读操作**看到的数据版本是固定的，不会因为其他事务的插入或修改而改变，解决了幻读问题。

### 8. 你所理解的AQS

AQS 即 AbstractQueuedSynchronizer，是 Java 并发包（`java.util.concurrent`，简称 JUC）中一个非常核心的抽象类，位于 `java.util.concurrent.locks` 包下，由 Doug Lea 开发。它为构建锁和同步器提供了一个通用的框架，许多我们常用的并发工具类都是基于 AQS 实现的。

核心思想：AQS 使用一个整型的 `state` 变量来表示同步状态，通过内置的 FIFO（先进先出）队列来管理获取锁失败的线程。线程在尝试获取同步状态时，如果 `state` 表示锁已被占用，线程会被封装成节点加入到队列中等待；当持有锁的线程释放锁时，会唤醒队列中的等待线程。

### 9. 布隆过滤器(Bloom Filter)

**布隆过滤器**（Bloom Filter）是一种高效的**空间复杂度**的数据结构，用于判断一个元素是否存在于一个集合中。

一个位数组，以及多个独立的哈希函数，如果想添加一个元素，首先会通过所有哈希函数计算该元素的哈希值，这些值对应的位置置为1。查询元素，同样使用哈希函数计算哈希值，所有位置的值为1，则表明该元素可能在集合中，有任何一个位置的值为0，则元素不在集合中。

**缺点**：①可能会误判某个元素存在 ②一但元素被添加到布隆过滤器中，无法删除（因为多个元素可能映射到同一位，删除操作会导致其他元素的状态被改变）。

**布隆过滤器如何提高容错能力？**

增大布隆过滤器的位数组、增加哈希函数的数量

### 10. 生产者和消费者，你会用什么同步机制

在生产者-消费者模型中，生产者负责生产数据，而消费者负责处理数据。由于生产者和消费者可能在不同的线程或进程中执行，因此需要使用同步机制来确保数据安全地在它们之间传递。

**① 阻塞队列（Blocking Queue）**

生产者在队列满时阻塞，消费者在队列为空时阻塞。

**② 信号量（Semaphore）**

信号量是一个计数器，用于控制访问特定资源的线程数量。

- 对于生产者-消费者问题，可以使用两个信号量：一个用于计数可用的缓冲区位置（空位计数），一个用于计数已填充的缓冲区数据（满位计数）。
- 生产者在添加数据前减少空位计数，消费者在取出数据前减少满位计数，从而协调生产和消费的速度。

**③ 互斥锁 + 条件变量**

通过锁保护共享资源，确保同一时刻只有一个线程可以访问共享资源。

条件变量允许线程在特定条件满足时通知其他线程继续工作。生产者会通知消费者数据已经准备好，消费者会等待该通知，反之亦然。

### 11. Java8有哪些新特性

**① Lambda表达式**

```
List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
names.forEach(name -> System.out.println(name));
```

**② 接口可以包含默认实现的方法**

```
interface MyInterface {
    default void myDefaultMethod() {
        System.out.println("Default implementation");
    }
}

class MyClass implements MyInterface {}
```

**③ Stream API**

简化集合的操作，过滤操作如下：

```
List<String> filteredNames = names.stream()
    .filter(name -> name.startsWith("A"))
    .collect(Collectors.toList());
```

### 12. 手写一个单例模式

单例模式（Singleton Pattern）是一种创建型设计模式，确保在程序运行期间，一个类只能有一个实例，并且提供一个全局访问点。

**1. 懒汉式**

在第一次使用实例时才进行实例化。线程不安全。为了保证线程安全，可以考虑给getInstance()加synchronized关键字。

```
public class Singleton {
    private static Singleton instance;

    // 私有化构造函数，防止外部实例化
    private Singleton() {}
    
    // 提供一个全局访问点，获取单例对象
    public static Singleton getInstance() {
        if(instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}
```

**2. 饿汉式**

饿汉式在类加载时就创建实例，线程安全。

```
public class Singleton {
    // 类加载时即创建实例
    private static final Singleton instance = new Singleton();

    // 私有化构造器，防止外部实例化
    private Singleton() {}

    // 获取实例方法
    public static Singleton getInstance() {
        return instance;
    }
}
```

### 13. A/B实验（也叫A/B测试）

A/B实验（也叫A/B测试）是一种通过对比不同版本的产品或服务，来评估哪种版本更有效的实验方法。在A/B测试中，"A"和"B"代表两个不同的版本或变体，通常是产品、网页、应用等的不同设计、功能或内容。

假设你是一个网站的产品经理，想提高首页按钮的点击率。你可以创建两个版本：

- **A版本**：原来的按钮设计。
- **B版本**：修改后的按钮设计，可能颜色或文字有所变化。

通过A/B测试，分别向两组用户展示不同的按钮，收集点击率数据，分析哪个版本的点击率更高，从而做出相应的改进决策。

### 14. I/O多路复用

在传统阻塞I/O中，每个I/O操作都需要独占一个线程等待数据的到来。而**I/O多路复用**通过内核提供的机制，让一个线程能够同时监听多个I/O事件，当其中的某一个或多个通道就绪时，线程会被唤醒来处理这些事件。

**优势**

- 高并发： 一个线程可以同时处理多个I/O通道，不需要为每个通道创建独立线程，节省资源。

- 低资源占用：减少了线程切换和上下文切换的开销，提高了系统效率。

- 非阻塞：通过异步事件通知，避免线程在等待I/O时被阻塞。

### 15. 操作系统内存的设计可借鉴之处

1. 虚拟内存：操作系统通过虚拟内存机制使程序能够使用超出物理内存的空间。在分布式系统中，可以通过类似虚拟内存的抽象，让应用程序认为其拥有大量资源，而实际的物理资源则由系统进行智能调度。这可以提升资源利用率，避免资源不足导致的应用崩溃。

2. 内存缓存：操作系统通常会缓存常用数据或代码，以提高系统的响应速度和性能。在分布式系统中，可以使用类似的缓存机制（如 Redis）来加速数据访问，减少数据库或磁盘的访问压力。

3. 自动内存管理：操作系统采用垃圾回收机制自动管理内存的分配与释放，减少内存泄漏的风险。

### 16. nginx反向代理

Nginx反向代理是一种通过Nginx服务器接收客户端请求并将其转发到后端服务器的机制。它能够隐藏后端服务器的实际地址，并提供负载均衡、缓存（减少后端服务器压力）、SSL终止等功能。

### 17. 垃圾回收算法

**引用计数算法**：为每个对象维护一个引用计数器，记录有多少个引用指向该对象。当引用计数为零时，说明该对象不再被使用，可以被回收。

**标记-清除算法**（Mark-and-Sweep）：分为两个阶段：标记和清除。在标记阶段，从根对象开始，递归标记所有可达对象。标记完成后，清除未标记的对象。

**标记-整理算法**：标记阶段与标记-清除相同，但在清除阶段将存活对象移动到一端，然后清除其他部分的内存。=> 减少了内存碎片，提升了内存使用效率。

**复制算法：** 复制算法将内存分为两个大小相等的区域，称为 **From 区域** 和 **To 区域**。每次仅使用其中一个区域（例如，From 区域）来分配对象，回收过程如下：

- 分配内存：对象会不断被分配到 From 区域，当 From 区域被占满时，开始垃圾回收。

- 垃圾回收：从根对象（如栈上引用的对象）开始扫描，递归标记所有可达对象。将每个存活对象从 From 区域复制到 To 区域，并更新相关引用以指向新位置。

- 切换角色：复制完成后，交换 From 和 To 区域的角色。此时 To 区域成为新的 From 区域，而原来的 From 区域则被清空，可用于下一次分配。

**分代收集算法：** 分代收集算法基于对象生命周期的长短，划分出新生代、老年代等区域，并使用不同的回收策略 。新生代使用复制算法，因为新生代对象大多生命周期短；老年代使用标记-整理或标记-清除，避免内存碎片化。

### 18. Flink的checkpoint机制，存的是什么

**Apache Flink** 是一个开源的流处理框架，主要用于大规模的、分布式的、实时数据处理。link 的核心思想是**流式处理**。它将所有的数据处理任务都看作流处理，无论数据是实时产生的流还是批量导入的数据。

Flink 具有内建的容错机制，利用 **checkpoint** 和 **保存点**（savepoint）来保证数据一致性和作业恢复。当作业发生故障时，Flink 可以从最近的 **checkpoint** 恢复作业状态。

Flink的Checkpoint机制存储了作业的**操作符状态**、**水位线**、**外部系统状态**以及**元数据**。

- 操作符（如map、filter、reduce等），每个操作符都有自己的状态，保存的是处理数据的中间结果。

- 水位线（Watermark）用于跟踪事件时间的进度，Flink通过水位线来处理乱序事件。

- 外部系统的状态：如果Flink作业涉及与外部系统（如Kafka、HDFS、数据库等）的交互，那么这些外部系统的状态也会被保存。

- 保存的元数据：如作业的配置、作业的执行环境等，用于恢复时重建作业。

### 19. 怎么使用的mybatis plus

1. 在 `pom.xml` 文件中添加依赖，在 `application.yml` 或 `application.properties` 文件中进行配置

2. 对实体类和类字段进行标注，例如`@TableName("user")`和`@TableId(value = "id", type = IdType.AUTO)`，自增可以用顺序自增，雪花算法。

3. 通过继承 `BaseMapper` 来快速实现数据的CRUD 操作。
   
   ```
   package com.yourpackage.mapper;
   
   import com.baomidou.mybatisplus.core.mapper.BaseMapper;
   import com.yourpackage.model.User;
   
   public interface UserMapper extends BaseMapper<User> {
       // 你可以在这里添加自定义的方法（如果有需要的话）
   }
   ```

### 20. Lombok 有哪些注解

1.`@Getter` 和 `@Setter`

- `@Getter`：为类的所有字段自动生成 getter 方法。
- `@Setter`：为类的所有字段自动生成 setter 方法。

2.`@NoArgsConstructor`, `@AllArgsConstructor`

- `@NoArgsConstructor`：自动生成一个无参构造函数。
- `@AllArgsConstructor`：自动生成一个全参构造函数，包含所有字段。
3. **`@EqualsAndHashCode`**
- `@EqualsAndHashCode`：自动为类生成 `equals()` 和 `hashCode()` 方法，用于比较对象是否相等和生成哈希值。
  
  ```
  import lombok.EqualsAndHashCode;
  
  @EqualsAndHashCode
  public class User {
      private Long id;
      private String name;
  }
  ```
  
  自动生成的 `equals()` 和 `hashCode()` 方法会基于 `id` 和 `name` 字段进行比较。

4.`@Data`

相当于组合了 `@Getter`, `@Setter`, `@ToString`, `@EqualsAndHashCode`, 和 `@RequiredArgsConstructor` 注解。

### 21. Linux内核的功能有哪些

**进程管理**：负责进程的创建（如`fork`）和终止（如`exit`），并管理进程的生命周期。Linux内核通过调度算法（如完全公平调度器CFS）决定哪些进程获得CPU时间。还支持进程间通信（IPC）如管道、消息队列、共享内存等。

**内存管理**：内核负责管理**物理内存**和**虚拟内存**的分配、回收。内核支持**交换空间**（swap），当物理内存不足时，可以将部分内存数据写入硬盘上的交换分区，腾出内存给其他进程。

**文件系统管理**：提供文件的创建、删除、读取、写入等基本操作，同时支持目录结构管理和文件权限控制。

**硬件设备管理**：Linux内核通过设备驱动与硬件交互，支持各类硬件设备如磁盘、网络适配器、显卡、声卡等。

**网络管理**：Linux内核实现了TCP/IP协议栈，支持多种网络协议（如TCP、UDP、IP、ICMP等），提供数据传输、路由、连接管理等功能。防火墙。

### 22. 消息队列了解吗？生产者，消费者，主题之间的关系，如何避免 消费者重复消费？是否允许多个生产者和消费者？

**核心概念**

- 消息（Message）：消息是数据的载体，生产者生成消息并发送到队列中，消费者从队列中读取消息。

- 生产者（Producer）：消息的发送方，负责将消息写入队列。

- 消费者（Consumer）：消息的接收方，从队列中读取并处理消息。

- 队列（Queue）：用于存储消息的中间容器。

- 主题：在RocketMQ中，主题在逻辑上是一个或多个消息队列的集合。

**优势**

- 异步任务处理：如邮件通知、短信发送等，生产者发送任务，消费者异步执行。

- 服务解耦：电商系统中，订单系统与库存系统通过消息队列通信，互不依赖。

- 流量削峰：在秒杀活动中，用户请求通过队列暂存，后端系统按能力逐步处理。

**常见的消息队列中间件**：RabbitMQ、Kafka、RocketMQ

- **RabbitMQ** 适用于中小规模的系统，提供复杂的路由和高可靠性的消息队列。

- **Kafka** 适用于大规模的分布式系统，特别适合日志收集、流数据处理和事件驱动架构。

- **RocketMQ** 适用于高吞吐量、低延迟和顺序消息处理场景，特别适合金融、订单处理等需要事务消息的业务。

**RabbitMQ 的几种消息传递方式**

- 简单模式：一个生产者，一个队列，一个消费者，不需要设置交换机。

- 工作队列模式：一个生产者，多个消费者（竞争关系），不需要设置交换机。

- 发布/订阅模式：交换机和队列进行绑定，当发送消息到交换机后，交换机会将消息发送到绑定的队列。

- 路由模式：交换机和队列进行绑定，并且指定routing key，当发送消息到交换机后，交换机会根据routing key将消息发送到对应的队列。

- 通配符模式：交换机和队列进行绑定，并且指定通配符方式的routing key，当发送消息到交换机后，交换机会根据routing key将消息发送到对应的队列。

### 23. 在单台机器部署的情况下，如何对同一个用户加锁以确保接口的线程安全？

如果一个用户通过多个线程同时发起操作（如通过多个设备或重复请求），可能导致数据状态的冲突或不一致。对同一个用户加锁的主要目的是确保在多线程并发情况下，涉及同一个用户的关键操作能够保持**线程安全**，避免出现数据不一致、资源竞争或逻辑错误的情况。

- 获取用户 ID 对应的常量值以保证其唯一性。`userId.intern()` 是 Java 中 `String` 类的一个方法，用于返回字符串的常量池中的唯一引用。当多个线程针对同一个用户 ID 加锁时，通过 `userId.intern()` 可以**确保加锁对象的唯一性**。
  
  ```
  public class UserLockService {
      public void handleRequest(String userId) {
          String lock = userId.intern(); // 使用字符串常量池
  
          synchronized (lock) {
              try {
                  // 执行业务逻辑
                  System.out.println("Processing request for user: " + userId);
                  Thread.sleep(1000); // 模拟业务操作
              } catch (InterruptedException e) {
                  Thread.currentThread().interrupt();
              }
          }
      }
  }
  ```

- 使用 `ConcurrentHashMap` 映射锁对象。与传统的 `HashMap` 不同，`ConcurrentHashMap` 通过分段锁（Segment Locking）机制来优化并发性能，从而避免了全表加锁的瓶颈。
  
  通过 `ConcurrentHashMap` 存储锁对象，使用资源的标识（如 `userId`）作为键，锁对象作为值。当多个线程需要对同一个资源进行加锁时，它们会访问该资源对应的锁对象，从而实现对资源的同步。
  
  ```
  import java.util.concurrent.locks.ReentrantLock;
  import java.util.concurrent.ConcurrentHashMap;
  
  public class LockMapExample {
      private static final ConcurrentHashMap<String, ReentrantLock> lockMap = new ConcurrentHashMap<>();
  
      public static void main(String[] args) {
          String userId = "user123";
  
          // 获取锁对象
          ReentrantLock lock = lockMap.computeIfAbsent(userId, k -> new ReentrantLock());
  
          // 加锁
          lock.lock();
          try {
              // 执行对 userId 的相关操作
              System.out.println("Processing for " + userId);
          } finally {
              // 解锁
              lock.unlock();
          }
      }
  }
  ```

### 24. Mybaits缓存机制

通过缓存机制，可以避免重复查询同样的数据，从而提高应用程序的响应速度和系统的整体性能。MyBatis 提供了 **一级缓存** 和 **二级缓存** 两种缓存机制。

- 一级缓存是 **会话级别** 的缓存，缓存的数据只在当前 `SqlSession` 内有效，关闭 `SqlSession` 后缓存将失效。每个 `SqlSession` 对象都有自己的缓存，当查询操作在同一个 `SqlSession` 内执行时，如果查询条件相同，MyBatis 会直接从缓存中获取结果，而不是重新查询数据库。

- 二级缓存是 基于 **Mapper 映射器** 级别的缓存，可以在不同的 `SqlSession` 之间共享缓存。

- 一级缓存是默认启用的，不需要特别配置。要启用二级缓存，必须在 MyBatis 配置文件和 Mapper 文件中进行相应的配置。
  
  在 `mybatis-config.xml` 中开启二级缓存
  
  ```
  <update id="updateUser" flushCache="true">
    UPDATE user SET name = #{name} WHERE id = #{id}
  </update>
  ```
  
  在每个 Mapper 文件中启用缓存
  
  ```
  <mapper namespace="com.example.mapper.UserMapper">
    <cache/> <!-- 启用二级缓存 -->
    <!-- 映射 SQL 语句 -->
  </mapper>
  ```

### 25.

1. 限流算法了解哪些？令牌桶和漏桶的区别
- 令牌桶（Token Bucket）
  
  - 令牌桶算法使用一个桶来存储令牌，桶的容量是固定的，桶中的令牌是按固定速率生成的。
  
  - 每当一个请求到达时，系统会检查桶中是否有令牌。如果有，就消耗一个令牌并处理该请求；如果没有，则请求被丢弃或限流。
  
  - 令牌的生成速率和桶的大小共同决定了系统的流量限制。
  
  - **突发流量**：可以处理突发请求。如果桶中有令牌，允许快速处理一批请求；如果桶空了，则请求将被限制。

- 漏桶（Leaky Bucket）
  
  - 漏桶算法把请求放入一个漏桶中，桶的大小是固定的。请求以固定速率从桶中流出。
  
  - 每当一个请求到达时，如果桶未满，就把请求放入桶中；如果桶已满，请求将被丢弃或限流。
  
  - 请求以恒定的速率被处理，从而保证了请求的流出速率是平稳的。
  
  - **稳定性**：即使请求到达的速率很快，系统也会以固定的速率处理请求，避免了瞬时的流量过大。
