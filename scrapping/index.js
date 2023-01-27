import { startBrowser } from './browser.js'
import { scrapeAll, scrapeLeaderBoard, scrapeMatches, scrapeTeams } from './page-controller.js'
import { argv } from 'node:process'

const scrapeParam = argv[2]

//  Start the browser and create a browser instance
const browserInstance = startBrowser()

//  Pass the browser instance to the scraper controller
if (scrapeParam === 'all') {
	scrapeAll(browserInstance)
} else if (scrapeParam === 'leaderboard') {
	scrapeLeaderBoard(browserInstance)
} else if (scrapeParam === 'matches') {
	scrapeMatches(browserInstance)
} else if (scrapeParam === 'teams') {
	scrapeTeams(browserInstance)
} else {
	console.log('Nothing to scrape')
}
