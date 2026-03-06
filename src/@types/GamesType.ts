export type GamesType = {
  id: number
  date: string
  hour: string
  opponent: string
  Teams: {
    name: string
  }
}

export type NewGameType = {
  date: Date
  hour: string
  opponent: string
  category: string
}
