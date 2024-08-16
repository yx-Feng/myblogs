import { Component } from "react";
import './index.css';

export default class Item extends Component {
    state = {mouse_over : false}
    handleMouse = (flag) => {
        return ()=>{
            this.setState({mouse_over: flag})
        }
    }
    handleCheck = (id)=>{
        return (event)=>{
            this.props.updateTodo(id, event.target.checked)
        }
    }
    handleDelete = (id)=>{
        return ()=>{
            if(window.confirm('确定删除吗？')){
            this.props.deleteTodo(id)
            }
        }
    }
    render() {
        const { id, name, done } = this.props
        const {mouse_over} = this.state
        return (
            <li style={{backgroundColor: mouse_over ? '#ddd' : '#fff'}} onMouseEnter={this.handleMouse(true)} onMouseLeave={this.handleMouse(false)}>
                <label>
                    <input type="checkbox" checked={done} onChange={this.handleCheck(id)}/>
                    <span>{ name }</span>
                </label>
                <button onClick={this.handleDelete(id)} className="btn btn-danger">删除</button>
            </li>
        )
    }
}
