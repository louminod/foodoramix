import fastifyFactory from 'fastify';
import cookie, {FastifyCookieOptions} from 'fastify-cookie';
import {recipesRoutes} from '../routes/recipes';
import {favoritesRoutes} from '../routes/favorites';
import {accountRoutes} from '../routes/account';
import {COOKIE_SECRET} from "../lib/dotenv";
import {loadSession} from "./session";
import {UnauthorizedError} from "../security/errors/secureError";
import {EntityNotFoundError} from "typeorm";
import fastifyMultipart from 'fastify-multipart';

export const fastify = fastifyFactory({logger: process.env.NODE_ENV !== 'test'})
    .register(fastifyMultipart)
    .register(cookie, {secret: COOKIE_SECRET} as FastifyCookieOptions)
    .decorateRequest('session', null)
    .addHook('preHandler', loadSession)
    .register(recipesRoutes, {prefix: '/recipes'})
    .register(favoritesRoutes, {prefix: '/favorites'})
    .register(accountRoutes, {prefix: '/account'})
    .setErrorHandler((error, request, reply) => {
        if (error instanceof UnauthorizedError) {
            void reply.status(422).send(error)
        } else if (error instanceof EntityNotFoundError) {
            reply.log.info({res: reply, err: error}, error?.message)
            void reply.status(404).send(new Error('Requested entity not found'))
        } else if (reply.statusCode < 500) {
            reply.log.info({res: reply, err: error}, error?.message)
            void reply.send(error)
        } else {
            reply.log.error({req: request, res: reply, err: error}, error?.message)
            void reply.send(new Error('Internal Server Error, message dropped'))
        }
    })
