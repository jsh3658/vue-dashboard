<template>
    <div class="content">
        <!-- DatePicker -->
        <div class="row">
            <div class="date-picker">
                <p class="tit">Date Select<span>Sub Title</span></p>
                <DatePicker @updateDate="update" :start="date.start" :end="date.end"/>
            </div>
        </div>
    </div>
</template>

<script>
    import date from '@/common/dateConfig.js';
    import DatePicker from '@/components/datePicker/datePicker.vue';

    export default {
        name: "datepicker",
        data() {
            return {
                date: {
                    start: date.AWeekAgo,
                    end: date.Yesterday,
                },

            }
        },
        components: { DatePicker },
        methods: {
            update(s, e) {
                this.date.start = s;
                this.date.end = e;
            }
        }
    }
</script>