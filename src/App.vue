<template>
  <div class="m-3">
    <div class="mt-5 mb-7 flex flex-row place-content-between items-center">
      <h1 class="text-3xl dark:text-gray-50">Hue Dashboard</h1>
      <DarkModeButton :enabled="darkMode" @clicked="setDarkMode"></DarkModeButton>
    </div>
    <Grid>
      <LightButton
        v-for="(light, index) in lights"
        :key="light.name"
        :name="light.name"
        :enabled="light.state.on"
        @clicked="toggleLight(index)"
      ></LightButton>
    </Grid>
  </div>
</template>

<script>
import Grid from './components/Grid.vue'
import LightButton from './components/LightButton.vue'
import HueApi from './api';
import DarkModeButton from './components/DarkModeButton.vue';

export default {
  name: 'App',
  data() {
    return {
      lights: [],
      darkMode: false,
    };
  },
  components: {
    LightButton,
    DarkModeButton,
    Grid,
  },
  mounted() {
    HueApi.getLights().then(lights => this.lights = lights);
  },
  methods: {
    setDarkMode(enabled) {
      if (enabled) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      this.darkMode = !this.darkMode;
    },
    toggleLight(index) {
      if (this.lights[index].state.on) {
        HueApi.switchOffLight(index);
      } else {
        HueApi.switchOnLight(index);
      }
      this.lights[index].state.on = !this.lights[index].state.on;
    },
  },
}
</script>

<style>
</style>
