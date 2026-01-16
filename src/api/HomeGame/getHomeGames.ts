import { type HomeGameWithCategory } from '@/src/@types/HomeGameCategory'

import { supabase } from '../supabase'

export async function getHomeGames(): Promise<HomeGameWithCategory[]> {

  const { data, error } = await supabase
    .from('HomeGames')
    .select(`
    *,
    HomeGames_category_fkey(Name)
  `)

  if (error) {
    console.error('Erreur Supabase:', error)
    return []
  }

  return data ?? []
}
