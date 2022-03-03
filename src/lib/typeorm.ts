import 'reflect-metadata'
import {
    DATABASE_HOST,
    DATABASE_NAME,
    DATABASE_PASS,
    DATABASE_PORT,
    DATABASE_USER
} from './dotenv'
import {createConnection} from 'typeorm'
import {User} from '../entities/user'

export function initConnection() {
    return createConnection({
        type: 'mysql',
        host: DATABASE_HOST,
        port: DATABASE_PORT,
        username: DATABASE_USER,
        password: DATABASE_PASS,
        database: DATABASE_NAME,
        entities: [User],
    })
}