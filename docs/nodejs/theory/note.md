## 1. Node.js简介

**是什么？**

官网解释：Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.

node不是一门语言，不是库，不是框架 => **是一个JavaScript运行时环境（runtime）**

以前只有浏览器能解析执行js，现在node.js也可以，node.js为 js 提供一些服务器级别的操作API，例如文件读写、网络通信、http服务器。

node.js构建在chrome的V8引擎之上。

（Google Chrome的V8引擎是目前公认运行js最快的，node.js的作者Ryan Dahl把Google Chrome的V8引擎移植出来，开发了node.js）

**能做什么？**

- web服务器后台

- 命令行工具：npm，hexo等都是用node写的（git是用C语言写的）

**npm(node package manager)** => 世界上最大的开源库生态系统，绝大多数的js相关的包都存放在了npm上，一条命令就可以下载，很方便

- [npm官网](https://www.npmjs.com/ "npm官网")能搜索到的包，都可以用npm指令下载

- 安装了node会自动安装npm

- 常用指令
  
  - npm init  
  
  - npm init -y  可以跳过向导，快速生成  
  
  - npm install以一次性把dependencies选项中的依赖项全部安装，简写：npm i  
  
  - npm insatll 包名，简写：npm i  
  
  - npm install --save，简写：npm i -S  
  
  - npm uninstall 包名，简写：npm un 包名（只删除包，package.json中依然保留信息）  
  
  - npm uninstall --save 包名，简写：npm un -S 包名（删除包的同时会把依赖信息也删掉）  
  
  - npm help，查看使用帮助  
  
  - npm 命令 --help，查看指定命令的使用帮助，比如去查uninstall的简写：npm uninstall --help

- npm存储包文件的服务器再国外，有时候速度很慢
  
  - `npm config set registry http://registry.npm.taobao.org`
  
  - 查看npm配置信息：npm config list，这样配置以后，以后用npm install下载会默认走淘宝的服务器

**案例**

创建 helloworld.js

```
var foo = 'helle nodejs'
console.log(foo)
```

打开终端，执行：ndoe helloworld.js

## 2. 文件操作

浏览器中的js无文件操作能力，但是node中的js有。

**读文件**

```
// 1. 使用require方法加载fs核心模块
var fs = require('fs')
// 2. 读取文件
fs.readFile('./data/hello.txt',function(error, data) {
    console.log(data.toString())
})
```

不加toString()显示的是16进制的数据。

- 第一个参数：要读取的文件路径

- 第二个参数：是一个回调函数 
  
  - 读取成功  => error = null, data = 数据
  
  - 读取失败  => error = 错误对象，data = null

**写文件**

```
var fs = require('fs')

fs.writeFile('./data/poem.txt', '到乡翻似烂柯人', function (err) {
    if(error) {
        console.log('写入失败')
    } else {
        console.log('写入成功')
    }
})
```

文件写入成功，erro=null

文件写入错误，error就是错误对象

## 3. 简单的http服务

我们可以用node构建一个web服务器，在node中专门提供了一个核心模块：http。

```
//1. 加载http核心模块
var http = require('http')

//2. 创建一个Server实例
var server = http.createServer()

//3. 当客户端请求过来，就会自动触发服务器的request请求事件，然后执行第二个参数：回调处理函数
//request 请求对象，用来获取客户端的一些请求信息，例如请求路径
//response 响应对象，用来给客户端发送响应信息
server.on('request', function(request, response) {
    console.log('收到客户端情求了，请求路径是：' + request.url)

    // reponse 对象有一个方法： write ,可以用来给客户端发送响应数据
    // write 可以使用多次， 但是最后一定要用end来结束响应，否则客户端会一直等待
    // request.url获得的是端口号之后的那一部分路径
    var url = request.url
    if(url === '/') {
        response.end('This is index page')
    } else if(url === '/profile') {
        response.end('This is profile')
    } else {
        response.end('404 not found')
    }
})

//4.绑定端口号，启动服务器
server.listen(3000, function() {
    console.log('服务器启动成功，可通过http://127.0.0.1:3000来进行访问')
})
```

如果我的响应数据是一个对象，要转为字符串 `response.end(JSON.stringify(products))`。

```
var products = [
        {
            name: '苹果',
            price: 40
        },
        {
            name: '梨',
            price: 20
        },
        {
            name: '西瓜',
            price: 30
        },
    ]
```

**中文乱码问题**

服务器默认发送的内容是utf-8编码的，但浏览器默认按照当前操作系统的默认编码进行解析，中文操作系统默认是gbk

=> 加一行 `res.setHeader('Content-Type', 'text/plain; charset=utf-8')`

**传文件**

```
var http = require('http')
var fs = require('fs')

var server = http.createServer()

server.on('request', function(req,res) {
    var url = req.url

    if(url == '/') {
        fs.readFile('./resource/index.html', function(err, data) {
            if(err) {
                res.setHeader('Content-Type', 'text/plain; charset=utf-8')
                res.end('文件读取失败，请稍后重试！')
            } else {
                res.setHeader('Content-Type', 'text/html; charset=utf-8')
                res.end(data)
            }
        })
    }
})

server.listen(5000, function() {
    console.log('服务器启动成功，可通过http://127.0.0.1:5000来进行访问')
})
```

**传图片**

改一下Content-Type，而且图片就不需要编码了 `res.setHeader('Content-Type', 'image/jpeg')`

**ip地址和端口号的概念**

IP地址用来定位计算机，端口号用来定位具体的应用程序。（端口的范围值 0-65536）

## 4. 模块系统

Nodejs为JavaScript提供了很多服务器级别的API，这些API绝大多数都被包装到了一个具名的核心模块中了

**例如**：文件操作的fs模块、http服务构建的http模块、path路径操作模块、os操作系统信息模块...

如果你要用，就需要通过**require**的方式来导入

**核心模块**

```
var os = require('os')
var path = require('path') 

// 获取当前机器的CPU信息
console.log(os.cpus())
// memory内存
console.log(os.totalmem())
// extname-extension name扩展名
console.log(path.extname('d:/python_code/1/main.py'))
```

**自己编写的文件模块**

a.js

```
var res = require('./b.js')

console.log(res.foo)
console.log(res.add(10, 30))
```

b.js

```
var foo = '追忆似水年华'

exports.foo = '追忆似水年华'    //这里导出的foo和上面的foo不是同一个变量
exports.add = function (x, y) {
    return x + y
}
```

## 5. 使用模板引擎

1.安装  npm install art-template

2.用require方法加载

3.查文档，使用模板引擎的API

模板引擎不关心你的字符串内容，只关心自己能认识的模板标记语法，例如 {{ }}，该语法被称之为mustache语法(八字胡语法)

```
var template = require('art-template')
var fs = require('fs')

fs.readFile('./tpl.html',function(err,data) {
  if(err) {
      return console.log('读取文件失败！')
  }

  // 模板引擎的render方法需要接收字符串
  // 默认读取到的data是二进制
  var ret = template.render(data.toString(), {
      title: 'Template',
    name: 'Jack',
    age: 18,
    province: '北京市',
    hobbies: [
    '写代码',
    '看动漫',
    '听歌',
    ]
  })

  console.log(ret)
})
```

**tpl.html**

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>{{ title }}</title>
</head>
<body>
<p>大家好，我叫：{{ name }}</p>
<p>今年{{ age }}岁了</p>
<p>我来自{{ province }}</p>
<p>我喜欢：{{each hobbies}} {{ $value }} {{/each}}</p>
</body>
</html>
```

## 6. 服务端渲染和客户端渲染

**客户端渲染过程**

1.浏览器发出请求，收到服务器响应的html页面字符串(含模板引擎)

2.浏览器从上到下依次解析该页面

3.在解析过程中发现ajax异步请求，则再次发起新的请求，请求获得数据

4.用服务器的响应结果来渲染模板引擎

**服务端渲染过程**

服务端在将页面发给客户端之前，已经将页面渲染处理过了

**小结**

①服务端渲染的数据可以被爬虫抓取到，而客户端渲染，因为它的数据都是异步加载的，所以难以被爬虫抓取

②通常，网站都是服务端渲染和客户端渲染相结合的

例如，京东的商品列表就采用服务端渲染，目的为了SEO(Search Engine Optimization)搜索引擎优化，用户用搜索引擎可以搜索到; 而商品评论列表，无需SEO优化，并且异步获取评论数据可以提高用户体验，因而采用客户端渲染。

## 7. 处理网站中的静态资源

为了让目录结构保持统一清晰，我们约定，将所有的html文件都放在**views文件夹**中

浏览器在收到HTML响应内容之后，就要开始从上到下一次解析  

当在解析的过程中，如果发现link、script、img、iframe、video、audio等带有src或href(link)属性标签的时候(具有外链资源)，浏览器就会自动对这些资源**发起新的请求**。

为了方便统一处理这些**静态资源**，我们把所有静态资源都放在**public文件夹**中。

从下图可知，浏览器对静态资源bootstrap.css发起了新的请求。

![b9271c336f1525730c937bb3424a007d.png](assets/1c5d961809439a25c0f6e3219b357f73367eb5ed.png)

## 8. 留言本案例（node.js）

下载模板引擎，安装 boostrap 

boostrap依赖于jquery，所以还要安装jquery

安装用于格式化时间的模块

```
npm install art-template bootstrap jquery silly-datetime
```

记得将下载好的 boostrap 和 jquery 这两个第三方库放到 **/public/lib** 目录下

**服务端入口文件app.js**

```
var http = require('http')
var fs = require('fs')
var template = require('art-template')
var url = require('url')
var sd = require('silly-datetime')

var comments = [
    {
        name: '宙斯',
        message: '我是众神之王',
        dateTime: '2021-01-20'
    },
    {
        name: '波塞冬',
        message: '我是海神',
        dateTime: '2021-02-21'
    },
    {
        name: '雅典娜',
        message: '我是智慧之神',
        dateTime: '2021-03-22'
    },
]

http.createServer(function(req,res) {
        // url.parse方法将路径解析为一个方便操作的对象，第二个参数为true表示将查询字符串转为一个对象
        var parseObj = url.parse(req.url, true)
        // 单独获取不包含查询字符串的路径部分
        var pathname = parseObj.pathname
        if(pathname === '/') {
            fs.readFile('./views/index.html',function(err,data) {
                if(err) {
                    return res.end('404 Not Found.')
                }
                var htmlStr = template.render(data.toString(), {
                    comments: comments
                })
                res.end(htmlStr)
            })
        } else if(pathname === '/post') {
            fs.readFile('./views/post.html', function (err, data) {
                if (err) {
                    return res.end('404 Not Found.')
                }
                res.end(data)
            })
        } else if(pathname.indexOf('/public/') === 0) {
            //如果请求路径是以/public/开头的，则我认为你要获取public中的某个资源
            //所以可以把请求路径当作文件路径来进行读取
            fs.readFile('.' + pathname, function(err, data) {
                if(err){
                    return res.end('404 Not Found.')
                }
                res.end(data)
            })
        } else if(pathname === '/pinglun') {
            // 1. 获取表单提交的数据
            var comment = parseObj.query
            // 2. 将当前时间添加到数据对象中
            comment.dateTime = sd.format(new Date(), 'YYYY-MM-DD HH:mm')
            comments.unshift(comment)
            // 3. 让用户重定向到首页 /
            // 302状态码表示临时重定向，浏览器收到该状态码就会自动去响应头找Location
            res.statusCode = 302
            res.setHeader('Location','/')
            res.end()
        } else {
            fs.readFile('./views/404.html', function(err, data) {
                if(err) {
                    return res.end('404 Not Found.')
                }
                res.end(data)
            })
        }
    })
    .listen(3000,function () {
        console.log('running...')
    })
```

**留言板首页渲染 view/index.html**

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>留言本</title>
    <link rel="stylesheet" href="/public/lib/bootstrap/dist/css/bootstrap.css">
</head>
<body>
    <div class="header container">
        <div class="page-header">
            <h1>Message Board<small> speak your mind freely</small></h1>
            <a class="btn btn-success" href="/post">发表留言</a>
        </div>
    </div>
    <div class="comments container">
        <ul class="list-group">
            <!--这里的each 是art-template的模板语法-->
            {{each comments}}
            <li class="list-group-item">{{ $value.name }}说： {{ $value.message }}<span class="pull-right">{{ $value.dateTime }}</span></li>
            {{/each}}
        </ul>
    </div>
</body>
</html>
```

**用户在首页点击“发表留言”之后跳转的页面 view/post.html**

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>发表留言</title>
    <link rel="stylesheet" href="/public/lib/bootstrap/dist/css/bootstrap.css">
</head>
<body>
    <div class="header container">
        <div class="page-header">
            <h1>Home<small> Leave a comment</small></h1>
        </div>
        <div class="comments container">
            <form action="/pinglun" method="get">
                <div class="form-group">
                    <label for="input_name">你的大名</label>
                    <input type="text" class="form-control" required minlength="2" maxlength="10" id="input_name" name="name" placeholder="请写入你的姓名"></input>
                </div>
                <div class="form-group">
                    <label class="textarea_message">留言内容</label>
                    <textarea class="form-control" name="message" id="textarea_message" cols="30" rows="10" required minlength="5" maxlength="100"></textarea>
                </div>
                <button type="submit" class="btn btn-default">发表</button>
            </form>
        </div>
    </div>
</body>
</html>
```

**404处理404.html**

```
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>404</title>
    </head>
    <body>
        <h1>抱歉！您要访问的页面失灵啦...</h1>
    </body>
</html>
```

**首页**

![685f1381a1fff00bcf74bcc8e6d2dd1b.png](assets/724e608c348ef40805d2fb3b8741579883951ca7.png)

**点击“发表留言”**

![0af141ebfb29c943d9bc8accee9fda9a.png](assets/618a1625d8752e19600ed1ff5ffe119b59225b41.png)

**写完留言，点击"发表"，页面自动跳转到首页**

![9ce1f47affff54e892fa971f44956873.png](assets/997af371f5a35fd614685446837df24f292ca527.png)

## 9. commonJS模块规范

使用require方法来加载模块  

使用exports接口对象用来导出模块中的成员

- 如果要导出多个成员：exports.xxx = xxx 或者 module.exports = {}  

- 如果要导出单个成员：module.exports = xxx

require 模块加载的路径中的相对路径不能省略 **./**  

fs.readFile 中的文件加载路径可以省略 **./**

## 10. package.json

每一个项目都要有一个**package.json**，这个文件就像产品的说明书一样，记录了项目的信息

=> 该文件可以用**npm init**来初始化创建

安装一个包 `npm i art-template --save`，再看看package.json

```
{
  "name": "test",
  "version": "1.0.0",
  "description": "这是一个测试文件",
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "fyx",
  "license": "ISC",
  "dependencies": {
    "art-template": "^4.13.2"
  }
}
```

我们发现在dependencies这个选项中就记录了第三方包的名称 (npm5 以后的版本安装包不加--save参数也会自动保存依赖信息)

向上标号^是定义了向后（新）兼容依赖。

- 指如果art-template的版本是超过4.13.2，并在**大版本号**（4）上相同，就允许下载最新版本的 art-template库包，例如实际上运行npm install时候下载的具体版本可能是4.13.10。

- 如果前面是~，则表示匹配最近的**小版本**。比如，匹配4.13.9，不能匹配4.14.0。

执行这个命令的时候，在项目根目录下会新增一个node_modules文件夹，你会发现这里面有很多包，这是因为art-template包本身依赖了很多其它包，同样，这些包也可能依赖了其它包。（如果不小心删除了node_modules文件夹，只要有package.json，就可以用npm install命令把要依赖的包安装回来。）

但是，package.json只会记录最上层的art-template。

**package.json和package-lock.json**

npm5以前是不会有package-lock.json这个文件的，npm5以后才加入了这个文件。当你安装包的时候，会自动创建或更新该文件。  

- package-lock.json文件会保存node_modules中所有包的信息(版本、下载地址)，这样重新npm install的时候速度就可以提升。  

- 该文件的另一个作用是**锁**定安装时的包的版本号，因为package.json文件只能锁定大版本，也就是版本号的第一位，并不能锁定后面的小版本。该文件保证了在不同时间或者不同npm下载源之下，用户下载到的依赖包的版本都一样。

## 11. Express的引入

Express是一个基于node.js的**后端框架**。快速、简单、极简。通过它，可以轻松地构建各种web应用。例如：接口服务、传统的web网站、开发工具集成等。

Express本身是极简的，仅仅提供了web开发的基础功能，但是它通过**中间件**的方式集成了许多外部插件来处理HTTP请求。

- bodey-parser: 解析HTPP请求体

- compression: 压缩HTTP响应

- cookie-parser: 解析cookie数据

- cors: 处理跨域资源请求

- morgan: HTTP请求日志记录

**安装**

```
npm init -y
npm i -S express
```

**起步**

```
const express = require('express')
const app = express()

// get请求
app.get('/', (req,res) => {
  res.send('get /')
})

// post请求
app.post('/', (req,res) => {
  res.send('post /')
})

// put请求
app.put('/user', (req,res) => {
  res.send('put user')
})

// delete请求
app.delete('/user', (req,res) => {
  res.send('delete user')
})

app.listen(3000, () => {
  console.log(`Server running at http://localhost:3000/`)
})
```

打开终端执行：node app.js，浏览器访问： localhost:3000，也可以用**postman**来测试

**请求和响应**

```
const express = require('express')
const app = express()

app.get('/', (req,res) => {
  console.log(req.url)
  console.log(req.method)
  console.log(req.headers)
  console.log('请求参数 ', req.query)
  res.cookie('foo', 'bar')
  res.cookie('a', 123)
  // send方法可以直接传对象，但是node中的end方法不能直接传，只能转成字符串
  res.status(201)
  res.send({
    foo: 'bar'
  })
})

app.listen(3000, () => {
  console.log(`Server running at http://localhost:3000/`)
})
```

req和res对象用来处理请求和响应的数据。

**三种访问静态资源的方式**

```
// 我在/public/img目录下有一个a.jpg文件
//访问路径：http://127.0.0.1:3000/public/img/a.jpg
app.use('/public', express.static('./public'))

//访问路径：http://127.0.0.1:3000/static/img/a.jpg
//可以把/static看成是/public的别名
app.use('/static', express.static('./public')) 

//访问路径：http://127.0.0.1:3000/img/a.jpg
app.use(express.static('./public')) 
```

app.js

```
 const express = require('express')
 const app = express()

// 公开指定目录
// 只要这样做就可以直接通过/public/xxx的方式访问public目录中的资源
app.use('/public/', express.static('./public/'))

app.get('/', function (req, res) {
    res.send('hello express!')
})

app.get('/about', function(req, res) {
    res.send('我是about')
})

 app.listen(3000, function(){
     console.log('The server is running at port 3000...')
 })
```

**在Express中使用模板引擎**

```
npm i -S art-template express-art-template
```

app.js

```
const express = require('express')
const app = express()

// 第一个参数art表示使用art-template模板引擎渲染以.art为后缀名的文件
// 第一个参数也可以自己指定为html，这样配置你的模板文件就要以.html为后缀名
// express-art-template是用来将art-template整合到Express中
app.engine('art', require('express-art-template'))

// Express为response对象提供了一个render方法
// render方法默认不可用，需要先配置模板引擎
// 默认会去项目中的views目录下去找模板文件，所以第一个参数不写路径
app.get('/', function (req, res) {
    res.render('admin.art',{
        content: '爱自己是终身浪漫的开始'
    })
})

app.listen(3000, function () {
    console.log('The server is running at port 3000...')
})
```

**views/admin.art**

```
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title></title>
    </head>
    <body>
        <h1>{{ content }}</h1>
    </body>
</html>
```

如果想要修改默认的views视图渲染存储目录，这样改 => `app.set('views', 目录路径)`

## 12. nodemon

nodemon是一个基于Node.js开发的第三方命令行工具，可以实时检测到代码的变化并重启服务器

```
npm install -g nodemon        //安装
```

> nodemon app.js报错：无法加载文件 C:\Users\gxf\AppData\Roaming\npm\nodemon.ps1，因为在此系统上禁止运行脚本 
> 
> **解决**：打开powerShell，输入Start-Process powershell -Verb runAs 从普通模式转至管理员模式
> 
> 输入set-ExecutionPolicy RemoteSigned，然后输入Y 或者A回车即可

## 13. 用Express重写留言本案例

在Express中获取表单GET请求参数

- req.query 

获取表单POST请求体数据

- 由于Express中没有内置获取表单POST请求体的API，这里需要使用一个第三方包body-parser  `npm i -S body-parser`

- 有了这样一个中间件，就可以通过req.body来获取表单POST请求体数据了

app.js

```
const express = require('express')
const app = express()
var sd = require('silly-datetime')
var bodyParser = require('body-parser')

// 配置body-parser中间件
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use('/public/', express.static('./public/'))
app.engine('html', require('express-art-template'))

var comments = [
    {
        name: '宙斯',
        message: '我是众神之王',
        dateTime: '2021-01-20'
    },
    {
        name: '波塞冬',
        message: '我是海神',
        dateTime: '2021-02-21'
    },
    {
        name: '雅典娜',
        message: '我是智慧之神',
        dateTime: '2021-03-22'
    },
]

app.get('/', function (req, res) {
    res.render('index.html', {
        comments: comments
    })
})

app.get('/post', function (req, res) {
    res.render('post.html')
})

app.post('/post', function (req, res) {
    var comment = req.body
    comment.dateTime = sd.format(new Date(), 'YYYY-MM-DD HH:mm')
    comments.unshift(comment)
    res.redirect('/')
})

app.listen(3000, function () {
    console.log('The server is running at port 3000...')
})
```

views/post.html(表单提交改成post请求)

```cobol
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>发表留言</title>
    <link rel="stylesheet" href="/public/lib/bootstrap/dist/css/bootstrap.css">
</head>
<body>
    <div class="header container">
        <div class="page-header">
            <h1>Home<small> Leave a comment</small></h1>
        </div>
        <div class="comments container">
            <form action="/post" method="get">
                ... //原代码不变
            </form>
        </div>
    </div>
</body>
</html>
```

## 14. CRUD案例

```
npm i express bootstrap body-parser art-template
```

app.js

```
const express = require('express')
const app = express()
const router = require('./router')
const bodyParser = require('body-parser')

app.use('/public/', express.static('./public/'))
app.use('/node_modules/', express.static('./node_modules/'))

app.engine('html', require('express-art-template'))

// 配置模板引擎和body-parser一定要在挂载路由之前
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 把路由容器挂载到app服务中
app.use(router)

app.listen(3000, function () {
    console.log('running at port 3000...')
})
```

router.js

```
const express = require('express')
var Student = require('./student')

// 1. 创建一个路由容器
const router = express.Router()

// 2. 把路由都挂载到router路由容器中
router.get('/students', function (req, res) {
    Student.find(function (err, students) {
        if (err) {
            return res.status(500).send("Server Error.")
        }
        res.render('index.html', {
            students: students
        })
    })
})

router.get('/students/new', function (req, res) {
    res.render('new.html')
})

router.post('/students', function (req, res) {
    Student.save(req.body, function(err) {
        if (err) {
            return res.status(500).send('Server Error.')
        }
        res.redirect('/students')
    })
})

router.get('/students/edit', function (req, res) {    
    Student.findById(parseInt(req.query.id), function(err, student) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.render('edit.html', {
            student: student
        })
    })
})

router.post('/students/edit', function (req, res) {
    // 1.获取表单数据 2.更新 3.发送响应
    Student.updateById(req.body, function (err) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.redirect('/students')
    })
})

router.get('/students/delete', function (req, res) {    
    Student.deleteById(req.query.id, function(err) {
        if(err) {
            return res.status(500).send('Server error.')
        }
        res.redirect('/students')
    })
})

//3. 把路由导出
module.exports = router
```

student.js

```
/**
 * 数据操作文件模块
 * 职责： 操作文件中的数据，只处理数据，不关心业务
 */
const fs = require('fs')

const dbPath = './db.json'

/**
 * 获取所有学生列表  
 */
exports.find = function (callback) {
    fs.readFile(dbPath, 'utf-8', function (err, data) {
        if (err) {
            return callback(err)
        }
        callback(null, JSON.parse(data).students)
    })
}

/**
 * 根据Id获取学生信息对象
 */
exports.findById = function (id, callback) {
    fs.readFile(dbPath, 'utf-8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        var ret = students.find(function (item) {
            return item.id === parseInt(id)
        })
        callback(null, ret)
    })
}

/**
 * 添加保存学生  
 */
exports.save = function (student, callback) {
    fs.readFile(dbPath, 'utf-8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        // 处理id唯一的，不重复
        student.id = students[students.length - 1].id + 10
        // 把用户传递的对象保存到数组中
        students.push(student)
        // 把对象数据转换为字符串
        var fileData = JSON.stringify({
            students: students
        })
        // 把字符串保存到文件中
        fs.writeFile(dbPath, fileData, function (err) {
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })
}

/**
 * 更新学生  
 */
exports.updateById = function (student, callback) {
        fs.readFile(dbPath, 'utf-8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students

        student.id = parseInt(student.id)
        student.age = parseInt(student.age)
        student.gender = parseInt(student.gender)

        var stu = students.find(function (item) {
            return item.id === student.id
        })
        for (let item in student) {
            stu[item] = student[item]
        }
        var fileData = JSON.stringify({
            students: students
        })
        fs.writeFile(dbPath, fileData, function (err) {
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })
}

/**
 * 删除学生  
 */
exports.deleteById = function (id, callback) {
    fs.readFile(dbPath, 'utf-8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        var deleteId = students.findIndex(function(item) {
            return item.id === parseInt(id)
        })
        // 根据下标从数组中删除对应的学生
        students.splice(deleteId, 1)
        var fileData = JSON.stringify({
            students: students
        })
        fs.writeFile(dbPath, fileData, function (err) {
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })
}
```

db.json(存放数据的文件)

```
{
    "students": [
        {"id": 1, "name": "张三", "gender": 0, "age": 18, "hobbies": "看动漫"},
        {"id": 2, "name": "李四", "gender": 1, "age": 17, "hobbies": "听音乐"},
        {"id": 3, "name": "王五", "gender": 1, "age": 19, "hobbies": "看电影"},
        {"id": 4, "name": "赵六", "gender": 0, "age": 19, "hobbies": "看小说"},
        {"id": 5, "name": "钱七", "gender": 1, "age": 20, "hobbies": "运动"}
    ]
}
```

views/index.html

```
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <title>Dashboard Template for Bootstrap</title>
    <link href="/node_modules/bootstrap/dist/css/bootstrap.css" rel="stylesheet">
    <style>
        body {
              padding-top: 50px;
            }
            .main {
              padding: 20px;
            }
    </style>
  </head>
  <body>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
          <h2 class="sub-header">学生信息表</h2>
          <a class="btn btn-success" href="/students/new">添加学生</a>
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>学号</th>
                  <th>姓名</th>
                  <th>性别</th>
                  <th>年龄</th>
                  <th>爱好</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                  {{ each students }}
                  <tr>
                  <td>{{ $value.id }}</td>
                  <td>{{ $value.name }}</td>
                  <td>{{ $value.gender }}</td>
                  <td>{{ $value.age }}</td>
                  <td>{{ $value.hobbies }}</td>
                  <td>
                    <a href="/students/edit?id={{ $value.id }}">编辑</a>
                    <a href="/students/delete?id={{ $value.id }}">删除</a>
                  </td>
                </tr>
                  {{ /each}} 
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
```

views/new.html

```
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <title>Dashboard Template for Bootstrap</title>
    <link href="/node_modules/bootstrap/dist/css/bootstrap.css" rel="stylesheet">
    <style>
        body {
              padding-top: 50px;
            }
            .main {
              padding: 20px;
            }
    </style>
  </head>
  <body>
    <div class="container-fluid">
      <h3 class="sub-header">添加学生</h3>
      <form action="/students" method="post">
        <div class="form-group">
          <label for="name">姓名</label>
          <input type="text" class="form-control" name="name">
        </div>
        <div class="form-group">
          <label for="name">性别</label>
          <div>
            <label class="radio-inline">
              <input type="radio" name="gender" id="radio1" value="0" checked>男
            </label>
            <label class="radio-inline">
              <input type="radio" name="gender" id="radio2" value="1">女
            </label>
          </div>
        </div>
        <div class="form-group">
          <label for="age">年龄</label>
          <input type="number" class="form-control" name="age">
        </div>
        <div class="checkbox">
          <label for="name">爱好</label>
          <input type="text" class="form-control" name="hobbies">
        </div>
        <button type="submit" class="btn btn-success">Submit</button>
      </form>
    </div>
  </body>
</html>
```

views/edit.html

```
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <title>Dashboard Template for Bootstrap</title>
    <link href="/node_modules/bootstrap/dist/css/bootstrap.css" rel="stylesheet">
    <style>
        body {
              padding-top: 50px;
            }
            .main {
              padding: 20px;
            }
    </style>
  </head>
  <body>
    <div class="container-fluid">
      <h3 class="sub-header">编辑学生</h3>
      <form action="/students/edit" method="post">
        <!-- 这里的id需要上传到服务器，但是又不希望被看见 -->
        <input type="hidden" name="id" value="{{ student.id }}">
        <div class="form-group">
          <label for="name">姓名</label>
          <input type="text" class="form-control" name="name" value="{{ student.name }}">
        </div>
        <div class="form-group">
          <label for="name">性别</label>
          <div>
            <label class="radio-inline">
              <input type="radio" name="gender" id="radio1" value="0">男
            </label>
            <label class="radio-inline">
              <input type="radio" name="gender" id="radio2" value="1">女
            </label>
          </div>
        </div>
        <div class="form-group">
          <label for="age">年龄</label>
          <input type="number" class="form-control" name="age" value="{{ student.age }}">
        </div>
        <div class="checkbox">
          <label for="name">爱好</label>
          <input type="text" class="form-control" name="hobbies" value="{{ student.hobbies }}">
        </div>
        <button type="submit" class="btn btn-success">Submit</button>
      </form>
    </div>
    <script>
      var radio1 = document.getElementById("radio1")
      var radio2 = document.getElementById("radio2")
      if({{ student.gender }} === 0) {
        radio1.checked = true
      } else {
        radio2.checked = true
      }
    </script>
  </body>
</html>
```

![Snipaste_2024-10-31_20-55-04.png](assets/30167b3ceb81b21e08a21ef1a584f4e4c1a93e53.png)

## 15. Express中间件

Express的最大特色，也是最重要的一个设计，就是中间件。中间件就是一个可以访问请求对象、响应对象和调用next方法的一个函数。

![10dccf335d3eb4bf88b0c00286bcb152.png](assets/e5e3ac5a21988c41767592cbd1af844f23024326.png)

- 路由级别中间件

- 错误处理中间件

- 内置中间件
  
  - express.json()  解析Content-Type为application/json格式的请求体
  
  - express.urlencoded()  解析Content-Type为application/x-www-form-urlencoded格式的请求体
  
  - express.json()  解析Content-Type为application/octet-stream格式的请求体
  
  - express.text()  解析Content-Type为text/plain格式的请求体               
  
  - express.static()  托管静态资源文件

## 16. Express路由

**基本路由示例**

```
var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('hello world')
})
```

**常见的get和post方法**

```
// GET method route
app.get('/', function (req, res) {
  res.send('GET request to the homepage')
})

// POST method route
app.post('/', function (req, res) {
  res.send('POST request to the homepage')
}
```

一种特殊的路由方法，app.all()用于为所有HTTP请求方法的路径加载中间件功能

```
app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...')
  next() 
})
```

**路由路径**

路由路径可以是字符串、字符串模式或正则表达式。

```
app.get('/ab?cd', function (req, res) {
  res.send('ab?cd')
})

app.get('/ab*cd', function (req, res) {
  res.send('ab*cd')
})

app.get('/ab(cd)?e', function (req, res) {
  res.send('ab(cd)?e')
})

app.get(/.*fly$/, function (req, res) {
  res.send('/.*fly$/')
})
```

**路径参数**

路径参数被命名为URL段，用于捕获URL在其位置处指定的值。捕获的值将填充到req.params对象中

```
Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }
```

符号-和.可以对路径参数进行分割

```
Route path: /flights/:from-:to
Request URL: http://localhost:3000/flights/LAX-SFO
req.params: { "from": "LAX", "to": "SFO" }
Route path: /plantae/:genus.:species
Request URL: http://localhost:3000/plantae/Prunus.persica
req.params: { "genus": "Prunus", "species": "persica" }
```

如果想对url中的路径参数进行限制，可以在后面加个(正则表达式)，由于正则表达式通常是文字字符串的一部分，所以用\对所有字符转义。

```
Route path: /user/:userId(\\d+)
Request URL: http://localhost:3000/user/42
req.params: {"userId": "42"}
```

## 17. RESTful接口设计规范

对于资源的具体操作类型，由HTTP动词表示

常用：

- GET(读取)、POST(创建)、PUT(完整更新)、PATCH(部分更新)、DELETE(删除)

不常用：

- HEAD(获取资源的元数据)、OPTIONS(获取信息，关于资源的哪些属性是客户端可以改变的)

**状态码**

客户端的每一次请求，服务器都必须给出回应。回应包括HTTP状态码和数据两部分

HTTP状态码就是一个三位数，分成五个类别

1xx: 相关信息

2xx: 操作成功

- 200 OK：服务器成功返回用户请求(get请求)的数据

- 201 CREATED: 用户创建或修改数据成功(post/put/patch)

- 202 Accepted: 表示一个请求已经进入后台排队(异步任务)

- 204 NO CONTENT: 用户删除数据成功(delete)

3xx: 重定向

4xx: 客户端错误

- 400 INVALID REQUEST: 用户发出的请求有错误，服务器没有进行新建或修改数据的操作

- 401 Unauthorized: 表示用户没有权限(令牌、用户名、密码错误)

- 403 Forbidden: 表示用户得到授权(与401错误相对)，但是访问是被禁止的

- 404 NOT FOUND: 用户发出的请求针对的是不存在的记录，服务器没有进行操作

- 406 Not Acceptable: 用户请求的格式不可得（比如用户请求JSON格式，但是只有XML格式）

- 410 Gone: 用户请求（get请求）的资源被永久删除，且不会再得到

- 422 Unprocesable entity 当创建一个对象时，发生一个验证错误(post/put/patch)

5xx: 服务器端错误

- 500 INTERNAL SERVER ERROR: 服务器发生错误，用户将无法判断发出的请求是否成功

**返回结果**

API返回的数据格式，不应该是纯文本，而应该是一个JSON对象，因为这样才能返回标准的结构化数据。

所以，服务器回应的HTTP头的Content-Type属性要设计为**application/json**。

## 18. 在Node中使用Mysql数据库

```
npm i mysql
```

demo.js

```
const mysql = require('mysql')

// 1. 创建连接
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'demo'
})

// 2. 连接数据库
connection.connect();

// 3. 执行数据操作
connection.query('select * from user', function(error, result) {
    if (error) throw error;
    console.log('The result:', result);
})

// 4. 关闭连接
connection.end();
```

## 19. 在Node中使用MongoDB

MongoDB 是一个基于分布式文件存储的数据库，由 C++ 语言编写。

**存储结构如下**  

每个数据库都是一个对象，一个数据库中可以有多个collections(集合)，也就是表  

一个集合中可以有多个表记录

```
{
  a: {
    users: [
      {name: '张三', age: 15},
      {name: '张四', age: 18},
      {name: '张五', age: 14},
      {name: '张六', age: 17}
      ...
    ],
    products: [
    ...
    ]
  },
  b: {
  }
}
```

官网下载社区版，如果想在命令行工具如cmd中使用mongodb，需要配置环境变量。

**启动**  

- mongodb默认将它所在盘符根目录下的/data/db作为自己的数据存储目录，所以在第一次执行该命令之前先自己手动新建一个 /data/db  

- 如果想要修改默认的数据存储目录：mongodb --dbpath=数据存储目录路径  

- 完了输入一条**mongod**命令即可开启服务

**停止**  

- ctrl+c或者关闭命令行工具

默认连接本机的Mongo服务：**mongo**

退出连接：**exit**

显示所有数据库：**show dbs**

查看当前操作的数据库：**db**  

切换到指定的数据库(如果没有该数据库会新建)：**use 数据库名称**

**插入数据举例**

```
> db.students.insertOne({"name":"fyx"})
{
        "acknowledged" : true,
        "insertedId" : ObjectId("616d53b41fb0f20f27df21f8")
}
```

**查找数据举例**

```
> db.students.find()
{ "_id" : ObjectId("616d53b41fb0f20f27df21f8"), "name" : "fyx" }
```

**在Node中操作MongoDB**

```
npm i mongoose
```

demo.js

```
const mongoose = require('mongoose');
// 连接数据库
mongoose.connect('mongodb://localhost/test');
// 创建一个模型，其实就是在设计数据库
const Cat = mongoose.model('Cat', { name: String });
// 实例化一个Cat
const kitty = new Cat({ name: 'Zildjian' });
// 持久化保存kitty实例
kitty.save().then(() => console.log('meow'));
```

**测试**

```
> use test
switched to db test
> db
test
> show collections
cats
> db.cats.find()
{ "_id" : ObjectId("616d59acdfaf1b77ecc9a106"), "name" : "Zildjian", "__v" : 0 }
```

**增删改查**

```
const mongoose = require('mongoose')
var Schema = mongoose.Schema
// 连接test数据库
mongoose.connect('mongodb://localhost/test')
//设计表结构，字段名称就是表的属性名称
var userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String
    }
})
// 将Schema发布为模型
// 第一个参数要用大写名词单数表示数据库名称，mongoose会自动将该字符串转成小写复数的格式
// 例如这里的User会变成users
var User = mongoose.model('User', userSchema)

// 增加数据
var admin = new User({
    username: 'zs',
    password: '123456',
    email: 'admin@admin.com'
})

admin.save(function(err, ret) {
    if (err) {
        console.log('保存失败')
    } else {
        console.log('保存成功')
    }
})

// 查询数据
// 查询所有，返回的是一个数组
User.find(function(err, ret) {
    if(err) {
        console.log('查询失败')
    } else {
        console.log(ret)
    }
})

// 按条件查询，返回的是一个对象
User.findOne({
    username: 'zs'
}, function(err, ret) {
    if(err) {
        console.log('查询失败')
    } else {
        console.log(ret)
    }    
})

// 删除数据
User.remove({
    username: 'zs'
}, function(err, ret) {
    if(err) {
        console.log("删除失败")
    } else {
        console.log("删除成功")
    }
})

// 更新数据
User.findByIdAndUpdate('', {
    password: '123'
}, function(err, ret) {
    if(err) {
        console.log('更新失败')
    } else {
        console.log('更新成功')
    }
})
```

## 20. 用mongoDB数据库对CRUD案例进行改造

安装mongoose

```
npm i mongoose
```

app.js、views/new.html不变

student.js

```
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test')
var Schema = mongoose.Schema

var studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: Number,
        enum: [0, 1],
        default: 0
    },
    age: {
        type: Number
    },
    hobbies: {
        type: String
    }
})

//直接导出模型构造函数
module.exports = mongoose.model('Student', studentSchema)
```

router.js

```
const express = require('express')
var Student = require('./student')

// 1. 创建一个路由容器
const router = express.Router()

// 2. 把路由都挂载到router路由容器中
router.get('/students', function (req, res) {
    Student.find(function (err, students) {
        if (err) {
            return res.status(500).send("Server Error.")
        }
        res.render('index.html', {
            students: students
        })
    })
})

router.get('/students/new', function (req, res) {
    res.render('new.html')
})

router.post('/students', function (req, res) {
    new Student(req.body).save(function(err) {
        if (err) {
            return res.status(500).send('Server Error.')
        }
        res.redirect('/students')
    })
})

router.get('/students/edit', function (req, res) {
    const id = req.query.id.replace(/"/g, '')
    Student.findById(id, function(err, student) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.render('edit.html', {
            student: student
        })
    })
})

router.post('/students/edit', function (req, res) {
    // 1.获取表单数据 2.更新 3.发送响应
    const id = req.body.id.replace(/"/g, '')
    Student.findByIdAndUpdate(id, req.body, function (err) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.redirect('/students')
    })
})

router.get('/students/delete', function (req, res) {
    const id = req.query.id.replace(/"/g, '')
    Student.findByIdAndRemove(id, function(err) {
        if(err) {
            return res.status(500).send('Server error.')
        }
        res.redirect('/students')
    })
})

//3. 把路由导出
module.exports = router
```

views/index.html

```
<!doctype html>
<html lang="zh-CN">
  <head>
    ...// 原代码不变
  </head>
  <body>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
          <h2 class="sub-header">学生信息表</h2>
          <a class="btn btn-success" href="/students/new">添加学生</a>
          <div class="table-responsive">
            <table class="table table-striped">
              ...// 原代码不变
              <tbody>
                  {{ each students }}
                  <tr>
                  <td>{{ $index + 1 }}</td>
                  <td>{{ $value.name }}</td>
                  <td>{{ $value.gender }}</td>
                  <td>{{ $value.age }}</td>
                  <td>{{ $value.hobbies }}</td>
                  <td>
                    <a href="/students/edit?id={{ $value._id }}">编辑</a>
                    <a href="/students/delete?id={{ $value._id }}">删除</a>
                  </td>
                </tr>
                  {{ /each}} 
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
```

views/edit.html

```
<!doctype html>
<html lang="zh-CN">
  <head>
    ... //原代码不变
  </head>
  <body>
    <div class="container-fluid">
      <h3 class="sub-header">编辑学生</h3>
      <form action="/students/edit" method="post">
        <!-- 这里的id需要上传到服务器，但是又不希望被看见 -->
        <input type="hidden" name="id" value="{{ student._id }}">
        ... //原代码不变
      </form>
    </div>
    <script>
      ... //原代码不变
    </script>
  </body>
</html>
```

## 21. 回调地狱和Promise

**回调地狱callback-hell**

由于fs.readFile是异步操作，所以你不能判断下面三个文件的执行顺序

```
var fs = require('fs')

fs.readFile('./data/a.txt','utf-8',function(err, data) {
    if(err) {
        throw err
    }
    console.log(data)
})

fs.readFile('./data/b.txt','utf-8',function(err, data) {
    if(err) {
        throw err
    }
    console.log(data)
})

fs.readFile('./data/c.txt','utf-8',function(err, data) {
    if(err) {
        throw err
    }
    console.log(data)
})
```

通过回调嵌套的方式可以保证执行顺序  

所谓**回调嵌套**，就是一个异步请求的回调函数中含有另一个异步请求

```
var fs = require('fs')

fs.readFile('./data/a.txt','utf-8',function(err, data) {
    if(err) {
        throw err
    }
    console.log(data)
    fs.readFile('./data/b.txt','utf-8',function(err, data) {
        if(err) {
            throw err
        }
        console.log(data)
        fs.readFile('./data/c.txt','utf-8',function(err, data) {
            if(err) {
                throw err
            }
            console.log(data)
        })
    })
})
```

嵌套多了，就成了**回调地狱(callback hell)**，缺点就是代码丑，而且不方便维护

**Promise**

为了解决上面这种回调地狱，ES6语法新增了一个API：Promise

Promise本身是一个容器，里面往往封装一个异步任务

promise有三种状态：Pending、Resolved、Rejected

```
const fs = require('fs')

function pReadFile(filePath) {
    return new Promise(function(resolve, reject) {
        fs.readFile(filePath, 'utf-8', function(err, data) {
            if(err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

pReadFile('./data/a.txt')
    .then(function(data) {
        console.log(data)
        return pReadFile('./data/b.txt')
    })
    .then(function(data) {
        console.log(data)
        return pReadFile('./data/c.txt')
    })
    .then(function(data) {
        console.log(data)
    })
```

## 22. 基于JWT的身份验证

**JWT** (JSON Web Token)是目前最流行的跨域认证解决方案

互联网服务中的用户认证流程：

- 用户向服务器发送用户名和密码

- 服务器验证通过后，在当前对话(session)里面保存相关数据，比如用户角色、登录时间等等

- 服务器向用户返回一个session_id，写入用户的Cookie

- 用户随后的每一次请求，都会通过Cookie将session_id传回服务器

- 服务器收到session_id，找到前期保存的数据，由此得知用户的身份

该模式的**缺点**在于，扩展性(scaling)不好。单机没问题，如果是服务器集群或者是跨域的服务导向架构，就要求session数据共享，每台服务器都能够读取session。

**举例**：

A网站和B网站是用一家公司的关联服务。现在要求，用户只要在其中一个网站登录，再访问另一个网站就会自动登录，请问如何实现？

解决方案

- ①session数据持久化，写入数据库或别的持久层。各种服务收到请求后，都向持久层请求数据。优点：架构清晰。缺点：工程量比较大，并且万一持久层挂了，就会单点失败。

- ②服务器索性不保存session数据了，所有数据都保存在客户端，每次请求都发回服务器。JWT就是这种方案的一个代表。

**JWT原理**

服务器认证之后，生成一个JSON对象，发回给用户。

以后，用户与服务器通信的时候，都要发回这个JSON对象。服务器完全只靠这个对象认定用户身份。

为了防止用户篡改数据，服务器再生成这个对象的时候，会加上签名。

服务器就不保存任何session数据了，也就是说，服务器变成无状态了，从而比较容易实现扩展。

**JWT的数据结构**

实际的JWT是一个很长的字符串，中间用点(.)分隔成三个部分。

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

JWT的三个部分：Header(头部).Payload(负载).Signature(签名)

解码JWT网站：[JSON Web Tokens - jwt.io](https://jwt.io/ "JSON Web Tokens - jwt.io")

**Header**

Header部分是一个JSON对象，描述JWT的元数据，如下。将该JSON对象用Base64URL算法转成字符串。

```
{
  "alg": "HS256",    //表示签名的算法
  "typ": "JWT"        //表示token的type,JWT令牌的type就是JWT
}
```

**Payload**

Payload部分也是一个JSON对象，用来存放实际需要传递的数据。JWT规定了7个官方字段

- iss(issuer): 签发人

- exp(expiration time):过期时间

- sub(subject):主题

- aud(audience): 受众

- nbf(Not Before): 生效时间

- iat(Issued At): 签发时间

- iti(JWT ID):编号

除了官方字段，也可以自定义私有字段，但是不要把私密信息放在这个部分，因为JWT默认不加密

这个JSON对象也要使用Base64URL算法转成字符串

**Signature**

Signature部分是对前两部分的签名，防止数据篡改

首先，需要指定一个密钥(secret)。这个密钥只有服务器才知道，不能泄露给用户。然后使用Header里面

```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  your-256-bit-secret
) 
```

算出签名之后，将Header、Payload、Signature三个部分拼成一个**字符串**，每个部分用“点”分隔，就可以返回给用户。

**JWT的使用方式**

客户端收到服务器返回的JWT，可以存储在Cookie里面，也可以存储在localStorage。

此后，客户端每次与服务器通信，都要带上这个JWT。你可以把它放在Cookie里面自动发送，但是这样不能跨域，所以更好的做法是放在HTTP请求的头信息Authorization字段里面。

另一种做法是跨域的时候，JWT就放在POST请求的数据体里面。

JWT的**最大缺点**是，由于服务器不保存session状态，因此无法在使用过程中废止某个token，或者更改token的权限。也就是说一旦JWT签发了，在到期之前就会始终有效。

**什么是跨域？**

浏览器从一个域名的网页去请求另一个域名的资源时，域名、端口、协议任一不同，都是跨域  

域名

- 主域名不同 http://www.baidu.com/index.html -->http://www.sina.com/test.js 

- 子域名不同 http://www.666.baidu.com/index.html -->http://www.555.baidu.com/test.js  

- 域名和域名ip http://www.baidu.com/index.html -->http://180.149.132.47/test.js  

端口

- http://www.baidu.com:8080/index.html–> http://www.baidu.com:8081/test.js    

协议

- [http://www.baidu.com:8080/index.html–>](http://www.baidu.com:8080/index.html%E2%80%93>) https://www.baidu.com:8080/test.js

## 23. 综合案例：使用Express开发接口服务

**参考：[GitHub - gothinkster/realworld](https://github.com/gothinkster/realworld)**

**1.创建项目**

```
mkdir realworld-api-express
cd realworld-api-express
npm init -y  
npm i express
```

app.js（**process.env.PORT**表示当前目录下**环境变量**port的值，可以在node启动时设置该值，比如：`set PORT=6000 && node app.js`）

```
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
```

**2.目录结构**

config/config.default.js   配置文件

controller                          用于解析用户的输入，处理后返回相应的结果

model                                数据持久层

middleware                      用于编写中间件

router                                用于配置URL路由规则

util                                      工具模块

app.js                                 用于自定义启动时的初始化工作

**3.配置常用中间件**

解析请求体: express.json()、express.urlencoded() (这俩是内置的，所以不用安装)

日志输出： morgan()

为客户端提供跨域资源请求：cors()

```
npm i morgan cors
```

app.js

```
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
```

**4. 数据模型的封装放在model文件夹下**

model/index.js

```
const mongoose = require('mongoose')
const { dbUrl } = require('../config/config.default')

// 连接MongoDB数据库
mongoose.connect(dbUrl)

var db = mongoose.connection
// 当连接失败的时候
db.on('error', err => {
  console.log('MongoDB 数据库连接失败', err)
})

// 当连接成功的时候
db.once('open', function() {
  console.log('MongoDB 数据库连接成功')
})

// 组织导出模型类
module.exports = {
  User: mongoose.model('User', require('./user')),
  Article: mongoose.model('Article', require('./article'))
}
```

model/base-model.js

```
module.exports = {
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

model/user.js

```
const mongoose = require('mongoose')
const baseModel = require('./base-model')
const md5 = require('../util/md5')

const userSchema = new mongoose.Schema({
  ...baseModel,
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    set: value => md5(value)
  },
  bio: {
    type: String,
    default: null
  },
  image: {
    type: String,
    default: null
  }
})

module.exports = userSchema
```

model/article.js

```
const mongoose = require('mongoose')
const baseModel = require('./base-model')

const articleSchema = new mongoose.Schema({
  ...baseModel,
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    default: null
  },
  image: {
    type: String,
    default: null
  }
})

module.exports = articleSchema
```

**5. 对数据的操作都放在controller文件夹下**

controller/user.js

```
const { User } = require('../model')

// 用户登录
exports.login = async (req, res, next) => {
  try {
    // 1.获取请求体数据
    // 2.数据验证
    // 3.验证通过，将数据保存到数据库
    // 4.发送成功响应
    res.send('login success')
  } catch(err) {
    next(err)
  }
}

// 用户注册
exports.register = async (req, res, next) => {
  try {
    // 1.获取请求提数据
    console.log(req.nody)
    // 2.数据验证
    // 3.验证通过，将数据保存到数据库
    const user = new User(req.body.user)
    await user.save()
    // 4.发送成功响应
    res.status(201).json({
      user
    })
  } catch(err) {
    next(err)
  }
}

// 获取当前登录用户
exports.getCurrentUser = async (req, res, next) => {
  try {
    res.send('get /user')
  } catch(err) {
    next(err)
  }
}

// 更新当前登录用户
exports.updateCurrentUser = async (req, res, next) => {
  try {
    res.send('put /user')
  } catch(err) {
    next(err)
  }
}
```

controller/article.js

```
// 获取文章列表
exports.getArticles = async (req, res, next) => {
  try {
    res.send('getArticles')
  } catch(err) {
    next(err)
  }
}

// 获取用户关注的作者文章列表
exports.getFeedArticles = async (req, res, next) => {
  try {
    res.send('getFeedArticles')
  } catch(err) {
    next(err)
  }
}

// 获取文章
exports.getArticle = async (req, res, next) => {
  try {
    res.send('getArticle')
  } catch(err) {
    next(err)
  }
}

// 创建文章
exports.createArticle = async (req, res, next) => {
  try {
    res.send('createArticle')
  } catch(err) {
    next(err)
  }
}

// 更新文章
exports.updateArticle = async (req, res, next) => {
  try {
    res.send('updateArticle')
  } catch(err) {
    next(err)
  }
}

// 删除文章
exports.deleteArticle = async (req, res, next) => {
  try {
    res.send('deleteArticle')
  } catch(err) {
    next(err)
  }
}
```

controller/profile.js

```
// 获取用户资料
exports.getUserProfile = async (req, res, next) => {
  try {
    res.send('get /profiles/:username')
  } catch(err) {
    next(err)
  }
}

// 关注用户
exports.followUser = async (req, res, next) => {
  try {
    res.send('post /profiles/:username/follow')
  } catch(err) {
    next(err)
  }
}

// 取消关注用户
exports.cancelFollowUser = async (req, res, next) => {
  try {
    res.send('delete /profiles/:username/follow')
  } catch(err) {
    next(err)
  }
}
```

**6. 统一配置错误处理中间件，并在app.js中挂载一下**

middleware/error-handler.js

```
const util = require('util')

module.exports = () => {
  return (err, req, res, next) => {
    res.status(500).json({
      error: util.format(err)
    })
  }
}
```

**7.app.js**

```
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const router = require('./router/index.js')
const errorHandler = require('./middleware/error-handler.js')
require('./model')

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

// 挂载路由
app.use('/api', router)

// 挂载服务器错误的中间件
app.use(errorHandler())

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
```

config/config.default.js

```
/**
 * 默认配置
 */
module.exports = {
  dbUrl: 'mongodb://localhost:27017/realworld'
}
```

**8. 对不同的路由进行一个封装**

router/index.js

```
const express = require('express')
const router = express.Router()

// 用户相关路由
router.use(require('./user'))

// 用户资料相关路由
router.use('/profiles', require('./profile'))

// 文章相关路由
router.use('/articles', require('./article'))

// 标签相关路由
// router.use('/tags', require('./tag'))

module.exports = router
```

router/user.js

```
const express = require('express')
const userCtrl = require('../controller/user')
const userValidator = require('../validator/user')

const router = express.Router()

// 用户登录
router.post('/users/login', userCtrl.login)

// 用户注册
router.post('/users', userValidator.register, userCtrl.register)

// 获取当前登录用户
router.get('/user', userCtrl.getCurrentUser)

// 更新当前登录用户
router.put('/user', userCtrl.updateCurrentUser)

module.exports = router
```

router/article.js

```
const express = require('express')
const router = express.Router()
const articleCtrl = require('../controller/article')

// 获取文章列表
router.get('/', articleCtrl.getArticles)

// 获取用户关注的作者文章列表
router.get('/feed', articleCtrl.getFeedArticles)

// 获取文章
router.get('/:slug', articleCtrl.getArticle)

// 创建文章
router.post('/', articleCtrl.createArticle)

// 更新文章
router.put('/:slug', articleCtrl.updateArticle)

// 删除文章
router.delete('/:slug', articleCtrl.deleteArticle)

module.exports = router
```

router/profile.js

```
const express = require('express')
const router = express.Router()
const profileCtrl = require('../controller/profile')

// 获取用户资料
router.get('/:username', profileCtrl.getUserProfile)

// 关注用户
router.post('/:username/follow', profileCtrl.followUser)

// 取消关注用户
router.delete('/:username/follow', profileCtrl.cancelFollowUser)

module.exports = router
```

**9. 将数据保存到数据库中**

```
npm i mongoose
```

**10. 数据验证：用户名密码不为空，email格式对不对，用户名是否已存在等等**

可以用express-validator，它将一些验证封装成了一个个函数方法。

middleware/validate.js

```
const { validationResult } = require('express-validator')

module.exports = validations => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)))

    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }

    res.status(400).json({ errors: errors.array() })
  }
}
```

validator/user.js

```
const validate = require('../middleware/validate')
const { body } = require('express-validator')
const { User } = require('../model')

exports.register = validate([
  body('user.username')
    .notEmpty().withMessage('用户名不能为空')
    .custom(async username => {
      const user = await User.findOne({ username })
      if (user) {
        return Promise.reject('用户名已存在')
      }
    }),
  body('user.password').notEmpty().withMessage('密码不能为空'),
  body('user.email')
    .notEmpty().withMessage('邮箱不能为空')
    .isEmail().withMessage('邮箱格式不正确')
    .bail()     // 前面验证通过才往后面走
    .custom(async email => {
      const user = await User.findOne({ email })
      if (user) {
        return Promise.reject('邮箱已存在')
      }
    })
])
```

**11. 用户注册-密码加密处理，毕竟数据库中的密码是明文还是不安全的**

util/md5.js

```
const crypto = require('crypto')

  module.exports = str => {
    return crypto.createHash('md5')
    .update('lagou' + str)
    .digest('hex')
  }
```

```
const mongoose = require('mongoose')
const baseModel = require('./base-model')
const md5 = require('../util/md5')

const userSchema = new mongoose.Schema({
  ... //其它代码不变
  password: {
    type: String,
    required: true,
    set: value => md5(value),
    select: false   // 查询用户信息不会显示password
  },
  ... //其它代码不变
})

module.exports = userSchema
```

创建完用户数据，不把密码发给客户端

```
const { User } = require('../model')

...    //原代码不变

// 用户注册
exports.register = async (req, res, next) => {
  try {
    ... //原代码不变
    await user.save()
    // 创建完用户数据，不把密码发给客户端
    user = user.toJSON()
    delete user.password

    // 4.发送成功响应
    res.status(201).json({
      user
    })
  } catch(err) {
    next(err)
  }
}
...    //原代码不变
```

**12.用户登录开发**

- 获取请求体数据

- 数据验证

- 生成token

- 发送成功响应(包含token的用户信息)

config/config.default.js中的jwtSecret可以用**UUID保证唯一性**

默认生成的token是永久有效的，但是可以自己设置有效期时间，见**controller/user.js**

config/config.default.js

```
/**
 * 默认配置
 */
module.exports = {
  dbUrl: 'mongodb://localhost:27017/realworld',
  jwtSecret: '3301a30b-7355-4398-bc02-331eb32c9f64'
}
```

util/jwt.js

```
const jwt = require('jsonwebtoken')
const { promisify } = require('util')

exports.sign = promisify(jwt.sign)

exports.verify = promisify(jwt.verify)

exports.decode = promisify(jwt.decode)
```

controller/user.js

```
const { User } = require('../model')
const jwt = require('../util/jwt')
const { jwtSecret } = require('../config/config.default')

// 用户登录
exports.login = async (req, res, next) => {
  try {
    // 1.数据验证
    // 2.生成token
    const user = req.user.toJSON()
    console.log(user)
    const token = await jwt.sign({
      userId: user._id
    }, jwtSecret,{
      expiresIn: 60 * 60 * 24
    })
    // 3.发送成功响应(包含token的用户信息)
    delete user.password
    res.status(200).json({
      ...user,
      token
    })
  } catch(err) {
    next(err)
  }
}

...    //其它代码不变
```

validator/user.js

```
const validate = require('../middleware/validate')
const { body } = require('express-validator')
const { User } = require('../model')
const md5 = require('../util/md5')

... //原代码不变

exports.login = [
  validate([
    body('user.email').notEmpty().withMessage('邮箱不能为空'),
    body('user.password').notEmpty().withMessage('密码不能为空')
  ]),
  validate([
    body('user.email').custom(async (email, { req }) => {
      const user = await User.findOne({ email })
        .select(['email','username','bio','image','password'])
      if (!user) {
        return Promise.reject('用户不存在')
      }
      // 将数据挂载到请求对象中，后续的中间件也可以使用了
      req.user = user
    })
  ]),
  validate([
    body('user.password').custom(async (password, { req }) => {
      if(md5(password) !== req.user.password) {
        return Promise.reject('密码错误')
      }
    })
  ])
]
```

router/user.js

```
const express = require('express')
const userCtrl = require('../controller/user')
const userValidator = require('../validator/user')

const router = express.Router()

// 用户登录
router.post('/users/login', userValidator.login, userCtrl.login)

...    //原代码不变

module.exports = router
```

**13.获取用户信息**

在获取之前，首先要验证token

router/user.js

```
const express = require('express')
const userCtrl = require('../controller/user')
const userValidator = require('../validator/user')
const auth = require('../middleware/auth')

const router = express.Router()

...    //原代码不变

// 获取当前登录用户
router.get('/user', auth, userCtrl.getCurrentUser)

...    //原代码不变

module.exports = router
```

controller/user.js

```
const { User } = require('../model')
const jwt = require('../util/jwt')
const { jwtSecret } = require('../config/config.default')

...    //原代码不变

// 获取当前登录用户
exports.getCurrentUser = async (req, res, next) => {
  try {
    res.status(200).json({
      user: req.user
    })
  } catch(err) {
    next(err)
  }
}

...    //原代码不变
```

middleware/auth.js

```
const { verify } = require('../util/jwt')
const { jwtSecret } = require('../config/config.default')
const { User } = require('../model')

module.exports = async (req,res,next) => {
  // 从请求头获取token数据
  let token = req.headers['authorization']
  token = token ? token.split('Bearer ')[1] : null
  if(!token) {
    return res.status(401).end()
  }
  try {
    const decodedToken = await verify(token, jwtSecret)
    req.user = await User.findById(decodedToken.userId)
    next()
  } catch(err) {
    return res.status(401).end()
  }
}
```
