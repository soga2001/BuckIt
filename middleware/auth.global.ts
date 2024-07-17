import { useStore } from "#imports"

export default defineNuxtRouteMiddleware((to, from) => {

    const user = useSupabaseUser()

    // const store = useStore()
    
    if(user.value &&  to.meta.auth == false) {
        return navigateTo(to.redirectedFrom?.fullPath) || navigateTo('/home')
    }
    else if(!user.value && to.meta.auth == true) {
        return navigateTo('/login')
    }
})
  