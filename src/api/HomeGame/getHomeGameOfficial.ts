import { type OfficialType } from '@/src/@types/OfficialType'

import { supabase } from '../supabase'

export async function getHomeGameOfficial(
  homegameId: number,
): Promise<OfficialType[]> {

  const { data, error } = await supabase
    .from('Official')
    .select(`
      OfficialRole,
      Users:userId (
        Firstname,
        Lastname,
        LicenceNb
      )
    `)
    .eq('homegamesId', homegameId)

  if (error) {
    console.error('Erreur Supabase:', error)
    throw error
  }
  if (!data) {
    return []
  }

  return data
}
