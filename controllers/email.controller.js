const db            = require("../models");
const User          = db.user;
const Role          = db.role;
const Email         = db.email;
const Attachment    = db.attachment;
const Receiver      = db.receiver;
const Config        = db.config;
const Op            = db.Sequelize.Op;
const Sequelize     = require("sequelize");

exports.sendEmail = async(req, res) => {
    try {
        
    } catch (error) {
        res.code(500);
        res.send({ 
            message: error.message ,
            statusCode: 500,
        });
    }
};