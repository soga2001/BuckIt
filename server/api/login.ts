// import { serverSupabaseClient } from '#supabase/server'

import { setCookie } from 'h3';



export default defineEventHandler(async (event) => {
    

    // const body = await readBody(event);
    // const supabase = await serverSupabaseClient(event);

    // const { data: { session }, error } = await supabase.auth.signInWithPassword({
    //     email: body.email,
    //     password: body.password,
    // })

    // console.log(session);
    // let cookie;

    // if(session) {
    //     cookie = setCookie(event, 'sb-access-token', session.access_token, {
    //         // maxAge: session.expires_in,
    //         maxAge: 60 * 60 * 8,
    //         secure: true,
    //         sameSite: 'lax',
    //         // httpOnly: true,
            
    //     } )

    //     cookie = setCookie(event, 'sb-refresh-token', session.refresh_token, {
    //         // maxAge: session.expires_in,
    //         maxAge: 60 * 60 * 8,
    //         secure: true,
    //         sameSite: 'lax',
    //         // httpOnly: true,
            
    //     } )
    // }

    
    
    // if(error) {
    //     return {
    //         error: error.message
    //     }
    // }

    // // const email = body.email
    // // const password = body.password

    // // const store = useAuthStore()
    // // store.changeAuthenticated();


    // return {
    //     authenticated: true,
    //     user: session?.user,
    //     cookie: cookie
    // }

    return {}
})
  