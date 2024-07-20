import request from 'request-promise'
import cheerio from 'cheerio'

const get = async () => {
  const matchesPage = await request.get('https://www.vlr.gg/matches')
  const $ = cheerio.load(matchesPage)
  const matches = []
  $('.wf-module-item.match-item').each((index, element) => {
    const id = $(element).attr('href').split('/')[1]
    const teams = $(element).find('.match-item-vs-team-name').text().replace(/\t/g, '').trim()
    const [team1, team2] = teams.split('\n').filter(i => i !== '')
    const countryElements = $(element).find('.match-item-vs-team .flag')
    const country1 = countryElements.eq(0).attr('class').split(' ')[1].replace('mod-', '')
    const country2 = countryElements.eq(1).attr('class').split(' ')[1].replace('mod-', '')
    const status = $(element).find('.ml-status').text()
    const stage = $(element).find('.match-item-event-series').text().trim()
    const date = `${$(element.parent).prev().text().replace('Today', '').trim()} ${$(element).find('.match-item-time').text().trim()}`
    const timestamp = new Date(date).getTime() / 1000

    matches.push({
      id,
      teams: [
        {
          name: team1,
          country: country1
        },
        {
          name: team2,
          country: country2
        }
      ],
      status,
      tournament: {
        name: $(element).find('.match-item-event').text().replace(/\t/g, '').replace(stage, '').trim(),
        image: `https:${$(element).find('.match-item-icon img').attr('src')}`
      },
      stage,
      when: timestamp
    })
  })
  return matches
}
export default { get }