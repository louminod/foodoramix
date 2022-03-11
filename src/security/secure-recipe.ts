import {SecureAction} from "./secure";
import {UnLoggedError} from "./errors/secureError";
import {Favorite} from "../entity/Favorite";

export const canPostRecipe: SecureAction<Favorite> = async function canPostRecipe(session) {
    if (!session) throw new UnLoggedError()
    return true
}

export const canPatchRecipe: SecureAction<Favorite> = async function canPatchRecipe(session) {
    if (!session) throw new UnLoggedError()
    return true
}