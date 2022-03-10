import { expect } from "chai";
import { Favorite } from "../../entity/Favorite"
import { Ingredient } from "../../entity/Ingredient";
import { Instruction } from "../../entity/Instruction";
import { Recipe } from "../../entity/Recipe";
import { User } from "../../entity/User";

describe('Favorite', function () {
    describe('#createFavorite', function () {
        it('should create the expected favorite', async function () {
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

            const user = new User();
            user.email = "test email";
            user.loginToken = "test login token";
            user.password = "test password";
            
            const favorite = new Favorite();
            favorite.recipe = recipe;
            favorite.user = user;

            expect(favorite.recipe.id_recipe).to.eq("djf58j@s#c!d");
            expect(favorite.recipe.title).to.eq("test Title");
            expect(favorite.recipe.url).to.eq("test URL");
            expect(favorite.recipe.ingredients.length).to.eq(1);
            expect(favorite.recipe.ingredients[0].text).to.eq("test text ingredient");
            expect(favorite.recipe.instructions.length).to.eq(2);
            expect(favorite.recipe.instructions[1].text).to.eq("test text instruction 2");
            expect(favorite.user.email).to.eq("test email");
            expect(favorite.user.loginToken).to.eq("test login token");
            expect(favorite.user.password).to.eq("test password");
        })
    })
})