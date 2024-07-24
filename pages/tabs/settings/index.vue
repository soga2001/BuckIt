<script lang="ts">

definePageMeta({
  // alias: ['/settings'],
  path: '/settings',
})

useSeoMeta({
  title: 'Settings',
  description: 'This is the settings page',
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
      <ion-header>
        <ion-toolbar color="dark">
          <ion-title>Settings</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content color="dark">
        Settings Content
      </ion-content>
    </ion-page>
</template>
  