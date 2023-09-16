module.exports = (sequelize, Sequelize) => {
    const Receiver = sequelize.define("receivers", {
        receiver_email: {
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
    },
    {
        paranoid: true,
        timestamps: true
    });
    return Receiver;
};