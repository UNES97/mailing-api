const db            = require("../models");
const User          = db.user;
const Role          = db.role;
const Email         = db.email;
const Config        = db.config;
const Op            = db.Sequelize.Op;
const Sequelize     = require("sequelize");
const nodemailer    = require('nodemailer');
const encl          = require("../helpers/encrypt.helper");

exports.sendEmail = async(req, res) => {
    try {
        const config = await Config.findOne({ where: {code : req.body.code} });
        if(config)
        {
            const transporter = nodemailer.createTransport({
                host: config.host,
                port: config.port,
                secure: false,
                auth: {
                    user: config.username,
                    pass: encl.decrypt({iv : config.iv , encryptedText : config.password}),
                },
                tls: {
                    ciphers:'SSLv3'
                }
            });
            const mailOptions = {
                from : req.body.sender,
                to : req.body.receivers,
                subject : req.body.subject,
                text : req.body.message,
                attachments : [],
            };
            await transporter.sendMail(mailOptions)
            .then(resp => {
                console.log(resp);
                Email.create({
                    subject : req.body.subject,
                    body : req.body.message,
                    sender_email : req.body.sender,
                    receivers : req.body.receivers,
                    attachments: [],
                    is_sent : 1,
                    senderId : req.createdBy,
                });

                res.code(200);
                res.send({ 
                    message: "Email sent successfully !" ,
                    statusCode: 200,
                });
            })
            .catch(err => {
                res.code(500);
                res.send({ 
                    message: err.message ,
                    statusCode: 500,
                });
            });
        }
        else {
            res.code(400);
            res.send({
                message : 'Config not found !',
                statusCode: 400,
            });
        }
    } catch (error) {
        res.code(500);
        res.send({ 
            message: error.message ,
            statusCode: 500,
        });
    }
};