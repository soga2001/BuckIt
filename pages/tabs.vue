<script lang="ts">

export default defineComponent({
  data() {
    return {
      isDesktop: true,
      current: 0,
    }
  },
  methods: {
    async checkIfDesktop() {
      this.isDesktop = window.innerWidth > 768
    },
  }
})
</script>


<template>
  <ion-page>
    <ion-content>
      <ion-tabs>
        <ion-router-outlet />
        
        <ion-tab-bar :slot="isDesktop ? 'top' : 'bottom'">
          <div class="tabs-left">
            <div>
              Brand
            </div>
            <div>
              <ion-searchbar color="medium" animated show-clear-button="focus" placeholder="Search BuckIt"></ion-searchbar>
            </div>
          </div>

          <div class="tabs-center">

            <ion-tab-button tab="home" href="/home">
              <ion-icon :icon="ioniconsHomeOutline" />
              <!-- <ion-label>Home</ion-label> -->
            </ion-tab-button>

            <ion-tab-button tab="discover" href="/discover">
              <ion-icon :icon="ioniconsCompassOutline" />
              <!-- <ion-label>Discover</ion-label> -->
            </ion-tab-button>

            <ion-tab-button tab="login" href="/login">
              <ion-icon :icon="ioniconsAccessibilityOutline" />
              <!-- <ion-label>Login</ion-label> -->
            </ion-tab-button>
          </div>

          <div class="tabs-right">
            Brand
          </div>
        </ion-tab-bar>
      </ion-tabs>
    </ion-content>
  </ion-page>
</template>

<style scoped>

ion-tab-bar {
  display: grid;
  grid-template-columns: 400px 1fr 400px;
  width: 100%;
  --background: var(--ion-color-dark);
  --color-selected: var(--ion-color-primary);
  --color: var(--ion-color-light);

  /* display: flex; */
  /* justify-content: right; */
}

.tabs-left {
  padding-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

ion-searchbar {
  --border-radius: 20px;
  text-align: left

}

.tabs-center {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.tabs-right {
  padding-right: 10px;
}

</style>