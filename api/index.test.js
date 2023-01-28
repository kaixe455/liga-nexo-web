import { unstable_dev as unstableDev } from 'wrangler'
import { describe, expect, it, beforeAll, afterAll } from 'vitest'

const setup = async () => {
	const worker = await unstableDev('api/index.js', { experimental: { disableExperimentalWarning: true } })
	return worker
}

const teardown = async (worker) => {
	await worker.stop()
}

/**
 *
 * @param {*} subject Object to validate
 * @param {[{name: string, type: string}]} schema Properties schema
 */
function checkProperties (subject, schema) {
	schema.forEach((property) => {
		const { name, type } = property
		expect(subject).toHaveProperty(property.name)

		if (type) {
			const customMessage = `Expected [${name}] property to be type: [${type}]`
			expect(subject[name], customMessage).toBeTypeOf(type)
		}
	})
}

describe('Testing / route', () => {
	let worker

	beforeAll(async () => {
		worker = await setup()
	})

	afterAll(async () => {
		await teardown(worker)
	})

	it('routes should have endpoint and description', async () => {
		const res = await worker.fetch()
		expect(res).toBeDefined()
		if (!res) return

		const apiRoutes = await res.json()
		const apiRoutesProperties = [
			{ name: 'endpoint', type: 'string' },
			{ name: 'description', type: 'string' }
		]

		// verify the response to have the expected format
		apiRoutes.forEach((endpoint) => checkProperties(endpoint, apiRoutesProperties))
	})
})

describe('Testing /teams route', () => {
	let worker

	beforeAll(async () => {
		worker = await setup()
	})

	afterAll(async () => {
		await teardown(worker)
	})

	const teamsProperties = [
		{ name: 'name', type: 'string' },
		{ name: 'id', type: 'string' },
		{ name: 'color1', type: 'string' },
		{ name: 'color2', type: 'string' },
		{ name: 'logo', type: 'string' },
		{ name: 'players', type: 'object' }
	]

	const playerProperties = [
		{ name: 'nickname', type: 'string' },
		{ name: 'socials', type: 'object' }
	]

	it('The teams should be 10', async () => {
		const resp = await worker.fetch('/teams')
		expect(resp).toBeDefined()
		if (!resp) return

		const teams = await resp.json()
		const numberTeams = Object.entries(teams).length

		// verify the team have all props
		teams.forEach((team) => checkProperties(team, teamsProperties))
		expect(numberTeams).toBe(10)
	})

	it('Get /teams/oxygen-valiants should return team props', async () => {
		const resp = await worker.fetch('/teams/oxygen-valiants')
		expect(resp).toBeDefined()
		if (!resp) return

		const team = await resp.json()
		checkProperties(team, teamsProperties)
	})

	it('Get /teams/false-team should return 404 message missing team', async () => {
		const resp = await worker.fetch('/teams/false-team')
		expect(resp).toBeDefined()
		if (!resp) return

		const errorMessage = await resp.json()

		expect(errorMessage).toEqual({
			message: 'Team not found'
		})
	})

	it('The players should have all its properties', async () => {
		const resp = await worker.fetch('/teams')
		const teams = await resp.json()
		const players = teams.map((team) => team.players).flat()
		players.forEach((player) => checkProperties(player, playerProperties))
	})
})

describe('Testing /matches route', () => {
	let worker

	beforeAll(async () => {
		worker = await setup()
	})

	afterAll(async () => {
		await teardown(worker)
	})

	const matchesProperties = [
		{ name: 'team1', type: 'string' },
		{ name: 'team2', type: 'string' },
		{ name: 'date', type: 'string' },
		{ name: 'score1', type: 'number' },
		{ name: 'score2', type: 'number' },
		{ name: 'completed', type: 'boolean' }
	]

	it('The matches should have all its properties', async () => {
		const resp = await worker.fetch('/matches')
		const calendar = await resp.json()
		calendar.forEach((week) => {
			week.forEach((match) => checkProperties(match, matchesProperties))
		})
	})
})

describe('Test /leaderboard route', () => {
	let worker

	beforeAll(async () => {
		worker = await setup()
	})

	afterAll(async () => {
		await teardown(worker)
	})

	const teamLeaderBoardProperties = [
		{ name: 'rank', type: 'string' },
		{ name: 'name', type: 'string' },
		{ name: 'played_matches', type: 'string' },
		{ name: 'results', type: 'string' },
		{ name: 'points', type: 'string' }
	]

	it('The leaderboard items should have all its properties', async () => {
		const resp = await worker.fetch('/leaderboard')
		const leaderboard = await resp.json()
		leaderboard.forEach((item) => checkProperties(item, teamLeaderBoardProperties))
	})
})
