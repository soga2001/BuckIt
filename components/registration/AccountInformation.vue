<script lang="ts">

import { defineComponent } from 'vue'
import { useStore } from '~/stores/store'

export default defineComponent({
  props: {
    emailProp: {
      type: String,
      required: false,
      default: ""
    },
    passwordProp: {
      type: String,
      required: false,
      default: ""
    },
    confirmPassProp: {
      type: String,
      required: false,
      default: ""
    }
  },
  data() {
      return {
          email: this.emailProp,
          password: this.passwordProp,
          confirmPassword: this.confirmPassProp,
          togglePassword: true,
          toggleConfirmPassword: true,
      }
  },
  methods: {

  },
  watch: {
    email() {
      this.$emit('update:email', this.email)
    },
    password() {
      this.$emit('update:password', this.password)
    },
    confirmPassword() {
      this.$emit('update:confirmPassword', this.confirmPassword)
    },

  },
})
</script>

<template>
    <div>
      <form class="form flex flex-col gap-2 w-full" ref="loginForm" @submit.prevent="">
        <div class="text-center text-2xl font-bold">
            Login Information
        </div>

        <div class="flex flex-col gap-2">
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
          
          
        <div class="flex flex-col gap-2">
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

        <div class="flex flex-col gap-2">
          <div class="flex-column">
            <label>Confirm Password </label>
          </div>

          <InputGroup class="input-group">
              <InputGroupAddon class="input-addon">
                <ion-icon :icon="ioniconsLockClosed" aria-hidden="true"></ion-icon>
              </InputGroupAddon>
              <InputText :type="toggleConfirmPassword ? 'password' : 'text'" class="input" variant="outlined" v-model="confirmPassword" placeholder="Enter your password"/>
              <InputGroupAddon class="border-none" v-if="confirmPassword !== ''">
                <ion-icon :icon="toggleConfirmPassword ? ioniconsEye : ioniconsEyeOff" @click="toggleConfirmPassword = !toggleConfirmPassword" />
              </InputGroupAddon>
          </InputGroup>
        </div>

          
          <div class="flex justify-end">
            <div class="justify-items-start">
            </div>
        

            <p class="flex items-center">Already have an account? 
                <span class="span">
                    <ion-button href="/login" fill="clear">Sign In</ion-button>
                </span>
            </p>
          </div>
      </form>
    </div>
</template>

<style lang="scss" scoped>
ion-icon {
    font-size: 1.5rem;
}
</style>