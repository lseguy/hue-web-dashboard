<template>
  <button class="p-3 filter drop-shadow-2xl rounded-md" :class="color" @click="$emit('clicked')">
    <p class="text-gray-50 text-left">{{ name }}</p>
  </button>
</template>

<script>
export default {
  name: 'LightButton',
  props: {
    name: String,
    enabled: Boolean,
  },
  emits: ['clicked'],
  computed: {
    color() {
      return this.enabled ? 'bg-green-600 dark:bg-green-700' : 'bg-blue-600 dark:bg-blue-700';
    },
  },
}
</script>
