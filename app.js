const fastify = require('fastify')({ logger: true });
const db = require("./models");
require('dotenv').config();

const port = process.env.PORT || 3000;

db.Connection.sync({force: false}).then(() => {
    /* initRoles(); */
    console.log('Resynced DB');
});

function initRoles() {
    const Role = db.role;
    Role.create({
        id: 2,
        name: "User"
    });
   
    Role.create({
        id: 1,
        name: "Admin"
    });
}

fastify.get('/', function handler (request, reply) {
    reply.send({ message : 'EmailSender API by YATO KAMI' });
});

fastify.listen({ port: port }, (err) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
});