import request from 'request-promise'
import cheerio from 'cheerio'

const get = async() => {
  const eventsPage = await request.get('https://www.vlr.gg/events')
  const $ = cheerio.load(eventsPage)
  const events = []
  $('.wf-card.mod-flex.event-item').each((index, element) => {
    const id = $(element).attr('href').split('/')[2]
    const name = $(element).find('.event-item-title').text().trim() 
    const status = $(element).find('.event-item-desc-item-status').text()
    const image = 'https:' + $(element).find('.event-item-thumb img').attr('src')
    const url = 'https://vlr.gg' + $(element).attr('href')
    
    events.push({ id, name, status, image, url })
  })
  return events
}
export default { get }