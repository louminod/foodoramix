import { fastify } from './lib/fastify'
import { initConnection } from './lib/typeorm';
import { FASTIFY_PORT } from "./lib/dotenv";

async function run() {
    await initConnection()
    await fastify.listen(FASTIFY_PORT)
}
run().catch(console.error)
