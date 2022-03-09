import { expect } from "chai";
import { User } from "../../entity/User";

describe('User', function () {
    describe('#createUser', function () {
        it('should create the expected user', async function () {
            const user = new User();
            user.email = "test email";
            user.loginToken = "test login token";
            user.password = "test password";

            expect(user.email).to.eq("test email");
            expect(user.loginToken).to.eq("test login token");
            expect(user.password).to.eq("test password");
        })
    })
})