## 1. 进程管理

### 1.1 进程 vs 线程

**进程**：运行中的程序。（静态代码文件需要通过编译生成二进制可执行文件，运行这个可执行文件，它会被装载到内存中，接着CPU会执行程序中的每一条指令）

**线程**：是进程当中的一条执行流程。同一个进程内多个线程之间可以共享代码段、数据段、打开的文件等资源，但每个线程各自有一套独立的寄存器和栈，确保线程的控制流是相对独立的。

一个进程中可以同时存在多个线程，各个线程之间可以并发执行，线程的创建时间比进程快（因为进程在创建的过程中，还需要资源管理信息，比如内存管理信息、文件管理信息，而线程在创建的过程中，不会涉及这些资源管理信息，而是共享它们）。

### 1.2 生产者-消费者问题

这是一个著名的**进程同步**问题。

**进程同步**：多个进程在执行的时候，它们要按照一定的规则共享系统资源，这种进程间的相互制约关系就是进程同步机制。

**问题描述**

生产者进程：生产产品  

消费者进程：消费产品  

两者之间设置了个缓冲池(含有n个缓冲区)  

生产者生产完，把产品放进一个缓冲区里，消费者消费，就从一个缓冲区中取走产品  

**两个进程必须同步**：不允许消费者进程从一个空缓冲区中取产品，也不允许生产者进程向一个已经满了的缓冲区投放产品

**分析**：

我们定义一些变量：  

- 缓冲池：**buffer[n]**  

- 投入一个产品：数组单元指针**in**加1，表示成**in=(in+1)%n**，含义是暂存产品数量加1  

- 取走一个产品：数组单元指针**out**加1，表示成**out=(out+1)%n**，含义是空闲单元数量加1  

- 对n取余是因为缓冲池里的缓冲区是循环组成的。  

- 变量**counter** => 投放产品：counter+1，取走产品：counter-1

**初始化**：  

int in=0,out=0,counter=0;  

item buffer[n]  

以上变量生产者进程和消费者进程共有

用生产者进程的局部变量**nextp**暂时存放刚刚生产出来的产品。  
用消费者进程的局部变量**nextc**暂时存放每次要消费的产品。

```
void producer(){
	while(1){
		produce an item in nextp;
		...
		while(counter==n)
		;
		buffer[in]=nextp;
		in=(in+1)%n;
		counter++;
	}
};
void consumer(){
	while(1){
		while(counter==0)
		;
		nextc=buffer[out];
		out=(out+1)%n;
		counter--;
		consume the item in nextc;
		...
	}
};
```

但是这两个程序在并发执行会出现错误，**问题在于**这两个进程共享变量counter  

counter的加1和减1操作我们这样描述：  

register1=counter; register2=counter;  
register1=register1+1; register2=register2-1;  
counter=register1; counter=register2;  

这六个语句的执行顺序如果发生改变，得到的最后的counter的值可能不同。  

**解决**：把变量counter作为临界资源，生产者进程和消费者进程互斥地访问 counter

**用java写个生产者和消费者模型**

实际上需要一个缓冲区，但是本例只设了一个共享整数

```
package thread_test;

//消费者
class Consumer extends Thread {
	private ShareArea sharedObject;
	
	public Consumer(ShareArea shared) {
		sharedObject = shared;
	}
	
	public void run() {
		int value;
		do {
			try {
				Thread.sleep((int)(Math.random()*3000));
			}catch(InterruptedException exception){}
			value = sharedObject.getSharedInt();	//获取共享整数的值
			System.out.println("消费："+ value);
		}while(value != 10);
	}
}

//生产者
class Producer extends Thread {
	private ShareArea sharedObject;
	
	public Producer(ShareArea shared) {
		sharedObject = shared;
	}
	
	public void run() {
		for(int cnt = 1;cnt <=10 ;cnt++) {
			try {
				Thread.sleep((int)(Math.random()*2000));
			}catch(InterruptedException exception){}
			sharedObject.setSharedInt(cnt);//更改共享数据
			System.out.println("生产:" + cnt);
		}
	}
}

//共享数据访问程序
class ShareArea {
	private int sharedInt = -1;		//共享整数
	private boolean writable = true;//条件变量
	
	public synchronized void setSharedInt(int value) {
		while(! writable) {
			try {
				wait();				//轮不到生产者写就等待
			}catch(InterruptedException exception) {}
		}
		sharedInt = value;			//生产者写入一个值
		writable = false;           //消费者操作前，生产者不能写入另一个值
		notify();					//唤醒等待资源的线程
	}
	
	public synchronized int getSharedInt() {
		while(writable) {
			try {
				wait();				//没轮到消费者就等待
			}catch(InterruptedException exception) {}
		}
		writable = true;			//生产者要等生产者再生产才能消费另一个值
		notify();					//唤醒等待资源的线程
		return sharedInt;			//消费者得到数据
	}
}

public class SharedTest {
	public static void main(String args[]) {
		ShareArea shareObject = new ShareArea();
		Producer p =new Producer(shareObject);
		Consumer c =new Consumer(shareObject);
		p.start();c.start();
	}	
}
```

### 1.3 死锁

在多线程编程中，我们为了防止多线程竞争共享资源而导致数据错乱，都会在操作共享资源之前加上互斥锁，只有成功获得到锁的线程，才能操作共享资源，获取不到锁的线程就只能等待，直到锁被释放。

**死锁**：是指两个或两个以上的进程在执行过程中，由于竞争资源而造成的一种阻塞的现象。  

比如说两个进程P1和P2，P1占有资源R1，P2占有资源R2，现在P1想要资源R2，P1想要资源R1，它们都希望对方释放资源，但是它们现在因为没有获得对方的资源，所以无法继续运行，无法释放自己占有的资源，从而陷入了僵持状态。

死锁只有**同时满足**以下四个条件才会发生：

- 互斥条件：多个线程不能同时使用同一个资源。
- 持有并等待条件：当线程 A 已经持有了资源 1，又想申请资源 2，而资源 2 已经被线程 C 持有了，所以线程 A 就会处于等待状态，但是等待的同时并不会释放自己已经持有的资源 1。
- 不可剥夺条件：当线程已经持有了资源 ，在自己使用完之前不能被其他线程获取。
- 环路等待条件：在死锁发生的时候，两个或多个线程获取资源的顺序构成了环形链。


