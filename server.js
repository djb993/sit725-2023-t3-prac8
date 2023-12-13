// << PORT >>
let port = process.env.PORT || 3000; // check environment for existing PORT or set default; 

// << IMPORTS >> 
//Import file dbConnection.js from current directory (./)
require('./dbConnection');

const express = require('express');
const app = express();

//Import file router.js from routers in current directory (./)
let router = require('./routers/router');
//Import module socket.io and extract the Socket class - each Socket instance facilitates communication with a specific client
const { Socket } = require('socket.io'); //ALTERNATE SYNTAX - const Socket = require('socket.io').Socket; 
//Import module http and execute the createServer method with a reference to the server via http
let http = require('http').createServer(app); //'app' refers to an instance of the Express application - which isn't defined in this file.

// << LINK HTTP SERVER & SOCKET.IO LIBRARY >>
let io = require('socket.io')(http); // This line uses 'function chaining' where http is passed as an argument to the function returned by socket.io

// << EXPRESS >>
//Enable client acccess to files in project root directory (index.html, styles.css) - By default, Express does not serve any static files
app.use(express.static(__dirname + '/')); // current working directory + '/' navigates to project root directory
//Enable server to parse JSON payloads from client http requests
app.use(express.json());
//Enable server to parse URL-encoded data from client http requests (E.g. Form data submission)
app.use(express.urlencoded({extended: false})); //extended refers to parsing behaviour of nested objects
//The code defined in router will apply to any requests whose path begins /api/animal (E.g. /api/animal/details)
app.use('/api',router);

// << DISPLAY SOCKET ID >>
io.on( 'connection', (socket) => // event listener triggered when a new connection is established with server
{
    console.log('Client: '+socket.id+ 'connected to server');
    socket.on('disconnect', () => // event listener triggered when disconneted with server
    {
        console.log('Client: '+socket.id+ 'disconnected from server');
    });

});

// << LISTEN FOR REQUESTS >>
http.listen(port, () => 
{
    console.log('Express Server Listening On Port: '+port);
});