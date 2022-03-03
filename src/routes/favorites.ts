import {FastifyInstance, FastifyRequest} from "fastify";
import * as responseSchema from '../schemas/json/response.json'
import * as favoriteSchema from '../schemas/json/favorite.json'
import * as favoriteShowParamSchema from '../schemas/json/favorite.show.params.json'
import * as favoriteDeleteParamSchema from '../schemas/json/favorite.delete.params.json'
import {Favorite} from "../schemas/types/favorite";
import {FavoriteShow} from "../schemas/types/favorite.show.params";

export async function favoritesRoutes(fastify: FastifyInstance) {
    /**
     * Function to get the list of recipes.
     * @return {json} Return the list of recipes as a json.
     */
    fastify.route({
        method: 'GET',
        url: '/',
        schema: {
            response: {200: favoriteSchema}
        },
        handler: async function (request, reply): Promise<Favorite> {
            return reply.send("Get all user favorites");
        }
    });

    /**
     * Function to post a recipe.
     * @param {json} recipe - The recipe to post.
     * @return {json} Return a response corresponding to success or not.
     */
    fastify.route<{ Params: Favorite }>({
        method: 'POST',
        url: '/',
        schema: {
            params: favoriteSchema,
            response: {200: responseSchema}
        },
        handler: async function (request, reply): Promise<Favorite> {
            return reply.send("Post a favorite");
        }
    });

    /**
     * Function to get a recipe by is id.
     * @param {number} id - The id of the recipe.
     * @return {json} Return the recipe as a json.
     */
    fastify.route<{ Params: FavoriteShow }>({
        method: 'GET',
        url: '/:id',
        schema: {
            params: favoriteShowParamSchema,
            response: {200: favoriteSchema}
        },
        handler: async function (request, reply): Promise<Favorite> {
            return reply.send("Get favorite with id n°".concat(request.params.id.toString()))
        }
    })

    /**
     * Function to patch a recipe.
     * @param {number} id - The id of the recipe.
     * @return {json} Return a response corresponding to success or not.
     */
    fastify.route<{ Params: Favorite }>({
        method: 'PATCH',
        url: '/:id',
        schema: {
            params: favoriteSchema,
            response: {200: favoriteSchema}
        },
        handler: async function (request, reply): Promise<Favorite> {
            return reply.send("Patch a favorite with id n°".concat(request.params.id.toString()))
        }
    })

    /**
     * Function to patch a recipe.
     * @param {number} id - The id of the recipe.
     * @return {json} Return a response corresponding to success or not.
     */
    fastify.route<{ Params: Favorite }>({
        method: 'DELETE',
        url: '/:id',
        schema: {
            params: favoriteDeleteParamSchema,
            response: {200: responseSchema}
        },
        handler: async function (request, reply): Promise<Favorite> {
            return reply.send("Delete a recipe with id n°".concat(request.params.id.toString()))
        }
    })
}