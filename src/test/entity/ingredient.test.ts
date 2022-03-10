import { expect } from "chai";
import { Ingredient } from "../../entity/Ingredient"

describe('Ingredient', function () {
    describe('#createIngredient', function () {
        it('should create the expected ingredient', async function () {
            const ingredient = new Ingredient();
            ingredient.text = "test text ingredient"; 
            expect(ingredient.text).to.eq("test text ingredient");
        })
    })
})