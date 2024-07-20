import request from 'request-promise'
import cheerio from 'cheerio'

const get = async() => {
  const playersPage = await request.get('https://www.vlr.gg/stats')
  const $ = cheerio.load(playersPage)
  const players = []
  $('table').find('tbody').find('tr')
  .map((x, element) => {
    const name = $(element).find('td').find('a').find('.text-of').text().trim()
    const teamTag = $(element).find('td').find('a').find('div').last().text().trim()
    const id = $(element).find('td').find('a').attr('href').split('/')[2]
    const country = $(element).find('td').find('.flag').attr('class').split(' ')[1].replace('mod-', '')

    players.push({
      name,
      teamTag,
      country,
      id
    })
  })
  return players
}
const getById = async(id) => {
  const playerPage = await request.get(`https://www.vlr.gg/player/${id}`)
  const $ = cheerio.load(playerPage)
  const avatar = $('.player-header').find('.wf-avatar').find('img').attr('src')
  const user = $('.player-header').find('.wf-title').text().trim()
  const realName = $('.player-header').find('.player-real-name').text()
  const currentTeam = $('.wf-module-item').find('div').find('div').first().text().trim()
  const pastTeams = []
  $('wf-module-item').eq(1).parent().find('a').each((index, element) => {
    pastTeams.push({
      id: $(element).attr('href').split('/')[2],
      url: 'https://vlr.gg' + $(element).attr('href'),
      name: $(element).find('div').children()
    })
  })

  return {
    avatar,
    user,
    realName,
    country: {
      name: $('.player-header').find('div').last().text().trim(),
      flag: $('.player-header').find('.flag').attr('class').split(' ')[1].replace('mod-', '')
    },
    currentTeam,
    pastTeams
  }
}
export default { get, getById }