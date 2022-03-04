import {SwaggerOptions} from "fastify-swagger";
import {DATABASE_HOST} from "./dotenv";

export const swaggerConfig: SwaggerOptions = {
    routePrefix: '/documentation',
    swagger: {
        info: {
            title: 'Foodoramix documentation',
            description: 'Documentation for the foodoramix API',
            version: '0.1.0'
        },
        host: DATABASE_HOST,
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
        tags: [
            {name: 'account', description: 'User account related end-points'}
        ],
        definitions: {
            User: {
                type: 'object',
                required: ['id', 'email', 'password'],
                properties: {
                    id: {type: 'int'},
                    email: {type: 'string', format: 'email'},
                    password: {type: 'string'},
                }
            }
        },
        securityDefinitions: {
            apiKey: {
                type: 'apiKey',
                name: 'apiKey',
                in: 'header'
            }
        }
    },
    uiConfig: {
        docExpansion: 'full',
        deepLinking: false
    },
    uiHooks: {
        onRequest: function (request, reply, next) {
            next()
        },
        preHandler: function (request, reply, next) {
            next()
        }
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    exposeRoute: true
}