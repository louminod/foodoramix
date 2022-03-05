import {SecureAction} from "./secure";
import {createQueryBuilder} from 'typeorm'
import {UnLoggedError} from "./errors/secureError";
import {User} from "../entity/User";
import {Session} from "../entity/Session";

export const canLoadAccount: SecureAction<User> = async function canLoadAccount(session) {
    if (!session) throw new UnLoggedError()
    return true
}

export function userSecureScope(session: Session) {
    return createQueryBuilder(User)
        .where('loginToken = :loginToken AND id = :id', {loginToken: session.id, id: session.user.id});
}