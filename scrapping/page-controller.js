import { matchesScrapper } from './scrapping-items/matches-scrapper.js'
import { leaderBoardScrapper } from './scrapping-items/leaderboard-scraper.js'
import { writeFile } from 'node:fs/promises'
import path from 'node:path'

export async function scrapeAll (browserInstance) {
  let browser
  try {
    browser = await browserInstance
    const leaderBoard = await leaderBoardScrapper.scraper(browser)
    const matches = await matchesScrapper.scraper(browser)
    browser.close()
    const filePath = path.join(process.cwd(), './bbdd/')
    await writeFile(filePath + 'leaderboard.json', JSON.stringify(leaderBoard, null, 2), 'utf-8')
    await writeFile(filePath + 'matches.json', JSON.stringify(matches, null, 2), 'utf-8')
  } catch (err) {
    console.log('Could not resolve the browser instance => ', err)
  }
}
