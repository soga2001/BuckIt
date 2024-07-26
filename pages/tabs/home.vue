<script lang="ts">

definePageMeta({
  alias: ['/', '/home'],
  auth: true,
})

useSeoMeta({
  title: 'Home',
  description: 'This is the home page',
})

export default defineComponent({
  data() {
    return {
      
    }
  }
})
</script>

<template>
    <ion-page>
      <NuxtLayout name="home-layout">
        <ion-header>
          <ion-toolbar color="dark">
            <ion-title>Home</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content color="dark">
        <img src="https://phtpbjvibmpkqerebqrn.supabase.co/storage/v1/object/public/avatars/avatars/c8c0e9bb-05ab-4b6d-b440-ca41ba1aea23/avatar" />
        </ion-content>
      </NuxtLayout>
    </ion-page>
</template>
  