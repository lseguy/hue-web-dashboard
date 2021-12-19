<template>
  <div class="m-5">
    <div class="mt-5 mb-10 flex flex-row place-content-between items-center">
      <h1 class="text-3xl dark:text-gray-50">Hue Dashboard</h1>
      <DarkModeButton></DarkModeButton>
    </div>
    <Grid>
      <LightButton
        v-for="(light, index) in lights"
        :key="light.name"
        :light="light"
        @clicked="toggleLight({ lightId: index })"
        @wheelDown="dimLight({ lightId: index })"
        @wheelUp="increaseLight({ lightId: index })"
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
    ...mapActions(['toggleLight', 'dimLight', 'increaseLight']),
  },
}
</script>
