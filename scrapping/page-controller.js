import { scraperObject } from './page-scraper.js'
import { writeFile } from 'node:fs/promises'
import path from 'node:path'

export async function scrapeAll (browserInstance) {
  let browser
  try {
    browser = await browserInstance
    const leaderBoard = await scraperObject.scraper(browser)
    browser.close()
    const filePath = path.join(process.cwd(), './bbdd/leaderboard.json')
    await writeFile(filePath, JSON.stringify(leaderBoard, null, 2), 'utf-8')
  } catch (err) {
    console.log('Could not resolve the browser instance => ', err)
  }
}
