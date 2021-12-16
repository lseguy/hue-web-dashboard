<template>
  <div class="m-3">
    <div class="mt-5 mb-7 flex flex-row place-content-between items-center">
      <h1 class="text-3xl dark:text-gray-50">Hue Dashboard</h1>
      <DarkModeButton></DarkModeButton>
    </div>
    <Grid>
      <LightButton
        v-for="(light, index) in lights"
        :key="light.name"
        :name="light.name"
        :enabled="light.state.on"
        @clicked="toggleLight({ lightId: index })"
      ></LightButton>
    </Grid>
  </div>
</template>

<script>
import Grid from './components/Grid.vue'
import LightButton from './components/LightButton.vue'
import DarkModeButton from './components/DarkModeButton.vue';
import { mapActions, mapState } from 'vuex';

const darkModeWatcher = (newValue) => {
  if (newValue) {
      document.documentElement.classList.add('dark');
  } else {
      document.documentElement.classList.remove('dark');
  }
};

export default {
  name: 'App',
  components: {
    LightButton,
    DarkModeButton,
    Grid,
  },
  beforeCreate() {
    this.$store.commit('darkMode/loadLocalStorage');
    this.$store.watch(
      () => this.$store.state.darkMode.enabled,
      darkModeWatcher,
      { immediate: true }
    );
  },
  mounted() {
    this.$store.dispatch('fetchLights');
  },
  computed: {
    ...mapState([
      'lights',
    ]),
  },
  methods: {
    ...mapActions(['toggleLight']),
  },
}
</script>
