import { Injectable } from '@angular/core';
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js'
import { environment } from '../environments/environment'

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

}
