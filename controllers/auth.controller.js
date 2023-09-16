const db            = require("../models");
const authConfig    = require("../config/auth.config");
const User          = db.user;
const Role          = db.role;
const jwt           = require("jsonwebtoken");
const bcrypt        = require("bcryptjs");

exports.signin = async(req, res) => {
    try {
        await User.findOne({
            where: {
                username: req.body.username
            },
            include: [{ model: db.role , as : 'role' ,   attributes: ['id' , 'name']}]
        })
        .then(user => {
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!user || !passwordIsValid) {
                res.status(401);
                return res.send({
                    accessToken: null,
                    message: "Incorrect password or Username !",
                    statusCode: 401,
                });
            }
         
            if(!user.active){
                res.status(403);
                return res.send({
                    accessToken: null,
                    message: "User is not active !",
                    statusCode: 403,
                });
            }
            var token = jwt.sign(
                { 
                    id: user.id , 
                    role: user.roleId,
                    fullname: user.fullname,
                    username: user.username,
                    email: user.email,
                    roleLabel: user.role.name,
                },
                authConfig.secret, {
                expiresIn: 86400 /* 24 Hours token's life */
            });
            res.status(200);
            res.send({
                accessToken: token,
            });
        });
    } catch (err) {
        res.status(500);
        res.send({ 
            message: err.message ,
            statusCode: 500,
        });
    }
};


  