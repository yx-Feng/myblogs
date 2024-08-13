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

## 2. 组件的三大属性

### 2.1 state

state是组件中最重要的一个属性，值是**对象**（可包含多个key-value组合）

组件被称为 “ 状态机 ”，通过更新组件的state来更新对应的页面显示（重新渲染组件）

**注意：**

①组件中render方法中的this为组件实例对象  

②组件自定义的方法中的this位undefined，如何解决？  

=> 通过函数对象的bind函数强制绑定this 或者 使用箭头函数  

③状态数据，需要通过setState()函数来修改，不能直接更改

state_demo.html（点击切换 ”炎热“ 和 ”凉爽“ 关键词）

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8"></meta>
    <title></title>
  </head>
  <body>
    <div id="test"></div>

    <script type="text/javascript" src="./js/react.development.js"></script>
    <script type="text/javascript" src="./js/react-dom.development.js"></script>
    <script type="text/javascript" src="./js/babel.min.js"></script>

    <script type="text/babel">
      class Weather extends React.Component {
        constructor(props) {
          super(props)
          this.state = { isHot: false }
          // 类中的方法默认开启了局部的strict模式，所以changeWeather中的this位undefined
          // 解决changeWeather中this指向的问题
          this.cWeather = this.changeWeather.bind(this)
        }
        render() {
          const {isHot} = this.state
          return <h2 onClick={this.cWeather}>今天天气很{isHot ? '炎热' : '凉爽'}</h2>
        }
        changeWeather() {
          // 状态state不可直接修改,需要通过setState方法
          const isHot = this.state.isHot
          this.setState({isHot:!isHot})
        }
      }
      ReactDOM.render(<Weather/>, document.getElementById('test'))
    </script>
  </body>
</html>
```

**简化写法(推荐)**

```
<script type="text/babel">
      class Weather extends React.Component {
        constructor(props) {
          super(props)
        }
        state = { isHot: false }
        render() {
          const { isHot } = this.state
          return <h2 onClick={this.changeWeather}>今天天气很{isHot ? '炎热' : '凉爽'}</h2>
        }
        // 自定义方法 --- 要用赋值语句的形式 + 箭头函数（用changeWeather = function(){}不行）
        // 箭头函数下面的this，如果发现自己是undefined,就会向外层寻找，所以这里的this指向的是weather实例对象
        changeWeather = () => {
          const isHot = this.state.isHot
          this.setState({ isHot:!isHot })
        }
      }
      ReactDOM.render(<Weather/>, document.getElementById('test'))
</script>
```

### 2.2 props

React组件中的props主要是用来接收传入的数据的。

props_demo.html

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8"></meta>
    <title>Document</title>
  </head>
  <body>
    <div id="test1"></div>
    <div id="test2"></div>

    <script type="text/javascript" src="./js/react.development.js"></script>
    <script type="text/javascript" src="./js/react-dom.development.js"></script>
    <script type="text/javascript" src="./js/babel.min.js"></script>
    <!-- 引入prop-types，全局就多了一个propTypes对象，用于对组件标签属性进行限制 -->
    <script type="text/javascript" src="./js/prop-types.js"></script>

    <script type="text/babel">
      class Person extends React.Component {
        render() {
          const {name,age,sex,speak} = this.props
          return (
            <ul>
              <li>姓名：{name}</li>
              <li>性别：{sex}</li>
              <li>年龄：{age}</li>
            </ul>
          )
        }
      }
      // 对标签属性进行类型、必要性的限制
      Person.propTypes = {
        name: PropTypes.string.isRequired,
        sex: PropTypes.string,
        age: PropTypes.number,
        speak: PropTypes.func
      }
      // 指定默认标签属性值
      Person.defaultProps = {
        sex: '男',
        age: 18
      }
      const p1 = {name: 'Tom', age:18, sex: '男', speak: speak}
      const p2 = {name: 'Nancy', age:19, sex: '女'}
      function speak() {
        console.log('我说话了')
      }
      ReactDOM.render(<Person {...p1}/>, document.getElementById('test1'))
      ReactDOM.render(<Person {...p2}/>, document.getElementById('test2'))
    </script>
  </body>
</html>
```

**prop-types.js下载地址**：https://unpkg.com/prop-types@15.6.2/prop-types.js

**也可以把标签属性的限制放在类里面(推荐)**

```
class Person extends React.Component {
   static propTypes = {
      name: PropTypes.string.isRequired,
      sex: PropTypes.string,
      age: PropTypes.number,
      speak: PropTypes.func
    }
    static defaultProps = {
      sex: '男',
      age: 18
    }
    render() {
      const {name,age,sex,speak} = this.props
       return (
         <ul>
           <li>姓名：{name}</li>
           <li>性别：{sex}</li>
           <li>年龄：{age}</li>
         </ul>
       )
    }
}
```

**函数式组件写法**

```
// 其它代码同上
<script type="text/babel">
  function Person (props) {
    const {name,age,sex} = props
    return (
      <ul>
        <li>姓名：{name}</li>
        <li>性别：{sex}</li>
        <li>年龄：{age}</li>
      </ul>
    )
  }
  Person.propTypes = {
    name: PropTypes.string.isRequired,
    sex: PropTypes.string,
    age: PropTypes.number,
    speak: PropTypes.func
  }
  Person.defaultProps = {
    sex: '男',
    age: 18
  }

  const p1 = {name: 'Tom', age:18, sex: '男'}
  const p2 = {name: 'Nancy', age:19, sex: '女'}   
  ReactDOM.render(<Person {...p1}/>, document.getElementById('test1'))   
  ReactDOM.render(<Person {...p2}/>, document.getElementById('test2'))
</script>
```

### 2.3 refs

组件中的标签可以用refs来标识自己，类似于id，但用法不同。

**小案例**

需求：点击按钮，显示输入框的数据，失去焦点，显示输入框的数据。

refs_demo.html

**①String 类型的 Refs (效率低，官方不推荐使用了)**

```
// 其它代码同上
<script type="text/babel">
  class Demo extends React.Component {
    showData = () => {
      const {input1} = this.refs
      alert(input1.value)
    }
    showData2 = () => {
      const {input2} = this.refs
      alert(input2.value)
    }
    render() {
      return (
        <div>
          <input ref="input1" type="text" placeholder="点击按钮提示数据" /> 
          <button onClick={this.showData}>点我提示左侧的数据</button><br/>
          <input ref="input2" onBlur={this.showData2} type="text" placeholder="失去焦点提示数据" />
        </div>
      )
    }
  }
  ReactDOM.render(<Demo/>, document.getElementById('test'))
</script>
```

**②回调函数形式的 Refs**

```
// 其它代码同上
<script type="text/babel">
  class Demo extends React.Component {
    showData = () => {
      const {input1} = this
      alert(input1.value)
    }
    showData2 = () => {
      const {input2} = this
      alert(input2.value)
    }
    assignment1 = c => { this.input1 = c;}
    assignment2 = c => { this.input2 = c;}
    render() {
      return (
        <div>
         <input ref={this.assignment1} type="text" placeholder="点击按钮提示数据" /> 
         <button onClick={this.showData}>点我提示左侧的数据</button><br/>
         <input ref={this.assignment2} onBlur={this.showData2} type="text" placeholder="失去焦点提示数据" />
        </div>
      )
    }
  }
  ReactDOM.render(<Demo/>, document.getElementById('test'))
</script>
```

**③ 用React.createRef() 返回的容器存储refs标识的结点(推荐)**

```
// 其它代码同上
<script type="text/babel">
  class Demo extends React.Component {
    // React.createRef()调用后返回一个容器，该容器可以存储被ref标识的结点，一个容器装一个结点
    myRef = React.createRef()
    myRef2 = React.createRef()
    showData = () => {
      alert(this.myRef.current.value)
    }
    showData2 = () => {
      alert(this.myRef2.current.value)
    }
    render() {
      return (
        <div>
          <input ref={this.myRef} type="text" placeholder="点击按钮提示数据" /> 
          <button onClick={this.showData}>点我提示左侧的数据</button><br/>
          <input ref={this.myRef2} onBlur={this.showData2} type="text" placeholder="失去焦点提示数据" />
        </div>
      )
    }
  }
  ReactDOM.render(<Demo/>, document.getElementById('test'))
</script>
```

官方文档告诉我们不要过多使用refs，当发生事件的元素和事件操作的元素是同一个时，我们可以省略标签的ref，用**event.target**获取该元素

```
// 其它代码同上
<script type="text/babel">
  class Demo extends React.Component {
    myRef = React.createRef()
    myRef2 = React.createRef()
    showData = () => {
      alert(this.myRef.current.value)
    }
    showData2 = (event) => {
      alert(event.target.value)
    }
    render() {
      return (
        <div>
          <input ref={this.myRef} type="text" placeholder="点击按钮提示数据" /> 
          <button onClick={this.showData}>点我提示左侧的数据</button><br/>
          <input onBlur={this.showData2} type="text" placeholder="失去焦点提示数据" />
        </div>
      )
    }
  }
  ReactDOM.render(<Demo/>, document.getElementById('test'))
</script>
```

## 3. 收集表单数据

需求：定义一个包含表单的组件，输入用户名密码后，点击登录提示输入信息(页面不刷新)

**① 非受控组件（uncontrolled component）**

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8"></meta>
    <title></title>
  </head>
  <body>
    <div id="test"></div>
 
    <script type="text/javascript" src="./js/react.development.js"></script>
    <script type="text/javascript" src="./js/react-dom.development.js"></script>
    <script type="text/javascript" src="./js/babel.min.js"></script>
 
    <script type="text/babel">
      class Login extends React.Component {
        handleSubmit = (event) => {
          event.preventDefault()
          const {username,password} = this
          alert(`你输入的用户名是：${username.value},你输入的密码是：${password.value}`)
        }
        render() {
          return (
            <form onSubmit={this.handleSubmit}>
              用户名：<input ref={c => this.username = c} type="text" name="username"/>
              密码：<input ref={c => this.password = c} type="password" name="password"/>
              <button>登录</button>
            </form>
          )
        }
      }
      ReactDOM.render(<Login/>, document.getElementById('test'))
    </script>
  </body>
</html>
```

**② 受控组件（controlled component）**

其值由 `React` 控制的输入表单元素称为 “**受控组件**”。**优势**：比上面的非受控组件少用了**refs**。

例如，对于这种像input这样输入类的DOM，随着用户的输入，输入的数据被维护在状态state里，等需要用的时候再从状态state里面取出来。

**类似于Vue中的双向数据绑定**

```
<script type="text/babel">
        class Login extends React.Component {
          //保存用户名和密码到状态中
          saveUsername = (event) => {
            this.setState({username: event.target.value})
          }
          savePassword = (event) => {
            this.setState({password: event.target.value})
          }
          handleSubmit = (event) => {
            event.preventDefault()
            const {username,password} = this.state
            alert(`你输入的用户名是：${username},你输入的密码是：${password}`)
          }
          render() {
            return (
              <form onSubmit={this.handleSubmit}>
                用户名：<input onChange={this.saveUsername} type="text" name="username"/>
                密码：<input onChange={this.savePassword} type="password" name="password"/>
                <button>登录</button>
              </form>
            )
          }
        }
        ReactDOM.render(<Login/>, document.getElementById('test'))
</script>
```

## 4. 函数柯里化

函数柯里化（currying）：通过函数调用继续返回函数的方式，实现多次接收参数最后统一处理的函数编码形式

下面的saveFormData函数就用到了函数柯里化

```
<script type="text/babel">
  class Login extends React.Component {
    //保存表单数据到状态中
    saveFormData = (dataType) => {
      return (event) => {
        this.setState({[dataType]:event.target.value})
      }
    }
    handleSubmit = (event) => {
      event.preventDefault()
      const {username,password} = this.state
      alert(`你输入的用户名是：${username},你输入的密码是：${password}`)
    }
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          用户名：<input onChange={this.saveFormData('username')} type="text" name="username" autoComplete="off"/>
          密码：<input onChange={this.saveFormData('password')} type="password" name="password"/>
          <button>登录</button>
        </form>
      )
    }
  }
  ReactDOM.render(<Login/>, document.getElementById('test'))
</script>
```

不用柯里化，我怎么改？？

```

```
