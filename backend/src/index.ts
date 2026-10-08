import express from 'express'
import { prisma } from './db/prisma.js'

const app = express()
const PORT = Number(process.env.PORT) || 3000

app.use(express.json())

app.get('/api/health', async (_req, res) => {
  // A trivial query proves the API can actually reach Postgres, not just that it runs.
  // Express 5 forwards a rejected promise to the error handler (500) by itself.
  await prisma.$queryRaw`select 1`
  res.json({ status: 'ok', db: 'ok' })
})

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`)
})
