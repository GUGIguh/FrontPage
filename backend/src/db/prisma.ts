import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client.js'

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  throw new Error('DATABASE_URL is not set (expected in the root .env)')
}

// One client per process: each PrismaClient owns its own pg connection pool,
// so creating one per request would quickly exhaust Postgres connections.
export const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
})
