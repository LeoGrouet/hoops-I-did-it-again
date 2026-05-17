import { type HomeGameWithTeamName } from '@/src/@types/HomeGameWithTeamName';
import { type NewGameType } from '@/src/@types/GamesType';
import { formatDateForDatabase } from '@/src/utils/dates';
import { supabase } from '../supabase';
import { type HomeGameRow, mapHomeGameRow } from './mapHomeGameRow';

const HOME_GAME_SELECT = `
  id,
  date,
  hour,
  opponent,
  Teams (
    name
  )
`;

export async function addHomeGames(
  homeGamesData: NewGameType,
): Promise<HomeGameWithTeamName | null> {
  const { data, error } = await supabase
    .from('HomeGames')
    .insert([
      {
        date: formatDateForDatabase(homeGamesData.date),
        teamId: homeGamesData.teamId,
        opponent: homeGamesData.opponent,
        hour: homeGamesData.hour,
      },
    ])
    .select(HOME_GAME_SELECT);

  if (error) {
    console.error('Error adding home game:', error);
    return null;
  }

  const row = data?.[0] as HomeGameRow | undefined;
  return row ? mapHomeGameRow(row) : null;
}
