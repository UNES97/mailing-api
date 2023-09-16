module.exports = (sequelize, Sequelize) => {
    const Attachment = sequelize.define("attachments", {
        filename: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        full_path: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    {
        paranoid: true,
        timestamps: true
    });
    return Attachment;
};