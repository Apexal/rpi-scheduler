import Vue from 'vue'
import Vuex from 'vuex'
import courses from '../data.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCourseDialogOpen: false,
    selectedCourse: null,
    selectedCRNs: [
      // '94997',
      // '94806',
      // '94496',
      // '95738'
    ]
  },
  getters: {
    getSelectedCoursesGroupedByCRN: state => {
      const grouped = {}
      for (const crn of state.selectedCRNs) {
        const course = courses.find(course => !!course.sections.find(section => section.crn === crn))
        grouped[crn] = course
      }

      return grouped
    },
    getSelectedPeriods: state => {
      return courses.map(course => course.sections.filter(section => state.selectedCRNs.includes(section.crn))).flat().map(section => section.periods).flat()
    },
    periodTypeDisplay: state => periodType => {
      return {
        LEC: 'Lecture',
        REC: 'Recitation',
        TES: 'Test',
        STU: 'Studio'
      }[periodType] || periodType
    },
    mapPeriodToEvent: (state, getters) => period => {
      return {
        title: period.courseTitle + ' ' + getters.periodTypeDisplay(period.periodType),
        startTime: period.startTime,
        endTime: period.endTime,
        daysOfWeek: period.days,
        crn: period.crn
      }
    }
  },
  mutations: {
    SELECT_CRN (state, crn) {
      state.selectedCRNs = [...state.selectedCRNs, crn]
      localStorage.setItem('selectedCRNs', JSON.stringify(state.selectedCRNs))
    },
    UNSELECT_CRN (state, crn) {
      state.selectedCRNs = state.selectedCRNs.filter(oldCRN => oldCRN !== crn)
      localStorage.setItem('selectedCRNs', JSON.stringify(state.selectedCRNs))
    },
    SET_SELECTED_COURSE (state, course) {
      state.selectedCourse = course
    },
    SET_COURSE_DIALOG_OPEN (state, isOpen) {
      state.isCourseDialogOpen = isOpen
    },
    SET_SELECTED_CRNS: (state, crns) => {
      state.selectedCRNs = crns
      localStorage.setItem('selectedCRNs', JSON.stringify(state.selectedCRNs))
    }
  }
})
