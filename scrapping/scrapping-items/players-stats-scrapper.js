export const statsScrapper = {
	url: 'https://lol.fandom.com/wiki/Liga_Nexo/2023_Season/Split_2/Player_Statistics',
	async scraper (browser) {
		const page = await browser.newPage()
		console.log(`Navigating to ${this.url}...`)
		await page.goto(this.url)
		await page.waitForSelector('table.nested-table')
		const playersPanel = await page.$$eval('#mw-content-text > div > div.mw-parser-output > div.wide-content-scroll > div > div > table > tbody > tr', (players) => {
			return Array.from(players, (player) => {
				// Player stats object
				const PLAYER_STATS = {
					playerId: '',
					gamesPlayed: '',
					wins: '',
					losses: '',
					winRate: '',
					kills: '',
					deaths: '',
					assists: '',
					kda: '',
					cs: '',
					csPerMinute: '',
					gold: '',
					goldPerMinute: '',
					damage: '',
					damagePerMinute: '',
					killParticipation: '',
					championsPlayed: []
				}
				PLAYER_STATS.playerId = player.querySelector('tr > td:nth-child(2)').innerText
				PLAYER_STATS.gamesPlayed = Number(player.querySelector('tr > td:nth-child(3)').innerText)
				PLAYER_STATS.wins = Number(player.querySelector('tr > td:nth-child(4)').innerText)
				PLAYER_STATS.losses = Number(player.querySelector('tr > td:nth-child(5)').innerText)
				PLAYER_STATS.winRate = player.querySelector('tr > td:nth-child(6)').innerText
				PLAYER_STATS.kills = Number(player.querySelector('tr > td:nth-child(7)').innerText)
				PLAYER_STATS.deaths = Number(player.querySelector('tr > td:nth-child(8)').innerText)
				PLAYER_STATS.assists = Number(player.querySelector('tr > td:nth-child(9)').innerText)
				PLAYER_STATS.kda = Number(player.querySelector('tr > td:nth-child(10)').innerText)
				PLAYER_STATS.cs = Number(player.querySelector('tr > td:nth-child(11)').innerText)
				PLAYER_STATS.csPerMinute = Number(player.querySelector('tr > td:nth-child(12)').innerText)
				PLAYER_STATS.gold = player.querySelector('tr > td:nth-child(13)').innerText + 'k'
				PLAYER_STATS.goldPerMinute = Number(player.querySelector('tr > td:nth-child(14)').innerText)
				PLAYER_STATS.damage = Number(player.querySelector('tr > td:nth-child(15)').innerText)
				PLAYER_STATS.damagePerMinute = Number(player.querySelector('tr > td:nth-child(16)').innerText)
				PLAYER_STATS.killParticipation = player.querySelector('tr > td:nth-child(17)').innerText
				// get champs
				const champs = player.querySelectorAll('tr > td:nth-child(21) > a')
				const champNames = Array.from(champs, (champ) => {
					const champName = champ.querySelector('span').title
					return champName
				})
				PLAYER_STATS.championsPlayed = champNames
				// PLAYER_STATS.championsPlayed = player.querySelector('tr > td:nth-child(12)').innerText

				// const teamId = TEAM.name.replaceAll(' ', '-')
				// TEAM.id = teamId.toLowerCase()
				// TEAM.logo = LOGO_URL + TEAM.id + '.svg'

				return PLAYER_STATS
			})
		})
		return playersPanel
	}
}
