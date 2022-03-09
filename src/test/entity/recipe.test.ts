import { expect } from "chai";
import { Ingredient } from "../../entity/Ingredient";
import { Instruction } from "../../entity/Instruction";
import { Recipe } from "../../entity/Recipe";

describe('Recipe', function () {
    describe('#createRecipe', function () {
        it('should create the expected recipe', async function () {
            const recipe = new Recipe();
            recipe.id_recipe = "djf58j@s#c!d";
            recipe.title = "test Title";
            recipe.url = "test URL";

            recipe.ingredients = [];
            const ingredient = new Ingredient();
            ingredient.text = "test text ingredient";
            recipe.ingredients.push(ingredient);

            recipe.instructions = [];
            const instruction1 = new Instruction();
            instruction1.text = "test text instruction 1";
            recipe.instructions.push(instruction1);
            const instruction2 = new Instruction();
            instruction2.text = "test text instruction 2";
            recipe.instructions.push(instruction2);

            expect(recipe.id_recipe).to.eq("djf58j@s#c!d");
            expect(recipe.title).to.eq("test Title");
            expect(recipe.url).to.eq("test URL");
            expect(recipe.instructions.length).to.eq(2);
            expect(recipe.instructions[1].text).to.eq("test text instruction 2");
            expect(recipe.ingredients.length).to.eq(1);
        })
    })
})