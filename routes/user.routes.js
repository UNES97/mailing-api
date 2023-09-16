const { authJwt , validations }  = require("../middlewares");
const controller   = require("../controllers/user.controller");

module.exports = function(app) {
    /* Create User */
    app.post("/api/user",
        [
            authJwt.verifyToken,
            authJwt.isAdmin,
        ],
        controller.addUser
    );

    /* Delete User */
    app.del("/api/user/:id",
        [
            authJwt.verifyToken,
            authJwt.isAdmin,
        ],
        controller.deleteUser
    );

    /* Update User */
    app.put("/api/user/:id",
        [
            authJwt.verifyToken,
            authJwt.isAdmin,
        ],
        controller.updateUser
    );

    /* All Users Datatable */
    app.post("/api/users",
        [
            authJwt.verifyToken,
            authJwt.isAdmin,
        ],
        controller.usersList
    );

    /* Get a User */
    app.get("/api/user/:id",
        [
            authJwt.verifyToken,
            authJwt.isAdmin,
        ],
        controller.getUser
    );

    /* Count all Users */
    app.get("/api/users/count",
        [
            authJwt.verifyToken,
            authJwt.isAdmin,
        ],
        controller.usersCount
    );
}