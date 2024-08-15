const express = require('express')
const app = express()
 
app.use((req,res,next)=>{
  console.log('有人请求服务器1')
  next()
})
 
app.use('/students',(req,res)=>{
  const students = [
    {id:'001',name:'Tom',age:18},
    {id:'002',name:'Nancy',age:19},
    {id:'003',name:'John',age:20},
  ]
  res.send(students)
})
 
app.listen(5000,err=>{
  if(!err) console.log('服务器1启动成功,监听端口为5000...')
})