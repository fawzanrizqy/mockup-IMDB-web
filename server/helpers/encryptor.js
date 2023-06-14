const bcrypt = require('bcryptjs');

function hashPass(plainPass) {
    let salt = bcrypt.genSaltSync(10);
    let hashedPass = bcrypt.hashSync(plainPass, salt)
    return hashedPass
}

function checkPass(plainPass, hashedPass) {
    return bcrypt.compareSync(plainPass, hashedPass);
}

module.exports = { hashPass, checkPass }