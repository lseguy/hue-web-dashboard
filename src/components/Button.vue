<template>
    <div class="p-2" :class="color" @click="toggle">
        <p class="text-gray-50">{{ name }}</p>
    </div>
</template>

<script>
import { switchOffLight, getLightInfo, switchOnLight } from '../api';

export default {
  name: 'Button',
  data() {
    return {
      lightInfo: null,
    };
  },
  props: {
    lightId: String,
  },
  computed: {
    name() {
      return this.lightInfo?.name || 'Unknown';
    },
    on: {
      get() {
        return this.lightInfo?.state.on;
      },
      set(value) {
        this.lightInfo.state.on = value;
      }
    },
    color() {
      return this.on ? 'bg-green-600' : 'bg-blue-600'
    },
  },
  methods: {
    toggle() {
      if (this.on) {
        switchOffLight(this.lightId);
      } else {
        switchOnLight(this.lightId);
      }
      this.on = !this.on;
    },
  },
  mounted() {
    getLightInfo(this.lightId).then(response => this.lightInfo = response);
  },
}
</script>

<style scoped>

</style>