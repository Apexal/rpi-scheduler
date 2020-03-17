<template>
  <div class="browse-courses-page">
    <h1>Browse Courses</h1>

    <md-autocomplete v-model="selectedSubjectCode" :md-options="subjectCodes">
      <label>Subject</label>
    </md-autocomplete>

    <CourseDialog :active="isCourseDialogOpen" :course="selectedCourse" @close="isCourseDialogOpen = false" />

    <md-empty-state v-if="results.length === 0"
      md-rounded
      md-icon="search"
      md-label="No results for your search"
      md-description="We could not find any courses that matched your search. Try changing the filters.">
    </md-empty-state>
    <md-table v-else>
      <md-table-row>
        <md-table-head>Title</md-table-head>
        <md-table-head numeric>Sections</md-table-head>
        <md-table-head>Credits</md-table-head>
      </md-table-row>

      <md-table-row v-for="result in results" :key="result.subjectCode + result.number" @click="selectedCourse = result; isCourseDialogOpen = true">
        <md-table-cell>{{ result.title }}</md-table-cell>
        <md-table-cell>{{ result.sections.length }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import CourseDialog from '../components/CourseDialog.vue'

import courses from '../data.json'

export default {
  name: 'BrowseCoursesPage',
  components: { CourseDialog },
  data () {
    return {
      isCourseDialogOpen: true,
      selectedSubjectCode: '',
      selectedCourse: null
    }
  },
  computed: {
    groupedBySubjectCode () {
      const grouped = {}
      for (const course of courses) {
        if (!(course.subjectCode in grouped)) {
          grouped[course.subjectCode] = []
        }

        grouped[course.subjectCode].push(course)
      }

      return grouped
    },
    subjectCodes () {
      return Object.keys(this.groupedBySubjectCode)
    },
    results () {
      return this.groupedBySubjectCode[this.selectedSubjectCode] || []
    }
  }
}
</script>

<style>

</style>
