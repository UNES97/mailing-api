module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("roles", {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: {
                args:true,
                msg: 'Role existe déjà !'
            }
        }
    },
    {
        paranoid: true,
        timestamps: true
    });
    return Role;
};