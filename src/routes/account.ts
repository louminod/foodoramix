import {FastifyInstance} from "fastify";
import {User} from "../entities/user";
import {saveSession} from "../lib/session";
import {promisify} from "util";
import {randomBytes} from "crypto";
import {isAuthorized} from "../security/secure";
import {canListRecipes} from "../security/secure-recipes";
import {SessionsCreateBody} from "../schemas/types/account/sessions.create.body";

export async function accountRoutes(fastify: FastifyInstance) {
    /**
     * Function to get the list of recipes.
     * @return {json} Return the list of recipes as a json.
     */
    fastify.route({
        method: 'GET',
        url: '/',
        handler: async function (request, reply): Promise<any> {
            await isAuthorized(canListRecipes, request.session, null)
            return {success: true}
        }
    });


    fastify.post<{ Body: SessionsCreateBody }>('/token', {
        handler: async function invite(request, reply) {
            const user = new User();

            user.email = request.body.email;
            user.loginToken = (await promisify(randomBytes)(64)).toString('hex')

            await saveSession(reply, user);

            return {success: true};
        }
    })
}