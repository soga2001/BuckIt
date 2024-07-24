<script lang="ts">
import type { UserMetaData } from '~/assets/interface/user';


definePageMeta({
  alias: ['/user/:username'],
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
      username: this.$route.params.username
    }
  },
  setup() {
    const supabase = useSupabaseClient()
    return {supabase }
  },
  methods: {
    async getUser() {
      const data = await $fetch(`/api/user?username=${this.username}`)

      if (data.user) {
        this.user = data.user as UserMetaData
      }
    },
    getUsernameFromURL() {
      // regex to get username from url? 

      const regex = /^\/user\/([^/]+)$/;

      const match = this.$route.path.match(regex);

      console.log(this.$route.fullPath)

      if (match) {
        const username = match[1];
        console.log(`Username: ${username}`);
      } else {
        console.log('No username found in the URL');
      }

      // return match ? match[1] : null

      // return this.$route.params.username || 
    },
  },
  created() {
    // this.getUsernameFromURL()
    console.log(this.$route.params.username)
    this.getUser()
  },
  watch: {
    "$route"(value) {
      // this.getUser()
      this.username = this.$route.params.username
    },
    username(value) {
      this.getUser()
    }
  },
  // beforeRouteUpdate(async (to, from) => {
  // // only fetch the user if the id changed as maybe only the query or the hash changed
  //   if (to.params.id !== from.params.id) {
  //     userData.value = await fetchUser(to.params.id)
  //   }
  // })
})
</script>

<template>
    <ion-page>
      <ion-toolbar color="dark">
        <ion-buttons @click="$router.go(-1)" slot="start">
          <ion-back-button default-href="#"></ion-back-button>
        </ion-buttons>
        <ion-title class="text-center">{{user?.fullname}}</ion-title>
      </ion-toolbar>
      <ion-content color="dark">
        Discover Content
      </ion-content>
    </ion-page> 
</template>
  