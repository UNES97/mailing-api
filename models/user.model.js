module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        fullname: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            validate:{
                notEmpty:{
                    args:true,
                    msg:"Username required !"
                },
            },
            unique: {
                args:true,
                msg: 'Username already exists !'
            }
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate:{
                notEmpty:{
                    args:true,
                    msg:"Email required !"
                },
                isEmail:{
                    args:true,
                    msg:'Invalid Email !'
                }
            },
            unique: {
                args:true,
                msg: 'Email already exists !'
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        active: {
            type: Sequelize.TINYINT(1),
            allowNull: false,
        },
    },
    {
        paranoid: true,
        timestamps: true
    });
    return User;
};