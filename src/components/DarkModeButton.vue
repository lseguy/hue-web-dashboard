<template>
  <button class="dark:text-gray-50" @click="toggle">{{ text }}</button>
</template>

<script>
export default {
  name: 'DarkModeButton',
  props: {
    enabled: Boolean,
  },
  emits: ['clicked'],
  computed: {
    text() {
      return `${this.enabled ? "Disable" : "Enable"} Dark Mode`;
    },
  },
  methods: {
    toggle() {
        this.$emit('clicked', !this.enabled);
    }
  },
}
</script>
