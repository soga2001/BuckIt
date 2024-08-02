import { createClient } from '@/utils/supabase/supabaseServer'

export async function getUser(searchTerm: string) {

    const supabase = createClient()
  
    const { data: user, error } = await supabase.from('profiles').select().eq('username', searchTerm).single()

    
    

    return {
        user: user,
        error: error
    }
  }