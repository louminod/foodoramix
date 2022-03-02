import { config } from 'dotenv'
config()

export const DATABASE_HOST = getOrThrow('DATABASE_HOST')
export const DATABASE_PORT = parseInt(getOrThrow('DATABASE_PORT'), 10)
export const DATABASE_USER = getOrThrow('DATABASE_USER')
export const DATABASE_PASS = getOrThrow('DATABASE_PASS')
export const DATABASE_NAME = getOrThrow('DATABASE_NAME')

function getOrThrow(name: string) {
    const val = process.env[name]
    if (typeof val === 'undefined') throw new Error(`Missing mandatory environment variable ${name}`)
    return val
  }