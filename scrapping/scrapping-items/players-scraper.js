export const playersScrapper = {
	url: 'https://lol.fandom.com/wiki/Special:RunQuery/TournamentPlayerInformation?TPI%5Bpage%5D=Liga+Nexo%2F2023+Season%2FSplit+2&_run=',
	async scraper (browser) {
		const page = await browser.newPage()
		console.log(`Navigating to ${this.url}...`)
		await page.goto(this.url)
		await page.waitForSelector('table.cargoTable')
		const playersPanel = await page.$$eval('table.cargoTable > tbody > tr', (players) => {
			return Array.from(players, (player) => {
				// Team object
				const PLAYER = {
					teamId: '',
					role: '',
					nickname: '',
					name: '',
					twitch: '',
					twitter: ''
				}
				PLAYER.teamId = (player.querySelector('td > span > a.catlink-teams.tWACM.tWAFM.tWAN').innerText).replaceAll(' ', '-').toLowerCase()
				PLAYER.name = player.querySelector('td:nth-child(4)').innerText
				PLAYER.role = (player.querySelector('td:nth-child(6)').innerText).replaceAll('\n', '')
				PLAYER.nickname = (player.querySelector('td:nth-child(3)').innerText).replaceAll('\n', '').trim()
				if (player.querySelector('td:nth-child(7) > a.external')) {
					PLAYER.twitch = player.querySelector('td:nth-child(7) > a.external').href
				}
				if (player.querySelector('td:nth-child(8) > a')) {
					PLAYER.twitter = player.querySelector('td:nth-child(8) > a').href
				}
				// const teamId = TEAM.name.replaceAll(' ', '-')
				// TEAM.id = teamId.toLowerCase()
				// TEAM.logo = LOGO_URL + TEAM.id + '.svg'

				return PLAYER
			})
		})
		return playersPanel
	}
}
