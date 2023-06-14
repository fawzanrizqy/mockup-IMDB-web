if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const jwt = require('jsonwebtoken');
const privateKey = process.env.SECRETKEY;


function signToken(payload) {
    return jwt.sign(payload, privateKey);
}

function verifyToken(token) {
    return jwt.verify(token, privateKey);
}

module.exports = { signToken, verifyToken }