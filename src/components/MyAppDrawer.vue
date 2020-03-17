<template>
  <div>
    <md-toolbar class="md-transparent" md-elevation="0">Navigation</md-toolbar>

    <md-subheader>Pages</md-subheader>
    <md-list>
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

      <md-list-item v-for="(course, crn) in selectedCourses" :key="crn" @click="selectCourse(course)">
        <strong class="selected-crn">{{ crn }}</strong><span class="md-list-item-text">{{ course.title }}</span>
        <md-button v-if="selectedCRNs.includes(crn)" class="md-icon-button md-accent" @click="$store.commit('UNSELECT_CRN', crn)">
          <md-icon>remove_circle_outline</md-icon>
        </md-button>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
export default {
  name: 'MyAppDrawer',
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
    }
  }
}
</script>

<style scoped>
.selected-crn {
  margin-right: 10px;
}
</style>
