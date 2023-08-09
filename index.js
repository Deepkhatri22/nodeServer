
// Node server for handle socket.io connections
const io = require("socket.io")(8000);

const users = {};

io.on('connection', socket =>{                     //socket.io instance listen sockets 
    socket.on('new-user-joined', name =>{  
        console.log("new user", name);            //for particuler connection
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name) ;         //for new user join message for all
    });

    socket.on('send', message =>{                       
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    })
    
    socket.on('disconnect', message =>{                       
        socket.broadcast.emit('left', users[socket.id])
        delete users[socket.id];
    });
})