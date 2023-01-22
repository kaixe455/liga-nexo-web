import { scraperObject } from './page-scraper.js'

export async function scrapeAll (browserInstance) {
  let browser
  try {
    browser = await browserInstance
    await scraperObject.scraper(browser)
    browser.close()
  } catch (err) {
    console.log('Could not resolve the browser instance => ', err)
  }
}
