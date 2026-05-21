import { supabase } from "../supabase";

export async function addOfficial(
  homeGameId: number,
  userUid: string,
  role: string,
) {
  const { data: userData, error: userError } = await supabase
    .from('Users')
    .select('id')
    .eq('auth_id', userUid)
    .single();

  if (userError || !userData) {
    console.error('Error fetching user numeric id:', userError);
    return null;
  }

  const { data, error } = await supabase
    .from('Official')
    .insert([
      {
        homegamesId: homeGameId,
        userId: userData.id,
        OfficialRole: role,
      },
    ])
    .select();

  if (error) {
    console.error('Error adding official:', error);
    return null;
  }

  return data;
}
