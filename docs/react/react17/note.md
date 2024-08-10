## 1. 简介

React是一个用于构建用户界面的JavaScript 库，或者更准确地说，是一个将数据渲染成HTML视图的JavaScript 库（Facebook开源）

**原生js的缺陷**：直接操作DOM，浏览器会进行大量的重绘重排，效率低下，而且没有组件化编码方案，代码复用率低

**React特点：**  

①采用组件化模式，声明式编码，提高开发效率和组件复用率  

②在React Native中可以使用React语法进行**移动端开发**  

③使用**虚拟DOM**+优秀的**Diffing算法**，尽量减少与真实DOM的交互（数据先渲染成虚拟DOM，然后虚拟DOM再映射成为页面中的真实DOM，当数据增加时，会先在原有DOM上比较，如果没有才会增加新DOM，而不会把原来所有的数据再渲染一遍）

**demo.html**

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8"></meta>
    <title>hello_react</title>
  </head>
  <body>
    <!-- 准备好一个容器 -->
    <div id="test"></div>
    <!-- 引入react核心库 -->
    <script type="text/javascript" src="./js/react.development.js"></script>
    <!-- 引入react-dom, 用于支持react操作DOM -->
    <script type="text/javascript" src="./js/react-dom.development.js"></script>
    <!-- 引入babel，用于将jsx转为js -->
    <script type="text/javascript" src="./js/babel.min.js"></script>
 
    <script type="text/babel">
      // 1.创建虚拟DOM
      const VDOM = <h1>Hello, React</h1>

      // 2.渲染虚拟DOM到页面
      ReactDOM.render(VDOM, document.getElementById('test'))
    </script>
  </body>
</html>
```

**js文件（点击对应url链接，右击鼠标另存为即可）** 

- **react.development.js**：react的核心文件 [链接](https://unpkg.com/react@17/umd/react.development.js)

- **babel.min.js**：将ES6转换为ES5，将jsx转换为js [链接](https://unpkg.com/@babel/standalone/babel.min.js)

- **react-dom.development.js**：react的扩展库，用来操作DOM的  [链接](https://unpkg.com/react-dom@17.0.2/umd/react-dom.development.js)

 **注意**：react.development.js要在react-dom.development.js之前引入，因为后者依赖于前者

创建虚拟DOM的时候，如果想换行，可以这样写

```
const VDOM = (
   <div>
     <h1><span>Hello</span></h1>
   </div>
)
```

**关于虚拟DOM**

①本质是object类型的对象

②虚拟DOM比较"轻"，真实DOM比较"重" ，因为虚拟DOM是React内部在用，无需真实DOM那么多属性  

③虚拟DOM最终会被React转换为真实DOM，呈现在页面上

**JSX（JavaScript XML）**

react定义的一种类似于XML的JS扩展语法: JS + XML

本质是  React.createElement(components, props, ...children)方法的语法糖

**语法规则**：

①定义虚拟DOM的时候不要加引号  

②标签中混入**js表达式**（不是js语句）时要用{}  

③样式的类名用className，不用class  

④内联样式，用style={{key:value}}的形式去写 

⑤只有一个根标签，也就是说最外面只能有一个标签包着

```
const data = 'Hello React'
const VDOM = (
   <div>
     <h2 className="title">
        <span style={{color:'white'}}>{data}</span>
     </h2>
     <input type="text"/>
   </div>
)
```

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8"></meta>
    <title>hello_react</title>
  </head>
  <body>
    <div id="test"></div>
    <script type="text/javascript" src="./js/react.development.js"></script>
    <script type="text/javascript" src="./js/react-dom.development.js"></script>
    <script type="text/javascript" src="./js/babel.min.js"></script>
 
    <script type="text/babel">
      const data = ['React', 'Vue', 'Angular']
      const VDOM = (
        <div>
          <h1>前端js框架列表</h1>
          <ul>
            {
              data.map((item, index)=>{
                return <li key={index}>{item}</li>
              })
            }
          </ul>
        </div>
      )
      ReactDOM.render(VDOM, document.getElementById('test'))
    </script>
  </body>
</html>
```

**模块化和组件化**

js模块化：将一个大的js文件按照特定功能拆成一个个小的js文件，目的是提高js的复用率

组件化：拆的不仅仅是js了，它将一个页面拆成一个个组件，每个组件不仅包含js，还包含html，css，img等等

**函数式组件和类式组件**

函数式组件

```
// 其它代码同上
<script type="text/babel">
  function MyComponent() {
     console.log(this);  // 此处的this是undefined,因为babel编译后开启了strict模式
     return <h2>我是函数定义的组件</h2>
  }
  ReactDOM.render(<MyComponent/>, document.getElementById('test'))
</script>
```

类式组件

```
// 其它代码同上
<script type="text/babel">
  class MyComponent extends React.Component {
    render() {
      return <h2>我是类定义的组件</h2>
    }
  }
  ReactDOM.render(<MyComponent/>, document.getElementById('test'))
</script>
```

**引入favicon.ico**

①favicon.ico图片扔在项目根目录即可  

②引入(其实不引入也会自动加载的)

```cobol
<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">
```

对于chrome浏览器，目录正确，**但是显示不出来的情况**，是**缓存**的问题 => 按**ctrl+f5键**强制刷新

**插件推荐**

浏览器：React Developer Tools [链接](https://chrome.pictureknow.com/extension?id=b02ac2064fdb4f888357cecbf6487592)

vscode：Live Preview
