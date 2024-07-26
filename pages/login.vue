<script lang="ts">
import { defineComponent } from 'vue'

// import { IonIcon } from '@ionic/vue';
import type {User} from '~/assets/interface/user.ts'
import {useStore} from '~/stores/store'

import LoginComponent from '~/components/LoginComponent.vue'

definePageMeta({
  auth: false,
  name: "login",
  layout: "auth-layout"
})

useSeoMeta({
  title: 'Login',
  description: 'This is the login page',
  
})

export default defineComponent({
  data() {
    return {
    
    }
  },
  setup() {
    const store = useStore()
    const supabase = useSupabaseClient()
    return {store, supabase}
  },
  methods: {
    async login() {

        const { data: { session }, error } = await this.supabase.auth.signInWithPassword({
          email: this.email,
          password: this.password,
        })

    
        
        // const response: {error?: string, authenticated?: boolean, user?: User} = await $fetch('/api/login', {
        //     method: "POST",
        //     body: {
        //         email: this.email,
        //         password: this.password
        //     }
        // })

        if (error) {
          this.error = error.message
          // console.log(error)
        } else {
          this.store.setUser(session?.user as User)
          this.store.changeAuthenticated(true)
          navigateTo(this.$route.redirectedFrom?.fullPath || '/')
        }

        

    }
  },
})
</script>

<template>
    <ion-page>
      <NuxtLayout name="auth-layout">
        <ion-content color="dark">
          <div class="main">
            <LoginComponent />
          </div>
        </ion-content>
      </NuxtLayout>
    </ion-page>
</template>

<style scoped>
.main {

    height: 100vh;
    max-width: 600px;
    padding: 30px 0;
    margin: 0 auto;
    width: 100%;
}

</style>
  