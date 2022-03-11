import {FastifyInstance} from "fastify";
import * as recipeSchema from "../schemas/json/recipeSchema.json";
import {isAuthorized} from "../security/secure";
import {canGetFavorites} from "../security/secure-favorite";
import {Favorite} from "../entity/Favorite";
import {getRepository} from "typeorm";
import {Recipe} from "../entity/Recipe";

export async function homeRoutes(fastify: FastifyInstance) {
    fastify.route({
        method: 'GET',
        url: '/',
        handler: async function (request, reply): Promise<Favorite> {
            return reply.code(200).send("Welcome to Foodoramix !");
        }
    });
}