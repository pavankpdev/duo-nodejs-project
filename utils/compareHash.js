const bcrypt = require('bcryptjs');

const compareHash = async (incomingPwd, hash) => {
    return bcrypt.compare(incomingPwd, hash)
}

module.exports = compareHash;