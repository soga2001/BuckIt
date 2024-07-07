import { createPinia, setActivePinia } from 'pinia'

export default defineNuxtPlugin((nuxtApp) => {
    const pinia = createPinia()
    // useNuxtApp(pinia);
    setActivePinia(pinia)
})
