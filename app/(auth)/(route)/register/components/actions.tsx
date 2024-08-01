'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import type { SignUpWithPasswordCredentials } from '@supabase/supabase-js'

import { createClient } from '@/utils/supabase/supabaseServer'

type SignUpProps = {
  loginInformation: {
    email: string,
    password: string,
    confirmPassword: string,
  },
  accountInformation: {
    fullname: string,
    username: string,
    bio: string,
    location: string,
    website: string,
    phone: string,
    avatar_url: string,
    year: string,
    month: string,
    day: string,
  }
}

type sighUpResponse = {
  message: string,
  status: number,
  code: string,
}

const validate = (data: SignUpProps) => {
  const regex = new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
  if(data.loginInformation.email.match(regex) === null) {
    return {
      message: 'Email is required',
      status: 400,
      code: 'email_required',
    }
  }
  if(data.loginInformation.password.length < 1) {
    return {
      message: 'Password is required',
      status: 400,
      code: 'password_required',
    }
  }
  if (data.loginInformation.password !== data.loginInformation.confirmPassword) {
    return {
      message: 'Passwords do not match',
      status: 400,
      code: 'passwords_do_not_match',
    }
  }
  if(data.loginInformation.password.length < 7) {
    return {
      message: 'Password must be at least 8 characters',
      status: 400,
      code: 'password_too_short',
    }
  }
  
  return {
    message: 'Success',
    status: 200,
    code: 'success',
  }
}



export async function signup(formData: SignUpProps): Promise<sighUpResponse> {
  const supabase = createClient()

  const { message, status, code } = validate(formData)

  if (status === 400) {
    return {
      message,
      status,
      code,
    }
  }

  const { email, password } = formData.loginInformation
  const { fullname, username, bio, location, website, phone, avatar_url, year, month, day } = formData.accountInformation

  const dob = new Date(parseInt(year), parseInt(month) + 1, parseInt(day)).toISOString()

 

  const personalInfo = {
    fullname,
    username,
    bio,
    location,
    website,
    avatar_url,
    dob,
  }

  const loginData = {
    email,
    password,
    phone,
    options: {
      data: personalInfo
    }
  } as SignUpWithPasswordCredentials

  // const { data, error } = await supabase.auth.signUp({
  //   email: loginData.email,
  //   password: loginData.password,
  //   phone: loginData.phone,
  //   options: {
  //     data: personalInfo
  //   }}
  // )

  const { data, error } = await supabase.auth.signUp(loginData)

  if (error) {
    if(error.status == 500) {
      return {
        message: 'User with this username already exists',
        status: 500,
        code: error.code as string,
      }
    }
    return {
      message: error.message,
      status: error.status as number,
      code: error.code as string,
    }
  }

  return {
    message: 'Success',
    status: 200,
    code: 'success',
  }

  

  // const data = {
  //   email: formData.get('email') as string,
  //   password: formData.get('password') as string,
  //   confirmPassword: formData.get('confirmPassword') as string,

  // }
  

  // const { error } = await supabase.auth.signInWithPassword(data)

  // if (error) {
  //   return {
  //     message: error.message,
  //     status: error.status,
  //     code: error.code,
  //   }
  // }
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