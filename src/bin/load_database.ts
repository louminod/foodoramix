import {Recipe} from "../entity/Recipe"
import {Ingredient} from "../entity/Ingredient"
import {Instruction} from "../entity/Instruction"
import {getConnection} from "typeorm"
import * as data from "../resources/data.json"
import {initConnection} from "../lib/typeorm"
import {User} from "../entity/User";
import * as bcrypt from "bcrypt";

async function run() {
    await initConnection();

    const recipeRepository = getConnection().getRepository(Recipe);
    const ingredientRepository = getConnection().getRepository(Ingredient);
    const instructionRepository = getConnection().getRepository(Instruction);

    for (let i = 0; i < data.recipes.length; i++) {
        const recipe = new Recipe();
        recipe.id_recipe = data.recipes[i].id;
        recipe.title = data.recipes[i].title;
        recipe.url = data.recipes[i].url;
        recipe.ingredients = [];
        recipe.instructions = [];

        for (let j = 0; j < data.recipes[i].ingredients.length; j++) {
            let ingredient = new Ingredient();
            ingredient.text = data.recipes[i].ingredients[j].text;
            ingredient = await ingredientRepository.save(ingredient);
            recipe.ingredients.push(ingredient);
        }

        for (let j = 0; j < data.recipes[i].instructions.length; j++) {
            let instruction = new Instruction();
            instruction.text = data.recipes[i].instructions[j].text;
            instruction = await instructionRepository.save(instruction);
            recipe.instructions.push(instruction);
        }

        await recipeRepository.save(recipe);
    }
    const user = new User();
    user.email = "bob@gmail.com";
    user.password = await bcrypt.hash("azerty", 10);
    await getConnection().getRepository(User).save(user);

    console.log("Loading done !")
}

run().catch(console.error)