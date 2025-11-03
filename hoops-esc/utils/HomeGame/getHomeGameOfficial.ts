import { supabase } from '../supabase';

export interface HomeGameOfficialType {
  id: number;
  homegameId: number;
  HomeGamesOfficial_users_fkey?: {
    Firstname: string;
    Lastname: string;
    LicenceNb: string;
  };
  OfficialRole: string
}

export async function getHomeGameOfficial(id: Number): Promise<HomeGameOfficialType> {

  const { data, error } = await supabase
    .from('HomeGamesOfficial')
    .select(`*,
    HomeGamesOfficial_users_fkey(Firstname, Lastname, LicenceNb)
  `).eq('homegameId', id);

  if (error) {
    console.error('Erreur Supabase:', error);
    throw error;
  }

  return data;
}
