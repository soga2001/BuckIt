import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const supabase = await serverSupabaseClient(event)
  
  const searchQuery = query.query as string



  const { data, error } = await supabase.from('profiles').select().textSearch('username', `'${searchQuery}'`)


  return {
    user: [data]
  }
})
