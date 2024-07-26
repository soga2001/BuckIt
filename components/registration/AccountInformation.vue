<script lang="ts">

import { defineComponent } from 'vue'
import { useStore } from '~/stores/store'

export default defineComponent({
    data() {
        return {
            email: "",
            password: "",
            isPassword: true,
        }
    },
})
</script>

<template>
    <div class="main">
        <div>
          <form class="form" ref="loginForm" @submit.prevent="">
            <div class="title">
                <h1>Account Information</h1>
            </div>
            <div class="flex-column">
                <label>Email </label></div>

                <ion-input placeholder="Enter your email" v-model="email" :clear-input="true">
                  <ion-icon slot="start" :icon="ioniconsAtSharp" aria-hidden="true"></ion-icon>
                </ion-input>
                
                <div class="flex-column">
                  <label>Password </label>
                </div>

                <ion-input placeholder="Enter your password" v-model="password" :type="isPassword ? 'password' : 'text'">
                  <ion-icon slot="start" :icon="ioniconsLockClosed" aria-hidden="true"></ion-icon>
                  <ion-button fill="clear" slot="end" aria-label="Show/hide" @click="isPassword = !isPassword" v-if="password">
                    <ion-icon slot="icon-only" :icon="isPassword ? ioniconsEyeOutline : ioniconsEyeOffOutline" aria-hidden="true"></ion-icon>
                  </ion-button>
                </ion-input>
                
                <div class="flex-row">
                <div>
                </div>
                </div>
                <!-- <input class="button-submit" type="submit" value="Sign Up"/> -->
                <p class="p">Already have an account? 
                    <span class="span">
                        <ion-button fill="clear">Sign In</ion-button>
                    </span>
                </p>
          </form>
        </div>
    </div> 
</template>

<style lang="scss" scoped>
.main {
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

.p {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
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
  ;
}

</style>