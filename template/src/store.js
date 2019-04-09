import Vue from 'vue'
import Vuex from 'vuex'
import vuejsStorage from 'vuejs-storage'

Vue.use(Vuex)
Vue.use(vuejsStorage)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  plugins: [
    vuejsStorage({
      keys: [''],
      namespace: 'tmov-client',
      driver: vuejsStorage.drivers.sessionStorage
    })
  ]
})
