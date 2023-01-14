// Importing the required modules
const WebSocketServer = require('ws');
const express = require('express');
const { MessagingResponse } = require('twilio').twiml;
const { urlencoded } = require('body-parser');

// our express api
const app = express();
app.use(urlencoded({ extended: false }));

// Creating a new websocket server
const wss = new WebSocketServer.Server({ port: 8080 })
 


// Creating connection using websocket
wss.on("connection", ws => {
    console.log("new client connected");

    // handle api calls
    app.post('/sms', (req, res) => {
        console.log(`Incoming message: ${req.body.Body}`);

    // send a message to all connected ws clients
    wss.clients.forEach((client) => {
        client.send(req.body.Body)
     })
    
    });
    
    // sending message
    ws.on("message", data => {
        console.log(`Client has sent us: ${data}`)
    });

    // handling what to do when clients disconnects from server
    ws.on("close", () => {
        console.log("the client has connected");
    });
    // handling client connection error
    ws.onerror = function () {
        console.log("Some Error occurred")
    }
});
console.log("The WebSocket server is running on port 8080");

app.listen(1337, () => {
    console.log('Express server listening on port 3000');
  });