import { expect } from "chai";
import { Session } from "../../entity/Session";
import { User } from "../../entity/User";

describe('Session', function () {
    describe('#createSession', function () {
        it('should create the expected session', async function () {
            const session = new Session();
            session.id = "test session id";
            const user = new User();
            user.email = "test email";
            user.loginToken = "test login token";
            user.password = "test password";
            session.user = user;
            session.userId = 25295;

            expect(session.id).to.eq("test session id");
            expect(session.user.email).to.eq("test email");
            expect(session.user.password).to.eq("test password");
            expect(session.user.loginToken).to.eq("test login token");
            expect(session.userId).to.eq(25295);
        })
    })
})