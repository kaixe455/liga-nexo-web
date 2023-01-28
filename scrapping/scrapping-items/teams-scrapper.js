import { TEAM_COLORS } from '../../bbdd/index.js'
export const teamsScrapper = {
	url: 'https://circuitotormenta.com/competition/tournament/liga-nexo-202223-split-2-1/participants',
	async scraper (browser) {
		const page = await browser.newPage()
		console.log(`Navigating to ${this.url}...`)
		await page.goto(this.url)
		await page.waitForSelector('div.tournament-panel')
		const teamsPanel = await page.$$eval('div.tournament-body-info__members > article', (teams) => {
			return Array.from(teams, (team) => {
				// logo url
				const LOGO_URL = 'https://liga-nexo-api.liga-nexo.workers.dev/static/logos/'
				// Team object
				const TEAM = {
					name: '',
					id: '',
					color1: '',
					color2: '',
					logo: '',
					players: [{}]
				}
				TEAM.name = team.querySelector('h1').innerText
				TEAM.id = team.querySelector('a').getAttribute('href').trim().split('/')[2]
				TEAM.logo = LOGO_URL + TEAM.id + '.svg'
				return TEAM
			})
		})
		const tournamentApi = await fetch(
			'https://api.circuitotormenta.com//api/v001/showcase/circuito-tormenta/tournament/liga-nexo-202223-split-2-1'
		)
		const apiResponse = await tournamentApi.json()
		teamsPanel.forEach((team) => {
			const players = []
			try {
				apiResponse.returnData.equipos.forEach((teamInfo) => {
					if (teamInfo.slug === team.id) {
						teamInfo.membersData.forEach((member) => {
							const PLAYER = {
								nickname: '',
								socials: [{}]
							}
							PLAYER.socials = member.profile.socials
							member.profile.gameNicks.forEach((nick) => {
								if (nick.id === 'DSqvAwvMpYtH9Ccdj') {
									PLAYER.nickname = nick.nick
									players.push(PLAYER)
								}
							})
						})
					}
					team.players = players
				})
			} catch {
				console.log('error while trying to get players')
			}
			// GET COLORS FOR TEAM
			const teamColor = TEAM_COLORS.find((teamColors) => teamColors.id === team.id)
			team.color1 = teamColor.color1
			team.color2 = teamColor.color2
		})
		return teamsPanel
	}
}
