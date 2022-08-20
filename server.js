const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const PORT = 3000;
app.use(express.static(__dirname + '/public'));
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');

})
server.listen(PORT ,()=>{
    console.log(`listenng to port ${PORT}`);
})


const io = require('socket.io')(server)
const users = {};
io.on('connection',socket =>{

        // when new-user joines chat he/she becomes a socket.recieves a unique id
    socket.on('new-user-joined', name=>{
        console.log("new-user" , name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined' , name);
    });

    //when new-user sends a chat
    socket.on('send',message=>{
        socket.broadcast.emit('receive' , {message : message, name: users[socket.id]})
    });
    
     //when new-user disconnect ..disconnect name is not custom

     socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });

})









