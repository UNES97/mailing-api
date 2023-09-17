const { authJwt }  = require("../middlewares");
const controller   = require("../controllers/email.controller");

module.exports = function(app) {
    /* Send Email */
    app.post("/api/email/send",
        {
            preHandler :[
                authJwt.verifyToken,
            ]
        },
        controller.sendEmail
    );
}