const crypto = require('crypto');
require('dotenv').config();
const secretKey = crypto.scryptSync(process.env.MAIL_PWD_SECRET, 'salt', 32);

module.exports = {
    encrypt: function (text) {
        try {
            const iv = crypto.randomBytes(16);
            const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey, 'hex'), iv);
            let encrypted = cipher.update(text, 'utf-8', 'hex');
            encrypted += cipher.final('hex');
            return {
                iv: iv.toString('hex'),
                encryptedText: encrypted,
            };
        } catch (error) {
            console.error('Encryption error:', error);
            throw error;
        }
    },

    decrypt: function (encryptedData) {
        try {
            const iv = Buffer.from(encryptedData.iv, 'hex');
            const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey, 'hex'), iv);
            let decrypted = decipher.update(encryptedData.encryptedText, 'hex', 'utf-8');
            decrypted += decipher.final('utf-8');
            return decrypted;
        } catch (error) {
            console.error('Decryption error:', error);
            throw error;
        }
    },
};
