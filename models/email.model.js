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
        sent_at: {
            type: Sequelize.DATE,
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