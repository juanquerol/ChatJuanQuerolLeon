const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('Usuario conectado');

    let nombreUsuario;

    // Escucha el evento 'nombreUsuario' y asigna el nombre de usuario
    socket.on('nombreUsuario', (nombre) => {
        nombreUsuario = nombre;
    });

    // Escucha el evento 'mensaje' y retransmite a todos los clientes
    socket.on('mensaje', (mensaje) => {
        io.emit('mensaje', { nombreUsuario, mensaje });
    });

    // Manejar la desconexión de un usuario
    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});