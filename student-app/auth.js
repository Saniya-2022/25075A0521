const jwt = require('jsonwebtoken');

const SECRET_KEY = "mysecretkey";

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send("Access Denied: No Token");
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).send("Invalid Token");

        req.user = user;
        next();
    });
}

module.exports = { authenticateToken, SECRET_KEY };
