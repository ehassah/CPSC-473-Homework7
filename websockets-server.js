var WebSocket = require("ws");
var WebSocketServer = WebSocket.Server;
var port = 3001;

var ws = new WebSocketServer({
  port: port
});

var messages = [];

console.log("websockets server started");
var topic = "not set yet";

ws.on("connection", function(socket) {
  console.log("client connection estblished");

  if (topic != "not set yet")
    socket.send("*** Topic is '" + topic + "'");

  socket.on("message", function(data) {
    if (data.startsWith("/topic")) {
      topic = data.substring(7);
      data = "*** Topic has changed to '" + data.substring(7) + "'";
    } else {
      messages.push(data);
    }
    console.log("message received " + data);

    ws.clients.forEach(function(clientSocket) {
      clientSocket.send(data);
    });
  });

  messages.forEach(function(msg) {
    socket.send(msg);
  });
});
