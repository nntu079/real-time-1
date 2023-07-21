var express = require('express')
const http = require("http");
var app = express();
const server = http.createServer(app);

const socketIo = require("socket.io")(server, {
    cors: {
        origin: "*",
    }
});
// nhớ thêm cái cors này để tránh bị Exception nhé :D  ở đây mình làm nhanh nên cho phép tất cả các trang đều cors được. 


socketIo.on("connection", (socket) => { ///Handle khi có connect từ client tới

    socket.emit('server-set-id', { id: socket.id })

    socket.on("client-send-data", function (data) { // Handle khi có sự kiện tên là sendDataClient từ phía client
        socketIo.emit("server-send-data", { data, from: socket.id });// phát sự kiện  có tên sendDataServer cùng với dữ liệu tin nhắn từ phía server
    })
});

server.listen(3000, () => {
    console.log('Server đang chay tren cong 3000');
});
