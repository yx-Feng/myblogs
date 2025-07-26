### 1. Spring、SpringBoot

#### 1.1 Spring 框架核心特性

- **IoC容器**：在传统的面向对象编程中，程序的控制流由程序本身来控制。而在 IoC 中，控制权从程序转移到框架或容器。具体来说，就是对象的创建和管理不再由程序员显式控制，而是由 IoC 容器自动管理（开发者只需要定义好Bean及其依赖关系）。
- **AOP**：面向切面编程，允许开发者定义横切关注点，例如事务处理、日志管理、权限控制等，独立于业务逻辑的代码。
- **事务管理**：Spring提供了一致的事务管理接口，支持声明式和编程式事务。开发者可以轻松地进行事务管理，而无需关心具体的事务API。
- **MVC框架**：Spring MVC是一个基于Servlet API构建的Web框架，采用了模型-视图-控制器（MVC）架构。它支持灵活的URL到页面控制器的映射，以及多种视图技术。

#### 1.2 Spring和Spring boot的区别？Spring Boot 比 Spring优化在哪里，为什么更轻量级？

Spring Boot 是在 Spring 基础上封装出的快速开发框架，具备自动配置（不再手动写 Bean 定义、组件扫描、数据库连接配置）、内嵌 Tomcat 服务器、统一配置入口（所有配置集中于 `application.properties` 或 `application.yml`）、提供一组封装好的 Maven 依赖（如spring-boot-starter-web，减少手动选依赖、解决版本冲突的麻烦）等特性，简化了开发流程和部署方式。

#### 1.3 怎么理解SpringBoot中的约定大于配置

Spring Boot 倾向于为你提供合理默认值，尽量减少你必须配置的内容；只要你按照框架预期的方式开发，就能省掉大量繁琐配置，从而专注于业务逻辑开发。比如Spring Boot 默认启动在 8080 端口，但你可以通过 `application.properties` 改变它。再比如：
Spring Boot 项目通常采用 **Maven 标准目录结构**，以便 Spring Boot 自动进行组件扫描，如果你换了结构，就需要手动设置扫描路径了。

```
src/main/java/com/example/demo
  └── DemoApplication.java   // 主类
  └── controller/HelloController.java
```

#### 1.4 从 Spring Boot 的角度，讲讲前端请求到达 Controller 后的一系列流程

- 请求到达 `DispatcherServlet`。（`DispatcherServlet` 是 `Spring MVC` 的核心组件，负责请求的分发）
- `DispatcherServlet` 根据 URL 映射查找对应的控制器（Controller）。
- 控制器方法处理请求，可能会返回视图名称或直接返回数据。
- `DispatcherServlet` 调用 `ViewResolver` 查找视图（如 JSP 页面或 Thymeleaf 模板）。
- 视图渲染并返回响应给客户端。

#### 1.5 spring 中用到哪些设计模式

**单例模式**：Spring 框架中的 Bean 默认是单例模式，即一个 Bean 在整个应用程序中只有一个实例。通过单例模式可以减少对象的创建和销毁开销，提高系统性能。

**工厂模式**：Spring 框架使用工厂模式来创建和管理 Bean 对象。`BeanFactory` 和 `ApplicationContext` 就是 Spring 中的工厂接口，它们负责根据配置信息创建和初始化 Bean 对象。通过工厂模式，将对象的创建和使用分离，提高了代码的可维护性和可扩展性。

**代理模式**：Spring AOP（面向切面编程）使用了代理模式来实现切面的功能。Spring AOP 支持 JDK 动态代理和 CGLIB 动态代理，通过代理模式可以在不修改目标对象代码的情况下，为目标对象添加额外的功能，如日志记录、事务管理等。

**策略模式**：Spring 框架中的 `ResourceLoader` 接口使用了策略模式。`ResourceLoader` 接口定义了加载资源的方法，不同的实现类可以根据不同的策略来加载资源，如从文件系统、类路径、网络等加载资源。通过策略模式，提高了代码的灵活性和可扩展性。

#### 1.6 Spring的自动装配过程，如何识别出要装配的类？会扫描全部的类吗？

Spring **不会扫描项目中所有类**，它只会根据开发者配置的 **扫描包路径**，**扫描其中被标注为组件的类**（如 `@Component`），再进行依赖注入（自动装配）。通过注解或 XML 指定 Spring 要扫描的基础包：

```
@ComponentScan("com.example.app")
@SpringBootApplication // 默认扫描主类所在包及其子包
```

识别可注册的 Bean（组件类）：`@Component`、`@Service`、`@Repository`、`@Controller`、`@Configuration`。

Spring 把这些组件类注册为 Bean，并进行生命周期管理。

### 2. SpringMVC

#### 2.1 SpringMVC的底层原理

SpringMVC 是 Spring 框架中用于处理 Web 请求的模块。

SpringMVC 的工作由一个核心组件 `DispatcherServlet` 完成。**DispatcherServlet** 是一个前端控制器（Front Controller），负责接收所有的 HTTP 请求，根据请求 URL 和配置的映射规则找到对应的处理器（Controller）。

#### 2.2 MVC分层

MVC全名是Model View Controller，将 Web 应用划分为三个核心部分：**模型（Model）**、**视图（View）**、**控制器（Controller）**。

- **模型（model）**：封装业务数据（POJO 对象）、数据库交互（DAO/Repository 层）、业务逻辑（Service 层）的服务。=

- **控制器（controller）**：处理用户请求，调用业务逻辑（Service），并返回视图。

- **视图（view）**： 负责将数据展示给用户，通常是网页 UI，与用户直接进行交互。

### 3. Spring事务

#### 3.1 spring的事务，spring事务消失如何解决？

Spring事务管理支持：

- 声明式事务管理
  
  通过注解（如 `@Transactional`）或 XML 配置管理事务，减少手动代码。
  
  注解方式
  
  ```
  @Service
  public class UserService {
      @Transactional
      public void createUser(User user) {
          // 数据库操作，事务自动管理
          userRepository.save(user);
      }
  }
  ```
  
  XML方式
  
  ```
  <tx:annotation-driven transaction-manager="transactionManager"/>
  ```

- 编程式事务管理
  
  对于复杂的事务需求，可以使用 `TransactionTemplate` 进行编程式管理。
  
  ```
  @Transactional
  public class UserService {
      @Autowired
      private TransactionTemplate transactionTemplate;
  
      public void createUser(User user) {
          transactionTemplate.execute(status -> {
              try {
                  userRepository.save(user);
                  // 其他业务操作
                  return true;
              } catch (Exception e) {
                  status.setRollbackOnly(); // 手动回滚
                  return false;
              }
          });
      }
  }
  ```

**事务失效的原因包括**

- 方法调用不通过代理
  
  - Spring事务是通过 AOP 代理来处理的，同一个类中方法内部调用不会走代理，事务失效（不会触发 AOP）。
  
  ```
  public class MyService {
      @Transactional
      public void method1() {
          // 执行一些操作
          method2();  // 直接调用不会触发事务
      }
  
      @Transactional
      public void method2() {
          // 执行一些操作
      }
  }
  ```
  
  在上面的示例中，`method1()` 和 `method2()` 都有 `@Transactional` 注解，但由于 `method2()` 是由 `method1()` 直接调用的，Spring AOP 代理无法拦截 `method2()`，因此事务不会生效。
  
  - **解决方案**：避免直接调用同一类中的事务方法，或使用 **`ApplicationContext`** 来获取代理对象。

- 方法是 `private` 或 `final`
  
  - 如果目标方法是 `private` 或 `final`，Spring AOP 不能生成代理，也就无法切入这些方法，因此事务不起作用。
  
  - **解决方案**：确保事务方法是 `public`，且不是 `final` 或 `private`。

#### 3.2 Spring事务传播机制

Spring 提供了多种事务传播行为，用来定义当一个方法调用另一个事务方法时，事务的行为方式。通过注解 `@Transactional` 的 `propagation` 属性指定传播行为。

Spring 支持以下 7 种传播行为：

| 传播行为          | 调用方无事务 | 调用方有事务 | 特点           |
| ------------- | ------ | ------ | ------------ |
| REQUIRED      | 新建事务   | 加入当前事务 | 默认选项，适合大多数场景 |
| REQUIRES_NEW  | 新建事务   | 挂起当前事务 | 独立事务，互不影响    |
| SUPPORTS      | 非事务运行  | 加入当前事务 | 对事务不强依赖      |
| NOT_SUPPORTED | 非事务运行  | 挂起当前事务 | 忽略事务         |
| MANDATORY     | 抛出异常   | 加入当前事务 | 必须在事务中运行     |
| NEVER         | 非事务运行  | 抛出异常   | 禁止事务         |
| NESTED        | 新建事务   | 嵌套事务   | 支持嵌套事务，部分回滚  |

### 4. AOP

#### 4.1 Spring AOP的原理

通过**动态代理机制**，在不修改源代码的前提下，将横切逻辑（如日志、事务、安全等）“织入”到目标对象的方法执行过程中。

#### 4.2 Spring AOP的底层实现

Spring 使用代理对象包裹原始对象，实现对目标方法的增强。根据目标对象是否实现接口，Spring AOP会选择不同的代理方式， 即**JDK 动态代理**（接口）或 **CGLIB 代理**（子类）。

- JDK动态代理：如果目标对象实现了一个或多个接口，Spring AOP会使用JDK的动态代理生成代理对象。
- CGLIB动态代理：如果目标对象没有实现接口，Spring AOP会使用CGLIB生成子类代理。CGLIB通过继承目标类并重写方法实现代理功能。

#### 4.3 Spring AOP的使用方式 / Spring AOP有哪些注解

通过在切面类上使用`@Aspect`注解标记，使用`@Before`、`@After`、`@Around`等注解定义不同类型的通知，使用`@Pointcut`注解定义切点。

Spring AOP 会根据**切点和通知**在运行时动态生成**增强后的代理对象**。目标对象被增强后，实际执行的是代理类。

切面（Aspect）：横切逻辑的模块化体现，包含一组通知和切点定义。=> @Aspect

连接点（Join Point）：程序执行的某个具体点。

切点（Pointcut）：定义在哪些连接点上应用通知，通常通过表达式指定。=> @Pointcut

通知（Advice）：定义了切面在连接点上执行的具体动作。

- @Before：在方法执行之前执行通知。
- @After：在方法执行之后执行通知。
- @Around：在方法执行前后都执行通知。

**使用**

- 引入依赖spring-boot-starter-aop

- 定义切面类，使用 `@Aspect` 注解标记为切面类。定义切点（指程序中可以插入切面的具体位置）和通知（在切点处执行的具体逻辑）。
  
  ```
  @Aspect
  @Component
  public class LoggingAspect {
  
      @Pointcut("execution(* com.example.service.*.*(..))")
      public void serviceMethods() {}
  
      @Before("serviceMethods()")
      public void logBefore(JoinPoint joinPoint) {
          System.out.println("Before method: " + joinPoint.getSignature().getName());
      }
  }
  ```

- 在主类或配置类中使用@EnableAspectJAutoProxy注解启用AOP

#### 4.4 AOP、过滤器、拦截器区别

- AOP：是一种编程范式，它将那些影响多个类的公共行为封装到可重用的模块中，这些模块被称为切面。通过在运行时将切面的逻辑动态织入到目标对象的方法执行过程中，实现对程序的增强，如日志记录、事务管理等。
- 过滤器：是 Java Web 中的组件，它可以对进入 Servlet 容器的请求和响应进行预处理和后处理。过滤器通常用于统一的请求处理，如字符编码转换、请求参数过滤、权限验证等。
- 拦截器：在 Java Web 开发或其他框架中使用，用于在方法调用前后进行拦截和处理。拦截器可以对控制器的请求进行拦截，添加额外的处理逻辑，如日志记录、权限检查、性能监控等。拦截器通常由框架管理，在请求进入控制器方法前后执行。
- 作用范围的区别：AOP的作用范围可以是整个应用程序，包括服务层、数据访问层等。它可以对任意类的方法进行增强，只要满足切点的匹配条件。过滤器的作用范围是整个 Web 应用，对所有的请求和响应都生效。拦截器的作用范围通常是控制器层，只对控制器的请求进行拦截和处理。

#### 4.5 什么是反射？有哪些使用场景？

反射是 Java 的一种机制，允许在运行时获取类的结构信息（如类的名称、方法、字段等），并可以动态创建对象、调用方法或访问字段，而无需在编译时就明确知道类的信息。

- **依赖注入（DI）**：
  
  - Spring 容器使用反射来创建和管理对象实例。通过反射，Spring 可以动态地实例化类、调用构造方法，并将依赖项注入到类的字段或构造函数中。
  - 例如，使用 `@Autowired` 注解时，Spring 会使用反射获取该类的构造函数，并根据类型自动注入所依赖的bean。

- **AOP（面向切面编程）**：
  
  - 在实现 AOP 时，Spring 使用反射来代理目标对象，并在执行目标方法之前或之后执行切面逻辑。反射允许 Spring 在运行时动态地拦截方法调用并处理切面。

### 5. 注解

#### 5.1 常用注解

- @Autowired：主要用于自动装配bean。当Spring容器中存在与要注入的属性类型匹配的bean时，它会自动将bean注入到属性中。

- @Component：用于标记一个类作为Spring的bean。Spring会将其添加到Spring容器中。

- @Configuration：用于标记一个类作为Spring的配置类。配置类可以包含@Bean注解的方法，用于定义和配置bean，作为全局配置。

- @Bean：用于标记一个方法作为Spring的bean工厂方法。当一个方法被@Bean注解标记时，Spring会将该方法的返回值作为一个bean，并将其添加到Spring容器中，如果自定义配置，经常用到这个注解。

- @Service：用于标记一个类作为服务层的组件。@Component注解的特例，用于标记服务层的bean，一般标记在业务service的实现类。

- @Repository：标记一个类作为数据访问层的组件。@Component注解的特例，用于标记数据访问层的bean。

- @Controller：用于标记一个类作为控制层的组件。@Component注解的特例，用于标记控制层的bean。

#### 5.2 @Autowired和@Resource的区别？@Auowired是如何注入的？

`@Autowired` 和 `@Resource` 都用于依赖注入

- 前者是 Spring 提供的，按**类型**注入，支持构造器、字段和方法注入，可配合 `@Qualifier` （注入时明确指定 Bean 名称，不再依赖类型匹配）和 `@Primary`（当有多个同类型 Bean 时，默认优先注入这个）。

- 后者是 Java 标准注解，默认按**名称**注入，只支持字段和 setter 方法，功能相对简单。

**如何注入**：Spring容器启动时，会扫描被注解了 `@Component` 等注解的类。Spring 在处理这些类时，会通过 **后置处理器**（`BeanPostProcessor`）去寻找是否有字段、构造器或方法上使用了 `@Autowired`。Spring 会尝试从容器中查找符合类型的 Bean 进行注入。

#### 5.3 springBoot启动类注解

在 Spring 应用中，启动类的注解主要用于标识这是一个 Spring Boot 应用的入口，并引导整个应用的启动流程。

**1. @SpringBootApplication**

它是一个复合注解，包含了多个重要的注解。

- `@SpringBootConfiguration`：继承自`@Configuration`，用于标识当前类是一个 Spring Boot 配置类。

- `@EnableAutoConfiguration`：启用 Spring Boot 的自动配置功能，根据类路径下的依赖和配置文件自动配置 Spring 组件（如 Web、JPA、Security）。

- `@ComponentScan`：自动扫描 @Component、@Service、@Repository、@Controller 等 Spring 组件，并注册到 Spring 容器。

**2. @Import**

用于导入额外的配置类或组件。可以传入一个或多个类作为参数，Spring 会将这些类作为配置类或组件注册到容器中。

```
@Import({OtherConfig.class, AnotherConfig.class})
public class MainConfig {
}
```

**3. @PropertySource**

用于加载外部的属性文件到 Spring 环境中。

```
@PropertySource("classpath:application.properties")
public class Config {
}
```

### 6. Bean

#### 6.1 是否单例？

Spring 中的 Bean 默认都是单例的。

就是说，每个Bean的实例只会被创建一次，并且会被存储在Spring容器的缓存中，以便在后续的请求中重复使用。这种单例模式可以提高应用程序的性能和内存效率。

但是，Spring也支持将Bean设置为多例模式，即每次请求都会创建一个新的Bean实例。要将Bean设置为多例模式，可以在Bean定义中通过设置scope属性为"prototype"来实现。

#### 6.2 bean的生命周期 / Spring Bean 加载到内存的步骤（不包含Bean的销毁）

- Spring 在启动时扫描所有 Bean，生成元数据（类名、作用域、依赖关系）。

- 实例化 Bean。属性注入

- 初始化阶段。
  
  - BeanPostProcessor.before。Bean 创建后，初始化前可修改 Bean。
  
  - `@PostConstruct`。执行用户定义的初始化方法。
  
  - InitializingBean.afterPropertiesSet()。如果实现了接口，会被调用。
  
  - `init-method`（XML中）。显式配置的初始化方法。
  
  - BeanPostProcessor.after。初始化后可以再次增强 Bean。

- 初始化完成后，放入一级缓存，供整个容器共享。

- 销毁 -> 当 Spring 容器关闭时，或 Bean 的生命周期结束时，Spring 会对 Bean 进行销毁操作。

### 7. springcloud

#### 7.1 异步线程注解

Spring 提供了 `@Async` 注解来支持异步方法执行。

- 在启动类上添加 `@EnableAsync` 注解来启用异步支持。

- 任何被 `@Async` 注解标注的方法都会在一个单独的线程中执行，而不会阻塞调用线程。

### 8. 怎么查看线程信息

1. 使用 `Thread` 类查看线程信息

```
public class ThreadInfo {
    public static void main(String[] args) {
        // 获取当前线程
        Thread currentThread = Thread.currentThread();

        // 获取当前线程的信息
        System.out.println("线程名称: " + currentThread.getName());
        System.out.println("线程ID: " + currentThread.getId());
        System.out.println("线程状态: " + currentThread.getState());
        System.out.println("线程优先级: " + currentThread.getPriority());
    }
}
```

2. 使用 `jstack` 命令（JVM工具）

`jstack` 是JVM自带的一个命令行工具，可以打印当前JVM进程的线程堆栈信息，这对于诊断死锁、线程状态、阻塞等问题非常有帮助。

```
// 提前找到Java进程的PID
jstack <PID>
```

3. 使用 `jconsole` 工具（JVM监控工具）

`jconsole` 是一个JVM自带的监控工具，它可以用来查看线程信息、内存使用情况、垃圾回收等。

- 在命令行输入 `jconsole`，打开图形化界面。选择要监控的Java进程。
