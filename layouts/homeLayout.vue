<script lang="ts">

export default defineComponent({

  name: 'homeLayout',
  data() {
    return {

    }
  },
})
</script>



<template>
  <main>
    <div>

    </div>

    <div class="slot">
      <slot> </slot>
    </div>

    <div>

    </div>
  </main>
</template>

<style scoped lang="scss">
@import '@/assets/css/_variables.scss';



main {
  display: grid;
  grid-template-columns: 350px minmax(300px, 1fr)  350px;

  @media only screen and (max-width: $tablet) {
    grid-template-columns: 1fr;
  }

}

.slot {
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  width: 100% !important;
  word-wrap: break-word;
}

</style>
