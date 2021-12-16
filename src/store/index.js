import { createStore } from 'vuex'
import HueApi from '../api'
import darkMode from './darkMode'

export default createStore({
  state: {
    lights: [],
  },
  mutations: {
    setLights(state, lights) {
      state.lights = lights;
    },
    setLightState(state, { lightId, enabled }) {
      state.lights[lightId].state.on = enabled;
    },
  },
  getters: {
    isLightOn: (state) => (lightId) => state.lights[lightId].state.on,
  },
  actions: {
    async fetchLights({ commit }) {
      const lights = await HueApi.getLights();
      commit('setLights', lights);
    },
    async toggleLight({ commit, getters }, { lightId }) {
      if (getters.isLightOn(lightId)) {
        await HueApi.switchOffLight(lightId);
        commit('setLightState', { lightId, enabled: false });
      } else {
        await HueApi.switchOnLight(lightId);
        commit('setLightState', { lightId, enabled: true });
      }
    },
  },
  modules: {
    darkMode,
  },
})
