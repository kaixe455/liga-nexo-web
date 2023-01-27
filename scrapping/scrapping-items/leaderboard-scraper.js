export const leaderBoardScrapper = {
	url: 'https://circuitotormenta.com/competition/tournament/liga-nexo-202223-split-2-1/stage1',
	async scraper(browser) {
		const TEAM = {
			rank: '',
			name: '',
			played_matches: '',
			results: '',
			points: ''
		}
		const leaderboardActual = []
		const page = await browser.newPage()
		console.log(`Navigating to ${this.url}...`)
		await page.goto(this.url)
		await page.waitForSelector('.table_classification')
		const leaderBoard = await page.$$eval('table.table_classification > tr:has(td)', (rows) => {
			return Array.from(rows, (row) => {
				const columns = row.querySelectorAll('td')
				return Array.from(columns, (column) => column.innerText.trim())
			})
		})
		leaderBoard.forEach((element) => {
			const leaderBoardSelectorEntries = Object.entries(TEAM)
			let col = 0
			const leaderBoardEntries = leaderBoardSelectorEntries.map(([key, index]) => {
				const statsTeam = [key, element[col]]
				col++
				return statsTeam
			})
			const { team: teamName, ...leaderboardForTeam } = Object.fromEntries(leaderBoardEntries)
			leaderboardActual.push({
				...leaderboardForTeam
			})
		})
		return leaderboardActual
	}
}
