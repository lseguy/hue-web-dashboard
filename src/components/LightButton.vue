<template>
  <button
    class="p-3 filter drop-shadow-2xl rounded-md"
    :class="color"
    @click="$emit('clicked')"
    @wheel.prevent="wheelEvent"
  >
    <div class="flex flex-row place-content-between items-center">
      <p class="text-gray-50 text-left">{{ name }}</p>
      <p class="text-gray-50 text-sm text-right">{{ state }}</p>
    </div>
  </button>
</template>

<script>
export default {
  name: 'LightButton',
  props: {
    light: Object,
  },
  emits: ['clicked', 'wheelUp', 'wheelDown'],
  computed: {
    name() {
      return this.light.name;
    },
    enabled() {
      return this.light.state.on;
    },
    percentage() {
      const brightness = (this.light.state.bri - 1) / 253;
      return (brightness * 100).toFixed();
    },
    state() {
      return this.enabled ? `${this.percentage} %` : 'Off';
    },
    color() {
      return this.enabled ? 'bg-green-600 dark:bg-green-700' : 'bg-blue-600 dark:bg-blue-800';
    },
  },
  methods: {
    wheelEvent(event) {
      if (event.deltaY < 0) {
        this.$emit('wheelUp');
      } else {
        this.$emit('wheelDown');
      }
    },
  },
}
</script>
