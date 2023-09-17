const { authJwt }  = require("../middlewares");
const controller   = require("../controllers/config.controller");

module.exports = function(app) {
    /* Create User */
    app.post("/api/config",
        {
            preHandler :[
                authJwt.verifyToken,
                authJwt.isAdmin,
            ]
        },
        controller.addConfig
    );

    /* Delete User */
    app.delete("/api/config/:id", 
        {
            preHandler :[
                authJwt.verifyToken,
                authJwt.isAdmin,
            ]
        },
        controller.deleteConfig
    );

    /* Update User */
    app.put("/api/config/:id",
        {
            preHandler :[
                authJwt.verifyToken,
                authJwt.isAdmin,
            ]
        },
        controller.updateConfig
    );
}