<template>
  <div class="view-schedule-page">
      <h1>View Schedule</h1>

      <md-empty-state
        v-if="selectedCRNs.length === 0"
        md-icon="calendar_today"
        md-label="No sections selected"
        md-description="To start your schedule, browse the course catalog and add sections.">
        <md-button class="md-primary md-raised" :to="{ name: 'BrowseCourses' }">Browse Courses</md-button>
      </md-empty-state>
      <FullCalendar
        v-else
        default-view="timeGridWeek"
        :plugins="calendar.plugins"
        event-color="#448aff"
        slot-duration="01:00:00"
        :all-day-slot="false"
        :header="calendar.header"
        :column-header-format="calendar.columnHeaderFormat"
        :weekends="false"
        min-time="08:00:00"
        max-time="22:00:00"
        :events="events"
        height="auto"
        @eventClick="eventClick"
      />
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

export default {
  name: 'ViewSchedulePage',
  components: { FullCalendar },
  data () {
    return {
      calendar: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
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
    },
    events () {
      return this.$store.getters.getSelectedPeriods.map(this.$store.getters.mapPeriodToEvent)
    }
  },
  methods: {
    eventClick ({ event }) {
      this.$store.commit('SET_SELECTED_COURSE', this.$store.getters.getSelectedCoursesGroupedByCRN[event.extendedProps.crn])
      this.$store.commit('SET_COURSE_DIALOG_OPEN', true)
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
  height: 3em;
  border-bottom: 0;
}

.fc {
  border-radius: 6px;
  background-color: white !important;
  color: black !important;
}

.fc-toolbar {
  display: none;
}

.fc a {
  color: white !important;
  text-decoration: none !important;
}

.fc-event {
  cursor: pointer;
}
</style>

<style lang="scss" scoped>
.md-card {
}
</style>
