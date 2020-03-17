<template>
  <div class="view-schedule-page">
      <h1>View Schedule</h1>

      <md-empty-state
        v-if="selectedCRNs.length === 0"
        md-icon="calendar_today"
        md-label="No sections selected"
        md-description="To start your schedule, browse the course catalog and add sections.">
        <md-button class="md-primary md-raised">Browse Courses</md-button>
      </md-empty-state>
      <FullCalendar v-else
        default-view="timeGridWeek"
        :plugins="calendar.plugins"
        slot-duration="01:00:00"
        :all-day-slot="false"
        :header="calendar.header"
        :column-header-format="calendar.columnHeaderFormat"
        :weekends="false"
        min-time="08:00:00"
        max-time="22:00:00"
        height="100%"
      />
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'

export default {
  name: 'ViewSchedulePage',
  components: { FullCalendar },
  data () {
    return {
      calendar: {
        plugins: [dayGridPlugin, timeGridPlugin],
        header: {
          left: '',
          center: '',
          right: ''
        },
        columnHeaderFormat: {
          weekday: 'long'
        }
      }
    }
  },
  computed: {
    selectedCRNs () {
      return this.$store.state.selectedCRNs
    }
  }
}
</script>

<style lang='scss'>

@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';
@import '~@fullcalendar/timegrid/main.css';

.fc-today {
  background-color: inherit !important;
}

.fc-time-grid .fc-slats td {
  height: 4em;
  border-bottom: 0;
}

</style>
