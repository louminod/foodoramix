import {expect} from "chai";
import {UnLoggedError} from "../../security/errors/secureError";
import {canDeleteFavorite, canGetFavorites, canPostFavorites} from "../../security/secure-favorite";
import {Favorite} from "../../entity/Favorite";
import {User} from "../../entity/User";

describe('secure-account', function () {
    describe('#canGetFavorites', function () {
        it("shouldn't allow get a favorite", async function () {
            try {
                await canGetFavorites(null, null);
            } catch (error) {
                expect(error).to.be.an.instanceof(UnLoggedError)
            }
        });
    });
    describe('#canDeleteFavorite', function () {
        it("shouldn't allow delete a favorite", async function () {
            try {
                const user = new User();
                user.id = 1;
                const favorite = new Favorite();
                favorite.user = user;
                await canDeleteFavorite(null, favorite);
            } catch (error) {
                expect(error).to.be.an.instanceof(UnLoggedError)
            }
        });
    });
    describe('#canPostFavorites', function () {
        it("shouldn't allow post a favorite", async function () {
            try {
                await canPostFavorites(null, null);
            } catch (error) {
                expect(error).to.be.an.instanceof(UnLoggedError)
            }
        });
    });
});
