<script lang="ts">

import Card from '~/components/card.vue'

import type {InfiniteScrollCustomEvent, RefresherEventDetail} from '@ionic/vue';

definePageMeta({
  auth: true,
  name: 'Home',
  layout: 'home-layout'
})

useSeoMeta({
  title: 'Home',
  description: 'This is the home page',

})

export default defineComponent({
  data() {
    return {
      data: Array<String>(),
    }
  },
  setup() {
    // const items = reactive<String[]>([]);

    // const generateItems = () => {
    //   const count = items.length + 1;
    //   for (let i = 0; i < 10; i++) {
    //     items.push(`Item ${count + i}`);
    //   }
    // };

    // const ionInfinite = (ev: InfiniteScrollCustomEvent) => {
    //   generateItems();
    //   setTimeout(() => ev.target.complete(), 2000);
    // };

    // generateItems();

    // return { ionInfinite, items };
  },
  methods: {
    ionScroll(ev: InfiniteScrollCustomEvent) {
      this.generateItems();
      // ev.target.complete();
      setTimeout(() => ev.target.complete(), 1000);
    },
    generateItems() {
      const count = this.data.length + 1;
      for (let i = 0; i < 30; i++) {
        this.data.push(`Item ${count + i}`);
      }
    },
    handleRefresh(event: CustomEvent) {
      event.target?.complete()
    }
  },
  created() {
    this.generateItems();
  },
  components: {
    Card
  }

})
</script>

<template>
  <ion-page>
    <ion-content>
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
     <NuxtLayout>
        <div class="card" v-for="(n, index) in data" :key="index">
          <Card>
            <template #avatar>
              <img alt="" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
            </template>

            <template #title>
              <h1>Card Title {{ index }}</h1>
            </template>

            <template #subtitle>
              <h2>Card Subtitle</h2>
            </template>
            
            <template #content>
              <div v-for="n in 10" :key="n">
                <ion-checkbox justify="start" label-placement="end">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. {{ n }}
                </ion-checkbox>
              </div>
            </template>
          </Card>
        </div>
        <ion-infinite-scroll @ionInfinite="ionScroll">
          <ion-infinite-scroll-content ></ion-infinite-scroll-content>
        </ion-infinite-scroll>
    </NuxtLayout> 
  </ion-content>
  </ion-page>
</template>

<style scoped>


ion-checkbox {
  width: 100%;
  overflow: wrap;
}

</style>
