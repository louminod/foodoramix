import {expect} from "chai";
import {canPatchRecipe, canPostRecipe} from "../../security/secure-recipe";
import {UnLoggedError} from "../../security/errors/secureError";
import {canDeleteFavorite, canGetFavorites, canPostFavorites} from "../../security/secure-favorite";
import {Favorite} from "../../entity/Favorite";
import {User} from "../../entity/User";
import {canLoadAccount, canPatchAccount} from "../../security/secure-account";

describe('secure-favorite', function () {
    describe('#canLoadAccount', function () {
        it("shouldn't allow get an account", async function () {
            try {
                await canLoadAccount(null, null);
            } catch (error) {
                expect(error).to.be.an.instanceof(UnLoggedError)
            }
        });
    });
    describe('#canPatchAccount', function () {
        it("shouldn't allow patch an account", async function () {
            try {
                await canPatchAccount(null, null);
            } catch (error) {
                expect(error).to.be.an.instanceof(UnLoggedError)
            }
        });
    });
});
