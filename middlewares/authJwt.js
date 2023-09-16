const jwt           = require("jsonwebtoken");
const authConfig    = require("../config/auth.config.js");
const db            = require("../models");

const User = db.user;
verifyToken = (req, res, next) => {
    try {
        let token = req.headers["x-access-token"];
        if (!token) {
            res.status(403);
            return res.send({
                message: "No TOKEN provided !"
            });
        }
        jwt.verify(token, authConfig.secret, (err, decoded) => {
            if (err) {
                res.status(401);
                return res.send({
                    message: "Unauthorized !",
                    statusCode: 401,
                });
            }
            req.createdBy = decoded.id;
            req.roleId = decoded.role;
            next();
        });
    } catch (err) {
        res.status(500);
        return res.send({
            message: err.message,
            statusCode: 500,
        });
    }
};

isAdmin = (req, res, next) => {
    if (req.roleId === 1) {
        next();
        return;
    }
    res.status(403);
    res.send({
        message: "Require an administrator role !",
        statusCode: 403,
    });
};


const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
};
module.exports = authJwt;