export interface User {
    id: string,
    aud: string,
    role: string,
    email: string,
    email_confirmed_at: string,
    phone: string,
    confirmed_at: string,
    last_sign_in_at: string,
    // app_metadata: {
    //     provider: string,
    //     providers: string[]
    // },
    user_metadata: {},
    // identities: {
    //     provider: string,
    //     connection: string,
    //     isSocial: boolean
    // }[],
    created_at: string,
    updated_at: string,
    is_anonymous: boolean
}