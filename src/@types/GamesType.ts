import { DateType } from "react-native-ui-datepicker"

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
  date: DateType
  hour: string
  opponent: string
  teamId: number
}
