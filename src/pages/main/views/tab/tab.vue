<template>
    <div class="content">
        <!-- Tab -->
        <div :class="naviActive ? 'tab-area on' : 'tab-area'">
            <ul>
                <li v-for="(tab, i) in tabs" :key="i"><a href="javascript:" @click="tabButton(i)" :class="activeTab === i ? 'on' : ''">{{ tab }}</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "tab",
        props: ['navi'],
        data() {
            return {
                tabs: ['All', 'Tab1', 'Tab2', 'Tab3', 'Tab4', 'Tab5', 'Tab6', 'Tab7', 'Tab8', 'Tab9', 'Tab10', 'Tab11', 'Tab12', 'Tab13'],
                activeTab: 0,
            }
        },
        computed: {
            naviActive() {
                return this.navi
            },
        },
        methods: {
            tabButton(index) {
                if (this.activeTab !== index) {
                    this.activeTab = index;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    #app {
        #container {
            .content {
                padding-left: 122px;
            }
        }
    }
</style>