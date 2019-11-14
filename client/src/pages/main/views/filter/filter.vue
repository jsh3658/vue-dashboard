<template>
    <div class="content">
        <filter-comp :filter="filter" :filterActive="filterActive" />
    </div>
</template>

<script>
    import FilterComp from '@/components/filter/filter.vue';

    export default {
        name: "filters",
        data() {
            return{
                filterActive : 'A', // -1 : All Tab Active
                filter: {
                    A: {
                        title: 'Title1',
                        default: ['Filter02', 'Filter05', 'Filter07', 'Filter08', 'Filter12'],
                        lists: ['Filter01', 'Filter02', 'Filter03', 'Filter04', 'Filter05', 'Filter06', 'Filter07', 'Filter08', 'Filter09', 'Filter10', 'Filter11', 'Filter12', 'Filter13'],
                        selected: [],
                        confirm: []
                    },
                    B: {
                        title: 'Title2',
                        default: ['A', 'D'],
                        lists: ['A', 'B', 'C', 'D'],
                        selected: [],
                        confirm: []
                    }
                },
            }
        },
        components: {
            FilterComp
        },
    }
</script>