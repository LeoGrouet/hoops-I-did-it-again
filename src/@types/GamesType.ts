export type GamesType = {
  id: number
  date: Date
  hour: string
  opponent: string
  category: string
  HomeGames_category_fkey?: {
    Name: string
  } | null
}
