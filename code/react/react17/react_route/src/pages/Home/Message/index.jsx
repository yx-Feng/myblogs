import { Component } from 'react'
 
export default class Message extends Component {
  state = {
	messageArr:[
	  {id:'01',title:'消息1'},
	  {id:'02',title:'消息2'}
	]
  }
  render() {
	const {messageArr} = this.state
	return (
	  <div>
		<ul>
		  {
			messageArr.map((msgObj)=>{
			  return (
				<li key={msgObj.id}>{msgObj.title}</li>
			  )
			})
		   }
		 </ul>
		 <hr/>
	  </div>
    )
  }
}