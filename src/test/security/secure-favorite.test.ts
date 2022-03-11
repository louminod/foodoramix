import {expect} from "chai";
import {UnLoggedError} from "../../security/errors/secureError";
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
