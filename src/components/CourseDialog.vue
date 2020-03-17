<template>
  <md-dialog v-if="course" :md-active="active" @md-closed="$emit('close')" @md-clicked-outside="$emit('close')">
    <md-dialog-title><strong>{{ course.subjectCode }}-{{ course.number }}</strong> {{ course.title}}</md-dialog-title>

    <md-dialog-content>
      <md-tabs>
        <md-tab md-label="Description">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui molestiae ipsa voluptatem veritatis ipsam, labore, eaque ipsum quia blanditiis natus tempora soluta rem sed libero laudantium dolores fugit similique voluptate cum quam odit? Laborum quo sed aspernatur quae optio at.</p>
        </md-tab>
        <md-tab md-label="Sections">
          <md-table>
            <md-table-row>
              <md-table-head>#</md-table-head>
              <md-table-head>CRN</md-table-head>
              <md-table-head>Meet On</md-table-head>
              <md-table-head>Instructors</md-table-head>
              <md-table-head>Actions</md-table-head>
            </md-table-row>

            <md-table-row v-for="section in course.sections" :key="section.crn">
              <md-table-cell>{{ section.sectionId }}</md-table-cell>
              <md-table-cell>{{ section.crn }}</md-table-cell>
              <md-table-cell>
                <md-list>
                  <md-list-item v-for="(period, index) in section.periods" :key="index">
                    <strong>{{ dayNames(period.days).join(', ') }}</strong>
                    <span class="times">{{formatTime(period.startTime)}} {{ formatTime(period.endTime) }}</span>
                    <span class="location">{{ period.location }}</span>
                  </md-list-item>
                </md-list>
              </md-table-cell>
              <md-table-cell>{{ section.instructors.join(', ') }}</md-table-cell>
              <md-table-cell>
                <md-button v-if="selectedCRNs.includes(section.crn)" class="md-icon-button md-accent" @click="$store.commit('UNSELECT_CRN', section.crn)">
                  <md-icon>remove_circle_outline</md-icon>
                </md-button>
                <md-button v-else class="md-icon-button md-primary" @click="$store.commit('SELECT_CRN', section.crn)">
                  <md-icon>add_circle_outline</md-icon>
                </md-button>
              </md-table-cell>
            </md-table-row>
          </md-table>
        </md-tab>
      </md-tabs>
    </md-dialog-content>
  </md-dialog>
</template>

<script>
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

export default {
  name: 'CourseDialog',
  props: {
    active: { type: Boolean, default: false },
    course: { required: true }
  },
  computed: {
    selectedCRNs () {
      return this.$store.state.selectedCRNs
    }
  },
  methods: {
    dayName (dayNum) {
      return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayNum] || '?'
    },
    dayNames (days) {
      return days.map(this.dayName)
    },
    formatTime (timeString) {
      return dayjs(timeString, 'HH:mm').format('h:mm a')
    }
  }
}
</script>

<style>

</style>
