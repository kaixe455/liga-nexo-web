import { apiURL } from './conf.js'

export const getAllTeams = async () => {
	try {
		const response = await fetch(`${apiURL}/teams`)
		const teams = await response.json()
		return teams
	} catch (e) {
		return null
	}
}

export const getTeamByName = async (name) => {
	try {
		const response = await fetch(`${apiURL}/teams/byname/${name}`)
		const team = await response.json()
		return team
	} catch (e) {
		return null
	}
}
