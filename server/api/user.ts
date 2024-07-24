import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const supabase = await serverSupabaseClient(event)
  
  const username = query.username as string

  const { data: user } = await supabase.from('profiles').select().eq('username', username).single()


  return {
    user: user
  }
})
