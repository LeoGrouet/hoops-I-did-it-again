import { type OfficialType } from '@/src/@types/OfficialType'

import { supabase } from '../supabase'

export async function getHomeGameOfficial(
  homegameId: number,
): Promise<OfficialType[]> {

  const { data, error } = await supabase
    .from('Official')
    .select(`
      OfficialRole,
      User:userId (
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

  // @ts-ignore
  return data

}
