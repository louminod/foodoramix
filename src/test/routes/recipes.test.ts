import { expect } from "chai";
import { getConnection } from "typeorm";
import { Ingredient } from "../../entity/Ingredient";
import { Instruction } from "../../entity/Instruction";
import { Recipe } from "../../entity/Recipe";
import { initConnection } from "../../lib/typeorm";

/*
describe('Recipes', async function () {
    await initConnection();
    describe('#postRecipe', function () {
        it('should create the expected recipe in database', async function () {
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

            await getConnection().getRepository(Recipe).save(recipe);

            const storedRecipe = await getConnection().getRepository(Recipe).findOne({id_recipe: recipe.id_recipe});
            await getConnection().getRepository(Recipe).remove(recipe);
            expect(storedRecipe?.id_recipe).to.eq("djf58j@s#c!d");
            expect(storedRecipe?.title).to.eq("test Title");
            expect(storedRecipe?.url).to.eq("test URL");
            expect(storedRecipe?.instructions.length).to.eq(2);
            expect(storedRecipe?.instructions[1]).to.eq("test text instruction 2");
            expect(storedRecipe?.ingredients.length).to.eq(1);
        })
    })
})
*/