const { authJwt }  = require("../middlewares");
const controller   = require("../controllers/user.controller");

module.exports = function(app) {
    /* Create User */
    app.post("/api/user",
        {
            preHandler :[
                authJwt.verifyToken,
                authJwt.isAdmin,
            ]
        },
        controller.addUser
    );

    /* Delete User */
    app.delete("/api/user/:id", 
        {
            preHandler :[
                authJwt.verifyToken,
                authJwt.isAdmin,
            ]
        },
        controller.deleteUser
    );

    /* Update User */
    app.put("/api/user/:id",
        {
            preHandler :[
                authJwt.verifyToken,
                authJwt.isAdmin,
            ]
        },
        controller.updateUser
    );

    /* All Users Datatable */
    app.post("/api/users",
        {
            preHandler :[
                authJwt.verifyToken,
                authJwt.isAdmin,
            ]
        },
        controller.usersList
    );

    /* Get a User */
    app.get("/api/user/:id",
        {
            preHandler :[
                authJwt.verifyToken,
                authJwt.isAdmin,
            ]
        },
        controller.getUser
    );

    /* Count all Users */
    app.get("/api/users/count",
        {
            preHandler :[
                authJwt.verifyToken,
                authJwt.isAdmin,
            ]
        },
            controller.usersCount
    );
}