const crypto = require('crypto');
require('dotenv').config();
const secretKey = crypto.scryptSync(process.env.MAIL_PWD_SECRET, 'salt', 32);
const iv = crypto.randomBytes(16);

module.exports = {
    encrypt : function(text) {
        const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey), Buffer.from(iv));
        let encrypted = cipher.update(text, 'utf-8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    },

    decrypt : function(encryptedText) {
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey), Buffer.from(iv));
        let decrypted = decipher.update(encryptedText, 'hex', 'utf-8');
        decrypted += decipher.final('utf-8');
        return decrypted;
    },
};