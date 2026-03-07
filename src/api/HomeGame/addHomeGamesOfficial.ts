import { NewGameType } from '@/src/@types/GamesType';
import { supabase } from '../supabase';

export async function addHomeGames(HomeGamesData: NewGameType) {

  const { data, error } = await supabase
    .from('HomeGames')
    .insert([
      { date: HomeGamesData.date, category: HomeGamesData.category, opponent: HomeGamesData.opponent, hour: HomeGamesData.hour },
    ])
    .select()
  console.log('Adding home game with data:', HomeGamesData); // Debug log
  if (error) {
    console.error('Error adding home game:', error);
    return null;
  }
  return data;
}
