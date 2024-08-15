//创建组件App
//{Component}不是解构赋值,而是'react'既导出了React对象，又导出了React对象中的Component属性
import React,{Component} from 'react'
import Hello from './components/Hello/Hello'
import Welcome from './components/Welcome/Welcome'
 
class App extends Component{
  render(){
    return (
      <div>
        <Hello/>
        <Welcome/>
      </div>
    )
  }
}
 
export default App