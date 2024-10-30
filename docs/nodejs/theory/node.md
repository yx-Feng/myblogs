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

exports.foo = '追忆似水年华'	//这里导出的foo和上面的foo不是同一个变量
exports.add = function (x, y) {
	return x + y
}
```



## 5.
