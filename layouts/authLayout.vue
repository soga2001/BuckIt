<script lang="ts">

export default defineComponent({

})
</script>


<template>
  <div class="main">
    <div>
      Hello
    </div>
    <slot> </slot> 
  </div>
</template>

<style scoped>

.main {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  height: 100dvh;
}


</style>
