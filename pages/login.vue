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
  