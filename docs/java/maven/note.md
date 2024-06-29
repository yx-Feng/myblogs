## 1.使用Maven创建Java项目（Intellij IDEA）

### 1.1 Maven简介

Maven是一个创建、管理Java项目的工具。它将项目开发和管理过程抽象成一个项目对象模型(**POM**：Project Object Model)。

Maven项目结构如下：

```
a-maven-project  项目名
├── pom.xml  项目描述文件
├── src
│   ├── main
│   │   ├── java  存放Java源码
│   │   └── resources  存放资源文件
│   └── test
│       ├── java  存放测试源码
│       └── resources  存放测试资源
└── target  存放所有编译、打包生成的文件
```

**仓库**：用于存储资源，包括各种jar包。

**本地仓库**：自己电脑上存储资源的仓库。

**远程仓库**：非本机电脑上的仓库。

包括：**中央仓库**(Maven团队维护，存储所有资源的仓库)、**私服**(部门/公司范围内存储资源的仓库，仅对内部开放，不对外共享，可从中央仓库获取资源)。

[maven仓库地址](https://mvnrepository.com/)

![c6eb7369abd04fe88ea1749cfcbfc428.png](assets/2bb341d9c522b06f09da9e15145e5f14501ead88.png)

**坐标**：用于描述仓库中资源的位置。

**groupId**：定义当前Maven项目隶属组织名称。(通常是域名反写，例如：org.mybatis)

**artifactId**：定义当前Maven项目名称（通常是模块名称）

**version**：定义当前项目的版本号。

### 1.2 下载安装Maven

[Maven – Download Apache Maven](https://maven.apache.org/download.cgi)

下载完，配置好环境变量JAVA_HOME和MAVEN_HOME。验证：

```
mvn -v
```

### 1.3 配置本地仓库

①新建D:\maven\repository目录

②在下载好的MAVEN文件中找到 settings.xml，例如：`D:\apache-maven-3.8.6\conf\settings.xml`

③自定义本地仓库的位置

![fc06966443f04739bdeb9a40ae1f9d1d.png](assets/6c8ca664ce7e3bae8ac5b5a03f279eb2ae0d0b99.png)

④配置阿里云镜像仓库，还是修改settings.xml

![765bd7d7bcf14e528ecd66b1935b6650.png](assets/7c89b21a5c3c1ba2d58f289900f552dfd489e29c.png)

可以多加几个mirror

```
<mirror>
  <id>alimaven</id>
  <name>aliyun maven</name>
  <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
  <mirrorOf>central</mirrorOf>
</mirror>

<mirror>
  <id>uk</id>
  <mirrorOf>central</mirrorOf>
  <name>Human Readable Name for this Mirror.</name>
  <url>http://uk.maven.org/maven2/</url>
</mirror>

<mirror>
  <id>CN</id>
  <name>OSChina Central</name>
  <url>http://maven.oschina.net/content/groups/public/</url>
  <mirrorOf>central</mirrorOf>
</mirror>

<mirror>
  <id>nexus</id>
  <name>internal nexus repository</name>
  <!-- <url>http://192.168.1.100:8081/nexus/content/groups/public/</url>-->
  <url>http://repo.maven.apache.org/maven2</url>
  <mirrorOf>central</mirrorOf>
</mirror>
```

### 1.4 使用Maven创建项目

**（1）配置Maven**

![14d11c6d0df94f24aa936df60aca8257.png](assets/4b46175ca4a5568050a8fb45a7748eb9705e8612.png)

**（2）创建一般项目**

![c1f17ff80cf74669839729e20294126b.png](assets/e12e9075e7fc2cba11efcfbb3e3c1daafb461f21.png)

**（3）创建web项目**

![8dd1c7ea1a7c42c9888e2e7ac6a68b02.png](assets/3e9d29761d2b5f102e04cc41d6bda629bfd4abf6.png)

![db522158f6164489952abd00e473c381.png](assets/616afb352246998ff21a2762f2bd4f7d7402837d.png)

**（4）给maven项目添加依赖**

![731b846994a94959912612e99645d086.png](assets/c5ea279a69aceb4c0543deb4057bc0e691784c93.png)
