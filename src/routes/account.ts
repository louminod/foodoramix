import {FastifyInstance, FastifyRequest} from "fastify";
import {User} from "../entity/user";
import * as bcrypt from "bcrypt";
import {saveSession} from "../lib/session";
import {promisify} from "util";
import {randomBytes} from "crypto";
import {isAuthorized} from "../security/secure";
import {AccountLogin} from "../schemas/types/account.login.body";
import {AccountSignin} from "../schemas/types/account.signin.body";
import * as accountLoginBody from "../schemas/json/account.login.body.json";
import * as accountSigninBody from "../schemas/json/account.signin.body.json";
import * as accountDataResponse from "../schemas/json/account.data.response.json";
import * as response from "../schemas/json/response.json";
import {getConnection} from "typeorm";
import {canLoadAccount, userPolicyScope} from "../security/secure-account";

export async function accountRoutes(fastify: FastifyInstance) {

    fastify.get('/', {
        schema: {
            description: 'get user account data',
            tags: ['account'],
            response: {
                200: accountDataResponse,
            }
        },
        handler: async function (request: FastifyRequest): Promise<any> {
            await isAuthorized(canLoadAccount, request.session, null);
            const user = await userPolicyScope(request.session!).getOne();
            return {user: user};
        }
    });

    fastify.post<{ Body: AccountLogin }>('/login', {
        schema: {
            description: 'login to user account',
            tags: ['account'],
            body: accountLoginBody,
            response: {
                200: response,
            }
        },
        handler: async function invite(request, reply) {
            const user = await getConnection().getRepository(User).findOneOrFail({where: {email: request.body.email}});
            const success = await bcrypt.compare(request.body.password, user.password);

            if (success) {
                user.loginToken = null;
                await getConnection().getRepository(User).save(user);
                await saveSession(reply, user);
            }

            return {
                status: success ? "login success" : "login failure"
            };
        }
    });

    fastify.post<{ Body: AccountSignin }>('/signin', {
        schema: {
            description: 'create an user account',
            tags: ['account'],
            body: accountSigninBody,
            response: {
                200: response,
            }
        },
        handler: async function invite(request, reply) {
            const user = new User();
            const saltRounds = 10;

            user.email = request.body.email;
            user.password = await bcrypt.hash(request.body.password, saltRounds);
            user.loginToken = (await promisify(randomBytes)(64)).toString('hex');

            await getConnection().getRepository(User).save(user);

            return {
                status: "signin success"
            };
        }
    });
}