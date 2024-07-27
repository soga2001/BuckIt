<script lang="ts">

import { defineComponent } from 'vue'
import type { User } from '~/assets/interface/user';
import { useStore } from '~/stores/store'

export default defineComponent({
    data() {
        return {
            searchInput: '' || this.$route.params.query,
            users: Array<User[]>()
        }
    },
    methods: {
        async search(event: Event) {
            
            const data = await $fetch(`/api/search?query=${this.searchInput}`)
            console.log(data)
        }
    }
})

</script>

<template>
    <div>
        <ion-searchbar color="medium" animated show-clear-button="focus" placeholder="Search BuckIt"></ion-searchbar>
    </div>
</template>