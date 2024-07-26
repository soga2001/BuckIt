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
    user_metadata?: UserMetaData,
    created_at: string,
    updated_at: string,
    is_anonymous: boolean
}


export interface UserMetaData {
    id: string,
    fullname: string,
    username: string,
    avatar_url: string,
    bio: string,
    website: string,
    location: string,
    dob: string,
}