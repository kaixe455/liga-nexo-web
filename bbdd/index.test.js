import { describe, expect, it } from 'vitest'
import { writeDBFile, TEAMS, MATCHES, getImageFromTeam, LEADERBOARD, TEAM_COLORS } from './index'

describe('testing bbdd functionality', () => {
	it('saves data to JSON file', () => {
		writeDBFile('dummy', { data: 'dummy' })
	})
	it('teams matches leaderboard and colors have values', () => {
		expect(TEAMS).toBeDefined()
		expect(MATCHES).toBeDefined()
		expect(LEADERBOARD).toBeDefined()
		expect(TEAM_COLORS).toBeDefined()
	})
	it('returns team image', () => {
		const image = getImageFromTeam({ name: 'Oxygen Valiants' })
		expect(image).toBe('https://liga-nexo-api.liga-nexo.workers.dev/static/logos/oxygen-valiants.svg')
	})
})
