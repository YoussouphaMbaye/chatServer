const express=require("express");
const cors=require("cors")
const http=require("http");
const {Server}=require("socket.io");
const app=express();
app.use(cors());
const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:"http://localhost:3000",
    }
});
io.on("connection",(socket)=>{
    console.log(socket.id);
    socket.on("join_room",(data)=>{
        socket.join(data);
        console.log(`join room ${data}`);
    
    });
    socket.on("send_msg",(data)=>{

        socket.to(data.room).emit('receve_msg',data);
        console.log(data);
    
    })
})

server.listen(2000,()=>{
    console.log("Server listen at port:2000");
})