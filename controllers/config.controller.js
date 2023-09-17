const db            = require("../models");
const Config        = db.config;
const bcrypt        = require("bcryptjs");
const encl          = require("../helpers/encrypt.helper");


exports.addConfig = async(req, res) => {
    try {
        await Config.create({
            host    : req.body.host,
            username    : req.body.username,
            port        : req.body.port,
            active      : req.body.active,
            encryption  : req.body.encryption,
            protocol    : req.body.protocol,
            charset     : req.body.charset,
            password    : encl.encrypt(req.body.password),
        })
        .then(config => {
            res.code(200);
            res.send({ 
                message: "Config registered successfully !" ,
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
    } catch (error) {
        res.code(500);
        res.send({ 
            message: error.message ,
            statusCode: 500,
        });
    }
};

exports.deleteConfig = async(req, res) => {
    try {
        const id = req.params.id;
        const config = await Config.findOne({ where: {id : id} });
        if(config){
            await config.destroy()
            .then(config => {
                res.code(200);
                res.send({ 
                    message: 'Config successfully deleted !',
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
        else{
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

exports.updateConfig = async(req, res) => {
    try {
        const id    = req.params.id;
        const config = await Config.findOne({ where: {id : id} });
        if(config){
            if(req.body.password){req.body.password = bcrypt.hashSync(req.body.password, 8)}
            await config.update(req.body, {
                where: {
                    id: id,
                },
            })
            .then(config => {
                res.code(200);
                res.send({
                    message: 'Config updated successfully !',
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
        else{
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