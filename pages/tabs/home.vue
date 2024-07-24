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
      <NuxtLayout name="home-layout">
        <!-- <ion-header>
          <ion-toolbar color="dark">
            <ion-title>Home</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content color="dark">
          Home Content
        </ion-content> -->
        Home
      </NuxtLayout>
</template>
  