import { Category } from '@/src/@types/CategoryType'
import { supabase } from '../supabase'

export async function getCategories(): Promise<Category[]> {


  const { data, error } = await supabase
    .from('Categories')
    .select('*')


  if (error) {
    console.error('Erreur Supabase:', error)
    return []
  }

  return data ?? []
}
