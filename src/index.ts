import {fastify} from './lib/fastify';
import {FASTIFY_PORT} from "./lib/dotenv";
import {initConnection} from './lib/typeorm';

async function run() {
    await initConnection();
    await fastify.listen(FASTIFY_PORT);
}

run().catch(console.error);
