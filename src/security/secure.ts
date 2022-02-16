import {UnauthorizedError} from "./errors/secureError";
import {Session} from "../entities/session";

export interface SecureAction<Model> {
    (currentSession: Session | null | undefined, record: Model | null): Promise<boolean | UnauthorizedError>
}

export async function isAuthorized<Model>(
    secureAction: SecureAction<Model>,
    currentSession: Session | null | undefined,
    record: Model | null
) {
    const result = await secureAction(currentSession, record)

    if (!result) throw new UnauthorizedError('You are not allowed to perform this action')

    if (result instanceof Error) throw result
    return true
}