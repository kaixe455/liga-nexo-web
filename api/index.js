import { Hono } from 'hono'
import leaderboard from '../bbdd/leaderboard.json'
import matches from '../bbdd/matches.json'
import teams from '../bbdd/teams.json'
import { serveStatic } from 'hono/serve-static.module'

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
    },
    {
      endpoint: '/teams',
      description: 'Return all teams playing Liga Nexo'
    }
  ])
})

app.get('/leaderboard', (ctx) => {
  return ctx.json(leaderboard)
})

app.get('/matches', (ctx) => {
  return ctx.json(matches)
})

app.get('/teams', (ctx) => {
  return ctx.json(teams)
})

app.get('/teams/:id', (ctx) => {
  const id = ctx.req.param('id')
  const foundTeam = teams.find(team => team.id === id)
  return ctx.json(foundTeam)
})

app.get('/static/*', serveStatic({ root: './' }))

export default app
