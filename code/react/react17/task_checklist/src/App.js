import { Component } from 'react';
import Header from './components/Header'
import List from './components/List'
import Footer from './components/Footer'
import './App.css';

class App extends Component {
  // 初始化状态
  state = {
    todos: [
      {id: '001', name: '吃饭', done: true},
      {id: '002', name: '工作', done: true},
      {id: '003', name: '睡觉', done: false}
    ]
  }

  // 添加一个todo对象
  addTodo  = (obj) => {
    const {todos} = this.state
    const newTodos = [obj, ...todos]
    this.setState({todos: newTodos})
  }

  // 更新一个todo对象
  updateTodo = (id, done) => {
    const {todos} = this.state
    const newTodos = todos.map(obj => {
      if(obj.id === id) return {...obj, done}
      else return obj
    })
    this.setState({todos: newTodos})
  }

  // 删除一个todo对象
  deleteTodo = (id) => {
    const {todos} = this.state
    const newTodos = todos.filter(obj => {
      return obj.id !== id
    })
    this.setState({todos: newTodos})
  }

  // 全选
  checkAllTodo = (done)=>{
    const {todos} = this.state
    const newTodos = todos.map(obj => {
      return {...obj,done}
    })
    this.setState({todos:newTodos})
  }

  // 删除所有已完成的
  clearAllDone = ()=>{
    const {todos} = this.state
    const newTodos = todos.filter(obj => {
      return !obj.done
    })
    this.setState({todos:newTodos})
  }

  render() {
    const { todos } = this.state
    return (
      <div className='container'>
        <div className='wrap'>
          <Header addTodo={this.addTodo} />
          <List todos={todos} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} />
          <Footer todos={todos} checkAllTodo={this.checkAllTodo} clearAllDone={this.clearAllDone} />
        </div>
      </div>
    )
  }
}

export default App;
