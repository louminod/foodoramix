import {Session} from "../entity/session";
import {FastifyReply, FastifyRequest} from "fastify";
import {COOKIE_HTTP_ONLY, COOKIE_MAX_AGE, COOKIE_NAME, COOKIE_SECURE, COOKIE_SIGNED} from "../env/dotenv";
import {User} from "../entity/user";
import {randomBytes} from 'crypto'
import {promisify} from 'util'

declare module 'fastify' {
    interface FastifyRequest {
        session?: Session
    }
}

export async function saveSession(reply: FastifyReply, user: User) {
    const id = (await promisify(randomBytes)(64)).toString('base64')
    void reply.setCookie(COOKIE_NAME, id, {
        signed: COOKIE_SIGNED,
        httpOnly: COOKIE_HTTP_ONLY,
        secure: COOKIE_SECURE,
        maxAge: COOKIE_MAX_AGE,
        path: '/'
    })
    return;
}

export async function loadSession(request: FastifyRequest) {
    if (!request.cookies[COOKIE_NAME]) return

    const session = new Session()
    session.id = request.cookies[COOKIE_NAME]
    request.session = session
}