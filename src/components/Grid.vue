<template>
    <div class="grid grid-cols-3 gap-2">
        <Button v-for="(light, index) in lights" :lightId="index" :key="light.name"></Button>
    </div>
</template>

<script>
import { getLights } from '../api';
import Button from './Button.vue';

export default {
    name: 'Grid',
    data() {
        return {
            lights: {},
        };
    },
    components: {
        Button,
    },
    mounted() {
        getLights().then(response => this.lights = response);
    },
}
</script>

<style scoped>

</style>