import {expect} from "chai";
import {canPatchRecipe, canPostRecipe} from "../../security/secure-recipe";
import {UnLoggedError} from "../../security/errors/secureError";

describe('secure-recipe', function () {
    describe('#canPostRecipe', function () {
        it("shouldn't allow post a recipe", async function () {
            try {
                await canPostRecipe(null, null);
            } catch (error) {
                expect(error).to.be.an.instanceof(UnLoggedError)
            }
        });
    });
    describe('#canPatchRecipe', function () {
        it("shouldn't allow patch a recipe", async function () {
            try {
                await canPatchRecipe(null, null);
            } catch (error) {
                expect(error).to.be.an.instanceof(UnLoggedError)
            }
        });
    });
});
