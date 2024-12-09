### 1. 初始

**JPA（Java Persistence API）** 和 **MyBatis** 都是常用的 Java 持久层技术，它们的目标都是简化数据库操作。

JPA

- 不需要编写 SQL，灵活性低。

- 适合面向对象的设计，能够自动管理数据库表与 Java 类的关系（如一对多、多对多关系等）。

MyBatis

- 需要编写 SQL 映射文件。灵活性高，复杂查询比较有优势。

**JPA和JDBC的区别**

- 都和数据库操作有关，JDBC使用SQL语句和数据库通信，JPA在JDBC之上，采用面向对象的方式，通过ORM框架生成SQL，进行操作。

- JPA是一种ORM规范，也就是说JPA仅仅定义了一些接口，而接口是需要实现才能工作的。MyBatis和Hibernate就是实现了JPA接口的ORM框架。 

### 2. Spring Data JPA

是pring提供的一套简化JPA开发的框架。

按照约定好的规则去写dao层接口，就可以在不写接口实现的情况下，实现对数据库的访问和操作。

**简单使用**

处理默认的CRUD方法，扩展方法

分页查询

使用@Query自定义查询

查询流处理与异步查询


