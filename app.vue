<script lang="ts">

import { enterOutline, exitOutline, createOutline, homeOutline, eyeOffOutline } from 'ionicons/icons';
import { useStore } from './stores/myStore';
import type { User } from './assets/interface/user';

import '@ionic/vue/css/palettes/dark.always.css';
import '@ionic/vue/css/palettes/high-contrast.class.css';
import '@ionic/vue/css/palettes/high-contrast-dark.class.css';

export default defineComponent({
  data() {
    return {
      // loading: true,
    }
  },
  setup() {
    const supabase = useSupabaseClient()
    const store = useStore()
    return { enterOutline, exitOutline, createOutline, homeOutline, eyeOffOutline, store, supabase}
  },
  methods: {
    async logout() {

      const { error } = await this.supabase.auth.signOut();

      // const response: {error?: string, authenticated?: boolean} = await $fetch('/api/logout', {
      //   method: "POST",
      // })

      if(error) {
        console.log(error?.message)
      }
      else {
        this.store.setUser({} as User)
        this.store.changeAuthenticated(false)
      }
    }
  },
  created() {
    const user = useSupabaseUser();
    if(user.value) {
      this.store.setUser(user.value as User)
      this.store.changeAuthenticated(true)
    }
  },
  mounted() {
    // this.$nextTick()
    // this.loading = false;

  }

})
</script>

<template>
  <ion-app>

     <ion-content>
      
      <!-- <ion-router-outlet /> -->
      <ion-tabs>
        <ion-router-outlet />
        
        <ion-tab-bar slot="top">
           <ion-tab-button tab="home" href="/" v-if="store.isAuthenticated">
            <ion-icon :icon="ioniconsHomeOutline" />
            <ion-label>Home</ion-label>
          </ion-tab-button>

            <ion-tab-button tab="login" href="/login"  v-if="!store.isAuthenticated">
              <ion-icon :icon="ioniconsEnterOutline" />
              <ion-label>Login</ion-label>
            </ion-tab-button>

             <ion-tab-button tab="register" href="/register"  v-if="!store.isAuthenticated">
              <ion-icon :icon="ioniconsCreateOutline" />
              <ion-label>Register</ion-label>
            </ion-tab-button> 
            
             <!-- <ion-tab-button tab="schedule" href="/tabs/schedule">
              <ion-icon :icon="ioniconsAccessibility" aria-hidden="true"></ion-icon>
              <ion-label>Schedule</ion-label>
            </ion-tab-button> -->



            <!-- <NuxtLink to="/" class="nav-link" exactActiveClass="active" v-if="store.isAuthenticated">
              <ion-item>
                <ion-icon slot="start" :icon="ioniconsHomeOutline"></ion-icon>
                <ion-label>Home</ion-label>
              </ion-item>
            </NuxtLink>

            <NuxtLink to="/login" class="nav-link" exactActiveClass="active" v-if="!store.isAuthenticated">
              <ion-item>
                <ion-icon slot="start" :icon="ioniconsEnterOutline"></ion-icon>
                <ion-label>Login</ion-label>
              </ion-item>
            </NuxtLink>

            <NuxtLink to="/register" class="nav-link" exactActiveClass="active" v-if="!store.isAuthenticated">
              <ion-item>
                <ion-icon slot="start" :icon="ioniconsCreateOutline"></ion-icon>
                <ion-label>Register</ion-label>
              </ion-item>
            </NuxtLink> -->

            <!-- <a-dropdown :trigger="['click']" v-if="store.isAuthenticated">
              <ion-avatar>
                <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
              </ion-avatar>
              <template #overlay>
                <a-menu class="menu">
                  <a-menu-item key="0" @click="logout">
                    <ion-item>
                      <ion-icon slot="start" :icon="ioniconsExitOutline"></ion-icon>
                      <ion-label>Logout</ion-label>
                    </ion-item>
                  </a-menu-item>
                  <a-menu-item key="1">
                    <a href="http://www.taobao.com/">2nd menu item</a>
                  </a-menu-item>
                  <a-menu-divider />
                  <a-menu-item key="3">3rd menu item</a-menu-item>
                </a-menu>
              </template>
            </a-dropdown> -->
            
        </ion-tab-bar>
      </ion-tabs>
      
      <!-- <NuxtLayout>
        <nuxt-page />
      </NuxtLayout> -->
    </ion-content>
  </ion-app>
</template>


<style lang="scss">


.menu {
  background-color: black !important;
  // box shadow
  border: 1px solid white;

}



ion-item {
  --background: transparent !important;
  --border: white !important;
}

ion-label {
  border: none !important;
}

ion-icon {
  font-size: 1.5rem;
  // color: white;
}

// .nav-link {
//   color: white;
//   font-weight: 400;

//   * {
//     color: white;
//   }
  
//   &.active * {
//     font-weight: bolder;
//   }

//   &.active {
//     background-color: #2c3e50;
//   }

//   ion-item {
//     --background: transparent;
//   }

// }


// ion-tab-bar {
//   /* flex-direction: row; */
//   gap: 10px;
//   padding: 0;
//   margin: 0;
// }

// ion-tabs a {
//   text-decoration: none;
// }

ion-avatar {
  width: 30px;
  height: 30px;
}

</style>