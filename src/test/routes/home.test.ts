import {fastify} from "../../lib/fastify";
import {expect} from "chai";

describe('/', function () {
    describe('#home', function () {
        it('should return the welcome message', async function () {
            const response = await fastify.inject({method: 'GET', url: '/'});
            expect(response.statusCode).to.eq(200);
            expect(response.body).to.eq("Welcome to Foodoramix !");
        });
    });
});
