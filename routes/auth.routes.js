const controller = require("../controllers/auth.controller");

module.exports = function(app) {
    /* Login Route */
    app.post("/api/auth/signin", controller.signin);
};