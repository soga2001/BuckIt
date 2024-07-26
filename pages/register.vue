

<script lang="ts">

import RegistrationComponent from '@/components/RegistrationComponent.vue';


definePageMeta({
  name: 'register',
  alias: '/register',
  auth: false,
  layout: 'auth-layout',
})

useSeoMeta({
  title: 'Register',
  description: 'Register for an account',
  keywords: 'register, account, signup',
})

export default defineComponent({
  data() {
    return {
      
    }
  },
  setup() {
    
  },

  components: {
    RegistrationComponent
  }
})

</script>

<template>
  <NuxtLayout name="auth-layout">
    <ion-content color="dark">
        <RegistrationComponent />
    </ion-content> 
  </NuxtLayout>
  
</template>

<style lang="scss" scoped>

ion-content {
  --background: transparent !important;
  color: white !important;
}

.activeStep {
  background-color: rgba(var(--ion-color-primary-rgb), 0.1);

  color: var(--ion-color-primary);

}










.card {
    width: 100%;
    padding: 0 30px;
    border-radius: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 760px;
    width: 100%;
}

.step-panels {
    max-width: 760px;
    width: 100%;

    min-height: 500px;
    height: 100%;
}

.buttons {
    
    max-width: 760px;
    width: 100%;
}

ion-input {

    &.has-focus {
      
      ion-icon {
        color: var(--ion-color-primary);
      }
    }
}




ion-button {


    &.delete_button {
        
      --background: transparent !important;
      color: red;
      border: 1px solid red;
      border-radius: 50%;

        &:hover {
          color: rgba(var(--ion-color-danger-contrast-rgb));
          --background: red !important;
        }
    
    }

}



ion-spinner {
    width: 1.5rem;
    height: 1.5rem;
}

.p-fileupload {
    // border-radius: 10px;
    padding: 0;
    width: 100%;
    height: 100%;

}

.p-step {
  
  .p-step-header {
    background-color: var(--ion-color-primary);
    color: var(--ion-color-light);
  }
}

</style>