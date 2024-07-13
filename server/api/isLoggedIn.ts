// import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import { User } from '~/assets/interface/user';

export default defineEventHandler(async (event) => {
    

    // const supabase = await serverSupabaseClient(event);
//     const user = await serverSupabaseUser(event);
// // 
//     console.log(user)

//     if(user) {
//         // useState('user', user as User)
//         return {
//             authenticated: true,
//             user: user as User
//         }
//     }

//     return {
//         authenticated: false,
//     }
    return {}
})
  