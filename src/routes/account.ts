import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {User} from "../entity/user";
import {saveSession} from "../lib/session";
import {promisify} from "util";
import {randomBytes} from "crypto";
import {isAuthorized} from "../security/secure";
import {canListRecipes} from "../security/secure-recipes";
import {SessionCreate} from "../schemas/types/session.create.body";
import * as sessionCreateBody from "../schemas/json/session.create.body.json"
import {getConnection} from "typeorm";
import {Recipe} from "../schemas/types/recipe";
import * as recipeSchema from "../schemas/json/recipe.json";
import * as responseSchema from "../schemas/json/response.json";

export async function accountRoutes(fastify: FastifyInstance) {
    /**
     * Function to get the list of recipes.
     * @return {json} Return the list of recipes as a json.
     */
    fastify.get('/', {
        handler: async function (request: FastifyRequest): Promise<any> {
            await isAuthorized(canListRecipes, request.session, null)
            return {success: true}
        }
    });


    fastify.post<{ Body: SessionCreate }>('/login', {
        schema: {
            body: sessionCreateBody
        },
        handler: async function invite(request, reply) {
            const user = new User();

            const repository = getConnection().getRepository(User);
            const count = await repository.count();

            return {number: count};

            user.email = request.body.email;
            user.loginToken = (await promisify(randomBytes)(64)).toString('hex')

            await saveSession(reply, user);

            return {success: true};
        }
    });
}