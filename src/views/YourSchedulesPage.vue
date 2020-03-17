<template>
  <div class="your-schedules-page">
      <h1>Your Schedules</h1>

      <md-empty-state
        md-icon="calendar_today"
        md-label="Create your first schedule"
        md-description="Creating a schedule, you'll be able to choose courses and sections.">
        <md-button class="md-primary md-raised">Create first schedule</md-button>
      </md-empty-state>
  </div>
</template>

<script>
export default {
  name: 'YourSchedulesPage'
}
</script>

<style>

</style>
