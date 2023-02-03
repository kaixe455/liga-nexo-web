import { matchesScrapper } from './scrapping-items/matches-scrapper.js'
import { leaderBoardScrapper } from './scrapping-items/leaderboard-scraper.js'
import { teamsScrapper } from './scrapping-items/teams-scrapper.js'
import { playersScrapper } from './scrapping-items/players-scraper.js'
import { statsScrapper } from './scrapping-items/players-stats-scrapper.js'
import { writeFile } from 'node:fs/promises'
import path from 'node:path'

export async function scrapeAll (browserInstance) {
	console.log('Scrapping all ...')
	let browser
	try {
		browser = await browserInstance
		const leaderBoard = await leaderBoardScrapper.scraper(browser)
		const matches = await matchesScrapper.scraper(browser)
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

export async function scrapeLeaderBoard (browserInstance) {
	console.log('Scrapping leaderboard ...')
	let browser
	try {
		browser = await browserInstance
		const leaderBoard = await leaderBoardScrapper.scraper(browser)
		browser.close()
		const filePath = path.join(process.cwd(), './bbdd/')
		await writeFile(filePath + 'leaderboard.json', JSON.stringify(leaderBoard, null, 2), 'utf-8')
	} catch (err) {
		console.log('Could not resolve the browser instance => ', err)
	}
}

export async function scrapeMatches (browserInstance) {
	console.log('Scrapping matches ...')
	let browser
	try {
		browser = await browserInstance
		const matches = await matchesScrapper.scraper(browser)
		browser.close()
		const filePath = path.join(process.cwd(), './bbdd/')
		await writeFile(filePath + 'matches.json', JSON.stringify(matches, null, 2), 'utf-8')
	} catch (err) {
		console.log('Could not resolve the browser instance => ', err)
	}
}

export async function scrapeTeams (browserInstance) {
	console.log('Scrapping teams ...')
	let browser
	try {
		browser = await browserInstance
		const teams = await teamsScrapper.scraper(browser)
		browser.close()
		const filePath = path.join(process.cwd(), './bbdd/')
		await writeFile(filePath + 'teams.json', JSON.stringify(teams, null, 2), 'utf-8')
	} catch (err) {
		console.log('Could not resolve the browser instance => ', err)
	}
}

export async function scrapePlayers (browserInstance) {
	console.log('Scrapping players ...')
	let browser
	try {
		browser = await browserInstance
		const players = await playersScrapper.scraper(browser)
		browser.close()
		const filePath = path.join(process.cwd(), './bbdd/')
		await writeFile(filePath + 'players.json', JSON.stringify(players, null, 2), 'utf-8')
	} catch (err) {
		console.log('Could not resolve the browser instance => ', err)
	}
}

export async function scrapePlayersStats (browserInstance) {
	console.log('Scrapping players stats ...')
	let browser
	try {
		browser = await browserInstance
		const stats = await statsScrapper.scraper(browser)
		browser.close()
		const filePath = path.join(process.cwd(), './bbdd/')
		await writeFile(filePath + 'players-stats.json', JSON.stringify(stats, null, 2), 'utf-8')
	} catch (err) {
		console.log('Could not resolve the browser instance => ', err)
	}
}
