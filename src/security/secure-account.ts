import {SecureAction} from "./secure";
import {createQueryBuilder} from 'typeorm'
import {UnLoggedError} from "./errors/secureError";
import {User} from "../entity/user";
import {Session} from "../entity/session";

export const canLoadAccount: SecureAction<User> = async function canLoadAccount(session) {
    if (!session) throw new UnLoggedError()
    return true
}

export function userPolicyScope(session: Session) {
    return createQueryBuilder(User)
        .where('loginToken = :loginToken AND id = :id', {loginToken: session.id, id: session.user.id});
}