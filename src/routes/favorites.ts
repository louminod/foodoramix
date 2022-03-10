import {FastifyInstance} from "fastify";
import * as responseSchema from '../schemas/json/response.json'
import * as recipeSchema from '../schemas/json/recipeSchema.json'
import * as favoriteDeleteParamSchema from '../schemas/json/favorite.delete.params.json'
import * as favoriteCreateBodySchema from '../schemas/json/favorite.create.body.json'
import {isAuthorized} from "../security/secure";
import {canDeleteFavorite, canGetFavorites, canPostFavorites} from "../security/secure-favorite";
import {getRepository} from "typeorm";
import {Favorite} from "../entity/Favorite";
import {Recipe} from "../entity/Recipe";
import {FavoriteDelete} from "../schemas/types/favorite.delete.params";
import {FavoriteCreate} from "../schemas/types/favorite.create.body";

export async function favoritesRoutes(fastify: FastifyInstance) {

    fastify.route({
        method: 'GET',
        url: '/',
        schema: {
            description: 'get user favorites',
            tags: ['favorite'],
            response: {200: recipeSchema}
        },
        preHandler: async function (request) {
            await isAuthorized(canGetFavorites, request.session, null);
        },
        handler: async function (request, reply): Promise<Favorite> {
            const favorites = await getRepository(Favorite).find({user: request.session!.user});
            const favoriteRecipes: Recipe[] = [];
            favorites.forEach(favorite => favoriteRecipes.push(favorite.recipe));
            return reply.code(200).send(JSON.stringify(favoriteRecipes));
        }
    });

    fastify.route<{ Body: FavoriteCreate }>({
        method: 'POST',
        url: '/',
        schema: {
            description: 'add recipe to favorites',
            tags: ['favorite'],
            body: favoriteCreateBodySchema,
            response: {200: responseSchema}
        },
        preHandler: async function (request, reply) {
            await isAuthorized(canPostFavorites, request.session, null);
        },
        handler: async function (request, reply): Promise<Favorite> {
            let favorite = new Favorite();
            favorite.user = request.session!.user;
            favorite.recipe = await getRepository(Recipe).findOneOrFail({id_recipe: request.body.recipe_id});
            favorite = await getRepository(Favorite).save(favorite);
            return reply.code(200).send(JSON.stringify(favorite));
        }
    });

    fastify.route<{ Params: FavoriteDelete }>({
        method: 'DELETE',
        url: '/:recipe_id',
        schema: {
            description: 'remove recipe from favorites',
            tags: ['favorite'],
            params: favoriteDeleteParamSchema,
            response: {200: responseSchema}
        },
        preHandler: async function (request, reply): Promise<any> {
            const recipe = await getRepository(Recipe).findOneOrFail(request.params.recipe_id);
            const favorite = await getRepository(Favorite).findOneOrFail({user: request.session!.user, recipe: recipe});
            await isAuthorized(canDeleteFavorite, request.session, favorite);
        },
        handler: async function (request, reply): Promise<any> {
            const recipe = await getRepository(Recipe).findOneOrFail(request.params.recipe_id);
            const favorite = await getRepository(Favorite).findOneOrFail({user: request.session!.user, recipe: recipe});
            await getRepository(Favorite).delete(favorite);
            return reply.code(200).send(JSON.stringify({
                status: "favorite deleted"
            }));
        }
    })
}