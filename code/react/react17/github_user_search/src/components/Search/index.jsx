import React, { Component } from 'react'
import axios from 'axios'
 
export default class Search extends Component {
  search = ()=>{
    const { keyWordElement:{value:keyWord} } = this  //获取用户的输入内容
    //发送请求前更新APP状态
    this.props.updateAppState({isFirst:false,isLoading:true})
    //发送网络请求
    axios.get(`http://api.github.com/search/users?q=${keyWord}`).then(
      response => {
        //请求成功后更新APP状态
        this.props.updateAppState({isLoading:false,users:response.data.items})
      },
      error => {
        //请求失败后更新APP状态
        this.props.updateAppState({isLoading:false,err:error.message})
      }
    )
  }
  render() {
    return (
      <section className="jumbotron">
        <h3 className="jumbotron-heading">搜索Github用户</h3>
        <div>
          <input ref={c => this.keyWordElement = c} type="text" placeholder="输入用户名称"/>&nbsp;
          <button onClick={this.search}>搜索</button>
        </div>
      </section>
    )
  }
}