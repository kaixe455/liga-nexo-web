import { apiURL } from './conf.js'

export const getLeaderboard = async () => {
	try {
		const response = await fetch(`${apiURL}/leaderboard`)
		const leaderboard = await response.json()
		return leaderboard
	} catch (e) {
		return null
	}
}

export const getLeaderboardByTeamId = async (teamId) => {
	try {
		const response = await fetch(`${apiURL}/leaderboard/${teamId}`)
		const leaderboard = await response.json()
		return leaderboard
	} catch (e) {
		return null
	}
}
