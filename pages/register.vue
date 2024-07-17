<script lang="ts">
import { defineComponent } from 'vue'
import type {User} from '~/assets/interface/user.ts'
import {useStore} from '~/stores/store'

import account from '~/components/registration/account.vue'
import personal from '~/components/registration/personal.vue'
import verify from '~/components/registration/verify.vue'
import avatar from '~/components/registration/avatar.vue'

import {
  UserOutlined,
  FileImageOutlined,
  UnlockOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons-vue';


definePageMeta({
  auth: false,
  name: "register",
  layout: "auth-layout"
})

useSeoMeta({
  title: 'register',
  description: 'This is the registration page',
  
})

export default defineComponent({
  data() {
    return {
      email: "",
      password: "",

      data: null as any,

      error: '',

      isPassword: true,

      disabled: true,
      current: 0,

      steps: [
        {
          id: "step1",
          title: 'Account',
          content: account,
          // description: 'Email and password',
          icon: h(UnlockOutlined),
        },
        {
          id: "step2",
          title: 'Personal',
          content: personal,
          // description: 'Personal Information',
          icon: h(UserOutlined),
        },
        {
          id: "step3",
          title: 'Image',
          content: avatar,
          // description: 'Upload an avatar',
          icon: h(FileImageOutlined),
        },
        {
          id: "step4",
          title: 'Confirm',
          content: verify,
          // description: 'Confirmation',
          icon: h(CheckCircleOutlined),
        }
        
      ],
      
    }
  },
  setup() {
    const store = useStore()
    const supabase = useSupabaseClient()
    return {store, supabase}
  },
  computed: {
    items() {
      return this.steps.map((item, index) => {
        return {
          title: item.title,
          content: item.content,
        }
      })
    }
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
    },
    prev() {
      this.current = this.current - 1
    },
    next() {
      this.current = this.current + 1
    }
  },
  components: {
    account,
    personal,
    confirm,
    avatar
  }
})
</script>

<template>
    <ion-page>
      <NuxtLayout name="auth-layout">
        
        <!-- <div class="main">
          <a-steps :current="current" :items="steps"/>
            <div class="steps-content">
              <component :key="steps[current].id" :is="steps[current].content" />
            </div>
            <div class="steps-action">
              <ion-button color="dark" v-if="current > 0" @click="prev">
                <ion-icon slot="start" :icon="ioniconsArrowBackOutline"></ion-icon>
                Previous
              </ion-button>
              <ion-button class="float-right" color="dark" v-if="current < steps.length - 1" @click="next">
                <ion-icon slot="end" :icon="ioniconsArrowForwardOutline"></ion-icon>
                Next
              </ion-button>
              <ion-button color="medium" v-if="current == steps.length - 1" @click="prev">
                Sign Up
              </ion-button>
            </div> 
        </div> -->

      </NuxtLayout>
    </ion-page>
</template>

<style scoped lang="scss">

.main {
    height: 100%;
    padding: 30px;
    width: 100%;

    background-color: bisque;
}

.title {
    /* color: #151717; */
    font-size: 30px;
    font-weight: 600;
    border-bottom: 2px solid rgb(255, 255, 255);
    margin-bottom: 10px;
}

.ant-steps-item-active {
  background-color: aqua !important;
}

// .ant-steps-item-active {

//   * {
//     color: white !important;
//   }
// }

.steps-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 90%;

}

.float-right {
  float: right;

}

</style>
  