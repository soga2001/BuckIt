import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const supabase = await serverSupabaseClient(event)
  
  const username = query.username as string

  // console.log('username',username)

  const { data: user, error } = await supabase.from('profiles').select().eq('username', username).single()

  // console.log('user',user)

  return {
    user: user
  }
})
