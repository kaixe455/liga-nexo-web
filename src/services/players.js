import { apiURL } from './conf.js'

export const getBestKDAPlayer = async () => {
	try {
		const response = await fetch(`${apiURL}/bestPlayerKda`)
		const bestPlayerKda = await response.json()
		return bestPlayerKda
	} catch (e) {
		return null
	}
}

export const getBestKillsPlayer = async () => {
	try {
		const response = await fetch(`${apiURL}/bestPlayerKills`)
		const bestPlayerKills = await response.json()
		return bestPlayerKills
	} catch (e) {
		return null
	}
}

export const getBestAssistsPlayer = async () => {
	try {
		const response = await fetch(`${apiURL}/bestPlayerAssists`)
		const bestPlayerAssists = await response.json()
		return bestPlayerAssists
	} catch (e) {
		return null
	}
}

export const getPlayersForTeam = async (teamId) => {
	try {
		const response = await fetch(`${apiURL}/players/${teamId}`)
		const players = await response.json()
		return players
	} catch (e) {
		return null
	}
}
