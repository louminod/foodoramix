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
    },
    uiConfig: {
        docExpansion: 'full',
        deepLinking: false
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    exposeRoute: true
}