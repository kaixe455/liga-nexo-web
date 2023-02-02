import { TEAM_COLORS } from '../../bbdd/index.js'
export const teamsScrapper = {
	url: 'https://lol.fandom.com/wiki/Liga_Nexo/2023_Season/Split_2',
	async scraper (browser) {
		const page = await browser.newPage()
		console.log(`Navigating to ${this.url}...`)
		await page.goto(this.url)
		await page.waitForSelector('#mw-content-text > div > div.mw-parser-output > div.tournament-rosters.maxteams-5')
		const teamsPanel = await page.$$eval('#mw-content-text > div > div.mw-parser-output > div.tournament-rosters.maxteams-5 > div > table > tbody > tr > th > div', (teams) => {
			return Array.from(teams, (team) => {
				// logo url
				const LOGO_URL = 'https://liga-nexo-api.liga-nexo.workers.dev/static/logos/'
				// Team object
				const TEAM = {
					name: '',
					id: '',
					color1: '',
					color2: '',
					logo: ''
				}
				TEAM.name = team.querySelector('a').innerText
				const teamId = TEAM.name.replaceAll(' ', '-')
				TEAM.id = teamId.toLowerCase()
				TEAM.logo = LOGO_URL + TEAM.id + '.svg'

				return TEAM
			})
		})
		teamsPanel.forEach((team) => {
			const teamColor = TEAM_COLORS.find((teamColors) => teamColors.id === team.id)
			team.color1 = teamColor.color1
			team.color2 = teamColor.color2
		})
		console.log('Scrapped teams')
		return teamsPanel
	}
}
