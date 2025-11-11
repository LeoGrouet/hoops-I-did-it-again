import { supabase } from '@/utils/supabase';

export interface HomeGameOfficialType {
  id: number;
  homegamesId: number;
  HomeGamesOfficial_userId_fkey?: {
    Firstname: string;
    Lastname: string;
    LicenceNb: string;
  };
  OfficialRole: string
}

export async function getHomeGameOfficial(id: number): Promise<HomeGameOfficialType[]> {

  const { data, error } = await supabase
    .from('HomeGamesOfficial')
    .select(`*,
    HomeGamesOfficial_userId_fkey(Firstname, Lastname, LicenceNb)
  `).eq('homegamesId', id);

  if (error) {
    console.error('Erreur Supabase:', error);
    throw error;
  }

  return data;
}
