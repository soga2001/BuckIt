'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/supabaseServer'

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

export async function searchUsers(searchTerm: string) {

  const supabase = createClient()

  if(searchTerm.length < 2) {
    return {
      user: null,
      error: 'Search term must be at least 3 characters long'
    }
  }

  const { data: user, error } = await supabase.from('profiles').select().ilike('username', `%${searchTerm}%`)
  
  return {
      user: user,
      error
  }
}

