<template>
  <div>
    <md-subheader>Pages</md-subheader>
    <md-list :md-expand-single="true">
      <md-list-item :to="{ name: 'Home' }">
        <md-icon>home</md-icon>
        <span class="md-list-item-text">Home</span>
      </md-list-item>

      <md-list-item :to="{ name: 'BrowseCourses' }">
        <md-icon>school</md-icon>
        <span class="md-list-item-text">Browse Courses</span>
      </md-list-item>

      <md-list-item :to="{ name: 'ViewSchedule' }">
        <md-icon>calendar_today</md-icon>
        <span class="md-list-item-text">View Schedule</span>
      </md-list-item>

      <md-divider></md-divider>

      <md-subheader><span>Selected Courses</span><md-badge v-if="$store.getters.hasConflicts" class="md-square" md-content="CONFLICTS" style="right: 10px;"/></md-subheader>
      <!-- <md-list-item v-if="selectedCRNs.length === 0"><span>Added courses will display here.</span></md-list-item> -->
      <!-- <md-list-item md-expand>
        <span class="md-list-item-text">News</span>
        <md-button class="md-icon-button md-accent">
          <md-tooltip md-direction="left">Remove section</md-tooltip>
          <md-icon>remove_circle_outline</md-icon>
        </md-button>

        <md-list slot="md-expand">
          <md-list-item class="md-inset">World</md-list-item>
          <md-list-item class="md-inset">Europe</md-list-item>
          <md-list-item class="md-inset">South America</md-list-item>
        </md-list>
      </md-list-item> -->

      <transition-group name="selected-crn-list" tag="div">

        <md-list-item v-for="course in selectedCourses" :key="course.subjectCode + course.number" md-expand>
          <!-- <strong @click.stop="copyCRN(crn)" class="selected-crn">
            <md-tooltip md-direction="bottom">Click to copy CRN</md-tooltip>
            {{ crn }}
          </strong> -->
          <span class="course-title md-list-item-text">{{ course.title }}</span>
          <md-button class="md-icon-button" @click.stop="selectCourse(course)">
            <md-icon>info_outline</md-icon>
          </md-button>
          <md-button class="md-icon-button md-accent" @click.stop="clearSections(course)">
            <md-tooltip md-direction="left">Remove ALL section</md-tooltip>
            <md-icon>remove_circle_outline</md-icon>
          </md-button>

          <md-list slot="md-expand">
            <md-list-item v-for="section in filterSelectedSections(course.sections)" :key="section.crn" class="md-inset">
              <strong @click.stop="copyCRN(section.crn)">{{ section.crn }}</strong>
              <span>Section {{ section.sectionId }}</span>
              <md-button class="md-icon-button md-accent" @click.stop="$store.commit('UNSELECT_CRN', section.crn)">
                <md-tooltip md-direction="left">Remove section</md-tooltip>
                <md-icon>remove_circle_outline</md-icon>
              </md-button>
            </md-list-item>
            <md-list-item class="md-inset" @click.stop="selectCourse(course)">All sections</md-list-item>
          </md-list>
        </md-list-item>
      </transition-group>

      <md-divider></md-divider>

      <template v-if="selectedCRNs.length > 0">
        <md-subheader>Stats</md-subheader>
        <md-list-item><span>Total Credits</span><strong>{{ totalCredits }}</strong></md-list-item>
      </template>
    </md-list>

    <md-snackbar md-position="center" :md-duration="2000" :md-active.sync="showSnackbar" md-persistent>
      <span>Copied crn <strong>{{ copiedCRN }}</strong> to your clipboard!</span>
    </md-snackbar>
  </div>
</template>

<script>
export default {
  name: 'MyAppDrawer',
  data () {
    return {
      showSnackbar: false,
      copiedCRN: ''
    }
  },
  computed: {
    selectedCRNs () {
      return this.$store.state.selectedCRNs
    },
    selectedCourses () {
      return this.$store.getters.selectedCourses
    },
    selectedSections () {
      return this.$store.getters.getSelectedSectionsGroupedByCRN
    },
    totalCredits () {
      let estimate = false
      const total = Object.values(this.selectedSections).reduce((acc, section) => {
        const parts = section.credits.split('-')

        if (parts.length === 0) {
          return acc
        } else if (parts.length === 1) {
          return acc + parseInt(section.credits)
        } else {
          estimate = true
          return acc
        }
      }, 0)
      return estimate ? ('>' + total) : total
    }
  },
  methods: {
    selectCourse (course) {
      this.$store.commit('SET_SELECTED_COURSE', course)
      this.$store.commit('SET_COURSE_DIALOG_OPEN', true)
    },
    copyCRN (crn) {
      this.copiedCRN = crn
      const el = document.createElement('textarea')
      el.value = crn
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      this.showSnackbar = true
    },
    filterSelectedSections (sections) {
      return sections.filter(section => this.selectedCRNs.includes(section.crn))
    },
    clearSections (course) {
      this.$store.commit('SET_SELECTED_CRNS', this.selectedCRNs.filter(crn => !course.sections.some(section => section.crn === crn)))
    }
  }
}
</script>

<style scoped>
.course-title {
  padding: 0 5px;
}

.selected-crn-list-enter-active, .selected-crn-list-leave-active {
  transition: all 0.2s;
}
.selected-crn-list-enter, .selected-crn-list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
