import { apiURL } from './conf.js'

export const getStatsByNickname = async (nickname) => {
	try {
		const response = await fetch(`${apiURL}/playersStats/${nickname}`)
		const stats = await response.json()
		return stats
	} catch (e) {
		return null
	}
}
