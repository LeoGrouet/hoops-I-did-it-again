
import { UserType } from '@/src/@types/UserType'
import { supabase } from '../supabase'

export async function getUserProfile(userUid: string): Promise<UserType> {
  const { data, error } = await supabase
    .from('Users')
    .select("Firstname, Lastname, LicenceNb, email, role")
    .eq('auth_id', userUid)

  if (error) {
    console.error('Erreur Supabase:', error)
    throw error
  }
  return (data?.[0] ?? {}) as UserType
}
