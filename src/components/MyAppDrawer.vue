<template>
  <div>
    <md-toolbar class="md-transparent" md-elevation="0">Navigation</md-toolbar>

    <md-list>
      <md-list-item :to="{ name: 'BrowseCourses' }">
        <md-icon>school</md-icon>
        <span class="md-list-item-text">Browse Courses</span>
      </md-list-item>

      <md-list-item :to="{ name: 'ViewSchedule' }">
        <md-icon>calendar_today</md-icon>
        <span class="md-list-item-text">View Schedule</span>
      </md-list-item>

    </md-list>
  </div>
</template>

<script>
export default {
  name: 'MyAppDrawer'
}
</script>

<style>
</style>
