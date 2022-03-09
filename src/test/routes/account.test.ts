import { expect } from "chai";
import { getConnection } from "typeorm";
import { Session } from "../../entity/Session";
import { User } from "../../entity/User";

/*
describe('Session', function () {
    describe('#createSession', function () {
        it('should create the expected session in database', async function () {
            const session = new Session();
            session.id = "test session id";
            const user = new User();
            user.email = "test email";
            user.loginToken = "test login token";
            user.password = "test password";
            session.user = user;
            await getConnection().getRepository(User).save(user);
            session.userId = user.id;

            await getConnection().getRepository(Session).save(session);
            const storedSession = await getConnection().getRepository(Session).findOne({id: session.id});
            await getConnection().getRepository(Session).remove(session);
            expect(storedSession?.id).to.eq("test session id");
            expect(storedSession?.user.email).to.eq("test email");
            expect(storedSession?.user.password).to.eq("test password");
            expect(storedSession?.user.loginToken).to.eq("test login token");
            expect(storedSession?.userId).to.eq(session.userId);
        })
    })
})

describe('User', function () {
    describe('#createUser', function () {
        it('should create the expected user in database', async function () {
            const user = new User();
            user.email = "test email";
            user.loginToken = "test login token";
            user.password = "test password";

            await getConnection().getRepository(User).save(user);
            const storedUser = await getConnection().getRepository(User).findOne({id: user.id});
            await getConnection().getRepository(User).remove(user);
            expect(storedUser?.email).to.eq("test email");
            expect(storedUser?.loginToken).to.eq("test login token");
            expect(storedUser?.password).to.eq("test password");
        })
    })
})
*/