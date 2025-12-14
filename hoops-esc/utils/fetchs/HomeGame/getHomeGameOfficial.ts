import { supabase } from '@/utils/supabase';

export interface OfficialType {
  OfficialRole: string
  Users?: {
    Firstname: string
    Lastname: string
    LicenceNb: string
  }[]
}

export async function getHomeGameOfficial(
  homegameId: number
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

  return data ?? []
}
