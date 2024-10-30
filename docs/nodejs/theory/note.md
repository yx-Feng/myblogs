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

**npm** => 世界上最大的开源库生态系统，绝大多数的js相关的包都存放在了npm上，一条命令就可以下载，很方便

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

**用户在首页点击“发表留言”之后跳转的页面**

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
