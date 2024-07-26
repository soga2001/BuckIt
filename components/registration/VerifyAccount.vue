<script lang="ts">

import { defineComponent } from 'vue'
import { useStore } from '~/stores/store'
import type { User } from '@/assets/interface/user'

export default defineComponent({
    props: {
        email: {
            type: String,
            required: true,
        }
    },
    data() {
        return {
            otp: "",
        }
    },
    setup() {
        const store = useStore()
        const supabase = useSupabaseClient()
        return { store, supabase }
    },
    methods: {
        async submitOTP() {
            const { data: { session }, error} = await this.supabase.auth.verifyOtp({ email: this.email, token: this.otp, type: "email" })


            if(error) {
                console.log(error)
            } else {
                this.store.setUser((session?.user as unknown) as User)
                this.store.changeAuthenticated(true)
                navigateTo(this.$route.redirectedFrom?.fullPath || '/')
            }
        },
    },
})

</script>


<template>
    <div class="main">
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
</template>

<style lang="scss" scoped>
ion-icon {
    font-size: 1.5rem;
}
</style>