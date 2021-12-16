<template>
  <button class="dark:text-gray-50" @click="toggle">{{ text }}</button>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'DarkModeButton',
  computed: {
    ...mapState('darkMode', [
      'enabled'
    ]),
    text() {
      return `${this.enabled ? "Disable" : "Enable"} Dark Mode`;
    },
  },
  methods: {
    ...mapMutations('darkMode', [
      'toggle'
    ]),
  },
}
</script>
