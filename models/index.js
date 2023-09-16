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
db.role         = require("../models/role.model")(Connection, Sequelize);
db.email        = require("../models/email.model")(Connection, Sequelize);
db.attachment   = require("../models/attachment.model")(Connection, Sequelize);
db.receiver     = require("../models/receiver.model")(Connection, Sequelize);

db.user.belongsTo(db.role, {
    foreignKey: { name:'roleId', allowNull: false },
    as: "role",
});

db.user.belongsTo(db.user, {
    foreignKey: "createdBy",
    as: "creator",
});

db.email.belongsTo(db.user, {
    foreignKey: { name:'senderId', allowNull: false },
    as: "sender",
});

db.attachment.belongsTo(db.email, {
    foreignKey: { name:'emailId', allowNull: false },
    as: "email",
});

db.receiver.belongsTo(db.email, {
    foreignKey: { name:'emailId', allowNull: false },
    as: "email",
});

module.exports = db;
