import { useStore } from "#imports"

export default defineNuxtRouteMiddleware((to, from) => {

    const user = useSupabaseUser()

    
    if(user.value &&  to.meta.auth == false) {
        console.log('redirecting to home')
        return navigateTo(to.redirectedFrom?.fullPath) || navigateTo('/home')
    }
    else if(!user.value && to.meta.auth == true) {
        return navigateTo('/login')
    }
})
  