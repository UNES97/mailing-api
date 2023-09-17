module.exports = (sequelize, Sequelize) => {
    const Email = sequelize.define("emails", {
        subject: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        body: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        sender_email: {
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
        },
        receivers: {
            type: Sequelize.JSON,
            allowNull: false,
        },
        attachments: {
            type: Sequelize.JSON,
            allowNull: false,
        },
        is_sent: {
            type: Sequelize.TINYINT(1),
            defaultValue: 0,
        },
    },
    {
        paranoid: true,
        timestamps: true
    });
    return Email;
};