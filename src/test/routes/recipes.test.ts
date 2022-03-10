import { expect } from "chai";
import { getConnection } from "typeorm";
import { Ingredient } from "../../entity/Ingredient";
import { Instruction } from "../../entity/Instruction";
import { Recipe } from "../../entity/Recipe";
import { initConnection } from "../../lib/typeorm";
import { fastify } from "../../lib/fastify";
import { RecipeSchema } from "../../schemas/types/recipeSchema";

describe('Recipes', function () {
    describe('#post', function () {
        it('should not be able to create a recipe in database if not connected', async function () {
            const payload: RecipeSchema = {
                "title": "Magic",
                "url": "http://www.food.com/recipe/cool-n-easy-creamy-watermelon-pie-66340",
                "ingredients": [
                    {
                        "text": "1 (3 ounce) package watermelon gelatin"
                    },
                    {
                        "text": "14 cup boiling water"
                    },
                    {
                        "text": "1 (12 ounce) package Cool Whip, thawed"
                    },
                    {
                        "text": "2 cups cubed seedless watermelon"
                    },
                    {
                        "text": "1 graham cracker crust"
                    }
                ],
                "instructions": [
                    {
                        "text": "Dissolve Jello in boiling water."
                    },
                    {
                        "text": "Allow to cool to room temp."
                    },
                    {
                        "text": "Whisk in Cool Whip."
                    },
                    {
                        "text": "Fold in watermelon."
                    },
                    {
                        "text": "Spoon into crust."
                    },
                    {
                        "text": "Chill for 2-3 hours or overnight."
                    },
                    {
                        "text": "Yum!"
                    }
                ]
            }
            const response = await fastify.inject({ method: 'POST', url: "recipes/", payload});
            expect(response.statusCode).to.eq(422);
            expect(response.json()).to.haveOwnProperty('message').equal('You are not logged in');
        })
    })
})