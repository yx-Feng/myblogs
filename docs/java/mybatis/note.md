## 1.简介

**MyBatis**是一款优秀的**持久层框架**，用于简化JDBC开发。

**持久层**：负责将数据保存到数据库的那一层代码。（JavaEE：表现层、业务层、持久层）。

![a5a282d2578e4f918cc4defbfdc7c80b.png](assets/4e25ce5b9c0ce3fd0aa9f678a270fb9991abb3a3.png)

## 2.入门案例

**（1）新建tb_user表，添加数据。（mysql+Navicat）**

```
create database mybatis;
use mybatis;

drop table if exists tb_user;

create table tb_user(
    id int primary key auto_increment,
    username varchar(20),
    password varchar(20),
    gender char(1),
    addr varchar(30)
);

INSERT INTO tb_user VALUES(1, '张三', '123', '男', '北京');
INSERT INTO tb_user VALUES(2, '李四', '234', '女', '天津');
INSERT INTO tb_user VALUES(3, '王五', '11', '男', '西安');
```

**（2）用Maven新建项目，在pom.xml中添加依赖。**

mybatis、mysql-connector-java、junit、log4j-slf4j-impl、logback-classic

```
    <dependencies>
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>3.5.13</version>
        </dependency>

        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.32</version>
        </dependency>

        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13.2</version>
            <scope>test</scope>
        </dependency>

        <dependency>
            <groupId>org.apache.logging.log4j</groupId>
            <artifactId>log4j-slf4j-impl</artifactId>
            <version>2.20.0</version>
        </dependency>

        <dependency>
            <groupId>ch.qos.logback</groupId>
            <artifactId>logback-classic</artifactId>
            <version>1.4.6</version>
        </dependency>
    </dependencies>
```

**（3）编写MyBatis核心配置文件和SQL映射文件**

/src/main/resources/mybatis-config.xml

```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <!--数据库连接信息-->
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql:///mybatis?useSSL=false"/>
                <property name="username" value="root"/>
                <property name="password" value="123456"/>
            </dataSource>
        </environment>
    </environments>
    <mappers>
        <!-- 加载sql映射文件-->
        <mapper resource="UserMapper.xml"/>
    </mappers>
</configuration>
```

/src/main/resources/UserMapper.xml

```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="test">
    <select id="selectAll" resultType="org.example.pojo.User">
        select * from tb_user;
    </select>
</mapper>
```

**（4）创建实体类和测试类**

/src/main/java/org/example/pojo/User.java(类中的那一堆函数都可以自动生成)

```
package org.example.pojo;

public class User {
    private  Integer id;
    private  String username;
    private  String password;
    private  String addr;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAddr() {
        return addr;
    }

    public void setAddr(String addr) {
        this.addr = addr;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", addr='" + addr + '\'' +
                '}';
    }
}
```

/src/main/java/org/example/pojo/MyBatisDemo.java

```
package org.example.pojo;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public class MyBatisDemo {
    public static void main(String[] args) throws IOException {
        //1. 加载mybatis的核心配置文件，获取SqlSessionFactory
        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        //2.获取sqlSession对象，用它来执行sql
        SqlSession sqlSession = sqlSessionFactory.openSession();
        //3.执行sql
        List<User> users = sqlSession.selectList("test.selectAll");
        System.out.println(users);
        //4.释放资源
        sqlSession.close();
    }
}
```

![1335e279887f4e328b5a9db47e0b3c63.png](assets/4c67e88e5533b9f52005f1562e730b7ca2d5f7a2.png)

**（5）使用Mapper代理方式改进上述案例**

上面的例子中，`List<User> users = sqlSession.selectList("test.selectAll")`用到了硬编码，改进如下。

设置SQL映射文件的`namespace`属性。在Mapper接口中定义方法，方法名就是SQL映射文件中sql语句的id，并保持参数类型和返回值类型一致。

src/main/java/org/example/mapper/UserMapper.java

```
package org.example.mapper;

import org.example.pojo.User;
import java.util.List;

public interface UserMapper {

    List<User> selectAll();
}
```

src/main/resources/org/example/mapper/UserMapper.xml

```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="org.example.mapper.UserMapper">
    <select id="selectAll" resultType="org.example.pojo.User">
        select * from tb_user;
    </select>
</mapper>
```

修改mybatis-config.xml文件

```
<mappers>
<!--<mapper resource="org/example/mapper/UserMapper.xml"/>-->
    <package name="org.example.mapper"/>
</mappers>
```

通过SqlSession的getMapper方法获取Mapper接口的代理对象。调用对应的方法完成sql的执行。

/src/main/java/org/example/pojo/MyBatisDemo.java

```
package org.example.pojo;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.example.mapper.UserMapper;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public class MyBatisDemo {
    public static void main(String[] args) throws IOException {
        //1. 加载mybatis的核心配置文件，获取SqlSessionFactory
        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        //2.获取sqlSession对象，用它来执行sql
        SqlSession sqlSession = sqlSessionFactory.openSession();
        //3.执行sql
        UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
        List<User> users = userMapper.selectAll();
        System.out.println(users);
        //4.释放资源
        sqlSession.close();
    }
}
```

## 3.Mybatis核心配置文件详解

mybatis-config.xml

```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <!-- 指定一个包名，MyBatis 会在包名下面搜索需要的 Java Bean-->
    <typeAliases>
        <package name="org.example.pojo"/>
    </typeAliases>

    <environments default="development">
    <!-- environments配置数据库连接环境信息，可以配置多个environment，通过default属性切换不同的environment  -->
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <!--数据库连接信息-->
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql:///mybatis?useSSL=false"/>
                <property name="username" value="root"/>
                <property name="password" value="123456"/>
            </dataSource>
        </environment>
        <environment id="test">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql:///mybatis?useSSL=false"/>
                <property name="username" value="root"/>
                <property name="password" value="123456"/>
            </dataSource>
        </environment>
    </environments>
    <mappers>
        <package name="org.example.mapper"/>
    </mappers>
</configuration>
```

UserMapper.xml（这里的resultType可以简写）

```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="org.example.mapper.UserMapper">
    <select id="selectAll" resultType="user">
        select * from tb_user;
    </select>
</mapper>
```

## 4.配置文件完成增删改查

### 4.1 创建表tb_brand和实体类brand

创建数据库表的脚本

```
drop table if exists tb_brand;

create table tb_brand
(
    id int primary key auto_increment,
    brand_name varchar(20),
    company_name varchar(20),
    ordered int,
    description varchar(100),
    status int
);

insert into tb_brand(brand_name, company_name, ordered, description, status) values 
                ('三只松鼠', '三只松鼠股份有限公司', 5, '好吃不上火', 0),
       ('华为', '华为技术有限公司', 100, '全球领先的ICT基础设施和智能终端提供商', 1),
             ('小米', '小米科技有限公司', 50, '让每个人都能享受科技的乐趣', 1);

select * from tb_brand;
```

src/main/java/org/example/pojo/Brand.java

```
package org.example.pojo;

public class Brand {
    private Integer id;
    private String brandName;
    private String companyName;
    private Integer ordered;
    private String description;
    private Integer status;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getBrandName() {
        return brandName;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public Integer getOrdered() {
        return ordered;
    }

    public void setOrdered(Integer ordered) {
        this.ordered = ordered;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Brand{" +
                "id=" + id +
                ", brandName='" + brandName + '\'' +
                ", companyName='" + companyName + '\'' +
                ", ordered=" + ordered +
                ", description='" + description + '\'' +
                ", status=" + status +
                '}';
    }
}
```

### 4.2 MybatisX插件

Mybatis是一款基于IDEA的快速开发插件。

**主要功能：** XML和接口方法相互跳转。根据接口方法生成statement。

![8600bb5d4a1e414ba0a33c5cb897998c.png](assets/a61333ec8218a6a66b2291ba3b0b24609bde82b4.png)

![af64dcd504314ec1b0575ccc370b4f41.png](assets/c81420310954bb2a024548284eed6d85fbda28ec.png)

### 4.3 查询 - 所有结果、单条件查询、多条件查询

**（1）mybatis配置文件**

src/main/resources/mybatis-config.xml

```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <!-- 指定一个包名，MyBatis 会在包名下面搜索需要的 Java Bean-->
    <typeAliases>
        <package name="org.example.pojo"/>
    </typeAliases>

    <environments default="development">
    <!-- environments配置数据库连接环境信息，可以配置多个environment，通过default属性切换不同的environment  -->
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <!--数据库连接信息-->
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql:///mybatis?useSSL=false"/>
                <property name="username" value="root"/>
                <property name="password" value="123456"/>
            </dataSource>
        </environment>
    </environments>
    <mappers>
        <package name="org.example.mapper"/>
    </mappers>
</configuration>
```

**（2）编写Mapper接口的方法和SQL映射文件**

数据库表的字段和实体类的属性名称不一样，则不能自动封装数据。

**解决：**

- 起别名，select xx as xx

- sql片段

- resultMap

**多条件：**

- 散装参数：@Param("SQL中参数占位符名称")

- 实体类封装参数

- map集合

src/main/resources/org/example/mapper/BrandMapper.xml

```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="org.example.mapper.BrandMapper">
    <resultMap id="brandResultMap" type="brand">
        <!--id：完成主键字段的映射、result：完成一般字段的映射-->
        <result column="brand_name" property="brandName" />
        <result column="company_name" property="companyName" />
    </resultMap>
    <select id="selectAll" resultMap="brandResultMap">
        select *
        from tb_brand;
    </select>
    <select id="selectAllById" resultMap="brandResultMap">
        select *
        from tb_brand where id=#{id};
    </select>
    <select id="selectByCondition" resultMap="brandResultMap">
        select *
        from tb_brand
        where status = #{status}
          and company_name like #{companyName}
          and brand_name like #{brandName}
    </select>
</mapper>
```

src/main/java/org/example/mapper/BrandMapper.java

```
package org.example.mapper;

import org.example.pojo.Brand;
import java.util.List;

public interface BrandMapper {
    public List<Brand> selectAll();

    Brand selectAllById(int id);

    // 1.散装参数
    //List<Brand> selectByCondition(@Param("status") int status, @Param("companyName") String companyName, @Param("brandName") String brandName);
    // 2.封装实体类对象
    List<Brand> selectByCondition(Brand brand);
}
```

**（3）编写测试代码**

src/test/java/org/example/test/MyBatisTest.java

```
package org.example.test;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.example.mapper.BrandMapper;
import org.example.pojo.Brand;
import org.junit.Test;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public class MyBatisTest {

    @Test
    public void testSelectAll() throws IOException {
        // 1. 加载mybatis的核心配置文件，获取SqlSessionFactory
        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        // 2.获取sqlSession对象，用它来执行sql
        SqlSession sqlSession = sqlSessionFactory.openSession();
        // 3.获取Mapper接口的代理对象，执行方法
        BrandMapper brandMapper = sqlSession.getMapper(BrandMapper.class);
        List<Brand> brands = brandMapper.selectAll();
        System.out.println(brands);

        // 单条件查询
        int id = 1;
        Brand brand = brandMapper.selectAllById(id);
        System.out.println(brand);

        // 多条件（散装参数）
        int status = 1;
        String companyName = "%"+"华为"+"%";
        String brandName = "%"+"华为"+"%";
        // List<Brand> brands = brandMapper.selectByCondition(status, companyName, brandName);
        // 多条件（封装实体类对象）
        Brand brand = new Brand();
        brand.setStatus(status);
        brand.setCompanyName(companyName);
        brand.setBrandName(brandName);
        List<Brand> brands = brandMapper.selectByCondition(brand);
        System.out.println(brands);

        //4.释放资源
        sqlSession.close();
    }
}
```

### 4.4 查询 - 动态查询 - 多条件、单条件

动态SQL：sql语句会随着用户的输入或外部条件的变化而变化。毕竟，用户输入筛选条件时，不一定会填写所有条件。

可使用 **if 标签的test属性**进行条件判断。

存在的问题：第一个条件没有逻辑运算符and，如果省略第一个条件，sql语句会语法报错。

解决：使用`<where/>`标签或使用恒等式where 1=1 <if>and xxx</if> <if>and xxx</if>...

BrandMapper.java同上

BrandMapper.xml

```
<select id="selectByCondition" resultMap="brandResultMap">
    select *
    from tb_brand
    <where>
        <if test="status != null">status = #{status}</if>
        <if test="companyName != null">and company_name like #{companyName}</if>
        <if test="brandName != null">and brand_name like #{brandName}</if>
    </where>
</select>
```

MyBatisTest.java

```
int status = 1;
String companyName = "%"+"华为"+"%";
String brandName = "%"+"华为"+"%";
Brand brand = new Brand();
//brand.setStatus(status);
brand.setCompanyName(companyName);
brand.setBrandName(brandName);
List<Brand> brands = brandMapper.selectByCondition(brand);
System.out.println(brands);
```

从多个条件中选择一个。可以使用choose标签，类似于switch语句。

如果用户什么条件都不选，为防止sql语法错误，可使用`<where>`标签或

```
where <choose>
        <when>...</when>
        <otherwise>1=1</otherwise>
    </choose>
```

BrandMapper.java

```
package org.example.mapper;

import org.apache.ibatis.annotations.Param;
import org.example.pojo.Brand;
import java.util.List;

public interface BrandMapper {
    public List<Brand> selectAll();

    Brand selectAllById(int id);

    List<Brand> selectByCondition(Brand brand);

    List<Brand> selectByConditionSingle(Brand brand);
}
```

BrandMapper.xml

```
<select id="selectByConditionSingle" resultMap="brandResultMap">
    select *
    from tb_brand
    <where>
        <choose>
            <when test="status != null">status = #{status}</when>
            <when test="companyName != null">company_name like #{companyName}</when>
            <when test="brandName != null">brand_name like #{brandName}</when>
        </choose>
    </where>
</select>
```

MyBatisTest.java

```
int status = 1;
String companyName = "%"+"华为"+"%";
String brandName = "%"+"华为"+"%";
Brand brand = new Brand();
brand.setStatus(status);
//brand.setCompanyName(companyName);
//brand.setBrandName(brandName);
List<Brand> brands = brandMapper.selectByConditionSingle(brand);
System.out.println(brands);
```

### 4.5 添加

在数据添加成功后，需要获取插入数据库数据的主键的值。比如，添加订单和订单项。

添加完订单，同时需要添加订单项，订单项中需要设置所属订单的id。

**解决**：利用useGeneratedKeys属性和keyProperty属性。

userGeneratenKeys(true) ：是否使用自增主键  

keyProperty("对应数据表的实体类中的属性“） ：把uGK对应的主键注入到这个类中的属性。

BrandMapper.xml

```
<insert id="add" useGeneratedKeys="true" keyProperty="id">
    insert into tb_brand(brand_name, company_name, ordered, description, status)
    values (#{brandName}, #{companyName}, #{ordered}, #{description}, #{status})
</insert>
```

BrandMapper.java

```
package org.example.mapper;

import org.apache.ibatis.annotations.Param;
import org.example.pojo.Brand;
import java.util.List;

public interface BrandMapper {
    public List<Brand> selectAll();

    Brand selectAllById(int id);

    List<Brand> selectByCondition(Brand brand);

    List<Brand> selectByConditionSingle(Brand brand);

    void add(Brand brand);
}
```

MyBatisTest.java

```
int status = 1;
String companyName = "字节跳动";
String brandName = "字节跳动";
String description = "激发创造, 丰富生活";
int ordered = 100;

Brand brand = new Brand();
brand.setStatus(status);
brand.setCompanyName(companyName);
brand.setBrandName(brandName);
brand.setDescription(description);
brand.setOrdered(ordered);
brandMapper.add(brand);
Integer id = brand.getId();
System.out.println(id);
sqlSession.commit();  // 提交事务
```

### 4.6 修改 - 修改全部字段、修改动态字段

BrandMapper.xml

```
<update id="update">
    update tb_brand
    set
        brand_name = #{brandName},
        company_name = #{companyName},
        ordered = #{ordered},
        description = #{description},
        status = #{status}
    where id = #{id};
</update>


<update id="update">
    update tb_brand
    <set>
        <if test="brandName != null and brandName !=''">
            brand_name = #{brandName},
        </if>
        <if test="companyName != null and companyName !=''">
            company_name = #{companyName},
        </if>
        <if test="ordered != null">
            ordered = #{ordered},
        </if>
        <if test="description != null and description !=''">
            description = #{description},
        </if>
        <if test="status != null">
            status = #{status}
        </if>
    </set>
    where id = #{id};
</update>
```

BrandMapper.java

```
package org.example.mapper;

import org.apache.ibatis.annotations.Param;
import org.example.pojo.Brand;
import java.util.List;

public interface BrandMapper {
    public List<Brand> selectAll();

    Brand selectAllById(int id);

    List<Brand> selectByCondition(Brand brand);

    List<Brand> selectByConditionSingle(Brand brand);

    void add(Brand brand);

    int update(Brand brand);
}
```

MyBatisTest.java

```
int status = 1;
String companyName = "字节跳动";
String brandName = "字节跳动";
String description = "字节，激发创造, 丰富生活";
int ordered = 100;
int id = 5;

Brand brand = new Brand();
brand.setStatus(status);
brand.setCompanyName(companyName);
brand.setBrandName(brandName);
brand.setDescription(description);
brand.setOrdered(ordered);
brand.setId(id);
int count = brandMapper.update(brand);
System.out.println(count);  // 最后打印输出1
sqlSession.commit();  // 提交事务
```

### 4.7 删除 - 删除一个、批量删除

批量删除：mybatis会将参数封装成一个map集合。

可使用@Param注解改变map集合的默认key的名称。默认名称为array。

BrandMapper.xml

```
<delete id="deleteById">
    delete from tb_brand where id = #{id};
</delete>
<delete id="deleteByIds">
    delete from tb_brand where id
    in
        <foreach collection="ids" item="id" separator="," open="(" close=")">
            #{id}
        </foreach>;
</delete>
```

BrandMapper.java

```
package org.example.mapper;

import org.apache.ibatis.annotations.Param;
import org.example.pojo.Brand;
import java.util.List;

public interface BrandMapper {
    public List<Brand> selectAll();

    Brand selectAllById(int id);

    List<Brand> selectByCondition(Brand brand);

    List<Brand> selectByConditionSingle(Brand brand);

    void add(Brand brand);

    int update(Brand brand);

    void deleteById(int id);

    void deleteByIds(@Param("ids") int[] ids);
}
```

MyBatisTest.java

```
int id = 5;
brandMapper.deleteById(id);
sqlSession.commit();  // 提交事务

int[] ids = {3,4};
brandMapper.deleteByIds(ids);
sqlSession.commit();  // 提交事务
```

## 5.注解开发

实现复杂功能，使用注解开发比配置文件更方便。

实现简单功能，还是使用配置文件更清晰。

src/main/resources/mybatis-config.xml

```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <!-- 指定一个包名，MyBatis 会在包名下面搜索需要的 Java Bean-->
    <typeAliases>
        <package name="org.example.pojo"/>
    </typeAliases>

    <environments default="development">
    <!-- environments配置数据库连接环境信息，可以配置多个environment，通过default属性切换不同的environment  -->
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <!--数据库连接信息-->
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql:///mybatis?useSSL=false"/>
                <property name="username" value="root"/>
                <property name="password" value="123456"/>
            </dataSource>
        </environment>
    </environments>
    <mappers>
        <package name="org.example.mapper"/>
    </mappers>
</configuration>
```

src/main/java/org/example/mapper/UserMapper.java

```
package org.example.mapper;

import org.apache.ibatis.annotations.Select;
import org.example.pojo.User;

public interface UserMapper {

    @Select("select * from tb_user where id = #{id}")
    User selectById(int id);
}
```

src/main/java/org/example/pojo/User.java

```
package org.example.pojo;

public class User {
    private  Integer id;
    private  String username;
    private  String password;
    private  String addr;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAddr() {
        return addr;
    }

    public void setAddr(String addr) {
        this.addr = addr;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", addr='" + addr + '\'' +
                '}';
    }
}
```

src/test/java/org/example/test/UserMapperTest.java

```
package org.example.test;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.example.mapper.UserMapper;
import org.example.pojo.User;
import org.junit.Test;

import java.io.IOException;
import java.io.InputStream;

public class UserMapperTest {

    @Test
    public void test() throws IOException {
        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        // 获取sqlSession对象，用它来执行sql
        SqlSession sqlSession = sqlSessionFactory.openSession();
        // 获取Mapper接口的代理对象，执行方法
        UserMapper userMapper = sqlSession.getMapper(UserMapper.class);

        User user = userMapper.selectById(1);
        System.out.println(user);
        sqlSession.close();
    }
}
```
