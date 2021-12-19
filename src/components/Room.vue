<template>
  <div class="mb-10">
    <h3 class="mb-3 text-xl dark:text-gray-50">{{ name }}</h3>
    <div class="grid grid-cols-3 gap-3">
      <LightButton
        v-for="(light, index) in lights"
        :key="light.name"
        :light="light"
        @clicked="toggleLight({ lightId: index })"
        @wheelDown="dimLight({ lightId: index })"
        @wheelUp="increaseLight({ lightId: index })"
      ></LightButton>
    </div>
  </div>
</template>

<script>
import LightButton from './LightButton.vue'
import { mapActions } from 'vuex'
import _ from 'lodash'

export default {
    name: 'Room',
    components: {
      LightButton,
    },
    props: {
      room: Object,
    },
    computed: {
      lights() {
        return _.pick(this.$store.state.lights, this.room.lights);
      },
      name() {
        return this.room.name;
      },
    },
    methods: {
      ...mapActions(['toggleLight', 'dimLight', 'increaseLight']),
    },
}
</script>
