

<script lang="ts">

import { defineComponent, ref } from 'vue';
import type { User } from '~/assets/interface/user';

import UploadAvatar from '~/components/registration/UploadAvatar.vue';
import AccountInformation from '~/components/registration/PersonalInformation.vue';


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
      dob: '',
      bio: null,

      validEmail: true,

      month: '',
      day: '',
      year: '',


      isPassword: true,
      isConfirmPassword: true,

      otp: '',
      invalidOTP: false,
      file: null as File | null,
      imgURL: '',

      registerErrorMessage: '',


      loadingSigningUp: false,
    }
  },
  setup() {
    const store = useStore()
    const supabase = useSupabaseClient()
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
      return (this.email !== '' && this.password !== '' && this.confirmPassword !== '' && this.fullname !== '' && this.phone !== '' && this.username !== '' && this.month !== '' && this.day !== '' && this.year !== '') && this.password === this.confirmPassword;
    },
    validateEmail() {
      const match =  this.email.match(
        /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      );

      return match ? true : false;
    },
    async register() {
      this.loadingSigningUp = true;
      if(!await this.validInfo()) {
        this.registerErrorMessage = 'Please fill in all fields'
        this.loadingSigningUp = false;
        return;
      }
      if(await this.userExists()) {
        this.registerErrorMessage = 'User already exists'
        this.loadingSigningUp = false;
        return;
      }

      // this.dob = new Date(parseInt(this.year), parseInt(this.monthMap[this.month]), parseInt(this.day)).toISOString();

      // const { data, error } = await this.supabase.auth.signUp(
      //   {
      //     email: this.email,
      //     password: this.password,
      //     phone: this.phone,
      //     options: {
      //       data: {
      //         fullname: this.fullname,
      //         username: this.username,
      //         bio: this.bio,
      //         dob: this.dob,
      //         location: null,
      //         website: null,
      //       },
            
      //     }
      //   }
      // )
      // if(error) {
      //   console.log(error.message)
      // } else {
      //   this.activeStep++;
      // }

      this.activeStep++;

      this.loadingSigningUp = false;
      
    },
    async submitOTP() {
      const { data: { session }, error} = await this.supabase.auth.verifyOtp({ email: this.email, token: this.otp, type: "email" })

      const datetime = new Date().toISOString()

      if(error) {
        console.log(error)
      } else {
        this.store.setUser(session?.user as User)
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
  },
  watch: {
    email() {
      if(this.email) {
        this.validEmail = this.validateEmail();
      }
      else {
        this.validEmail = true;
      }
    },
    file(value) {
      console.log(value);
    },
    year() {
      console.log(this.year)
    },
    month() {
      console.log(this.month)
    }
  },
  components: {
    UploadAvatar,
    AccountInformation,
  }
})

</script>

<template>
  <NuxtLayout name="auth-layout">
    <ion-content color="dark">
        <div class="card">
        <Stepper :linear="true" v-model:value="activeStep" class="!p-12 relative">
            
            <!-- <StepList class="sticky top-0 z-999">
              <Step :value="1" :class="{activeStep: 1 < activeStep, firstStep: true}"><span>Account</span></Step>
              <Step :value="2" :class="{activeStep: 2 < activeStep}">Personal</Step>
              <Step :value="3" :class="{activeStep: 3 < activeStep}">Avatar</Step>
              <Step :value="4">Verify</Step>
            </StepList> -->
            <StepList>
                <Step linear v-slot="{ value }" asChild :value="1">
                    <div class="flex flex-row flex-auto gap-2">
                        <button v-tooltip.bottom="'Login Information'" id="account-info" class="bg-transparent border-0 inline-flex flex-col gap-2">
                            <span
                                :class="[
                                    'rounded-full border-2 w-12 h-12 inline-flex items-center justify-center',
                                    { 'activeStep text-primary-contrast border-primary': value <= activeStep, 'border-surface-200 dark:border-surface-700': value > activeStep }
                                ]"
                            >
                                <!-- <i class="pi pi-lock" /> -->
                                <ion-icon :icon="ioniconsLockClosed" />
                                
                            </span>
                        </button>
                        <Divider />
                    </div>
                </Step>
                <Step linear v-slot="{ value }" asChild :value="2">
                    <div class="flex flex-row flex-auto gap-2">
                        <button v-tooltip.bottom="'Personal Information'" class="bg-transparent border-0 inline-flex flex-col gap-2">
                            <span
                                :class="[
                                    'rounded-full border-2 w-12 h-12 inline-flex items-center justify-center',
                                    { 'activeStep text-primary-contrast border-primary': value <= activeStep, 'border-surface-200 dark:border-surface-700': value > activeStep }
                                ]"
                            >
                              
                              <ion-icon :icon="ioniconsPerson" />
                            </span>
                        </button>
                        <Divider />
                    </div>
                </Step>
                <Step linear v-slot="{ value }" asChild :value="3">
                    <div class="flex flex-row flex-auto gap-2">
                        <button v-tooltip.bottom="'Upload Avatar'" class="bg-transparent border-0 inline-flex flex-col gap-2">
                            <span
                                :class="[
                                    'rounded-full border-2 w-12 h-12 inline-flex items-center justify-center',
                                    { 'activeStep text-primary-contrast border-primary': value <= activeStep, 'border-surface-200 dark:border-surface-700': value > activeStep }
                                ]"
                            >
                              <ion-icon :icon="ioniconsImage" />
                            </span>
                        </button>
                        <Divider />
                    </div>
                </Step>
                <Step v-slot="{ value }" asChild :value="4">
                    <div class="flex flex-row pl-2">
                        <button v-tooltip.bottom="'Verify Account'" class="bg-transparent border-0 inline-flex flex-col gap-2" >
                            <span
                                :class="[
                                    'rounded-full border-2 w-12 h-12 inline-flex items-center justify-center',
                                    { 'activeStep text-primary-contrast border-primary': value <= activeStep, 'border-surface-200 dark:border-surface-700': value > activeStep }
                                ]"
                            >
                                <ion-icon :icon="ioniconsCheckmarkCircle" />
                            </span>
                        </button>
                    </div>
                </Step>
                
            </StepList>
            
            <StepPanels class="step-panels z-1">
                <StepPanel :value="1">
                    <div class="flex flex-col gap-1 mx-auto" style=" max-width: 600px">
                      <form class="form flex flex-col gap-2" ref="loginForm" @submit.prevent="">
                        <div class="text-center text-2xl font-bold">
                            Login Information
                        </div>

                        <div class="flex flex-col gap-2">
                          <div class="flex-column">
                            <label>Email</label>
                          </div>

                          <InputGroup>
                              <InputGroupAddon>
                                <ion-icon :icon="ioniconsAtCircle" aria-hidden="true"></ion-icon>
                              </InputGroupAddon>
                              <InputText variant="outlined" class="" v-model="email" placeholder="Enter your email" />
                          </InputGroup>
                        </div>
                          
                          
                        <div class="flex flex-col gap-2">
                          <div class="flex-column">
                            <label>Password </label>
                          </div>


                          <InputGroup>
                              <InputGroupAddon>
                                <ion-icon :icon="ioniconsLockClosed" aria-hidden="true"></ion-icon>
                              </InputGroupAddon>
                              <Password v-model="password" :feedback="false" placeholder="Enter your password" toggleMask />
                          </InputGroup>
                        </div>

                        <div class="flex flex-col gap-2">
                          <div class="flex-column">
                            <label>Confirm Password </label>
                          </div>

                          <InputGroup>
                              <InputGroupAddon>
                                <ion-icon :icon="ioniconsLockClosed" aria-hidden="true"></ion-icon>
                              </InputGroupAddon>
                              <Password v-model="confirmPassword" :feedback="false" placeholder="Enter your password" toggleMask />
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
                      <div class="flex pt-6 ml-auto">
                          <ion-button fill="outline" size="small" @click="next" :disabled="validAccountInfo">
                          Next
                            <ion-icon slot="end" :icon="ioniconsArrowForwardOutline"></ion-icon>
                          </ion-button>
                      </div>
                    </div>
                </StepPanel>
                <StepPanel :value="2">
                    <div class="flex flex-col gap-1 mx-auto" style=" max-width: 600px">
                        <!-- <form class="form flex flex-col gap-1" ref="loginForm" @submit.prevent="">
                        <div class="text-center text-2xl font-bold">
                            Personal Information
                        </div>
                        <div class="flex flex-col gap-1">

                        
                          <div class="flex-column">
                            <label>Full Name </label>
                          </div>

                          <InputGroup>
                              <InputGroupAddon>
                                <ion-icon :icon="ioniconsPersonCircle" aria-hidden="true"></ion-icon>
                              </InputGroupAddon>
                              <InputText type="text" v-model="fullname" placeholder="Enter your full name" />
                          </InputGroup>
                        </div>

                        <div class="flex flex-col gap-1">
                          
                          <div class="flex-column">
                            <label>Username </label>
                          </div>

                          <InputGroup>
                              <InputGroupAddon>
                                <ion-icon :icon="ioniconsPerson" aria-hidden="true"></ion-icon>
                              </InputGroupAddon>
                              <InputText type="text" v-model="username" placeholder="Enter a username" />
                          </InputGroup>

                        </div>
                          

                        <div class="flex flex-col gap-1">

                          <div class="flex-column">
                            <label>Phone Number </label>
                          </div>

                          <InputGroup>
                              <InputGroupAddon>
                                <ion-icon :icon="ioniconsCall" aria-hidden="true"></ion-icon>
                              </InputGroupAddon>
                              <InputMask variant="outlined" class="" v-model="phone" mask="(999) 999-9999" placeholder="Enter Phone Number" />
                          </InputGroup>
                        
                        </div>

                        <div class="flex flex-col gap-1">

                          <div class="flex-column">
                            <label>Date Of Birth</label>
                          </div>

                          <div class="grid grid-cols-3 gap-2">
                            <div class="flex flex-col gap-2">
                              <ion-label>Month</ion-label>
                              <div class="custom-select">
                                <select class="dob-select" v-model="month" name="month" id="month">
                                  <option class="italic" value="" disabled selected>Select Month</option>
                                  <option :class="{active: month == m, option: true }" v-for="(m, index) in monthsList" :key="m" :value="m" :disabled="((currentMonth < index + 1) && (currentYear == parseInt(year)))">{{m}}</option>
                                </select>
                              </div>

                            </div>

                            <div class="flex flex-col gap-2">
                              <ion-label>Day</ion-label>
                              <div class="custom-select">
                                <select class="dob-select" v-model="day" placeholder="Select a day" name="day" id="day">
                                  <option class="italic" value="" disabled selected>Select Day</option>
                                  <option :class="{active: parseInt(day) == m, option: true }" v-for="m in dayList" :key="m" :value="m" :disabled="((currentMonth == parseInt(monthMap[month])) && currentYear == parseInt(year) ) && (todayDate < m)">{{m}} </option>
                                </select>

                              </div>
                            </div>

                            <div class="flex flex-col gap-2">
                              <ion-label>Year</ion-label>
                              <div class="custom-select">
                                <select class="dob-select" v-model="year" placeholder="Select a year" name="year" id="year">
                                  <option class="italic" value="" disabled selected>Select Year</option>
                                  <option :class="{active: parseInt(year) == m, option: true }" v-for="m in yearList" :key="m" :value="m">{{m}}</option>
                                </select>
                              </div>
                            </div>
                          </div>
                            
                        </div>
                        
                        <div class="flex flex-col gap-1">

                          <div class="flex-column">
                            <label>Bio <span class="italic text-sm">(Optional)</span></label>
                          </div>
                          <Textarea  v-model="bio" rows="5" fluid />
                        </div>

                      </form> -->
                      
                      <AccountInformation v-model:fullname="fullname" v-model:phone="phone" v-model:username="username" v-model:month="month" v-model:day="day" v-model:year="year" v-model:bio="bio"></AccountInformation>
                      
                      <div class="flex w-full pt-6 justify-between">
                        <ion-button fill="outline" size="small" @click="prev" v-if="activeStep > 1">
                        Prev
                          <ion-icon slot="start" :icon="ioniconsArrowBackOutline"></ion-icon>
                        </ion-button>
                        <ion-button fill="outline" size="small" @click="register" :disabled="validPersonalInfo">
                          Sign Up
                            <ion-icon v-if="!loadingSigningUp" slot="end" :icon="ioniconsLogInOutline"></ion-icon>
                            <ion-spinner class="ml-2" v-if="loadingSigningUp" size="small" slot="end" name="circular"></ion-spinner>
                          </ion-button>
                      </div>
                    </div>
                </StepPanel>
                <StepPanel :value="3">
                    <div class="w-full flex flex-col gap-2 mx-auto">
                        <div class="text-center mb-4 text-2xl font-bold">Upload an avatar <span class="italic text-sm">(Optional)</span></div>
                        <div class="text-center w-full">
                          <UploadAvatar :username="username" v-model="file"></UploadAvatar>
                          <div class="flex w-full pt-6 justify-end">
                            <!-- <ion-button fill="outline" size="small" @click="prev">
                            Prev
                              <ion-icon slot="start" :icon="ioniconsArrowBackOutline"></ion-icon>
                            </ion-button> -->
                            <ion-button fill="outline" size="small" @click="next">
                              Skip
                                <ion-icon slot="end" :icon="ioniconsPlaySkipForwardOutline"></ion-icon>
                              </ion-button>
                          </div>

                        </div>
                    </div>
                </StepPanel>
                <StepPanel :value="4">
                    <div class="flex flex-col w-full justify-center gap-5 mx-auto" style="min-height: 16rem; max-width: 24rem">
                        <div class="text-center text-2xl font-bold">Account created successfully</div>
                        <div class="text-center text-xs font-semibold">Please check your email for an OTP</div>
                        <div class="flex flex-col items-center">
                            <div class="font-semibold text-xl mb-2">Authenticate Your Account</div>
                            <p class="text-surface-500 dark:text-surface-400 block mb-8">Please enter the code sent to your phone.</p>
                            <InputOtp v-model="otp" integerOnly :length="6" style="gap: 3">
                            </InputOtp>
                            <div class="flex justify-between mt-8 self-stretch">
                                <!-- <Button label="Resend Code" link class="p-0"></Button> -->
                                <ion-button @click="" fill="clear" class="text-white">
                                  Resend Code
                                </ion-button>
                                <!-- <Button label="Submit Code"></Button> -->
                                <ion-button @click="submitOTP" fill="outline" class="text-white">
                                  Submit Code
                                </ion-button>
                            </div>
                        </div>
                    </div>
                    <div class="flex w-full pt-6 justify-between">
                          <ion-button fill="outline" size="small" @click="prev" v-if="activeStep > 1">
                          Prev
                            <ion-icon slot="start" :icon="ioniconsArrowBackOutline"></ion-icon>
                          </ion-button>
                        </div>
                </StepPanel>
                
                
            </StepPanels>

            <!--  -->
        </Stepper>
      </div>
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



ion-icon {
    font-size: 1.5rem;
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