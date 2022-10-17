//server for our ichat application
const server = require('socket.io');

const io = server(3000);

//list of connected users
const users = {};

io.on("connection", (socket) => {
    console.log("S : user is connected " + socket.id);

    socket.on("disconnect", () => {
        console.log("S : user is disconnected");
        socket.broadcast.emit('user-left', users[socket.id])
    })

    socket.on("new-user-joined", (name) => {
        console.log(`S : ${name} joined the chat`);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name)
    })

    socket.on("send", (msg) => {
        // console.log(`S : ${name} joined the chat`);
        // users[socket.id] = name;
        socket.broadcast.emit('receive', `${users[socket.id]} : ${msg}`)
    })
})