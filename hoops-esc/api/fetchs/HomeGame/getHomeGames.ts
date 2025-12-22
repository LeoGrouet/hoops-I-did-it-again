import { supabase } from '@/utils/supabase';
import { GamesType } from '@/components/GamesInfo';

export interface HomeGameWithCategory extends GamesType {
  HomeGames_category_fkey?: {
    Name: string;
  };
}

export async function getHomeGames(): Promise<HomeGameWithCategory[]> {

  const { data, error } = await supabase
    .from('HomeGames')
    .select(`
    *,
    HomeGames_category_fkey(Name)
  `);

  if (error) {
    console.error('Erreur Supabase:', error);
    return [];
  }

  return data ?? [];
}
