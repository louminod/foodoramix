import {FastifyInstance, FastifyRequest} from "fastify";
import * as recipeSchema from '../schemas/json/recipeSchema.json'
import * as responseSchema from '../schemas/json/response.json'
import {RecipeSchema} from "../schemas/types/recipeSchema";
import * as recipeShowParamsSchema from '../schemas/json/recipe.show.params.json'
import {RecipeShow} from "../schemas/types/recipe.show.params";
import { getConnection } from 'typeorm'
import { Recipe } from "../entity/Recipe";

export async function recipesRoutes(fastify: FastifyInstance) {
    /**
     * Function to get the list of recipes.
     * @return {json} Return the list of recipes as a json.
     */
    fastify.route({
        method: 'GET',
        url: '/',
        handler: async function (request, reply): Promise<RecipeSchema> {
            const recipes = await getConnection().getRepository(Recipe).find();
            return reply.send(JSON.stringify(recipes, null, '\t'));
        }
    });

    /**
     * Function to post a recipe.
     * @param {json} recipe - The recipe to post.
     * @return {json} Return a response corresponding to success or not.
     */
    fastify.route<{ Params: RecipeSchema }>({
        method: 'POST',
        url: '/',
        schema: {
            params: recipeSchema,
            response: {200: responseSchema}
        },
        handler: async function (request, reply): Promise<RecipeSchema> {
            /*
            const recipe = new Recipe();
            recipe.id_recipe = request.params.id;
            recipe.title = request.params.title;
            recipe.url = request.params.url;
            await getConnection().getRepository(Recipe).save(recipe);
            */
            return reply.send("Post a recipe");
        }
    });

    /**
     * Function to get a recipe by is id.
     * @param {number} id - The id of the recipe.
     * @return {json} Return the recipe as a json.
     */
    fastify.route<{ Params: RecipeShow }>({
        method: 'GET',
        url: '/:id',
        schema: {
            params: recipeShowParamsSchema,
            response: {200: recipeSchema}
        },
        handler: async function (request, reply): Promise<RecipeSchema> {
            /*
            const recipes = await getConnection().getRepository(Recipe).find({ id_recipe: request.params.id});
            */
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