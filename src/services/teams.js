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
