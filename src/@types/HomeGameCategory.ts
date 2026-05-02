import { type GamesType } from './GamesType'

export interface HomeGameWithTeamName extends GamesType {
  HomeGames_teamId_fkey?: {
    name: string
  }
}
