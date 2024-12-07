import { Injectable } from '@angular/core';
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js'
import { environment } from '../../../environments/environment'
import type { RegistrationInfoInterface } from '../../../assets/interface/RegistrationInformation';

export interface Profile {
  id: string
  username: string
  email: string
  avatar_url: string
  bio: string,
}

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient
  _session: AuthSession | null = null

  constructor() {
    this.supabase = createClient(environment.supabaseUrl as string, environment.supabaseKey as string)
  }

  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session
    })
    return this._session
  }

  profile(username: string) {
    return this.supabase
      .from('profiles')
      .select(`username, website, avatar_url, bio`)
      .eq('username', username)
      .single()
  }

  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange(callback)
  }

  register(info: RegistrationInfoInterface) {
    if(!info.loginInformation.email || !info.loginInformation.password || !info.loginInformation.confirm_password) {
      return Promise.reject('Email and password are required')
    }
    if(!info.personalInformation.username || !info.personalInformation.phone_number) {
      return Promise.reject('Username and phone number are required')
    }
    if(info.loginInformation.password.length < 8) {
      return Promise.reject('Password must be at least 8 characters')
    }
    if(info.loginInformation.password !== info.loginInformation.confirm_password) {
      return Promise.reject('Passwords do not match')
    }
    return this.supabase.auth.signUp({
      email: info.loginInformation.email,
      password: info.loginInformation.password,
      options: {
        data: info.personalInformation,
      }
    })
  }

  signInWithPassword(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password })
  }

  signInWithOtp(email: string) {
    return this.supabase.auth.signInWithOtp({ email })
  }

  signOut() {
    return this.supabase.auth.signOut()
  }

  updateProfile(profile: Profile) {
    const update = {
      ...profile,
      updated_at: new Date(),
    }

    return this.supabase.from('profiles').upsert(update)
  }

  downLoadImage(path: string) {
    return this.supabase.storage.from('avatars').download(path)
  }

  uploadAvatar(filePath: string, file: File) {
    return this.supabase.storage.from('avatars').upload(filePath, file)
  }

}
