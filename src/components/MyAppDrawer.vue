<template>
  <div>
    <md-toolbar class="md-transparent" md-elevation="0">Navigation</md-toolbar>

    <md-subheader>Pages</md-subheader>
    <md-list>
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

      <md-subheader>Selected Sections</md-subheader>
      <transition-group name="selected-crn-list" tag="div">
        <md-list-item v-for="(course, crn) in selectedCourses" :key="course.title + crn" @click="selectCourse(course)">
          <strong @click.stop="copyCRN(crn)" class="selected-crn">
            <md-tooltip md-direction="bottom">Click to copy CRN</md-tooltip>
            {{ crn }}
          </strong>
          <span class="md-list-item-text">{{ course.title }}</span>
          <md-button v-if="selectedCRNs.includes(crn)" class="md-icon-button md-accent" @click.stop="$store.commit('UNSELECT_CRN', crn)">
            <md-icon>remove_circle_outline</md-icon>
          </md-button>
        </md-list-item>
      </transition-group>
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
      return this.$store.getters.getSelectedCoursesGroupedByCRN
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
    }
  }
}
</script>

<style scoped>
.selected-crn {
  margin-right: 10px;
}

.selected-crn-list-enter-active, .selected-crn-list-leave-active {
  transition: all 0.2s;
}
.selected-crn-list-enter, .selected-crn-list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
