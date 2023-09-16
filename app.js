const fastify = require('fastify')({ logger: true });
const port = process.env.PORT || 3000;

fastify.get('/', function handler (request, reply) {
    reply.send({ hello: 'world' });
})

fastify.listen({ port: port }, (err) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
})