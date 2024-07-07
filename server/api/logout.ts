import { serverSupabaseClient } from '#supabase/server'

import { deleteCookie } from 'h3';



export default defineEventHandler(async (event) => {

    const supabase = await serverSupabaseClient(event);


    const {error} = await supabase.auth.signOut()
    
    if(error) {
        return {
            error: error.message
        }
    }

    deleteCookie(event, 'sb-access-token')
    deleteCookie(event, 'sb-refresh-token')


    return {
      authenticated: false,
    }
})
  