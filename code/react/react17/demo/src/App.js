//�������App
//{Component}���ǽ⹹��ֵ,����'react'�ȵ�����React�����ֵ�����React�����е�Component����
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