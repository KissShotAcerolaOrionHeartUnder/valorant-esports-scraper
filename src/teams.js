import request from 'request-promise'
import cheerio from 'cheerio'

const get = async() => {
  const teamsPage = await request.get('https://www.vlr.gg/rankings')
  const $ = cheerio.load(teamsPage)
  const teams = []
  $('.wf-card').each((index, element) => {
    const name = $(element).find('.rank-item-team').text().trim().split(/\t/g)[0]
    const id = $(element).find('a').attr('href')?.split('/')[2]
    const url = id ? 'https://vlr.gg' + $(element).find('a').attr('href') : undefined
    const image = id ? 'https:' + $(element).find('.rank-item-team img').attr('src') : undefined
    const country = $(element).find('.rank-item-team-country').text()
    
    if(url) {
      teams.push({ id, name, url, image, country })
    }
  })
  return teams
}
const getById = async(id) => {
  const teamPage = await request.get(`https://www.vlr.gg/team/${id}`)
  const $ = cheerio.load(teamPage)
  const teamArray = $('.team-header-name').text().replace(/\t/g, '').trim().replace('\n', '').split('\n')
  const name = teamArray[0]
  const tag = teamArray[1]
  const players = []
  const staffs = []
  const rosterElements = []
  $('.team-roster-item').each((index, element) => {
    rosterElements.push(element)
  })
  for(const element of rosterElements) {
    if($(element).find('.wf-tag').text()) {
      staffs.push({
        id: $(element).find('a').attr('href').split('/')[2],
        user: $(element).find('.team-roster-item-name-alias').text().trim(),
        url: 'https://vlr.gg' + $(element).find('a').attr('href')
      })
    }
    else {
      players.push({
        id: $(element).find('a').attr('href').split('/')[2],
        user: $(element).find('.team-roster-item-name-alias').text().trim(),
        url: 'https://vlr.gg' + $(element).find('a').attr('href')
      })
    }
  }
  const roster = { players, staffs }
  const lastResults = []
  $('.wf-card.fc-flex.m-item').each((index, element) => {
    lastResults.push({
      id: $(element).attr('href').split('/')[1],
      teams: [
        {
          name: $(element).find('.m-item-team-name').eq(0).text().trim(),
          score: $(element).find('.m-item-result').find('span').text().split('')[0]
        },
        {
          name: $(element).find('.m-item-team-name').eq(1).text().trim(),
          score: $(element).find('.m-item-result').find('span').text().split('')[1]
        }
      ],
      url: 'https://vlr.gg' + $(element).attr('href')
    })
  })
  return { id, name, tag, roster, lastResults }
}
export default { get, getById }