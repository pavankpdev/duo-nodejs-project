const bcrypt = require('bcryptjs');

const hashPwd = async (pwd) => {
    const salt = await bcrypt.genSalt(8);
    return bcrypt.hash(pwd, salt);
}

module.exports = hashPwd;