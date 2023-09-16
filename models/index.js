const dbConfig      = require("../config/db.config");
const Sequelize     = require("sequelize");
const Connection    = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        port: dbConfig.PORT,
        operatorsAliases: 0,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
);
const db = {};
db.Sequelize  = Sequelize;
db.Connection = Connection;
db.user         = require("../models/user.model")(Connection, Sequelize);
db.email        = require("../models/email.model")(Connection, Sequelize);
db.attachment   = require("../models/attachment.model")(Connection, Sequelize);
db.receiver     = require("../models/receiver.model")(Connection, Sequelize);



module.exports = db;
