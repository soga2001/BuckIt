<script lang="ts">
import type { User, UserMetaData } from '~/assets/interface/user';


definePageMeta({
  // alias: ['/user/:username'],
  path: '/user/:username',
  auth: true,
  name: "profile",
})


useSeoMeta({
  title: " Profile",
  description: 'This is the discover page',
})

export default defineComponent({
  data() {
    return {
      user: null as UserMetaData | null,
      username: this.$route.params.username,
      loadingUser: true,
    }
  },
  setup() {
    const supabase = useSupabaseClient()
    const store = useStore()
    return {supabase, store }
  },
  methods: {
    async getUser() {
      const data = await $fetch(`/api/user?username=${this.username}`)

      if (data.user) {
        this.user = data.user as UserMetaData
        // this.loadingUser = false
        setTimeout(() => {
          this.loadingUser = false
        }, 2000)
      }
    },
    getUsernameFromURL() {

      const regex = /^\/user\/([^/]+)$/;

      const match = this.$route.path.match(regex);

      console.log(this.$route.fullPath)

      if (match) {
        const username = match[1];
        console.log(`Username: ${username}`);
      } else {
        console.log('No username found in the URL');
      }
    },
  },
  created() {
    this.getUser()
  },
  watch: {
    "$route"(value) {
      console.log('here')
      this.username = this.$route.params.username
    },
    username(value) {
      this.getUser()
    }
  },
  mounted() {
    // this.getUser()
  }
})
</script>

<template>
    <ion-page>
      <ion-toolbar v-if="!store.isDesktop" color="dark">
        <ion-buttons @click="$router.go(-1)" slot="start">
          <ion-back-button default-href="#"></ion-back-button>
        </ion-buttons>
        <ion-title class="text-center">{{user?.fullname}}</ion-title>
        <ion-buttons slot="end">
          <ion-icon slot="icon-only" :icon="ioniconsEllipsisVertical"></ion-icon>
        </ion-buttons>
      </ion-toolbar>
       
      <ion-content color="dark">
        <div class="main w-full flex flex-col flex-wrap">
          <div class="flex flex-wrap justify-center gap-10 flex-rows w-full w-2/3 bg-black m-auto" >
            <div class="">
              <Image v-if="!loadingUser" class="profile_image" alt="Image" preview>
                <template #previewicon>
                  <i class="pi pi-search"></i>
                </template>
                <template #image>
                  <img  :src="user?.avatar_url" alt="user_avatar" />
                </template>
                <template #preview="slotProps">
                  <img :src="user?.avatar_url" alt="preview" :style="slotProps.style" @click="slotProps.onClick" />
                </template>
              </Image>
              <Skeleton v-else shape="circle" class="profile_image"></Skeleton>
            </div>
            <div class="my-3 w-1/2 max-w-sm">
              <div class="flex flex-row flex-wrap gap-2 items-center">
                <h1 v-if="!loadingUser" class="text-left text-xl font-bold">{{user?.fullname}}</h1>
                <!-- <span>
                  <ion-icon :icon="ioniconsCheckmarkCircle" class="text-primary"></ion-icon>
                </span> -->
                <Skeleton v-else width="10rem" height="2rem" class="mb-2"></Skeleton>
              </div>
              <p v-if="!loadingUser" class="text-left text-sm">@{{user?.username}}</p>
              <Skeleton v-else width="6rem" height="1rem" class="mb-2"></Skeleton>
              <div v-if="!loadingUser" class="flex flex-wrap flex-row gap-2">
                <ion-button  expand="block" fill="outline" color="primary">Follow</ion-button>
                <ion-button  expand="block" fill="solid" color="secondary">Message</ion-button>
              </div>
              <div v-else class="flex flex-row gap-2">
                <Skeleton width="10rem" height="3rem"></Skeleton>
                <Skeleton width="10rem" height="3rem"></Skeleton>
              </div>
              <div  class="text-left text-sm">
                <p v-if="!loadingUser">{{user?.bio}}</p>
                <div v-else>
                  <Skeleton height="1rem" class="mt-2"></Skeleton>
                  <Skeleton height="1rem" class="mt-2"></Skeleton>
                  <Skeleton height="1rem" class="mt-2"></Skeleton>
                  <Skeleton height="1rem" class="mt-2"></Skeleton>
                </div>
              </div>
              

              <div class="flex flex-row">
                <div class="flex flex-row gap-2" v-if="user?.location">
                  <ion-icon :icon="ioniconsLocationSharp"></ion-icon>
                  <span>{{user?.location}}</span>
                </div>
                <div class="flex flex-row gap-2" v-if="user?.created_at">
                  <ion-icon :icon="ioniconsCalendarSharp"></ion-icon>
                  <!-- <span>{{user?.created_at}}</span> -->
                </div>
              </div>


            </div>
            
          </div>
        </div>
      </ion-content>
    </ion-page> 
</template>
  

<style scoped lang="scss">

.main {
  margin: 0 auto;
  width: 100%;
}

.profile_image {
  width: 200px !important;
  height: 200px !important;
  border-radius: 50%;
  overflow: hidden;
  margin-top: 20px;
  margin-bottom: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border: 2px solid var(--ion-color-primary);
}

ion-icon {
  font-size: 1.3rem !important;
}

</style>