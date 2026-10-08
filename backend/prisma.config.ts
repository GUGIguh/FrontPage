import { config } from 'dotenv'
import { defineConfig, env } from 'prisma/config'

// The single .env lives in the repo root (docker-compose reads it too).
// Prisma 7 does not load .env by itself. The path is relative to the cwd,
// so run prisma commands from backend/ (npm workspace scripts already do).
config({ path: '../.env' })

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
})
