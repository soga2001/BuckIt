'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/supabaseServer'

export async function signup(formData: FormData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,

  }
  

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return {
      message: error.message,
      status: error.status,
      code: error.code,
    }
  }
}

export async function UploadImage(formData: FormData) {
    const supabase = createClient()

    const avatarFile = formData.get('avatar') as File

    const { data: { user } } = await supabase.auth.getUser()

    if(user !== null) {
        try {
            const { data, error } = await supabase.storage.from('avatars').upload(`${user?.id}/avatar.jpg`, avatarFile)
            return {
                uploaded: true,
                message: 'Avatar uploaded'
            }
        } catch (e) {
            const { data, error } = await supabase
            .storage
            .from('avatars')
            .update(`'${user?.id}/avatar1.png'`, avatarFile, {
                cacheControl: '3600',
                upsert: true
            })
            return {
                uploaded: true,
                message: 'Avatar updated'
            }
        }
    }

    return {
        uploaded: false,
        message: 'Avatar not uploaded, please try again'
    }
    
    // if (error) {
    //     return {
    //     message: error.message,
    //     status: error.status,
    //     code: error.code,
    //     }
    // }
}



export async function SubmitOTP(token: string, email: string) {
  const supabase = createClient()


  const {data, error: e} = await supabase.auth.getUser();

  if (e) {
    return {
      message: e.message,
      status: e.status,
      code: e.code,
    }
  }





  const { error } = await supabase.auth.verifyOtp({email, token, type: 'email'})

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