import {fastify} from "../../lib/fastify";
import {expect} from "chai";
import {getCookie} from "../test-helper";

describe('/favorites', function () {
    describe('#get', function () {
        it('should not be able to get a favorite if not connected', async function () {
            const response = await fastify.inject({method: 'GET', url: '/favorites'});
            expect(response.statusCode).to.eq(422);
        });
        it('should get a favorite', async function () {
            const response = await fastify.inject({method: 'GET', url: '/favorites', cookies: await getCookie()});
            expect(response.statusCode).to.eq(200);
        });
    });
    describe('#post', function () {
        it('should not be able to post a favorite if not connected', async function () {
            const response = await fastify.inject({
                method: 'POST', url: '/favorites', payload: {
                    "recipe_id": "0000973574"
                }
            });
            expect(response.statusCode).to.eq(422);
        });
        it('should post a favorite', async function () {
            const response = await fastify.inject({
                method: 'POST', url: '/favorites', payload: {
                    "recipe_id": "0000973574"
                }, cookies: await getCookie()
            });
            expect(response.statusCode).to.eq(200);
        });
    });
    describe('#delete', function () {
        it('should not be able to delete a favorite if not connected', async function () {
            const response = await fastify.inject({method: 'DELETE', url: '/favorites/0000973574'});
            expect(response.statusCode).to.eq(500);
        });
        it('should delete a favorite', async function () {
            const response = await fastify.inject({
                method: 'DELETE',
                url: '/favorites/0000973574',
                cookies: await getCookie()
            });
            expect(response.statusCode).to.eq(200);
        });
    });
});
