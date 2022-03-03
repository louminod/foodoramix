import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {User} from "../entity/user";
import * as bcrypt from "bcrypt";
import {saveSession} from "../lib/session";
import {promisify} from "util";
import {randomBytes} from "crypto";
import {isAuthorized} from "../security/secure";
import {canListRecipes} from "../security/secure-recipes";
import {SessionCreate} from "../schemas/types/session.create.body";
import * as sessionCreateBody from "../schemas/json/session.create.body.json"
import {getConnection} from "typeorm";

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
            const user = await getConnection().getRepository(User).findOneOrFail({where: {email: request.body.email}})

            const succes = await bcrypt.compare(request.body.password, user.password);

            if (succes) {
                await saveSession(reply, user);
            }

            return {success: succes};
        }
    });

    fastify.post<{ Body: SessionCreate }>('/signin', {
        schema: {
            body: sessionCreateBody
        },
        handler: async function invite(request, reply) {
            const user = new User();
            const saltRounds = 10;

            user.email = request.body.email;
            user.password = await bcrypt.hash(request.body.password, saltRounds);
            user.loginToken = (await promisify(randomBytes)(64)).toString('hex');

            await getConnection().getRepository(User).save(user);
            return {success: true};
        }
    });
}