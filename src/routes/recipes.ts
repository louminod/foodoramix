import {FastifyInstance, FastifyRequest} from "fastify";
import * as recipeSchema from '../schemas/json/recipeSchema.json'
import * as responseSchema from '../schemas/json/response.json'
import {RecipeSchema} from "../schemas/types/recipeSchema";
import * as recipeShowParamsSchema from '../schemas/json/recipe.show.params.json'
import {RecipeShow} from "../schemas/types/recipe.show.params";
import { getConnection } from 'typeorm'
import { Recipe } from "../entity/Recipe";
import { Ingredient } from "../entity/Ingredient";
import { Instruction } from "../entity/Instruction";
import { uid } from 'uid';

export async function recipesRoutes(fastify: FastifyInstance) {
    /**
     * Function to get the list of recipes.
     * @return {json} Return the list of recipes as a json.
     */
    fastify.route({
        method: 'GET',
        url: '/',
        schema: {
            description: 'get all recipes',
            tags: ['recipe'],
        },
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
    fastify.route<{ Body: RecipeSchema }>({
        method: 'POST',
        url: '/',
        schema: {
            body: recipeSchema,
            response: {200: responseSchema},
            description: 'post a recipe',
            tags: ['recipe'],
        },
        handler: async function (request, reply): Promise<RecipeSchema> {
            const recipe = new Recipe();
            recipe.id_recipe = uid();
            recipe.title = request.body.title;
            recipe.url = request.body.url;
            recipe.ingredients = [];
            recipe.instructions = [];
            for (let i = 0; i < request.body.ingredients.length; i++) {
                const ingredient = new Ingredient();
                ingredient.text = request.body.ingredients[i].text as string;
                await getConnection().getRepository(Ingredient).save(ingredient);
                recipe.ingredients.push(ingredient);
            }
            for (let i = 0; i < request.body.instructions.length; i++) {
                const instruction = new Instruction();
                instruction.text = request.body.instructions[i].text as string;
                await getConnection().getRepository(Instruction).save(instruction);
                recipe.instructions.push(instruction);
            }
            await getConnection().getRepository(Recipe).save(recipe);
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
            response: {200: recipeSchema},
            description: 'get a specific recipe',
            tags: ['recipe'],
        },
        handler: async function (request, reply): Promise<RecipeSchema> {
            const recipe = await getConnection().getRepository(Recipe).find({id_recipe: request.params.id.toString()});
            return reply.send(JSON.stringify(recipe, null, '\t'));
        }
    })

    /**
     * Function to patch a recipe.
     * @param {number} id - The id of the recipe.
     * @return {json} Return a response corresponding to success or not.
     */
    fastify.route<{ Params: RecipeSchema }>({
        method: 'PATCH',
        url: '/:id',
        schema: {
            params: recipeSchema,
            response: {200: recipeSchema},
            description: 'patch a recipe',
            tags: ['recipe'],
        },
        handler: async function (request, reply): Promise<RecipeSchema> {
            return reply.send("Patch a recipe with id n°".concat(request.params.id.toString()))
        }
    })
}