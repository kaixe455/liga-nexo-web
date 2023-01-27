export const matchesScrapper = {
	url: 'https://circuitotormenta.com/competition/tournament/liga-nexo-202223-split-2-1/stage1',
	async scraper(browser) {
		const page = await browser.newPage()
		console.log(`Navigating to ${this.url}...`)
		await page.goto(this.url)
		await page.waitForSelector('#showSchedule')
		await page.evaluate(() => {
			document.querySelector('#showSchedule').click()
		})
		await page.waitForSelector('.robin-round-boxes')
		const roundsMatches = await page.$$eval('div.robin-round > ul', (rounds) => {
			return Array.from(rounds, (round) => {
				const matches = round.querySelectorAll('li')
				return Array.from(matches, (match) => {
					const MATCH = {
						team1: '',
						team2: '',
						date: '',
						score1: '',
						score2: '',
						completed: false
					}
					MATCH.team1 = match.querySelector('div.team.team-1 > span').innerText
					MATCH.team2 = match.querySelector('div.team.team-2 > span').innerText.trim()
					MATCH.date = match.querySelector('div.versus > span.date').innerText.trim()
					MATCH.score1 = Number(
						match.querySelectorAll('div.versus > span.score')[0].innerText.trim()
					)
					MATCH.score2 = Number(
						match.querySelectorAll('div.versus > span.score')[1].innerText.trim()
					)
					if (MATCH.score1 > 0 || MATCH.score2 > 0) {
						MATCH.completed = true
					}
					return MATCH
				})
			})
		})
		return roundsMatches
	}
}
