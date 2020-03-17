import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedCRNs: []
  },
  getters: {
  },
  mutations: {
    SELECT_CRN (state, crn) {
      state.selectedCRNs = [...state.selectedCRNs, crn]
    },
    UNSELECT_CRN (state, crn) {
      state.selectedCRNs = state.selectedCRNs.filter(oldCRN => oldCRN !== crn)
    }
  },
  actions: {
  }
})
