import { Recipe } from "../entity/Recipe"
import { Ingredient } from "../entity/Ingredient"
import { Instruction } from "../entity/Instruction"
import { RecipeIngredient } from "../entity/RecipeIngredient"
import { RecipeInstruction } from "../entity/RecipeInstruction"
import { getConnection } from "typeorm"
import * as data from "../resources/data.json"
import { initConnection } from "../lib/typeorm"

async function run() {
    await initConnection();
    
    const  recipeRepository = getConnection().getRepository(Recipe);
    const  ingredientRepository = getConnection().getRepository(Ingredient);
    const  instructionRepository = getConnection().getRepository(Instruction);
    const  recipeIngredientRepository = getConnection().getRepository(RecipeIngredient);
    const  recipeInstructionRepository = getConnection().getRepository(RecipeInstruction);

    let mapIngredients = new Map<string, number>();
    let mapInstructions = new Map<string, number>();

    for (let i = 0; i < data.recipes.length; i++) {
        const recipe = new Recipe();
        recipe.id_recipe = data.recipes[i].id;
        recipe.title = data.recipes[i].title;
        recipe.url = data.recipes[i].url;
        await recipeRepository.save(recipe);

        for (let j = 0; j < data.recipes[i].ingredients.length; j++) {
            const ingredientToAdd = data.recipes[i].ingredients[j].text;
            const recipeIngredient = new RecipeIngredient();
            recipeIngredient.id_recipe = data.recipes[i].id;
            if (!mapIngredients.has(ingredientToAdd)) {
                const ingredient = new Ingredient();
                ingredient.text = ingredientToAdd;
                await ingredientRepository.save(ingredient).then(ingredient => {
                    mapIngredients.set(ingredientToAdd, ingredient.id_ingredient);
                    recipeIngredient.id_ingredient = ingredient.id_ingredient;
                });  
            }
            else {
                recipeIngredient.id_ingredient = mapIngredients.get(ingredientToAdd);
            }
            await recipeIngredientRepository.save(recipeIngredient);
        }
        
        for (let j = 0; j < data.recipes[i].instructions.length; j++) {
            const instructionToAdd = data.recipes[i].instructions[j].text;
            const recipeInstruction = new RecipeInstruction();
            recipeInstruction.id_recipe = data.recipes[i].id;
            if (!mapInstructions.has(instructionToAdd)) {
                const instruction = new Instruction();
                instruction.text = instructionToAdd;
                await instructionRepository.save(instruction).then(instruction => {
                    mapInstructions.set(instructionToAdd, instruction.id_instruction);
                    recipeInstruction.id_instruction = instruction.id_instruction;
                });  
            }
            else {
                recipeInstruction.id_instruction = mapInstructions.get(instructionToAdd);
            }
            await recipeInstructionRepository.save(recipeInstruction);
        }
    }
}
run().catch(console.error)