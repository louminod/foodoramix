import {FastifyInstance, FastifyRequest} from "fastify";
import * as recipeSchema from '../schemas/json/recipes/recipe.json'
import * as responseSchema from '../schemas/json/response.json'
import {Recipe} from "../schemas/types/recipes/recipe";
import * as recipeShowParamsSchema from '../schemas/json/recipes/recipe.show.params.json'
import {RecipesShowParams} from "../schemas/types/recipes/recipes.show.params";
import { initConnection } from '../lib/typeorm'
import { getConnection } from 'typeorm'

export async function recipesRoutes(fastify: FastifyInstance) {
    /**
     * Function to get the list of recipes.
     * @return {json} Return the list of recipes as a json.
     */
    fastify.route({
        method: 'GET',
        url: '/',
        schema: {
            response: {200: recipeSchema}
        },
        handler: async function (request, reply): Promise<Recipe> {
            await initConnection();
            const conn = getConnection();
            let results = await conn.query('SELECT * FROM recipes LIMIT 20;');
            console.log(results);
            await conn.close();
            return reply.send("Get all recipes");
        }
    });

    /**
     * Function to post a recipe.
     * @param {json} recipe - The recipe to post.
     * @return {json} Return a response corresponding to success or not.
     */
    fastify.route<{ Params: Recipe }>({
        method: 'POST',
        url: '/',
        schema: {
            params: recipeSchema,
            response: {200: responseSchema}
        },
        handler: async function (request, reply): Promise<Recipe> {
            return reply.send("Post a recipe");
        }
    });

    /**
     * Function to get a recipe by is id.
     * @param {number} id - The id of the recipe.
     * @return {json} Return the recipe as a json.
     */
    fastify.route<{ Params: RecipesShowParams }>({
        method: 'GET',
        url: '/:id',
        schema: {
            params: recipeShowParamsSchema,
            response: {200: recipeSchema}
        },
        handler: async function (request, reply): Promise<Recipe> {
            await initConnection();
            const conn = getConnection();
            let results = await conn.query('SELECT * FROM recipes WHERE recipes.id_recipe = ?;', [request.params.id.toString()]);
            //console.log(results);
            await conn.close();
            return reply.send("Get recipe with id n°".concat(request.params.id.toString()))
        }
    })

    /**
     * Function to patch a recipe.
     * @param {number} id - The id of the recipe.
     * @return {json} Return a response corresponding to success or not.
     */
    fastify.route<{ Params: Recipe }>({
        method: 'PATCH',
        url: '/:id',
        schema: {
            params: recipeSchema,
            response: {200: recipeSchema}
        },
        handler: async function (request, reply): Promise<Recipe> {
            return reply.send("Patch a recipe with id n°".concat(request.params.id.toString()))
        }
    })
}