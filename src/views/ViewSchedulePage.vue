<template>
  <div class="view-schedule-page">
      <h1>View Schedule</h1>

      <md-empty-state
        md-icon="calendar_today"
        md-label="No sections selected"
        md-description="To start your schedule, browse the course catalog and add sections.">
        <md-button class="md-primary md-raised">Browse Courses</md-button>
      </md-empty-state>
  </div>
</template>

<script>
export default {
  name: 'ViewSchedulePage'
}
</script>

<style>

</style>
