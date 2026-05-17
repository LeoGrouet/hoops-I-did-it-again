import { HomeGameWithTeamName } from '@/src/@types/HomeGameWithTeamName'
import { supabase } from '../supabase'
import { type HomeGameRow, mapHomeGameRow } from './mapHomeGameRow'

export async function getHomeGames(): Promise<HomeGameWithTeamName[]> {

  const { data, error } = await supabase
    .from('HomeGames')
    .select(`
    id,
    date,
    hour,
    opponent,
    Teams (
      name
    )
  `)

  if (error) {
    console.error('Erreur Supabase:', error)
    return []
  }

  const rows = (data ?? []) as HomeGameRow[]
  return rows.map(mapHomeGameRow)
}
