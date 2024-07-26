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

      isPassword: true,

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
          this.store.setUser(session?.user as User)
          this.store.changeAuthenticated(true)
          navigateTo(this.$route.redirectedFrom?.fullPath || '/')
        }

        

    }
  },
})
</script>

<template>
    <div class="main bg-green">
        <form class="form" ref="loginForm" @submit.prevent="login">
            <div class="title">
                <h1>Sign in to BuckIt</h1>
            </div>
            <div class="flex-column">
            <label>Email </label>
            </div>

            <ion-input placeholder="Enter your email" fill="outline" v-model="email" :clear-input="true">
            <ion-icon slot="start" :icon="ioniconsAtSharp" aria-hidden="true"></ion-icon>
            </ion-input>
            
            <div class="flex-column">
            <label>Password </label>
            </div>

            <ion-input placeholder="Enter your password" fill="outline" v-model="password" :type="isPassword ? 'password' : 'text'">
            <ion-icon slot="start" :icon="ioniconsLockClosed" aria-hidden="true"></ion-icon>
            <ion-button fill="clear" slot="end" aria-label="Show/hide" @click="isPassword = !isPassword">
                <ion-icon slot="icon-only" :icon="isPassword ? ioniconsEyeOutline : ioniconsEyeOffOutline" aria-hidden="true"></ion-icon>
            </ion-button>
            </ion-input>
            
            <div class="flex-row">
            <div>
            </div>
            <span class="span">Forgot password?</span>
            </div>
            <input class="button-submit" type="submit" value="Sign In"/>
            <p class="flex justify-center items-center">Don't have an account? 
            <span class="span">
                <ion-button href="/register" fill="clear">Sign Up</ion-button>
                <!-- <ion-button :router-link="{name: 'register'}" fill="clear">Sign In</ion-button> -->
                <!-- <nuxt-link to="/register">Sign Up</nuxt-link> -->
            </span>
            </p>
            <p class="p line">Or With</p>

            <div class="flex-row">
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

<style scoped>
.main {

    height: 100vh;
    max-width: 600px;
    padding: 30px 0;
    margin: 0 auto;
    width: 100%;
}

ion-icon {
  font-size: 25px;

}

.title {
    /* color: #151717; */
    font-size: 30px;
    font-weight: 600;
    /* border-bottom: 2px solid rgb(255, 255, 255); */
    margin-bottom: 10px;
}


.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  /* background-color: #ffffff; */
  padding: 30px;
  /* width: 100%; */
  border-radius: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

::placeholder {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.form button {
  align-self: flex-end;
}

.flex-column > label {
  /* color: #151717; */
  font-weight: 600;
}

.inputForm {
  border: 1.5px solid #ecedec;
  border-radius: 10px;
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  transition: 0.2s ease-in-out;
}

.input {
  margin-left: 10px;
  border-radius: 10px;
  border: none;
  width: 85%;
  height: 100%;
  background-color: transparent;
}

.input:focus {
  outline: none;
}

.inputForm:focus-within {
  border: 1.5px solid #2d79f3;
}

.flex-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
}

.flex-row > div > label {
  font-size: 14px;
  /* color: black; */
  font-weight: 400;
}

.span {
  font-size: 14px;
  margin-left: 5px;
  color: #2d79f3;
  font-weight: 500;
  cursor: pointer;
}

input[type="checkbox"] {
    color: transparent !important;
    margin-right: 3px;
}

.button-submit {
  margin: 20px 0 10px 0;
  background-color: #151717;
  border: none;
  /* color: white !important; */
  font-size: 15px;
  font-weight: 500;
  border-radius: 10px;
  height: 50px;
  width: 100%;
  cursor: pointer;
}

.button-submit:hover {
  background-color: #252727;
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
  transition: 0.2s ease-in-out;
}

.btn:hover {
  border: 1px solid #2d79f3;
}

</style>
  