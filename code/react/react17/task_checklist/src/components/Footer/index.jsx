import { Component } from "react";
import './index.css';

export default class Footer extends Component {
    handleCheckAll = (event)=>{
        this.props.checkAllTodo(event.target.checked)
      }

    handleClearAllDone = () => {
        this.props.clearAllDone()
    }

    render() {
        const { todos } = this.props
        const hasDone_num = todos.reduce((pre, cur) => { return pre + (cur.done ? 1 : 0) }, 0)
        const total_num = todos.length
        return (
            <div className="footer">
                <label>
                    <input type='checkbox' onChange={this.handleCheckAll} checked={hasDone_num === total_num && total_num !== 0 ? true:false}/>
                </label>
                <span>已完成{hasDone_num} / 全部 { total_num }</span>
                <button onClick={this.handleClearAllDone} className="btn btn-danger">清除已完成任务</button>
            </div>
        )
    }
}