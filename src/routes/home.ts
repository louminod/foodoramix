import {FastifyInstance} from "fastify";

export async function homeRoutes(fastify: FastifyInstance) {
    fastify.route({
        method: 'GET',
        url: '/',
        handler: async function (request, reply): Promise<Favorite> {
            return reply.code(200).send("Welcome to Foodoramix !");
        }
    });
}