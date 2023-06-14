const express = require('express');
const http = require('http');
const WebSocket = require('ws');

// const port = 3001;
// const server = http.createServer(express);
// const wss = new WebSocket.Server({server});


// wss.on('connection', function connection(ws) {
//     ws.on('message', function incoming(data) {
//         wss.clients.forEach(function each(client) {
//             // if(client !== ws && client.readyState === WebSocket.OPEN) {
//             if(client.readyState === WebSocket.OPEN) {
//                 client.send('data message from server babe');
//                 console.log(data);
//             }
//         })
//     })
// })

// server.listen(port, function() {
//     console.log(`Server is listening on port ${port}!`)
// })

/***************************************WEB SOCKET SERVER WITH WS *********************************************** */



// const WebSocketClient = require('ws');

// // URL del servidor WebSocket al que deseas conectarte
// const url = 'ws://localhost:6969';
// // Crea una nueva instancia de WebSocket
// const wsc = new WebSocketClient(url);

// // Evento que se activa cuando la conexión se establece correctamente
// wsc.on('open', () => {
//     console.log('Conexión establecida');
//     // Envía un mensaje al servidor WebSocket
//     wsc.send('Hola servidor');
// });


// // Evento que se activa cuando se recibe un mensaje del servidor WebSocket
// wsc.on('message', (data) => {
//     console.log('Mensaje recibido:', data);

//     wss.clients.forEach(function each(client) {
//         // if(client !== ws && client.readyState === WebSocket.OPEN) {
//         if(client.readyState === WebSocketClient.OPEN) {
//             client.send('data message from server babe');
//             console.log('client data sent: ',data);
//         }
//     })
// });
  
// // Evento que se activa cuando se cierra la conexión
// wsc.on('close', () => {
//     console.log('Conexión cerrada');
// });



// const WebSocketClient = require('ws');

// // URL del servidor WebSocket al que deseas conectarte
// const url = 'wss://ws.finnhub.io?token=chksi09r01qs2pndl0tgchksi09r01qs2pndl0u0';
// // Crea una nueva instancia de WebSocket
// const wsc = new WebSocketClient(url);

// // Evento que se activa cuando la conexión se establece correctamente
// wsc.on('open', function(event) {
//     console.log('Conexión establecida');
//     // Envía un mensaje al servidor WebSocket
//     wsc.send(JSON.stringify({'type':'subscribe', 'symbol': 'BINANCE:BTCUSDT'}));
// });


// // Evento que se activa cuando se recibe un mensaje del servidor WebSocket
// wsc.on('message', function (event) {
//     console.log('Mensaje recibido:', event.data);
// });
  
// // Evento que se activa cuando se cierra la conexión
// wsc.on('close', () => {
//     wsc.send(JSON.stringify({'type':'unsubscribe','symbol': 'BINANCE:BTCUSDT'}))
//     console.log('Conexión cerrada');
// });

/*******************************************WEBSOCKER SERVER IN SOCKET IO ****************************** */

var app = require("express")();
var httpServer = require("http").Server(app);
var io = require("socket.io")(httpServer);

const port = 6800;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/indexio.html');
  });

io.on("connection", function(socketServer) {
    console.log("new user connected");
    console.log("socketid: ", socketServer.id);

    socketServer.on("subscribe", (arg) => {
        console.log("arg: ",arg); // message send form client
        socketServer.join(arg); //ingresa el cliente a la sala
    });

    // Listen for messages
    socket.addEventListener('message', function (event) {
        // console.log('Message from server ', event.data);
        const data = JSON.parse(event.data);
        if(data.type != "trade") return;
        const symbol = data.data[data.data.length-1];
        console.log(symbol.s);
        io.to(symbol.s).emit("message", symbol );
        // socketServer.to("BINANCE").emit("message", symbol );
    });

});

httpServer.listen(port, function() {
    console.log(`Listening on port: ${port}`);
})

/***************************************WEBSOCKET CLIENT TO FINNHUB ************************************ */
const socket = new WebSocket('wss://ws.finnhub.io?token=chksi09r01qs2pndl0tgchksi09r01qs2pndl0u0');

// Connection opened -> Subscribe
socket.addEventListener('open', function (event) {
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'BINANCE:ETHUSDT'}))
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'BINANCE:BTCUSDT'}))
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'IC MARKETS:1'}))
});

// Listen for messages
// socket.addEventListener('message', function (event) {
//     console.log('Message from server ', event.data);
//     wss.clients.forEach(function each(client) {
//         // if(client !== ws && client.readyState === WebSocket.OPEN) {
//         if(client.readyState === WebSocket.OPEN) {
//             client.send(event.data);
//             // console.log(data);
//         }
//     })
// });

// Unsubscribe
 var unsubscribe = function(symbol) {
    socket.send(JSON.stringify({'type':'unsubscribe','symbol': symbol}))
}
socket.on('close', () => {
    wsc.send(JSON.stringify({'type':'unsubscribe','symbol': 'BINANCE:BTCUSDT'}))
    console.log('Conexión cerrada');
});