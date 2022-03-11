import {COOKIE_NAME} from "../lib/dotenv";
import {Session} from "../entity/Session";
import {initConnection} from "../lib/typeorm";
import {getRepository} from "typeorm";

before(async function () {
    await initConnection();
})

export async function getCookie() {
    const session = new Session();
    session.id = "SVlQ9W7KbP8Fliqj7TorSVI1hw/dX9wgtWIl93vdvMtj1aM0p8lDfQepNoht0kjPHHU7T9QmedhK//N88pkshQ==";
    session.userId = 1;
    await getRepository(Session).save(session);
    return {
        [COOKIE_NAME]: session.id
    };
}