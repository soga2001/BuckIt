<script lang="ts">

export default defineComponent({
  
    name: 'card',
    data() {
      return {
  
      }
    },
  
})
</script>

<template>
    <ion-card >
      <ion-card-header>
        <ion-item>
          <ion-avatar aria-hidden="true" slot="start" v-if="$slots.avatar">
            <slot name="avatar" />
          </ion-avatar>
          <ion-label>
            <!-- <h1>H1 Heading</h1>
            <p>Paragraph</p> -->
            <ion-card-title>
              <slot name="title" />
            </ion-card-title>
            <ion-card-subtitle>
              <slot name="subtitle" />
            </ion-card-subtitle>
          </ion-label>
        </ion-item>
      </ion-card-header>
      <ion-card-content>
        <slot name="content" />
      </ion-card-content>
    </ion-card>
</template>

<style scoped>

ion-card {
  padding: 0;
  width: 100%;
}

ion-card-header {
  padding: 0;
  border-bottom: 1px solid white;
}

ion-card-content {
  padding: 10px;
}

ion-avatar {
  width: 50px;
  height: 50px;
}


</style>
