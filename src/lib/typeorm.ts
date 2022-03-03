import 'reflect-metadata'
import {createConnection} from 'typeorm'
import {
    DATABASE_HOST,
    DATABASE_LOGGING,
    DATABASE_NAME,
    DATABASE_PASS,
    DATABASE_PORT,
    DATABASE_SYNC,
    DATABASE_USER
} from './dotenv'
import {User} from "../entity/user";
import {Session} from "../entity/session";

export function initConnection() {
    return createConnection({
        type: 'mysql',
        host: DATABASE_HOST,
        port: DATABASE_PORT,
        username: DATABASE_USER,
        password: DATABASE_PASS,
        database: DATABASE_NAME,
        entities: [User, Session],
        synchronize: DATABASE_SYNC,
        logging: DATABASE_LOGGING,
        multipleStatements: true
    })
}
