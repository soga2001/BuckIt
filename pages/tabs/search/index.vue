<script lang="ts">

definePageMeta({
  alias: ['/search']
})

useSeoMeta({
  title: 'Search',
  description: 'This is the search page',
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
          <ion-title>Search</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content color="dark">
        Search Content
      </ion-content>
    </ion-page>
</template>
  