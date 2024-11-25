### 1. Spring框架核心特性

- **IoC容器**：Spring通过控制反转实现了对象的创建和对象间的依赖关系管理。开发者只需要定义好Bean及其依赖关系，Spring容器负责创建和组装这些对象。
- **AOP**：面向切面编程，允许开发者定义横切关注点，例如事务处理、日志管理、权限控制等，独立于业务逻辑的代码。通过AOP，可以将这些关注点模块化，提高代码的可维护性和可重用性。
- **事务管理**：Spring提供了一致的事务管理接口，支持声明式和编程式事务。开发者可以轻松地进行事务管理，而无需关心具体的事务API。
- **MVC框架**：Spring MVC是一个基于Servlet API构建的Web框架，采用了模型-视图-控制器（MVC）架构。它支持灵活的URL到页面控制器的映射，以及多种视图技术。

### 2. AOP实现有哪些注解？AOP 常见的通知类型及术语解释？

切面（Aspect）：横切逻辑的模块化体现，包含一组通知和切点定义。

通知（Advice）是切面中定义的动作，它描述了切面要执行的具体操作。

切点（Pointcut）：定义在哪些连接点上应用通知，通常通过表达式指定。

- @Aspect：用于定义切面，标注在切面类上。
- @Pointcut：定义切点，标注在方法上，用于指定连接点。
- @Before：在方法执行之前执行通知。
- @After：在方法执行之后执行通知。
- @Around：在方法执行前后都执行通知。

### 3. 什么是反射？有哪些使用场景？

反射是 Java 的一种机制，允许程序在运行时加载、探查和使用类的信息。通过反射，您可以动态创建对象、调用方法、访问字段等，而无需在编译时就明确知道类的信息。

- **依赖注入（DI）**：
  
  - Spring 容器使用反射来创建和管理对象实例。通过反射，Spring 可以动态地实例化类、调用构造方法，并将依赖项注入到类的字段或构造函数中。
  - 例如，使用 `@Autowired` 注解时，Spring 会使用反射获取该类的构造函数，并根据类型自动注入所依赖的bean。

- **AOP（面向切面编程）**：
  
  - 在实现 AOP 时，Spring 使用反射来代理目标对象，并在执行目标方法之前或之后执行切面逻辑。反射允许 Spring 在运行时动态地拦截方法调用并处理切面。

### 4. spring 常用注解有什么？

- @Autowired：主要用于自动装配bean。当Spring容器中存在与要注入的属性类型匹配的bean时，它会自动将bean注入到属性中。就跟我们new 对象一样。

- @Component：用于标记一个类作为Spring的bean。当一个类被@Component注解标记时，Spring会将其实例化为一个bean，并将其添加到Spring容器中。

- @Configuration：用于标记一个类作为Spring的配置类。配置类可以包含@Bean注解的方法，用于定义和配置bean，作为全局配置。

- @Bean：用于标记一个方法作为Spring的bean工厂方法。当一个方法被@Bean注解标记时，Spring会将该方法的返回值作为一个bean，并将其添加到Spring容器中，如果自定义配置，经常用到这个注解。

- @Service：用于标记一个类作为服务层的组件。它是@Component注解的特例，用于标记服务层的bean，一般标记在业务service的实现类。

- @Repository：标记一个类作为数据访问层的组件。它也是@Component注解的特例，用于标记数据访问层的bean。

- @Controller：用于标记一个类作为控制层的组件。它也是@Component注解的特例，用于标记控制层的bean。

### 5. Bean是否单例？

Spring 中的 Bean 默认都是单例的。

就是说，每个Bean的实例只会被创建一次，并且会被存储在Spring容器的缓存中，以便在后续的请求中重复使用。这种单例模式可以提高应用程序的性能和内存效率。

但是，Spring也支持将Bean设置为多例模式，即每次请求都会创建一个新的Bean实例。要将Bean设置为多例模式，可以在Bean定义中通过设置scope属性为"prototype"来实现。

需要注意的是，虽然Spring的默认行为是将Bean设置为单例模式，但在一些情况下，使用多例模式是更为合适的，例如在创建状态不可变的Bean或有状态Bean时。此外，需要注意的是，如果Bean单例是有状态的，那么在使用时需要考虑线程安全性问题。

### 6. MVC分层

MVC全名是Model View Controller，是模型(model)－视图(view)－控制器(controller)的缩写，一种软件设计典范，用一种业务逻辑、数据、界面显示分离的方法组织代码。

- **视图（view）**： 为用户提供使用界面，与用户直接进行交互。

- **模型（model）**：代表一个存取数据的对象或 JAVA POJO（Plain Old Java Object，简单java对象）。它也可以带有逻辑，主要用于承载数据，并对用户提交请求进行计算的模块。模型分为两类，一类称为数据承载 Bean，一类称为业务处理Bean。所谓数据承载 Bean 是指实体类（如：User类），专门为用户承载业务数据的；而业务处理 Bean 则是指Service 或 Dao 对象， 专门用于处理用户提交请求的。

- **控制器（controller）**：用于将用户请求转发给相应的 Model 进行处理，并根据 Model 的计算结果向用户提供相应响应。它使视图与模型分离。
  
  ![8adf9ac99c7014431340c2f196e32526548066a5.png](assets/a60907355deaf1542af0f6893ae260aca6b4f38a.png)

### 7. 为什么使用springboot

- 简化开发：Spring Boot通过提供一系列的开箱即用的组件和自动配置，简化了项目的配置和开发过程，开发人员可以更专注于业务逻辑的实现，而不需要花费过多时间在繁琐的配置上。
- 快速启动：Spring Boot提供了快速的应用程序启动方式，可通过内嵌的Tomcat、Jetty或Undertow等容器快速启动应用程序，无需额外的部署步骤，方便快捷。
- 自动化配置：Spring Boot通过自动配置功能，根据项目中的依赖关系和约定俗成的规则来配置应用程序，减少了配置的复杂性，使开发者更容易实现应用的最佳实践。

### 8. 怎么理解SpringBoot中的约定大于配置

Spring Boot 的“约定大于配置”原则是一种设计理念，通过减少配置和提供合理的默认值，使得开发者可以更快速地构建和部署应用程序。

Spring Boot通过「自动化配置」和「起步依赖」实现了约定大于配置的特性。

- 自动化配置：Spring Boot根据项目的依赖和环境自动配置应用程序，无需手动配置大量的XML或Java配置文件。例如，如果项目引入了Spring Web MVC依赖，Spring Boot会自动配置一个基本的Web应用程序上下文。
- 起步依赖：Spring Boot提供了一系列起步依赖，这些依赖包含了常用的框架和功能，可以帮助开发者快速搭建项目。

### 9. SpringBoot的项目结构是怎么样的？

![31cbf3fa2494485a2e32a7893a1bc2b8b28d80c0.png](assets/013f49ea79570c3fac375f02f24e254de7c10085.png)

### 10. Spring AOP的原理

Spring AOP通过动态代理在运行时生成代理对象，将切面（Aspect）中的通知（Advice）织入目标方法的前后或异常处，实现横切关注点（如日志、事务）的分离。代理对象拦截目标方法的调用，根据切入点（Pointcut）匹配的条件执行对应的通知逻辑，从而在不改变业务代码的前提下，灵活地为其添加通用功能。 

**动态代理**：

Spring AOP在运行时动态生成目标对象的代理类。根据目标对象是否实现接口，Spring AOP会选择不同的代理方式：

- **JDK动态代理**：如果目标对象实现了一个或多个接口，Spring AOP会使用JDK的动态代理生成代理对象。
- **CGLIB代理**：如果目标对象没有实现接口，Spring AOP会使用CGLIB生成子类代理。CGLIB通过继承目标类并重写方法实现代理功能。

### 11.springmvc 处理请求流程

- **请求到达** `DispatcherServlet`。（`DispatcherServlet` 是 `Spring MVC` 的核心组件，负责请求的分发）
- **`DispatcherServlet` 根据 URL 映射查找对应的控制器**（Controller）。
- **控制器方法处理请求**，可能会返回视图名称或直接返回数据。
- **`DispatcherServlet` 调用 `ViewResolver` 查找视图**（如 JSP 页面或 Thymeleaf 模板）。
- **视图渲染并返回响应**给客户端。

### 12. 说一下 aop 和 ioc，有用过aop吗

AOP：面向切面编程，是一种程序设计思想，旨在通过分离横切关注点（cross-cutting concerns）来提高程序的模块化。横切关注点是那些影响到多个类或模块的功能，比如日志记录、事务管理、性能监控、安全检查等。这些功能通常与业务逻辑代码是分离的，但又需要在多个地方复用。

IoC：是一种程序设计思想，强调控制权的转移。在传统的面向对象编程中，程序的控制流由程序本身来控制。而在 IoC 中，控制权从程序转移到框架或容器。具体来说，就是对象的创建和管理不再由程序员显式控制，而是由 IoC 容器自动管理。

应用

- 导航项目 - 限流机制
  
  - 定义RateLimiterAspect切面
    
    ```
    @Before("@annotation(rateLimiter)")
        public void doBefore(JoinPoint joinPoint, RateLimiter rateLimiter) {
            // 获取限流标识
            String limitKey = getLimitKey(joinPoint, rateLimiter);
            boolean isLimit = redisService.limit(limitKey, rateLimiter.time(), rateLimiter.count());
            if (isLimit) {
                throw new RateLimiterException(rateLimiter.hintMessage());
            }
        }
    ```
  
  - 自定义注解 `@RateLimiter` 主要用于在方法级别应用限流功能。
    
    ```
    @Target(ElementType.METHOD) // 这个注解用于定义自定义注解可以应用的 Java 元素类型。在这里，ElementType.METHOD 表示该注解只能应用于方法上。
    @Retention(RetentionPolicy.RUNTIME) // 这个注解指定了自定义注解的保留策略。RetentionPolicy.RUNTIME 表示注解在运行时仍然可用。
    @Documented // 这个注解用于指示该注解应该被包含在 JavaDoc 中。
    public @interface RateLimiter {
    
        // 限流 key，如果知道了 key，则限流类型为全局
        String key() default "";
    
        // 限流类型
        RateLimiterType type() default RateLimiterType.DEFAULT;
    
        // 限流时间，单位秒
        public int time() default 60;
    
        // 限流次数
        public int count() default 10;
    
        // 提示语
        String hintMessage() default "操作频繁，请稍后再试";
    }
    ```
  
  - 使用
    
    ```
    @RateLimiter(type = RateLimiterType.IP, hintMessage = "验证码获取频繁，请稍后再试")
    public ResponseResult<CaptchaImageVO> getCode() {}
    
    @RateLimiter(type = RateLimiterType.IP, count = 1)
    public ResponseResult add(@Valid @RequestBody ClientNavCommentAddDTO addDTO) {}
    ```

### 13. bean的生命周期

- 实例化 -> 当 Spring 容器启动并扫描到需要管理的 Bean 时，首先通过构造函数实例化 Bean 对象。
- 属性注入 -> Spring 容器为实例化的 Bean 注入它的依赖属性。
- 初始化前（`postProcessBeforeInitialization`） -> 在 Bean 初始化之前，Spring 允许开发者通过实现 `BeanPostProcessor` 接口的 `postProcessBeforeInitialization()` 方法，定义自定义逻辑。这个阶段可以对 Bean 进行一些修改或操作。
- 初始化
- 初始化后（`postProcessAfterInitialization`） -> 在 Bean 初始化完成后，Spring 再次调用 `BeanPostProcessor` 的 `postProcessAfterInitialization()` 方法，允许开发者在 Bean 准备好之后执行自定义逻辑或进一步处理 Bean。
- 使用 Bean -> Bean 准备完毕后，Spring 容器会将其交给应用程序使用。
- 销毁 -> 当 Spring 容器关闭时，或 Bean 的生命周期结束时，Spring 会对 Bean 进行销毁操作。
