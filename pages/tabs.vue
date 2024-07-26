<script lang="ts">

import { defineComponent, ref } from 'vue'

import {useStore} from '~/stores/store'
import type {User} from '@/assets/interface/user';
import { useSupabaseUser } from '#imports';

export default defineComponent({
  data() {
    return {
      isDesktop: true,
      current: 0,
      dropdown: [
        { name: 'Settings & Privacy', icon: ioniconsSettingsOutline, routerLink: '/settings' },
        // { name: 'Discover', icon: 'pi pi-compass', routerLink: '/discover' },
        { name: 'Logout', icon: ioniconsExitOutline, action: () => {this.logout()} }
      ],
      menu: ref(),
    }
  },
  setup() {
    const store = useStore();
    const supabase = useSupabaseClient();
    return {store, supabase}
  },
  methods: {
    async checkIfDesktop() {
      this.store.changeDevice(this.$device.isDesktop as boolean)
    },
    toggle(event: Event) {
      (this.$refs.menu as any).toggle(event)
    },
    async logout() {

      console.log('here')
      const { error } = await this.supabase.auth.signOut();


      if(error) {
        console.log(error?.message)
      }
      else {
        this.store.setUser({} as User)
        this.store.changeAuthenticated(false)
      }
    }
  },
  mounted() {
    this.checkIfDesktop()
    window.addEventListener('resize', this.checkIfDesktop)
  },
  beforeMount() {
    const user = useSupabaseUser()
    this.store.setUser((user.value as unknown) as User)
  }
})
</script>


<template>
  <ion-page>
    <ion-content>
      <ion-tabs>
        <ion-router-outlet />
        
        <ion-tab-bar class="flex flex-row w-full" :slot="store.desktop ? 'top' : 'bottom'">
          <div class="tabs-left flex-none basis-1/3">
            <div>
              <ion-button shape="round">
                <ion-icon slot="icon-only" :icon="ioniconsHeart"></ion-icon>
              </ion-button>
            </div>
            <div>
              <ion-searchbar color="medium" animated show-clear-button="focus" placeholder="Search BuckIt"></ion-searchbar>
            </div>
          </div>

          <div class="tabs-center grow basis-1/3 md:basis-1/2">

            <ion-tab-button tab="home" href="/home">
              <ion-icon :icon="ioniconsHomeOutline" />
              <!-- <ion-label>Home</ion-label> -->
            </ion-tab-button>

            <ion-tab-button tab="discover" href="/discover">
              <ion-icon :icon="ioniconsCompassOutline" />
              <!-- <ion-label>Discover</ion-label> -->
            </ion-tab-button>

          </div>

          <div class="tabs-right flex-none flex gap-2 basis-1/3">

            <OverlayBadge >
              <ion-icon :icon="ioniconsNotifications" />
            </OverlayBadge>


            <Button class="p-0 m-0 w-fit border-primary"  severity="info" rounded outlined  @click="toggle" aria-haspopup="true" aria-controls="overlay_menu">
              <Avatar v-if="store.user.user_metadata?.avatar_url !== ''" :image="store.user.user_metadata?.avatar_url" shape="circle" />  
              <Avatar v-else image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
            </Button>
            <Menu ref="menu" id="overlay_menu" :model="dropdown" :popup="true" >
              <template #start>
                <!-- @click.stop="$router.push({name: 'profile', params: {username: store.user.user_metadata?.username}})" -->
                <button @click="$router.push(`/user/${store.user.user_metadata?.username}`)" v-ripple class="relative overflow-hidden w-full p-link flex items-center p-2 pl-3 text-surface-700 dark:text-surface-0/80 hover:bg-surface-200 dark:hover:bg-surface-600 rounded-none">
                  <Avatar v-if="store.user.user_metadata?.avatar_url !== ''" :image="store.user.user_metadata?.avatar_url" class="border-primary border mr-2" shape="circle" />  
                  <Avatar v-else image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" class="border-primary border mr-2" shape="circle" />
                    <span class="inline-flex flex-col justify-start">
                        <span class="font-bold text-left">{{ store.user.user_metadata?.fullname }}</span>
                        <span class="text-sm text-left">@{{ store.user.user_metadata?.username }}</span>
                    </span>
                </button>
              </template>
              <template #item="{ item, props }">
                  <a v-ripple class="flex items-center" v-bind="props.action" @click="item.action">
                      <!-- <span :class="item.icon" /> -->
                      <ion-icon :icon="item.icon" />
                      <span class="ml-2">{{ item.name }}</span>
                      <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
                      <span v-if="item.shortcut" class="ml-auto border border-surface-200 dark:border-surface-700 rounded-md bg-surface-100 dark:bg-surface-700 text-xs p-1">{{ item.shortcut }}</span>
                  </a>
                  <!-- Hello -->
              </template>
            </Menu>

            

          </div>
        </ion-tab-bar>
      </ion-tabs>
    </ion-content>
  </ion-page>
</template>

<style scoped lang="scss" >

ion-tab-bar {
  /* display: grid;
  grid-template-columns: minmax(100px, 300px) 1fr minmax(100px, 300px); */
  width: 100%;
  --background: var(--ion-color-dark);
  --color-selected: var(--ion-color-primary);
  --color: var(--ion-color-light);
}

ion-icon {
  font-size: 1.8rem;
}

.tabs-left {
  padding-left: 10px;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  gap: 10px;
}

ion-searchbar {
  --border-radius: 20px;
  text-align: left;
  padding: 0;
  margin: 0;

}

.tabs-center {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.tabs-right {
  padding-right: 10px;
  display: flex;
  justify-content: end;
}

</style>