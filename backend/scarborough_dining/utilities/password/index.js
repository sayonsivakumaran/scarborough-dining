const bcrypt = require('bcrypt-nodejs');

module.exports = {
    generateHashedPassword: function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    },
    validatePassword(loginPassword, actualPassword) {
        return bcrypt.compareSync(loginPassword, actualPassword);
    }
}