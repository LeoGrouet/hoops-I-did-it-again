import { HomeGameWithTeamName } from '@/src/@types/HomeGameWithTeamName'
import { supabase } from '../supabase'

type TeamsRelation = { name: string } | { name: string }[] | null

type HomeGameRow = {
  id: number
  date: string
  hour: string
  opponent: string
  Teams: TeamsRelation
}

function normalizeTeams(relation: TeamsRelation): { name: string } {
  if (!relation) return { name: 'Unknown Team' }
  return Array.isArray(relation) ? (relation[0] ?? { name: 'Unknown Team' }) : relation
}

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
  return rows.map(row => ({
    ...row,
    Teams: normalizeTeams(row.Teams),
  }))
}
