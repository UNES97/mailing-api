module.exports = (sequelize, Sequelize) => {
    const Config = sequelize.define("configs", {
        code: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: {
                args:true,
                msg: 'Code already exists !'
            }
        },
        host: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        iv: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        port: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        encryption: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        protocol: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        charset: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        active: {
            type: Sequelize.TINYINT(1),
            defaultValue: 0,
        },
    },
    {
        paranoid: true,
        timestamps: true
    });
    return Config;
};