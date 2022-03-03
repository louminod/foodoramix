import {SecureAction} from "./secure";
import {Recipe} from "../entity/recipe";
import {UnLoggedError} from "./errors/secureError";

export const canListRecipes: SecureAction<Recipe> = async function canListRecipes(session) {
    if (!session) throw new UnLoggedError()
    return true
}