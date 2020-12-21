// Iniciar Server na porta 3000
var express = require('express');
var app = express();
var server = app.listen(3000);

// Iniciando Socket.io
var socket = require('socket.io');
var io = socket(server);

// Salvando as conversas no array
var history = [];

// Adicionando as mensagens no array
function addInHistory(data){
    if(history.length > 100) history.shift();
    history.push(data);
}

// Criando a conexão com o socket.io
io.on('connection', (socket) => {
    
    // Enviando Mensagem
    socket.on('chat-message', function (data) {
        var msg = {
            ...data,
            created_at: new Date()
        }
        io.emit('chat-message', msg);
        addInHistory(msg);
        console.log(data);
    });

    // Buscando as mensagens do array
    socket.on('chat-history', function (){
        socket.emit('chat-history', history);
    });
    
});