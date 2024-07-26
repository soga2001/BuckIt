<script lang="ts">
import { defineComponent } from 'vue'

// import { IonIcon } from '@ionic/vue';
import type {User} from '@/assets/interface/user.ts'
import {useStore} from '@/stores/store'


export default defineComponent({
  data() {
    return {
      email: "",
      password: "",

      data: null as any,

      error: '',

      togglePassword: true,

      disabled: true,


    }
  },
  setup() {
    const store = useStore()
    const supabase = useSupabaseClient()
    return {store, supabase}
  },
  methods: {
    async login() {

        const { data: { session }, error } = await this.supabase.auth.signInWithPassword({
          email: this.email,
          password: this.password,
        })

    
        
        // const response: {error?: string, authenticated?: boolean, user?: User} = await $fetch('/api/login', {
        //     method: "POST",
        //     body: {
        //         email: this.email,
        //         password: this.password
        //     }
        // })

        if (error) {
          this.error = error.message
          // console.log(error)
        } else {
          this.store.setUser((session?.user as unknown) as User)
          this.store.changeAuthenticated(true)
          navigateTo(this.$route.redirectedFrom?.fullPath || '/')
        }

        

    }
  },
})
</script>

<template>
    <div class="main bg-green">
        <form class="form flex flex-col gap-3" ref="loginForm" @submit.prevent="login">
            <div class="title">
                <h1>Sign in to BuckIt</h1>
            </div>
            <!-- <div class="flex-column">
            <label>Email </label>
            </div>

            <ion-input placeholder="Enter your email" fill="outline" v-model="email" :clear-input="true">
            <ion-icon slot="start" :icon="ioniconsAtSharp" aria-hidden="true"></ion-icon>
            </ion-input> -->

            <div class="flex flex-col gap-3">
              <div class="flex-column">
                <label>Email</label>
              </div>

              <InputGroup class="input-group">
                  <InputGroupAddon class="input-addon">
                    <ion-icon :icon="ioniconsAtCircle" aria-hidden="true"></ion-icon>
                  </InputGroupAddon>
                  <InputText class="input" variant="outlined" v-model="email" placeholder="Enter your email" />
              </InputGroup>
            </div>

            <div class="flex flex-col gap-3">
              <div class="flex-column">
                <label>Password </label>
              </div>


              <InputGroup class="input-group">
                  <InputGroupAddon class="input-addon">
                    <ion-icon :icon="ioniconsLockClosed" aria-hidden="true"></ion-icon>
                  </InputGroupAddon>
                  <InputText :type="togglePassword ? 'password' : 'text'" class="input" variant="outlined" v-model="password" placeholder="Enter your password"/>
                  <InputGroupAddon class="border-none" v-if="password !== ''">
                    <ion-icon :icon="togglePassword ? ioniconsEye : ioniconsEyeOff" @click="togglePassword = !togglePassword" />
                  </InputGroupAddon>
              </InputGroup>
            </div>
            
            
            <div class="flex w-full justify-between">
              <div>
              </div>
              <span class="link text-sm">Forgot password?</span>
            </div>
            <div class="flex justify-center">
              <input :disabled="email == '' && password == ''"class="button-submit text-md font-bold" type="submit" value="Sign In"/>
            </div>
            <p class="flex justify-center items-center">Don't have an account? 
            <span class="span">
                <!-- <ion-button href="/register" class="text-white" fill="clear">Sign Up</ion-button> -->
                <ion-button class="hover-primary ml-3 capitalize rounded-md" href="/register" fill="clear">Sign Up</ion-button>
            </span>
            </p>

            <div class="separator p-5">
              <hr class="line bg-white">
              <span>Or</span>
              <hr class="line bg-white">
            </div>

            <div class="flex gap-5">
            <button class="btn google">
                <ion-icon :icon="ioniconsLogoGoogle" />
        
                Google 
                
            </button>
            <button class="btn apple">
                <ion-icon :icon="ioniconsLogoApple" />
                Apple 
                
            </button>
            </div>
        </form>
    </div>
</template>

<style scoped lang="scss">
.main {

    height: 100vh;
    max-width: 600px;
    padding: 30px 0;
    margin: 0 auto;
    width: 100%;
}





.link {
  margin-left: 5px;
  cursor: pointer;
  
  // capitalize 
  text-transform: capitalize !important;
  text-decoration: underline;



  &:hover {
    color: rgba(var(--ion-color-primary-rgb));
  
  }
}


.button-submit {

  // height: 50px;
  padding: 13px 40px;
  border-radius: 10px;
  border: 1px solid var(--ion-color-primary);
  color: white;
  cursor: pointer;
  transition: 0.2s ease-in-out;

  &:hover {
    background-color: rgba(var(--ion-color-primary-rgb), 0.2);
  }
}




.p {
  text-align: center;
  /* color: black; */
  font-size: 14px;
  margin: 5px 0;
}

.btn {
  margin-top: 10px;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  gap: 10px;
  border: 1px solid #ededef;
  background-color: transparent;
  /* color: black; */
  cursor: pointer;
  // transition: 0.2s ease-in-out;

 
}

.btn:hover {
  border-color: var(--ion-color-primary);
  color: var(--ion-color-primary);

  & > ion-icon {
    color: var(--ion-color-primary);
  }
}


ion-icon {
  font-size: 1.5rem;
}

.separator {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
}

.separator .line {
  display: block;
  width: 100%;
  height: 1px;
  border: 0;
}
</style>
  