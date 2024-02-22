const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server); // Integrate Socket.IO with the server

const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

app.get('/', (req, res) => {
    res.render('index', { title: 'Real-Time App', message: 'Welcome to the Real-Time App!' });
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

app.post('/submit', (req, res) => {
    const userInput = req.body.userInput; // Make sure you have body-parser configured to parse request body
    res.json({ message: `Received: ${userInput}` });
});
