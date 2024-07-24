

<script lang="ts">

import { defineComponent, ref } from 'vue';
import type { User } from '~/assets/interface/user';


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
      activeStep: 1,
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      invalidPassword: false,

      fullname: '',
      phone: '',
      username: '',
      dob: null,
      bio: null,


      isPassword: true,
      isConfirmPassword: true,

      otp: '',
      invalidOTP: false,
      file: null as File | null,
      imgURL: '',

      registerErrorMessage: '',
    }
  },
  setup() {
    const store = useStore()
    const supabase = useSupabaseClient()
    // const primevue = usePrimeVue();
    return {store, supabase}
  },
  computed: {
    validAccountInfo() {
        let valid = this.email !== '' && this.password !== ''  && this.confirmPassword !== '';
        valid = valid && this.password === this.confirmPassword;
        return !valid;
    },
    validPersonalInfo() {
        let valid = this.fullname && this.phone && this.username;
        return !valid;
    },
  },
  methods: {
    async getPublicURL() {
      const { data } = await this.supabase.storage.from('avatars').getPublicUrl(`avatars/${this.username}/avatar`);
      return data
    },
    async uploadAvatar() {
      if(this.file == null) {
        return null;
      }
      const { data, error } = await this.supabase.storage.from('avatars').upload(`${this.username}/avatar`, this.file)
      if(error) {
        console.log(error.message)
        return null;
      }
      return this.getPublicURL()
    },

    async userExists() {
      const { data, error } = await this.supabase.from('profiles').select("username").eq('username', this.username);

      if(error) {
        console.log(error)
      }
      if(data?.length) {
        return true;
      }
      return false;
    },
    async validInfo() {
      return (this.email !== '' && this.password !== '' && this.confirmPassword !== '' && this.fullname !== '' && this.phone !== '' && this.username !== '') && this.password === this.confirmPassword;
    },
    async register() {
      if(!await this.validInfo()) {
        this.registerErrorMessage = 'Please fill in all fields'
        return;
      }
      if(await this.userExists()) {
        this.registerErrorMessage = 'User already exists'
        return;
      }
      const { data, error } = await this.supabase.auth.signUp(
        {
          email: this.email,
          password: this.password,
          phone: this.phone,
          options: {
            data: {
              fullname: this.fullname,
              username: this.username,
              bio: this.bio,
              dob: this.dob,
              avatar: this.uploadAvatar(),
              location: null,
              website: null,
            },
            
          }
        }
      )
      if(error) {
        console.log(error.message)
      } else {
        this.activeStep++;
      }
    },
    async submitOTP() {
      const { data: { session }, error} = await this.supabase.auth.verifyOtp({ email: this.email, token: this.otp, type: "email" })

      console.log(session)

      const datetime = new Date().toISOString()

      if(error) {
        console.log(error)
      } else {
        // this.store.setUser(session?.user as User)
        this.store.changeAuthenticated(true)
        navigateTo(this.$route.redirectedFrom?.fullPath || '/')
      }
    },
    activateCallback(step: number) {
        this.activeStep = step;
    },
    prev() {
        this.activeStep--;
    },
    next() {
        this.activeStep++;
    },
    // fileChange(e: FileUploadSelectEvent) {
    //   this.file = e.files[0] as File;
    //   this.imgURL = URL.createObjectURL(this.file);
    // },
    // removeFile(e: FileUploadRemoveEvent) {
    //   this.file = null;
    //   this.imgURL = '';
    // },
    formatSize(bytes: any) {
      const k = 1024;
      const dm = 3;
      let sizes = this.primevue.config?.locale?.fileSizeTypes;

      if (bytes === 0 && sizes?.length) {
        return `0 ${sizes[0]}`;
      }

      const i = Math.floor(Math.log(bytes) / Math.log(k));
      const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

      return `${formattedSize} ${sizes?.length && sizes[i]}`;
    }
  },
  watch: {
    file(value) {
      console.log(value);
    }
  }
})

</script>

<template>
  <!-- <NuxtLayout name="auth-layout"> -->
    <q-stepper
      v-model="activeStep"
      ref="stepper"
      animated
      done-color="deep-orange"
      active-color="purple"
      inactive-color="secondary"
    >
      <q-step
        :name="1"
        title="Select campaign settings"
        icon="settings"
        :done="activeStep > 1"
      >
        For each ad campaign that you create, you can control how much you're willing to
        spend on clicks and conversions, which networks and geographical locations you want
        your ads to show on, and more.
      </q-step>

      <q-step
        :name="2"
        title="Create an ad group"
        caption="Optional"
        icon="create_new_folder"
        :done="activeStep > 2"
      >
        An ad group contains one or more ads which target a shared set of keywords.
      </q-step>

      <q-step
        :name="3"
        title="Create an ad"
        icon="add_comment"
      >
        Try out different ad text to see what brings in the most customers, and learn how to
        enhance your ads using features like ad extensions. If you run into any problems with
        your ads, find out how to tell if they're running and how to resolve approval issues.
      </q-step>

      <q-step
        :name="4"
        title="Create a potato"
        icon="add_comment"
      >
        Try out different ad text to see what brings in the most customers, and learn how to
        enhance your ads using features like ad extensions. If you run into any problems with
        your ads, find out how to tell if they're running and how to resolve approval issues.
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn @click="($refs.stepper as any).next()" color="deep-orange" :label="activeStep === 4 ? 'Finish' : 'Continue'" />
          <q-btn v-if="activeStep > 1" flat color="deep-orange" @click="($refs.stepper as any).previous()" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  <!-- </NuxtLayout> -->
  
</template>

<style lang="scss" scoped>

ion-content {
  --background: transparent !important;
  color: white !important;
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

#ion-textarea-0 {
  --background: red !important;

}


img {
    max-width: 100%;
    max-height: 150px;
    object-fit: cover;

}

ion-button {

    &.avatar-upload {
        color: var(--ion-color-primary);
        --background: transparent;
        border: 1px solid var(--ion-color-primary);
        border-radius: 50%;
        transition: all .1s ease-in-out;

        &:hover {
          color: white;
          --background: rgba(var(--ion-color-primary-shade-rgb), .4);
          border: 1px solid white;
        }
    }

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



ion-icon {
    font-size: 1.5rem;

    &.upload-icon {
        font-size: 3rem;
        color: var(--ion-color-primary);
        border: 2px dashed var(--ion-color-primary);
        border-radius: 50%;
        padding: 30px;
    }
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