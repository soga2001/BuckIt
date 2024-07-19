<script lang="ts">

export default defineComponent({

})
</script>


<template>
  <div class="flex flex-row h-full w-full">
    <div class="!bg-black text-white basis-1/4">
      Home Layout Left
    </div>
    <div class="w-full basis-1/2">
        <slot> </slot>
    </div> 
    <div class="!bg-black text-white basis-1/4">
      Home Layout Right
    </div>
  </div>
</template>

<style scoped>




</style>
