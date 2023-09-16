module.exports = {
    HOST    : process.env.DB_HOST,
    USER    : process.env.DB_USER,
    PASSWORD: process.env.DB_PASS,
    DB      : process.env.DB_NAME,
    PORT    : process.env.DB_PORT,
    dialect : "mysql",
    pool    : {
        /* Max & Min number of connection in Pool */
        max: 5,
        min: 0,
        /* Max time, in ms, that a connection can be idle before being released */
        acquire: 30000,
        /* Max time, in ms, that pool will try to get connection before throwing error */
        idle: 10000
    }
};