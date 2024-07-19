

<script lang="ts">

import { defineComponent, ref } from 'vue';
import { usePrimeVue } from 'primevue/config';
import type { FileUploadSelectEvent, FileUploadRemoveEvent } from 'primevue/fileupload';

definePageMeta({
  title: 'Register',
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

      fullname: '',
      phone: '',
      username: '',
      dob: '',
      bio: '',


      isPassword: true,
      isConfirmPassword: true,
      accountNext: false,

      otp: '',
      invalidOTP: false,
      file: null as File | null,
    }
  },
  setup() {
    const store = useStore()
    const supabase = useSupabaseClient()
    const primevue = usePrimeVue();
    return {store, supabase, primevue}
  },
  computed: {
    isAccountNext() {
        let isAccountNext = this.email && this.password && this.confirmPassword;
        return this.email && this.password && this.confirmPassword;
    }
  },
  methods: {
    activateCallback(step: number) {
        this.activeStep = step;
    },
    prev() {
        this.activeStep--;
    },
    next() {
        this.activeStep++;
    },
    register() {
        console.log('Register');
        this.activeStep++;
    },
    submitOTP() {
        console.log('Submit OTP');
    },
    fileChange(e: FileUploadSelectEvent) {
      this.file = e.files[0] as File;
    },
    removeFile(e: FileUploadRemoveEvent) {
      this.file = null;
    },
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
  <NuxtLayout name="auth-layout">

    <div class="card">
    <Stepper :linear="true" v-model:value="activeStep" class="!p-12">
        
        <StepList>
          <Step :value="1">Account</Step>
          <Step :value="2">Personal</Step>
          <Step :value="3">Avatar</Step>
          <Step :value="4">Verify</Step>
        </StepList>
        
        <StepPanels class="step-panels">
            <StepPanel :value="1">
                <div class="flex flex-col gap-2 mx-auto" style=" max-width: 600px">
                  <form class="form flex flex-col gap-2" ref="loginForm" @submit.prevent="">
                    <div class="text-center text-2xl font-bold">
                        Account Information
                    </div>
                    <div class="flex-column">
                      <label>Email </label>
                    </div>

                      <ion-input placeholder="Enter your email" fill="outline" v-model="email" :clear-input="true">
                        <ion-icon slot="start" :icon="ioniconsAtCircle" aria-hidden="true"></ion-icon>
                      </ion-input>
                      
                      <div class="flex-column">
                        <label>Password </label>
                      </div>

                      <ion-input placeholder="Enter your password" fill="outline" v-model="password" :type="isPassword ? 'password' : 'text'">
                        <ion-icon slot="start" :icon="ioniconsLockClosed" aria-hidden="true"></ion-icon>
                        <ion-button fill="clear" slot="end" aria-label="Show/hide" @click="isPassword = !isPassword" v-if="password">
                          <ion-icon slot="icon-only" :icon="isPassword ? ioniconsEyeOutline : ioniconsEyeOffOutline" aria-hidden="true"></ion-icon>
                        </ion-button>
                      </ion-input>

                      <div class="flex-column">
                        <label>Confirm Password </label>
                      </div>

                      <ion-input placeholder="Confirm Password" fill="outline" v-model="confirmPassword" :type="isConfirmPassword ? 'password' : 'text'">
                        <ion-icon slot="start" :icon="ioniconsLockClosed" aria-hidden="true"></ion-icon>
                        <ion-button fill="clear" slot="end" aria-label="Show/hide" @click="isConfirmPassword = !isConfirmPassword" v-if="confirmPassword">
                          <ion-icon slot="icon-only" :icon="isConfirmPassword ? ioniconsEyeOutline : ioniconsEyeOffOutline" aria-hidden="true"></ion-icon>
                        </ion-button>
                      </ion-input>
                      
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
            </StepPanel>
            <StepPanel :value="2">
                <div class="flex flex-col gap-2 mx-auto" style=" max-width: 600px">
                    <form class="form flex flex-col gap-2" ref="loginForm" @submit.prevent="">
                    <div class="text-center text-2xl font-bold">
                        Personal Information
                    </div>
                    <div class="flex-column">
                      <label>Full Name </label></div>

                      <ion-input placeholder="Enter your full name" fill="outline" v-model="fullname" :clear-input="true">
                        <ion-icon slot="start" :icon="ioniconsPersonCircle" aria-hidden="true"></ion-icon>
                      </ion-input>
                      
                      <div class="flex-column">
                        <label>Username </label>
                      </div>

                      <ion-input placeholder="Enter your username" fill="outline" v-model="username">
                        <ion-icon slot="start" :icon="ioniconsPerson" aria-hidden="true"></ion-icon>
                        <ion-button fill="clear" slot="end" aria-label="Show/hide" @click="isPassword = !isPassword" v-if="password">
                          <ion-icon slot="icon-only" :icon="ioniconsEyeOffOutline" aria-hidden="true"></ion-icon>
                        </ion-button>
                      </ion-input>

                      <div class="flex-column">
                        <label>Phone Number</label>
                      </div>

                      <ion-input placeholder="Enter phone number" fill="outline" v-model="phone" :clear-input="true">
                        <ion-icon slot="start" :icon="ioniconsCall" aria-hidden="true"></ion-icon>
                      </ion-input>

                      <div class="flex-column">
                        <label>Bio</label>
                      </div>

                      <ion-input placeholder="Enter phone number" fill="outline" v-model="bio" :clear-input="true">
                        <ion-icon slot="start" :icon="ioniconsReorderThree" aria-hidden="true"></ion-icon>
                      </ion-input>

                  </form>
                </div>
            </StepPanel>
            <StepPanel :value="3">
                <div class="w-full flex flex-col gap-2 mx-auto">
                    <div class="text-center mb-4 text-2xl font-bold">Upload an avatar</div>
                    <div class="text-center w-full">
                        <FileUpload class="w-full" name="demo[]" v-model="file" :showCancelButton="false" :showUploadButton="false" @select="fileChange" @removeUploadedFile="removeFile" :auto="true" accept="image/*" :maxFileSize="1000000">
                          <template #header="{ chooseCallback, files }">
                            <div class="flex flex-wrap justify-between items-center flex-1 gap-4">
                                <div class="flex gap-2">
                                    <ion-button :disabled="file != null" @click="chooseCallback()" shape="round" fill="outline" class="avatar-upload">
                                      <ion-icon slot="icon-only" :icon="ioniconsImageOutline"></ion-icon>
                                    </ion-button>
                                </div>
                            </div>
                        </template>  
                        <template #content="{ uploadedFiles, removeUploadedFileCallback}">
                          <div class="flex flex-col items-center gap-8 pt-4">
                            
                            <div v-if="uploadedFiles.length > 0">
                              <div class="flex flex-wrap gap-4">
                                <div v-for="(file, index) of uploadedFiles" :key="file.name + file.type + file.size" class="p-8 rounded-border flex flex-col border border-surface items-center gap-4">
                                  <div>
                                    <img
                                      role="presentation"
                                      :alt="file.name"
                                      :src="file.objectURL"
                                      width="100%"
                                      maxWidth="200"
                                      maxHeight="50"
                                    />
                                  </div>
                                  <span
                                    class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden"
                                    >{{ file.name }}</span
                                  >
                                  <div>{{ formatSize(file.size) }}</div>
                                  <Button
                                    icon="pi pi-times"
                                    @click="removeUploadedFileCallback(index)"
                                    outlined
                                    rounded
                                    severity="danger"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </template>
                        <template #empty>
                          <div class="flex items-center justify-center flex-col w-full p-10">
                              <!-- <i class="pi pi-cloud-upload !border-2 !rounded-full !p-8 !text-4xl !text-muted-color" /> -->
                               <ion-icon :icon="ioniconsCloudUploadOutline" class="upload-icon"></ion-icon>
                              <p class="mt-6 mb-0">Drag and drop files to here to upload.</p>
                          </div>
                        </template>
                      </FileUpload>

                    </div>
                </div>
            </StepPanel>
            <StepPanel :value="4">
                <div class="flex flex-col justify-center gap-5 mx-auto" style="min-height: 16rem; max-width: 24rem">
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
                            <ion-button @click="" fill="outline" class="text-white">
                              Submit Code
                            </ion-button>
                        </div>
                    </div>
                </div>
            </StepPanel>
            
            
        </StepPanels>

        <div class="buttons flex flex-row">
            <div class="flex w-full pt-6 justify-between">
                <!-- <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="prev" v-if="activeStep > 1" /> -->
                  <ion-button fill="outline" size="small" @click="prev" v-if="activeStep > 1">
                  Prev
                    <ion-icon slot="start" :icon="ioniconsArrowBackOutline"></ion-icon>
                  </ion-button>
                <!-- <Button label="Submit" icon="pi pi-check" iconPos="right" @click="register" v-if="activeStep == 3"/> -->
                <ion-button fill="outline" size="small" @click="register" v-if="activeStep == 3">
                  Submit
                    <ion-icon slot="end" :icon="ioniconsCheckmark"></ion-icon>
                  </ion-button>
            </div>
            <div class="flex pt-6 ml-auto">
                <!-- <Button label="Next" severity="secondary" icon="pi pi-arrow-right" @click="next" v-if="activeStep < 3" /> -->
                <ion-button fill="outline" size="small" @click="next" v-if="activeStep < 3">
                 Next
                  <ion-icon slot="end" :icon="ioniconsArrowForwardOutline"></ion-icon>
                </ion-button>
            </div>
        </div>
    </Stepper>
  </div>
  </NuxtLayout>
  
</template>

<style lang="scss" scoped>


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
    // padding: 0 30px;
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

img {
    max-width: 100%;
    max-height: 150px;
    object-fit: cover;

}

ion-button {

    &.avatar-upload {
        color: var(--ion-color-light);

        &:hover {
          color: rgba(var(--ion-color-primary-contrast-rgb));
          --background: rgba(var(--ion-color-primary-shade-rgb), .4);
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



.p-inputtext {
  
  &.p-inputotp-input {
    width: 3rem;
    height: 3rem;
    font-size: 1.5rem;
    text-align: center;
    border-radius: 10px;
    border: 1px solid var(--ion-color-primary);
    margin: 0 5px;
  }
}

</style>