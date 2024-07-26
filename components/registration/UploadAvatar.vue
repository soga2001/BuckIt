<script lang="ts">

import { usePrimeVue } from 'primevue/config';
import type { FileUploadSelectEvent, FileUploadRemoveEvent } from 'primevue/fileupload';

export default defineComponent({
    props: {
        username: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            file: null as File | null,
            imgURL: '',
            url: "",
        }
    },
    setup() {
        const store = useStore()
        const supabase = useSupabaseClient()
        const primevue = usePrimeVue();
        return {store, supabase, primevue}
    },
    methods: {
        async getPublicURL() {
            const { data } = await this.supabase.storage.from('avatars').getPublicUrl(`avatars/${this.username}/avatar`);
            this.url = data.publicUrl
            await this.updateProfile()
        },
        async uploadAvatar() {

            if(this.file == null) {
                return null;
            }
            const { data, error } = await this.supabase.storage.from('avatars').upload(`${this.username}/avatar`, this.file)
            if(error) {
                console.log(error.message)
                return null;
            }
            await this.getPublicURL()
        },
        async updateProfile() {
            const user = useSupabaseUser()

            const {data, error } = await this.supabase.from('profiles').upsert({id: user.value.id, avatar_url: this.url } as never, {})
        },
        fileChange(e: FileUploadSelectEvent) {
            this.file = e.files[0] as File;
            this.imgURL = URL.createObjectURL(this.file);
        },
        removeFile(e: FileUploadRemoveEvent) {
            this.file = null;
            this.imgURL = '';
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
    }
})
</script>

<template>
    <div>
        <div class="text-center mb-4 text-2xl font-bold">Upload an avatar <span class="italic text-sm">(Optional)</span></div>
        <FileUpload class="w-full" name="demo[]" v-model="file" :showCancelButton="false" :showUploadButton="false" @select="fileChange" @removeUploadedFile="removeFile" :auto="true" accept="image/*" :maxFileSize="1000000">
            <template #header="{ chooseCallback, files }">
            <div class="flex flex-wrap justify-between items-center flex-1 gap-4">
                <div class="flex gap-2">
                    <ion-button  @click="chooseCallback()" shape="round" class="avatar-upload">
                        <ion-icon slot="icon-only" :icon="ioniconsImageOutline"></ion-icon>
                    </ion-button>
                </div>
            </div>
            </template>  
            <template #content="{ uploadedFiles, removeUploadedFileCallback}">
                <div class="flex flex-col items-center gap-8 pt-4">
                
                <div v-if="file != null">
                    <div class="flex flex-wrap gap-4">
                    <div :key="file.name + file.type + file.size" class="p-8 rounded-border flex flex-col border border-surface items-center gap-4">
                        <div>
                        <img
                            role="presentation"
                            :alt="file.name"
                            :src="imgURL"
                            width="100%"
                            maxWidth="200"
                            rows="3"
                        />
                        </div>
                        <span
                        class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden"
                        >{{ file.name }}</span
                        >
                        <div>{{ formatSize(file.size) }}</div>

                        <ion-button class="delete_button" shape="round" @click="removeUploadedFileCallback(0)">
                        <ion-icon slot="icon-only" :ios="ioniconsClose" :md="ioniconsCloseOutline"></ion-icon>
                        </ion-button>
                    </div>
                    </div>
                </div>
                </div>
            </template>
            <template v-if="file == null" #empty>
                <div class="flex items-center justify-center flex-col w-full p-10">
                    <ion-icon :icon="ioniconsCloudUploadOutline" class="upload-icon"></ion-icon>
                    <p class="mt-6 mb-0">Drag and drop files to here to upload.</p>
                </div>
            </template>
        </FileUpload>
        <div class="flex justify-center mt-8 self-stretch">
            <ion-button @click="uploadAvatar" fill="outline" class="text-white">
                Upload Avatar
            </ion-button>
        </div>
    </div>
</template>


<style scoped lang="scss">


img {
    max-width: 100%;
    max-height: 150px;
    object-fit: cover;

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

ion-button {

    &.avatar-upload {
        color: var(--ion-color-primary);
        --background: transparent;
        border: 1px solid var(--ion-color-primary);
        border-radius: 50%;
        transition: all .1s ease-in-out;

        &:hover {
        color: white;
        --background: rgba(var(--ion-color-primary-shade-rgb), .4);
        border: 1px solid white;
        }
    }

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

</style>