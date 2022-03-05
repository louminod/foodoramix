import {SecureAction} from "./secure";
import {NotAllowedError, UnLoggedError} from "./errors/secureError";
import {Favorite} from "../entity/Favorite";

export const canGetFavorites: SecureAction<Favorite> = async function canGetFavorites(session) {
    if (!session) throw new UnLoggedError()
    return true
}

export const canGetSingleFavorite: SecureAction<Favorite> = async function canGetSingleFavorite(session) {
    if (!session) throw new UnLoggedError()
    return true
}

export const canDeleteFavorite: SecureAction<Favorite> = async function canDeleteFavorite(session,record) {
    if (!session) throw new UnLoggedError()
    if (record?.user.id !== session.user.id) throw new NotAllowedError()
    return true
}

export const canPostFavorites: SecureAction<Favorite> = async function canPostFavorites(session) {
    if (!session) throw new UnLoggedError()
    return true
}