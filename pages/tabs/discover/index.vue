<script lang="ts">

definePageMeta({
  alias: ['/discover']
})

useSeoMeta({
  title: 'Disover',
  description: 'This is the discover page',
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
          <ion-title>Discover</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content color="dark">
        Discover Content
      </ion-content>
    </ion-page>
</template>
  