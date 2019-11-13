<template>
    <div class="error">
        <i class="fas fa-bug fa-2x"></i>
        <p class="txt">{{ error }}</p>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: "error",
        computed: {
            ...mapState(['error'])
        }
    }
</script>
