import fastifyFactory from 'fastify'
import {recipesRoutes} from '../routes/recipes'
import {favoritesRoutes} from '../routes/favorites'
import {accountRoutes} from '../routes/account'

export const fastify = fastifyFactory({logger: process.env.NODE_ENV !== 'test'})
    .setErrorHandler(function defaultErrorHandler(error, request, reply) {
        if (reply.statusCode < 500) {
            reply.log.info(
                {res: reply, err: error},
                error && error.message
            )
            void reply.send(error)
        } else {
            void reply.send("An error occured")
        }
    })
    .register(recipesRoutes, {prefix: '/recipes'})
    .register(favoritesRoutes, {prefix: '/favorites'})
    .register(accountRoutes, {prefix: '/account'})
