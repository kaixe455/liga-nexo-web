import { Hono } from 'hono'
import leaderboard from '../bbdd/leaderboard.json'
import matches from '../bbdd/matches.json'

const app = new Hono()

app.get('/', (ctx) => {
  return ctx.json([
    {
      endpoint: '/leaderboard',
      description: 'Return leaderboard for Liga Nexo'
    },
    {
      endpoint: '/matches',
      description: 'Return all matches for the current split in Liga Nexo'
    }
  ])
})

app.get('/leaderboard', (ctx) => {
  return ctx.json(leaderboard)
})

app.get('/matches', (ctx) => {
  return ctx.json(matches)
})

export default app
