export default {
  namespaced: true,
  state: {
    enabled: false,
  },
  mutations: {
    toggle(state) {
      state.enabled = !state.enabled;
      localStorage.setItem('darkMode', state.enabled);
    },
    loadLocalStorage(state) {
      const darkMode = localStorage.getItem('darkMode');
      if (darkMode === 'true') {
        state.enabled = true;
      }
    },
  },
}