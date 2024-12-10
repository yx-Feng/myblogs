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

**Spring Data JPA** 是spring提供的一套简化JPA开发的框架。

按照约定好的规则去写dao层接口，就可以在不写接口实现的情况下，实现对数据库的访问和操作。

### 2. 实战 - CRUD

IDEA新建SpringBoot项目，SpringBoot内置JPA

引入依赖

```
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>

        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>
    </dependencies>
```

application.yml

```
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/jpa?serverTimezone=GMT%2B8&useUnicode=true&characterEncoding=UTF-8
    username: root
    password: 123456
  jpa:
    database: MySQL
    database-platform: org.hibernate.dialect.MySQL8Dialect
    show-sql: true
    hibernate:
      ddl-auto: update
```

**添加、修改、查询（分页查、排序查）、删除**

domain/Pet.java

```
@Entity(name = "t_pet")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String pName;

    private String color;

}
```

dao/PetDao.java

```
public interface PetDao extends JpaRepository<Pet, Integer> {
}测试
```

测试类 JpaApplicationTests.java

```
package com.example.jpa;

import com.example.jpa.dao.PetDao;
import com.example.jpa.domain.Pet;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

@SpringBootTest
class JpaApplicationTests {
    @Autowired
    PetDao petDao;

    @Test
    void contextLoads() {
        System.out.println("表成功生成...");
    }

    // 对jpa提供的接口方法进行测试
    @Test
    void addPet() {
        System.out.println("Pet add");
        Pet pet = new Pet();
        // id字段是自增，不需要手动设置
        pet.setPName("拉布拉多");
        pet.setColor("棕色");
        // 指定id,进行insert操作，不指定id, 进行update操作
        petDao.save(pet);
    }

    @Test
    void findPet() {
        // 根据id查询，如果找不到会抛出异常
        Optional<Pet> optional = petDao.findById(1);
        Pet pet = optional.get();
        System.out.println(pet.getId()+" "+pet.getPName()+" "+pet.getColor());
    }

    @Test
    void findAllPets() {
        // 根据id查询，如果找不到会抛出异常
        List<Pet> pets = petDao.findAll();
        for (Pet pet : pets) {
            System.out.println(pet.getId()+" "+pet.getPName()+" "+pet.getColor());
        }

        // 排序查
        List<Pet> pName = petDao.findAll(Sort.by("pName"));
        for (Pet pet : pName) {
            System.out.println(pet.getPName());
        }
    }

    // 分页查询
    @Test
    void findAllPetsWithPage() {
        Pageable pageable = PageRequest.of(0,2);
        Page<Pet> pets = petDao.findAll(pageable);
        for (Pet pet : pets) {
            System.out.println(pet.getId()+" "+pet.getPName()+" "+pet.getColor());
        }
    }

    // 删除
    @Test
    void deletePet() {
        Pet pet = new Pet();
        pet.setId(3);
        petDao.delete(pet);

//        petDao.deleteById(3);
    }

}
```

### 3. 实战 - 自定义查询

JpaRepository接口中提供的方法不能正常满足实际业务需求，需要自定义查询。

方法名称需要符合规范

dao/PetDao.java

```
public interface PetDao extends JpaRepository<Pet, Integer> {

    List<Pet> findBypName(String pName);

    List<Pet> findByColor(String color);

    List<Pet> findBypNameAndColor(String pName, String color);

    List<Pet> findByIdBetweenOrderById(Integer minId, Integer maxId);
}
```

测试

```
@Test
public void test() {
        // 按名称查
        List<Pet> list = petDao.findBypName("柯基");
        System.out.println(list);

        // 按颜色查
        List<Pet> list2 = petDao.findByColor("棕色");
        System.out.println(list2);

        // 联合查询
        List<Pet> list3 = petDao.findBypNameAndColor("柯基", "黄色");
        System.out.println(list3);

        // 根据id区间查询，并且排序
        List<Pet> list4 = petDao.findByIdBetweenOrderById(1,2);
        System.out.println(list4);
}
```

### 4. 实战 - jpql查询

sql：操作的是数据库中的记录

jpql：操作的是java当中的实体类对象

jpql书写规则

- 不能出现表名，列名，只能出现java的类名，属性名，区分大小写。

- 出现的关键字和sql一样，不区分大小写

- 不能写select *，要写 select 别名

dao/PetDao.java

```
public interface PetDao extends JpaRepository<Pet, Integer> {

    // 查询pet列表
    // sql: select * from t_pet
    // jpql: from com.example.jpa.domain.Pet 或者 select pet from com.example.jpa.domain.Pet pet
    @Query("select pet from com.example.jpa.domain.Pet pet")
    List<Pet> loadPetsList();

    @Query("select id,pName,color from com.example.jpa.domain.Pet pet")
    List<Object[]> loadPetsList2();

    @Query("select new com.example.jpa.domain.Pet(id,pName,color) from com.example.jpa.domain.Pet pet")
    List<Pet> loadPetsLis3();
}
```

测试

```
    @Test
	public void test2() {
		List<Pet> pets = petDao.loadPetsList();
		System.out.println(pets);

		List<Object[]> pets2 = petDao.loadPetsList2();
		for (Object[] pet : pets2) {
			System.out.println(Arrays.toString(pet));
		}

		List<Pet> pets3 = petDao.loadPetsLis3();
		System.out.println(pets3);
	}
```

### 5. 实战 - 对象关联映射

数据库表的自动生成

Student.java

```
@Entity(name = "t_student")
@Data
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private String sname;

    @ManyToOne
    @JoinColumn(name = "cid")
    private Clazz clz;

}
```

Clazz.java

```
@Entity(name = "t_clazz")
@Data
public class Clazz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cid;

    @OneToMany(mappedBy = "clz")
    private List<Student> list;

    @Column
    private String cname;
}
```

测试类去执行（前提是application.yml要配置好）

```
    @Test
	void contextLoads() {
		System.out.println("表成功生成...");
	}
```

**一对多：增删改查**

dao/ClazzDao.java

```
public interface ClazzDao extends JpaRepository<Clazz, Integer> {
}
```

dao/StudentDao.java

```
public interface StudentDao extends JpaRepository<Student, Integer> {
}
```

测试

```
    @Test
	public void addClazz() {
		// 添加班级信息
		Clazz clz = new Clazz();
		clz.setCname("三年一班");
		clazzDao.save(clz);
	}

	@Test
	public void addStu() {
		// 添加学生信息
		Student student = new Student();
		student.setSname("张三");
		studentDao.save(student);

		Student student1 = new Student();
		student1.setSname("李四");
		studentDao.save(student);
		Clazz clz1 = new Clazz();
		clz1.setCid(1);
		student1.setClz(clz1);
		studentDao.save(student1);

		studentDao.save(student);
	}
```

```
    // 更新班级信息
	@Test
	public void updateClz() {
		Clazz clz = new Clazz();
		clz.setCid(2);
		clz.setCname("三年三班");
		clazzDao.save(clz);
	}

	// 更新学生信息
	@Test
	public void updateStu() {
		Student stu = new Student();
		stu.setId(3);
		stu.setSname("王七");
		Clazz clazz = new Clazz();
		clazz.setCid(2);
		stu.setClz(clazz);
		studentDao.save(stu);
	}
```

```

```



多对多

一对一
