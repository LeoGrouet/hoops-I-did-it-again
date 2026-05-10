
import { supabase } from '../supabase'

export async function getTeams(): Promise<any[]> {

  const { data, error } = await supabase
    .from('Teams')
    .select(`*`)

  if (error) {
    console.error('Erreur Supabase:', error)
    return []
  }

  return data ?? []
}
