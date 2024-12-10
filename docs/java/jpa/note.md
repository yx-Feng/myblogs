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

### 5. 实战 - 对象关联映射 - 一对多

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

**查询，OneToMany是懒加载，ManyToOne是立即加载**

Clazz.java

```
@Entity(name = "t_clazz")
@Data
public class Clazz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cid;

    @OneToMany(mappedBy = "clz", fetch = FetchType.EAGER)
    private List<Student> list;

    @Column
    private String cname;
}
```

```
    // 查询班级信息
	@Test
	public void testFindClz() {
		// 查询班级信息，并没有查询班级当中的学生信息（默认是懒加载），只有使用到学生信息的时候，才会发送select语句查询学生信息
		// 当班级信息查询完毕，dao层结束后，session就会关闭。再次查询学生信息，会出现no session异常
		// 解决：（1）设置立即加载 （2）延长session的生命周期
		List<Clazz> clazzes = clazzDao.findAll();
		for(Clazz clazz : clazzes) {
			System.out.println(clazz.getCid() + " " + clazz.getCname());
			List<Student> students = clazz.getList();
			for (Student student:students) {
				System.out.println(student.getId()+" "+student.getSname());
			}
		}
	}

	// 查询学生信息
	@Test
	public void testFindStudents() {
		List<Student> students = studentDao.findAll();
		for (Student student : students) {
			System.out.println(student.getId() + " " + student.getSname() + " " + student.getClz().getCid());
		}
	}
```

**删除**

班级表中的班级被学生表引用，不能直接删  

解决：（1）级联删除 （2）先断开主外键连接（外键字段设置为null），再删除

Clazz.java

```
@OneToMany(mappedBy = "clz", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
private List<Student> list;
```

### 6. 多对多

项目和员工关系：

- 一个员工可以参与多个项目

- 一个项目可以关联多个员工

**实体和表的创建**

Emp.java

```
@Entity(name = "t_emp")
@Data
public class Emp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private String name;

    // 使得Emp对象放弃外键的维护权利, 即当前的Emp类不负责维护与另一个实体类的多对多关系的外键约束。
    @ManyToMany(mappedBy = "emps")
    private List<Project> projects = new ArrayList<>();
}
```

Project.java

```
@Entity(name = "t_project")
@Data
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private String name;

    // 多对多，通过JoinTable生成第三方表，指定各自主键的存放列名
    // joinColumns：将本表id，存储到第三方表，列名为p_id
    // inverseJoinColumns：将对方表id，存储到第三方表，列名为e_id
    @ManyToMany
    @JoinTable(name = "emps_pros", uniqueConstraints = {@UniqueConstraint(columnNames = {"e_id", "p_id"})},
            joinColumns = {@JoinColumn(name = "p_id", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "e_id", referencedColumnName = "id")})
    private List<Emp> emps = new ArrayList<>();
}
```

**增加**

```
    // 创建员工和项目
	@Test
	public void testAddEmp() {
		Emp emp = new Emp();
		emp.setName("张三");

		Emp emp2 = new Emp();
		emp2.setName("李四");

		Project project = new Project();
		project.setName("项目1");
		project.getEmps().add(emp);
		project.getEmps().add(emp2);

		empDao.save(emp);
		empDao.save(emp2);

		projectDao.save(project);
	}
```

**修改**

**查找**

- 同样需要处理懒加载的问题

**删除**

- 删除项目信息，可以关联删除员工信息

- 删除员工信息，不能关联删除参与的项目信息（没有被任何项目引用就能删除失败）

### 7. 一对一

- 用户与用户详情

- 员工与身份证信息

Boy.java

```
@Entiy(name="t_boy")
@Date
public class Boy {
    ...
    @OneToOne
    @JoinColumn(name="gid", unique=true)
    private Gril gril
}
```

Gril.java

```
@Entiy(name="t_girl")
@Date
public class Girl {
    ...
    @OneToOne(mappedBy = "girl")
    private Boy boy
}
```

Boy表会新增一个外键列gid

### 8. 延长session生命周期

**延长session的生命周期到service层**

除了立即加载，来解决no session问题。

还可以在service层的方法上添加@Transactional，让方法内部所有的操作都在同一个session当中完成。

```
@Transactional
public void deleteClzWithStu() {
    List<Clazz> clazzes = clazzDao.findAll();
    for(Clazz clazz : clazzes) {
        List<Student> students = clazz.getList();
        for(Student student : students) {
            studentDao.delete(student);
        }
        // 断开主外键连接
        clazz.setList(null);
        clazzDao.deleteById(clazz.getCid();
    }
}
```

**延长session的生命周期到view层**

Clazz 班级类 和 student学生类是一对多的关联关系：
jsp 页面上展示数据：

- \$\{clazz.cname\} 能够获得班级的名称

- \$\{clazz.students\} 由于一对多是懒加载。查询的班级信息并没有立刻查询关联的学生信息。要想使用学生信息，此时需要查询数据库。但是 service 层的方法已经关闭了。此时就no session。
  解决：将 session 的生命周期延长到视图层。当EL表达式渲染完毕之后，再去关闭session。
  

- 使用过滤器：OpenSessionInViewFilter。springboot已经提供好了，并且已经给我们配置成功了，不需要自己额外配置。


