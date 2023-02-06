import { Hono } from 'hono'
import leaderboard from '../bbdd/leaderboard.json'
import matches from '../bbdd/matches.json'
import teams from '../bbdd/teams.json'
import players from '../bbdd/players.json'
import playersStats from '../bbdd/players-stats.json'
import { serveStatic } from 'hono/serve-static.module'
import { cors } from 'hono/cors'
import { sortByProperty } from '../utils/utils.js'

const app = new Hono()
app.use(cors({ origin: '*' }))
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
		},
		{
			endpoint: 'teams/:id',
			description: 'Return a team by id'
		},
		{
			endpoint: '/teams/byname/:name',
			description: 'Return a team looking by name'
		},
		{
			endpoint: '/bestplayerkda',
			description: 'Return best player by KDA'
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
	const foundTeam = teams.find((team) => team.id === id)
	return foundTeam ? ctx.json(foundTeam) : ctx.json({ message: 'Team not found' }, 404)
})

app.get('/teams/byname/:name', (ctx) => {
	const name = ctx.req.param('name').split(' ')[0]
	const foundTeam = teams.find((team) => (((team.name)).toLowerCase()).search(name.toLowerCase()) !== -1)
	return foundTeam ? ctx.json(foundTeam) : ctx.json({ message: 'Team not found' }, 404)
})

app.get('/bestplayerkda', (ctx) => {
	// sort according to kda
	const orderedByKda = playersStats.sort(sortByProperty('kda')).reverse()
	const bestPlayerKda = orderedByKda[0]
	const { kda, championsPlayed } = bestPlayerKda
	const foundPlayer = players.find((player) => player.nickname === bestPlayerKda.playerId)
	const { teamId, ...restOfFoundPlayer } = foundPlayer
	const foundTeamPlayer = teams.find((team) => team.id === teamId)
	restOfFoundPlayer.team = foundTeamPlayer
	restOfFoundPlayer.kda = kda
	restOfFoundPlayer.championPlayed = championsPlayed[0]
	return restOfFoundPlayer ? ctx.json(restOfFoundPlayer) : ctx.json({ message: 'Player not found' }, 404)
})

app.get('/static/*', serveStatic({ root: './' }))

app.notFound((c) => {
	const { pathname } = new URL(c.req.url)
	if (c.req.url.at(-1) === '/') {
		return c.redirect(pathname.slice(0, -1))
	}
	return c.json({ message: 'Not Found' }, 404)
})

export default app
