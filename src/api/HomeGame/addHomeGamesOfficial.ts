import { NewGameType } from '@/src/@types/GamesType';
import { supabase } from '../supabase';

export async function addHomeGames(HomeGamesData: NewGameType) {

  const { data, error } = await supabase
    .from('HomeGames')
    .insert([
      { date: HomeGamesData.date, teamId: HomeGamesData.teamId, opponent: HomeGamesData.opponent, hour: HomeGamesData.hour },
    ])
    .select()

  if (error) {
    console.error('Error adding home game:', error);
    return null;
  }
  return data;
}
