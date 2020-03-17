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

      <md-list-item v-for="crn in selectedCRNs" :key="crn">{{ crn }}</md-list-item>
    </md-list>
  </div>
</template>

<script>
export default {
  name: 'MyAppDrawer',
  computed: {
    selectedCRNs () {
      return this.$store.state.selectedCRNs
    }
  }
}
</script>

<style>
</style>
