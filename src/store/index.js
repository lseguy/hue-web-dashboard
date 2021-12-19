import { createStore } from 'vuex'
import HueApi from '../api'
import darkMode from './darkMode'
import _ from 'lodash';

const BRIGHTNESS_STEP = 5;

function computeNewBrightness(currentBrightness, delta) {
  const newBrightness = currentBrightness + delta;
  const clampedBrightness = Math.min(Math.max(newBrightness, 1), 254);
  return clampedBrightness;
}

HueApi.setLightBrightness = _.debounce(HueApi.setLightBrightness, 400);

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
    setLightBrightness(state, { lightId, brightness }) {
      state.lights[lightId].state.bri = brightness;
    },
  },
  getters: {
    isLightOn: (state) => (lightId) => state.lights[lightId].state.on,
    lightBrightness: (state) => (lightId) => state.lights[lightId].state.bri,
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
    dimLight({ commit, getters }, { lightId }) {
      const currentBrightness = getters.lightBrightness(lightId);
      const newBrightness = computeNewBrightness(currentBrightness, -BRIGHTNESS_STEP);
      commit('setLightBrightness', { lightId, brightness: newBrightness });
      HueApi.setLightBrightness(lightId, newBrightness);
    },
    increaseLight({ commit, getters }, { lightId }) {
      const currentBrightness = getters.lightBrightness(lightId);
      const newBrightness = computeNewBrightness(currentBrightness, BRIGHTNESS_STEP);
      commit('setLightBrightness', { lightId, brightness: newBrightness });
      HueApi.setLightBrightness(lightId, newBrightness);
    },
  },
  modules: {
    darkMode,
  },
})
