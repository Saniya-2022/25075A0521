const http = require('http');
const os = require('os');
const path = require('path');
const EventEmitter = require('events');

// Create event emitter
const eventEmitter = new EventEmitter();

// Create event
eventEmitter.on('requestReceived', () => {
    console.log("Event: Request received!");
});

// Create server
const server = http.createServer((req, res) => {

    // Trigger event
    eventEmitter.emit('requestReceived');

    res.writeHead(200, { 'Content-Type': 'text/html' });

    res.write("<h2>Custom Node Server</h2>");

    // OS module
    res.write("<h3>OS Module</h3>");
    res.write("Platform: " + os.platform() + "<br>");
    res.write("CPU: " + os.cpus().length + " cores<br>");

    // Path module
    res.write("<h3>Path Module</h3>");
    res.write("File name: " + path.basename(__filename) + "<br>");
    res.write("Directory: " + __dirname + "<br>");

    // Event module
    res.write("<h3>Event Module</h3>");
    res.write("Event triggered: requestReceived<br>");

    res.end();
});

// Start server
server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});