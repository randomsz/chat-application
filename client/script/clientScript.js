const socket = io('http://localhost:3000');

const form = document.getElementById('containerForm');
const msgInput = document.getElementById('message');
const msgContainer = document.querySelector('.chatbox');

socket.on("connect", () => {
    console.log('C : ' + socket.id);
});

//add msg to the chatbox
function appendMsg(msg, position) {
    const msgElement = document.createElement('div');
    msgElement.innerHTML = msg;
    // msgElement.classList.add('message');
    msgElement.classList.add(position);
    console.log(msgElement);
    console.log(msgContainer);
    msgContainer.append(msgElement);
}

const name = prompt("enter your name");
//send event to server when new user joines
socket.emit('new-user-joined', name);

//receive the user-joined event from server and show the user joined msg in client window
socket.on('user-joined', (name) => {
    console.log("C : in user-joined " + name);
    appendMsg(`${name} joined the chat`, 'left')
})

socket.on('user-left', (name) => {
    console.log("C : in user-left " + name);
    appendMsg(`${name} left the chat`, 'left')
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = msgInput.value;
    appendMsg(`you : ${message}`, 'right')
    socket.emit('send', message);
    msgInput.value = '';
})

socket.on('receive', (msg) => {
    // console.log("C : in user-joined " + name);
    appendMsg(msg, 'left')
})