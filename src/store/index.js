import Vue from 'vue'
import Vuex from 'vuex'
import courses from '../data.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedCRNs: [
      '94997',
      '94806',
      '94496',
      '95738'
    ]
  },
  getters: {
    getSelectedPeriods: state => {
      return courses.map(course => course.sections.filter(section => state.selectedCRNs.includes(section.crn))).flat().map(section => section.periods).flat()
    },
    mapPeriodToEvent: state => period => {
      return {
        title: period.courseTitle + ' ' + period.periodType,
        startTime: period.startTime,
        endTime: period.endTime,
        daysOfWeek: period.days
      }
    }
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
