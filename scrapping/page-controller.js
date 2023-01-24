import { matchesScrapper } from './scrapping-items/matches-scrapper.js'
import { leaderBoardScrapper } from './scrapping-items/leaderboard-scraper.js'
import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { teamsScrapper } from './scrapping-items/teams-scrapper.js'

export async function scrapeAll (browserInstance) {
  let browser
  try {
    browser = await browserInstance
    const leaderBoard = await leaderBoardScrapper.scraper(browser)
    const matches = await matchesScrapper.scraper(browser)
    // use teams scrapper only for first time
    const teams = await teamsScrapper.scraper(browser)
    browser.close()
    const filePath = path.join(process.cwd(), './bbdd/')
    await writeFile(filePath + 'leaderboard.json', JSON.stringify(leaderBoard, null, 2), 'utf-8')
    await writeFile(filePath + 'matches.json', JSON.stringify(matches, null, 2), 'utf-8')
    await writeFile(filePath + 'teams.json', JSON.stringify(teams, null, 2), 'utf-8')
  } catch (err) {
    console.log('Could not resolve the browser instance => ', err)
  }
}
