import {FastifyInstance} from "fastify";
import * as userSchema from "../schemas/json/account/user.json";
import {User} from "../schemas/types/account/user";

export async function accountRoutes(fastify: FastifyInstance) {
    /**
     * Function to get the list of recipes.
     * @return {json} Return the list of recipes as a json.
     */
    fastify.route({
        method: 'GET',
        url: '/',
        schema: {
            response: {200: userSchema}
        },
        handler: async function (request, reply): Promise<User> {
            return reply.send("Get user informations");
        }
    });
}