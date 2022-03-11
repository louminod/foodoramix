import {fastify} from "../../lib/fastify";
import {expect} from "chai";
import {User} from "../../entity/User";
import {UserSchema} from "../../schemas/types/userSchema";
import {AccountSignin} from "../../schemas/types/account.signin.body";
import {getConnection, getRepository} from "typeorm";

describe('/account', function () {
    describe('#signin', function () {
        it('should sign the user', async function () {
            try {
                await getConnection().getRepository(User).delete({email: "bob@gmail.com"});
            } catch (error) {
                // ignore if not exist
            }
            const payload: AccountSignin = {email: "bob@gmail.com", password: "password"}
            const response = await fastify.inject({method: 'POST', url: '/account/signin', payload});
            expect(response.statusCode).to.eq(200);
            expect(response.json()).to.haveOwnProperty('status').equals("signin success");
        });
    });
});
