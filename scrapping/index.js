import { startBrowser } from './browser.js'
import { scrapeAll } from './page-controller.js'

//  Start the browser and create a browser instance
const browserInstance = startBrowser()

//  Pass the browser instance to the scraper controller
scrapeAll(browserInstance)
