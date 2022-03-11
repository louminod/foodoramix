import {expect} from "chai";
import {UnLoggedError} from "../../security/errors/secureError";
import {isAuthorized} from "../../security/secure";
import {canGetFavorites} from "../../security/secure-favorite";

describe('secure', function () {
    it("shouldn't allow", async function () {
        try {
            await isAuthorized(canGetFavorites, null, null);
        } catch (error) {
            expect(error).to.be.an.instanceof(UnLoggedError)
        }
    });
});
