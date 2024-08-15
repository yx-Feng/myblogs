const express = require('express')
const app = express()
 
app.use((req,res,next)=>{
  console.log('有人请求服务器2了')
  next()
})
 
app.use('/cars',(req,res)=>{
  const cars = [
    {id:'001',name:'奔驰',price:199},
    {id:'002',name:'宝马',age:109},
    {id:'003',name:'奥迪',age:120},
  ]
  res.send(cars)
})
 
app.listen(5001,err=>{
  if(!err) console.log('服务器2启动成功,监听端口为5001...')
})