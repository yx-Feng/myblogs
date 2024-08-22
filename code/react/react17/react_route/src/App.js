import React, { Component } from 'react'
import {Route,Routes,Navigate} from 'react-router-dom'
import Home from './pages/Home' //Home是路由组件
import About from './pages/About' //About是路由组件
import Header from './components/Header' //Header是一般组件
import MyNavLink from './components/MyNavLink'
 
export default class App extends Component {
  render() {
    return (
	  <div>
	    <div className="row">
		  <div className="col-xs-offset-2 col-xs-8">
		    <Header/>
		  </div>
		</div>
		<div className="row">
		  <div className="col-xs-2 col-xs-offset-2">
		    <div className="list-group">
			  {/* 在React中靠路由链接实现切换组件--编写路由链接 */}
			  <MyNavLink to="/home">Home</MyNavLink>
			  <MyNavLink to="/about">About</MyNavLink>
			</div>
		  </div>
		  <div className="col-xs-6">
		    <div className="panel">
		      <div className="panel-body">
		      {/*注册路由,用Routes包起来可实现单一匹配,不包起来只要是path相同的element都会匹配*/}
			    <Routes>
					<Route path="/home/*" element={<Home/>}/>
					<Route path="/about" element={<About/>}/>
					<Route path="*" element={<Navigate to ="/home" />}/>
			    </Routes>
			  </div>
		    </div>
		  </div>
	    </div>
	  </div>
    )
  }
}