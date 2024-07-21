# Introduction
This repository is a web scraping from [vlr.gg](https://www.vlr.gg/) to fetch players, matches, events, results and teams data
# Installation
```
npm i https://github.com/levispires/valorant-esports-scraper
```
# Examples
```js
import { matches, results, players, teams, events } from 'vlresports-scraper'

console.log(await matches.get()) // get all matches
console.log(await results.get()) // get all results
console.log(await players.get()) // get all players
console.log(await players.getById('8447')) // get a player by id
console.log(await teams.get()) // get all teams
console.log(await teams.getById('6961')) // get a team by id
console.log(await events.get()) // get all events
```