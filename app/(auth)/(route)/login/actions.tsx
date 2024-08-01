'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/supabaseServer'

/*
const [loginInformation, setLoginInformation] = React.useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [accountInformation, setAccountInformation] = React.useState({
        fullname: '',
        username: '',
        bio: '',
        location: '',
        website: '',
        phoneNumber: '',
        maskedPhoneNumber: '',
        avatar_url: '',
        year: '0',
        month: '0',
        day: '0',
    });
*/

export async function login(formData: FormData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return {
      message: error.message,
      status: error.status,
      code: error.code,
    }
  }


  revalidatePath('/', 'layout')
  redirect('/')

}
