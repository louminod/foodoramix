import {FastifyInstance, FastifyRequest} from "fastify";
import * as recipeSchema from '../schemas/json/recipeSchema.json'
import * as responseSchema from '../schemas/json/response.json'
import {RecipeSchema} from "../schemas/types/recipeSchema";
import * as recipeShowParamsSchema from '../schemas/json/recipe.show.params.json'
import * as recipeFindBodySchema from '../schemas/json/recipe.find.body.json'
import {RecipeShow} from "../schemas/types/recipe.show.params";
import {Any, getConnection, ILike, In, Like} from 'typeorm'
import {Recipe} from "../entity/Recipe";
import {Ingredient} from "../entity/Ingredient";
import {Instruction} from "../entity/Instruction";
import {uid} from 'uid';
import {isAuthorized} from "../security/secure";
import {canPatchRecipe, canPostRecipe} from "../security/secure-recipe";
import {RecipeFind} from "../schemas/types/recipe.find.body";

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
            recipes.forEach(recipe => {
                recipe.user = undefined;
            });
            return reply.code(200).send(JSON.stringify(recipes, null, '\t'));
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
        preHandler: async function (request) {
            await isAuthorized(canPostRecipe, request.session, null);
        },
        handler: async function (request, reply): Promise<RecipeSchema> {
            const recipe = new Recipe();
            recipe.id_recipe = uid();
            recipe.title = request.body.title;
            recipe.url = request.body.url;
            recipe.ingredients = [];
            recipe.instructions = [];
            recipe.user = request.session!.user;
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
            recipe.user = undefined;
            return reply.code(200).send(JSON.stringify(recipe, null, '\t'));
        }
    });

    /**
     * Function to get a recipe by is id.
     * @param {string} id - The id of the recipe.
     * @return {json} Return the recipe as a json.
     */
    fastify.route<{ Params: RecipeShow }>({
        method: 'GET',
        url: '/:id_recipe',
        schema: {
            params: recipeShowParamsSchema,
            response: {200: recipeSchema},
            description: 'get a specific recipe',
            tags: ['recipe'],
        },
        handler: async function (request, reply): Promise<RecipeSchema> {
            const recipe = await getConnection().getRepository(Recipe).findOneOrFail({id_recipe: request.params.id_recipe});
            recipe.user = undefined;
            return reply.code(200).send(JSON.stringify(recipe, null, '\t'));
        }
    });

    /**
     * Function to get a recipe by is id.
     * @param {string} id - The id of the recipe.
     * @return {json} Return the recipe as a json.
     */
    fastify.route<{ Body: RecipeFind }>({
        method: 'POST',
        url: '/find',
        schema: {
            body: recipeFindBodySchema,
            description: 'find recipes matching given ingredients',
            tags: ['recipe'],
        },
        handler: async function (request, reply): Promise<RecipeSchema> {
            const requestedIngredients: string[] = [];
            request.body.ingredients.forEach(ingredient => {
                requestedIngredients.push("%" + String(ingredient["text"]) + "%");
            });
            const ingredients: Ingredient[] = [];
            for (const ingredient of requestedIngredients) {
                const i = await getConnection().getRepository(Ingredient).find({
                    where: {
                        text: Like(ingredient)
                    }
                });

                i.forEach(ing => {
                    ingredients.push(ing);
                });
            }

            const ingredientsIds: number[] = [];

            ingredients.forEach(ingredient => ingredientsIds.push(ingredient.id_ingredient));

            const recipe_ingredient = await getConnection().query("select * from recipe_ingredients_ingredient") as {
                recipeIdRecipe: string,
                ingredientIdIngredient: number
            }[];

            const recipesIds: Set<number> = new Set();
            recipe_ingredient.forEach((data: { [x: string]: unknown; }) => {
                if (ingredientsIds.includes(<number>data["ingredientIdIngredient"])) {
                    recipesIds.add(data["recipeIdRecipe"] as number)
                }
            });

            const recipes = await getConnection().getRepository(Recipe).find({
                where: {
                    id_recipe: In(Array.from(recipesIds.keys()))
                }
            });

            return reply.code(200).send(JSON.stringify(recipes, null, '\t'));
        }
    });

    /**
     * Function to patch a recipe.
     * @param {string} id - The id of the recipe.
     * @return {json} Return a response corresponding to success or not.
     */
    fastify.route<{ Params: RecipeShow, Body: RecipeSchema }>({
        method: 'PATCH',
        url: '/:id_recipe',
        schema: {
            params: recipeShowParamsSchema,
            body: recipeSchema,
            response: {200: recipeSchema},
            description: 'patch a recipe',
            tags: ['recipe'],
        },
        preHandler: async function (request) {
            await isAuthorized(canPatchRecipe, request.session, null);
        },
        handler: async function (request, reply): Promise<RecipeSchema> {
            const recipe = await getConnection().getRepository(Recipe).findOneOrFail({id_recipe: request.params.id_recipe});

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

            if (recipe.user === null || recipe.user!.id !== request.session!.userId) {
                recipe.id_recipe = uid();
                recipe.user = request.session!.user;
            }
            await getConnection().getRepository(Recipe).save(recipe);

            recipe.user = undefined;

            return reply.code(200).send(JSON.stringify(recipe, null, '\t'))
        }
    });
}