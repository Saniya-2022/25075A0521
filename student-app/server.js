/*const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const studentRoutes = require('./routes/studentRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Test route
app.get('/', (req, res) => {
    res.send("Server is running 🚀");
});

// Routes
app.use('/api', studentRoutes);

// Start server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
}); 
*/
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const studentRoutes = require('./routes/studentRoutes');
const { SECRET_KEY } = require('./auth');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Test route
app.get('/', (req, res) => {
    res.send("Server is running 🚀");
});


// 🔐 LOGIN ROUTE (JWT)
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "admin123") {

        const user = { username };

        const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });

        res.json({ token });

    } else {
        res.status(401).send("Invalid credentials"); 
         
         
    }
});


// Protected routes
app.use('/api', studentRoutes);


// Start server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});