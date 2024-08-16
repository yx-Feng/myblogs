import { Component } from "react";
import Item from "../Item";
import PropTypes from 'prop-types';
import './index.css'

export default class List extends Component {
    //对接收的props进行：类型、必要性的限制
    static propTypes = {
        todos:PropTypes.array.isRequired,
        updateTodo:PropTypes.func.isRequired,
        deleteTodo:PropTypes.func.isRequired
    }
    
    render() {
        const {todos,updateTodo,deleteTodo} = this.props
        return (
            <ul className="main">
                {
                    todos.map(todo => {
                        return <Item key={todo.id} {...todo} updateTodo={updateTodo} deleteTodo={deleteTodo}/>
                    })
                }
            </ul>
        )
    }
}