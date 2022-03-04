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
import {Recipe} from "../entity/Recipe";
import {Ingredient} from "../entity/Ingredient";
import {Instruction} from "../entity/Instruction";
import {RecipeIngredient} from "../entity/RecipeIngredient";
import {RecipeInstruction} from "../entity/RecipeInstruction";
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
        entities: [User, Session, Recipe, Ingredient, Instruction, RecipeIngredient, RecipeInstruction],
        synchronize: DATABASE_SYNC,
        logging: DATABASE_LOGGING,
        multipleStatements: true
    })
}
