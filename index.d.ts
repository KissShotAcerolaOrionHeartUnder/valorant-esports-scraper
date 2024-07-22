type EventsData = {
  id: string
  name: string
  status: 'completed' | 'upcoming' | 'ongoing'
  image: string
  url: string
}
type MatchTeam = {
  name: string
  country: string
}
type MatchTournament = {
  name: string
  image: string
}
type MatchesData = {
  id: string
  teams: MatchTeam[]
  status: 'Upcoming'
  tournament: MatchTournament
  stage: string
  when: number
}
type PlayersData = {
  name: string
  teamTag: string
  country: string
  id: string
}
type PlayerCountry = {
  name: string
  flag: string
}
type PlayerPastTeam = {
  id: string
  url: string
  name: string
}
type PlayerLastResultTeam = {
  name: string
  score: string
}
type PlayerLastResult = {
  id: string
  teams: PlayerLastResultTeam
  url: string
}
type PlayerData = {
  avatar: string
  user: string
  realName: string
  country: PlayerCountry
  currentTeam: string
  pastTeams: PlayerPastTeam[]
  lastResults: PlayerLastResult[]
}
type ResultsTeam = {
  name: string
  score: string
  country: string
  winner: boolean
}
type ResultsData = {
  id: string
  teams: ResultsTeam[]
  status: 'Completed'
  tournament: MatchTournament
  stage: string
  when: number
}
type TeamsData = {
  id: string
  name: string
  url: string
  image: string
  country: string
}
type Roster = {
  id: string
  user: string
  url: string
}
type TeamRoster = {
  players: Roster
  staffs: Roster
}
type TeamData = {
  id: string
  name: string
  tag: string
  roster: TeamRoster
  lastResults: PlayerLastResult[]
}
declare module 'vlresports-scraper' {
  export namespace events {
    function get(): Promise<EventsData[]>
  }
  export namespace matches {
    function get(): Promise<MatchesData[]>
  }
  export namespace players {
    function get(): Promise<PlayersData[]>
    function getById(id: string): Promise<PlayerData>
  }
  export namespace results {
    function get(): Promise<ResultsData[]>
  }
  export namespace teams {
    function get(): Promise<TeamsData[]>
    function getById(id: string): Promise<TeamData>
  }
}