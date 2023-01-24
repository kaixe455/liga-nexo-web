export const teamsScrapper = {
  url: 'https://circuitotormenta.com/competition/tournament/liga-nexo-202223-split-2-1/participants',
  async scraper (browser) {
    const page = await browser.newPage()
    console.log(`Navigating to ${this.url}...`)
    await page.goto(this.url)
    await page.waitForSelector('div.tournament-panel')
    const teamsPanel = await page.$$eval('div.tournament-body-info__members > article', teams => {
      return Array.from(teams, team => {
        const TEAM = {
          name: '',
          id: '',
          color1: '',
          color2: '',
          logo: ''
        }
        TEAM.name = team.querySelector('h1').innerText
        TEAM.id = team.querySelector('a').getAttribute('href').trim().split('/')[2]
        TEAM.logo = TEAM.id + '.svg'
        return TEAM
      })
    })
    return teamsPanel
  }
}
