<template>
  <div class="m-5">
    <div class="mt-5 mb-10 flex flex-row place-content-between items-center">
      <h1 class="text-3xl dark:text-gray-50">Hue Dashboard</h1>
      <DarkModeButton></DarkModeButton>
    </div>
    <Room v-for="room in rooms" :room="room" :key="room.name"></Room>
  </div>
</template>

<script>
import Room from './components/Room.vue'
import DarkModeButton from './components/DarkModeButton.vue'
import HueApi from './api'

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
    DarkModeButton,
    Room,
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
    HueApi.getRooms().then(rooms => this.rooms = rooms);
    this.$store.dispatch('fetchLights');
  },
  data() {
    return {
      rooms: [],
    };
  },
}
</script>
