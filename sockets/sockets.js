// Initialise WebSocket connection between client and server.
const socket = io();

// Send message to server after X seconds
setTimeout(() => {
    socket.emit('message', 'Hello from Client');
}, 3000);

// Listen for Reply from server.
socket.on('reply', (msg) => {
    console.log('Message from server: ', msg);
});