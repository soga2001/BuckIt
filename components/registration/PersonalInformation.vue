<script lang="ts">

export default defineComponent( {
    data() {
        return {
            fullname: "",
            username: "",
            phone: "",
            month: "",
            day: "",
            year: "",
            bio: "",
            
            dayList: Array.from({length: 31}, (_, i) => i + 1),
            yearList: Array.from({length: 100}, (_, i) => new Date().getFullYear() - i),
            currentMonth: new Date().getMonth() + 1,
            currentYear: new Date().getFullYear(),
            todayDate: new Date().getDate(),
            monthsList: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],

            monthMap: {
                "January":  '01',
                "February": '02',
                "March":    '03',
                "April":    '04',
                "May":      '05',
                "June":     '06',
                "July":     '07',
                "August":   '08',
                "September":'09',
                "October":  '10',
                "November": '11',
                "December": '12',
            } as {[key: string]: string}
        }
    },
    methods: {
        daysInAMonth() {


            const monthTemp = parseInt(this.monthMap[this.month]);

            const daysInMonthMap = {
            1: 31,
            2: 28,
            3: 31,
            4: 30,
            5: 31,
            6: 30,
            7: 31,
            8: 31,
            9: 30,
            10: 31,
            11: 30,
            12: 31,
            } as {[key: number]: number};

            this.dayList = Array<number>(daysInMonthMap[monthTemp]).fill(0).map((_, i) => i + 1);
        },
    },
    watch: {
        fullname() {
            this.$emit('update:fullname', this.fullname)
        },
        username() {
            this.$emit('update:username', this.username)
        },
        phone() {
            this.$emit('update:phone', this.phone)
        },
        day() {
            this.$emit('update:day', this.day)
        },
        year() {
            if(this.month && this.year) {

                const tempDay = new Date(parseInt(this.year), parseInt(this.monthMap[this.month]), 0).getDate();

                if((this.currentMonth < parseInt(this.monthMap[this.month])) && (this.currentYear == parseInt(this.year))) {
                this.month = '';
                }

                this.dayList = Array<number>(tempDay).fill(0).map((_, i) => i + 1);
                if(parseInt(this.day) > tempDay) {
                this.day = '';
                }
            }

            this.$emit('update:year', this.year)
        },
        month() {
            this.daysInAMonth();

            this.$emit('update:month', this.month)
        },
        bio() {
            this.$emit('update:bio', this.bio)
        }
    }
})

</script>

<template>
    <div class="flex flex-col gap-1 mx-auto w-full" style=" max-width: 600px">
        <form class="form flex flex-col gap-3" ref="loginForm" @submit.prevent="">
            <div class="text-center text-2xl font-bold">
                Personal Information
            </div>
            <div class="flex flex-col gap-1">

            
                <div class="flex-column">
                <label>Full Name </label>
                </div>

                <InputGroup class="input-group">
                    <InputGroupAddon class="input-addon">
                        <ion-icon :icon="ioniconsPersonCircle" aria-hidden="true"></ion-icon>
                    </InputGroupAddon>
                    <InputText class="input" type="text" v-model="fullname" placeholder="Enter your full name" />
                </InputGroup>
            </div>

            <div class="flex flex-col gap-1">
                
                <div class="flex-column">
                <label>Username </label>
                </div>

                <InputGroup class="input-group">
                    <InputGroupAddon class="input-addon">
                    <ion-icon :icon="ioniconsPerson" aria-hidden="true"></ion-icon>
                    </InputGroupAddon>
                    <InputText class="input" type="text" v-model="username" placeholder="Enter a username" />
                </InputGroup>

            </div>
                

            <div class="flex flex-col gap-1">

                <div class="flex-column">
                <label>Phone Number </label>
                </div>

                

                <!-- 

                <ion-input placeholder="Enter phone number" fill="outline" v-model="phone" :clear-input="true">
                <ion-icon slot="start" :icon="ioniconsCall" aria-hidden="true"></ion-icon>
                </ion-input> -->
                <InputGroup class="input-group">
                    <InputGroupAddon class="input-addon">
                    <ion-icon :icon="ioniconsCall" aria-hidden="true"></ion-icon>
                    </InputGroupAddon>
                    <InputMask  variant="outlined" class="input" v-model="phone" mask="(999) 999-9999" placeholder="Enter Phone Number" />
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

                <!-- <ion-textarea fill="outline" :rows="3" :counter="true" :maxlength="120"></ion-textarea> -->
                <Textarea  v-model="bio" rows="5" fluid />
            </div>

        </form>
    </div>
</template>

<style lang="scss" scoped>

select {

width: 100%;
cursor: pointer;
appearance: none;

background-color: black;
color: white;
font-size: 1rem !important;

padding: 10px 10px;
border-radius: 5px;
border: 1px solid rgb(var(--ion-color-light-rgb), 0.5);
font-size: 1rem;
outline: none;



&:hover {
  border: 1px solid rgb(var(--ion-color-light-rgb), 0.3);

}

&:focus {
  border: 1px solid var(--ion-color-primary);
}

&:active {
  outline: none;
}



:disabled {
  background-color: #222428;
  color: #8e8e8e;
}


&::-webkit-scrollbar {
  width: 5px;
}

/* Track */
&::-webkit-scrollbar-track {
  background: #222428;
}

/* Handle */
&::-webkit-scrollbar-thumb {
  background: var(--ion-color-primary);
  border-radius: 10px;
}

/* Handle on hover */
// &::-webkit-scrollbar-thumb:hover {
//   background: rgba(var(--ion-color-primary-rgb), 0.5);
// }

}


select:focus > option:checked :enabled {
background: rgba(var(--ion-color-primary-rgb, .3)) !important;
}


textarea {

resize: none;
}

.active {
color: var(--ion-color-primary);
background-color: transparent;
}

.option {
background-color: #222428;

}


ion-icon {
    font-size: 1.5rem;
}
</style>