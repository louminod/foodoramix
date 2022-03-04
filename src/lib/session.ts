import {Session} from "../entity/Session";
import {FastifyReply, FastifyRequest} from "fastify";
import {COOKIE_HTTP_ONLY, COOKIE_MAX_AGE, COOKIE_NAME, COOKIE_SECURE, COOKIE_SIGNED} from "../lib/dotenv";
import {User} from "../entity/User";
import {randomBytes} from 'crypto'
import {promisify} from 'util'
import {getConnection} from "typeorm";

declare module 'fastify' {
    interface FastifyRequest {
        session?: Session
    }
}

export async function saveSession(reply: FastifyReply, user: User) {
    const id = (await promisify(randomBytes)(64)).toString('base64');

    user.loginToken = id;
    await getConnection().getRepository(User).update(user.id, user);

    const session = new Session();
    session.id = id;
    session.user = user;
    session.userId = user.id;

    await getConnection().getRepository(Session).save(session);

    void reply.setCookie(COOKIE_NAME, id, {
        signed: COOKIE_SIGNED,
        httpOnly: COOKIE_HTTP_ONLY,
        secure: COOKIE_SECURE,
        maxAge: COOKIE_MAX_AGE,
        path: '/'
    });
    return;
}

export async function loadSession(request: FastifyRequest) {
    if (!request.cookies[COOKIE_NAME]) return

    request.session = await getConnection().getRepository(Session).findOne(request.cookies[COOKIE_NAME])
}