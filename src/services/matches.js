import { apiURL } from './conf.js'
import { sortByProperty } from '../../utils/utils.js'

export const getAllMatches = async () => {
	try {
		const response = await fetch(`${apiURL}/matches`)
		const matches = await response.json()
		return matches
	} catch (e) {
		return null
	}
}

export const getClosestMatch = async () => {
	const response = await fetch(`${apiURL}/matches`)
	const matches = await response.json()
	const notPlayedMatches = matches.filter((match) => match.completed === false)
	const orderedMatches = notPlayedMatches.sort(sortByProperty('date')).reverse()
	console.log(orderedMatches[0])
	return orderedMatches[0]
}
