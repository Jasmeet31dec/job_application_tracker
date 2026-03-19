
const crypto = require("crypto");

// Generate a random secret key
const secretKey = process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex');

module.exports = {
    secretKey: secretKey
};