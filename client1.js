let io = require("socket.io-client");
// const socket = connect("http://localhost:6800")
const socket = io("http://localhost:6800")

socket.on()

// client-side
socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    socket.emit("subscribe", "BINANCE:BTCUSDT");
});

socket.on("message", (message) => {
    console.log("message given: ", message); // message send from server
});

socket.on("disconnect", () => {
    console.log(socket.id); // undefined
});
