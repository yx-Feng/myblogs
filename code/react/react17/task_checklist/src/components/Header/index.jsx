import { Component } from "react";
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import './index.css';

export default class Header extends Component {
    // 对接收的props进行：类型、必要性的限制
    static propTypes = {
        addTodo:PropTypes.func.isRequired
    }

    handleKeyUp = (event) => {
        const {keyCode,target} = event
        if(keyCode !== 13) return
        if(target.value.trim() === '') {
            alert('输入不能为空')
            return
        }
        const obj = {id:nanoid(),name:target.value,done:false}
        this.props.addTodo(obj)
        target.value = ''
    }

    render() {
        return (
            <div className="header">
                <input onKeyUp={this.handleKeyUp} type="text" placeholder="请输入任务名称，按回车键确认"/>
            </div>
        )
    }
}