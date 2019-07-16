import Vue from 'vue'
import Vuex from 'vuex'
import vuejsStorage from 'vuejs-storage'

Vue.use(Vuex)
Vue.use(vuejsStorage)

export default new Vuex.Store({
  state: {

  },
  mutations: {
    setToken (state, payload) {
      state.token = payload.token
    },
    clearToken (state) {
      state.token = null
      state.info = null
    }
  },
  actions: {

  },
  plugins: [
    vuejsStorage({
      keys: ['token'],
      namespace: '{{ name }}',
      driver: vuejsStorage.drivers.localStorage
    })
  ]
})
