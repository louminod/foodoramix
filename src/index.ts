import {fastify} from './lib/fastify'
import {FASTIFY_PORT} from "./env/dotenv";

fastify.listen(FASTIFY_PORT).catch(console.error)
