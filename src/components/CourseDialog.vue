<template>
  <md-dialog v-if="course" :md-active="active" @md-closed="$emit('close')" @md-clicked-outside="$emit('close')">
    <md-dialog-title><strong>{{ course.subjectCode }}-{{ course.number }}</strong> {{ course.title}}</md-dialog-title>

    <md-dialog-content>
      <md-tabs>
        <md-tab md-label="Sections">
          <md-table>
            <md-table-row>
              <md-table-head>#</md-table-head>
              <md-table-head>CRN</md-table-head>
              <md-table-head>Meetings</md-table-head>
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
                    <span class="md-mobile-only spacer">|</span>
                    <span class="times">{{formatTime(period.startTime)}} - {{ formatTime(period.endTime) }}</span>
                    <!-- <span class="location">{{ period.location }}</span> -->
                  </md-list-item>
                </md-list>
              </md-table-cell>
              <md-table-cell>{{ section.instructors.join(', ') }}</md-table-cell>
              <md-table-cell>
                <md-button v-if="selectedCRNs.includes(section.crn)" class="md-icon-button md-accent" @click="$store.commit('UNSELECT_CRN', section.crn)">
                  <md-tooltip md-direction="left">Remove from schedule</md-tooltip>
                  <md-icon>remove_circle_outline</md-icon>
                </md-button>
                <md-button v-else class="md-icon-button md-primary" @click="$store.commit('SELECT_CRN', section.crn)">
                  <md-tooltip md-direction="left">Add this section</md-tooltip>
                  <md-icon>add_circle_outline</md-icon>
                </md-button>
                <md-button v-if="hasAnySelected && !selectedCRNs.includes(section.crn)" class="md-icon-button md-primary" @click="switchToSection(section.crn)">
                  <md-tooltip md-direction="left">Switch to this section</md-tooltip>
                  <md-icon>swap_horiz</md-icon>
                </md-button>
              </md-table-cell>
            </md-table-row>
          </md-table>
        </md-tab>
        <md-tab md-label="Description">
          <p>(Coming Soon) The official course description from the Catalog will be here.</p>
        </md-tab>
      </md-tabs>
    </md-dialog-content>

    <md-dialog-actions>
      <md-button v-if="hasAnySelected" class="md-accent" @click="clearSelectedCourseSections">Clear Sections</md-button>
      <md-button class="md-primary" @click="$emit('close')">Close</md-button>
    </md-dialog-actions>
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
    },
    hasAnySelected () {
      return this.course.sections.some(section => this.selectedCRNs.includes(section.crn))
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
    },
    clearSelectedCourseSections () {
      this.$store.commit('SET_SELECTED_CRNS', this.selectedCRNs.filter(crn => !this.course.sections.some(section => section.crn === crn)))
    },
    switchToSection (crn) {
      // Remove other sections in this course
      this.$store.commit('SET_SELECTED_CRNS', [...this.selectedCRNs.filter(crn => !this.course.sections.some(section => section.crn === crn)), crn])
    }
  }
}
</script>

<style>
.md-content.md-tabs-content {
  max-width: 90vw !important;
}
</style>

<style lang="scss" scoped>
.spacer {
  padding: 0 5px;
}
</style>
