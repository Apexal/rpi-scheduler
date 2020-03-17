<template>
  <div class="browse-courses-page">
    <h1>Browse Courses</h1>

    <div class="search md-layout md-gutter">
      <div class="md-layout-item">
        <md-autocomplete v-model.trim="search.subjectCode" :md-options="subjectCodes">
          <label>Subject</label>
        </md-autocomplete>
      </div>
      <div class="md-layout-item">
        <md-autocomplete v-model.trim="search.title" :md-options="searchCourseTitles">
          <label>Title</label>
        </md-autocomplete>
      </div>

    </div>

    <CourseDialog :active="isCourseDialogOpen" :course="selectedCourse" @add-section="showSnackbar = true" @close="isCourseDialogOpen = false" />

    <div class="subject-codes" v-if="isSearchEmpty">
      <md-card md-with-hover v-for="(subjectCourses, subjectCode) in groupedBySubjectCode" :key="subjectCode" @click.native="search.subjectCode = subjectCode">
        <md-ripple>
          <md-card-header>
            <div class="md-title">{{ subjectCode }}</div>
            <div class="md-subhead">Full Subject Title</div>
          </md-card-header>

        </md-ripple>
      </md-card>
    </div>

    <md-empty-state v-else-if="results.length === 0"
      md-rounded
      md-icon="search"
      md-label="No results for your search"
      md-description="We could not find any courses that matched your search. Try changing the filters.">
    </md-empty-state>

    <md-table v-else>
      <md-table-row>
        <md-table-head>Title</md-table-head>
        <md-table-head>Sections</md-table-head>
        <md-table-head>Credits</md-table-head>
      </md-table-row>

      <md-table-row v-for="result in results" :key="result.subjectCode + result.number" @click="selectedCourse = result; isCourseDialogOpen = true">
        <md-table-cell>{{ result.title }}</md-table-cell>
        <md-table-cell>{{ result.sections.length }}</md-table-cell>
        <md-table-cell>{{ getAllCredits(result.sections).join(',') }}</md-table-cell>
      </md-table-row>
    </md-table>

    <md-snackbar md-position="center" :md-duration="4000" :md-active.sync="showSnackbar" md-persistent>
      <span>Added course to your schedule!</span>
      <md-button class="md-primary" @click="showSnackbar = false">Undo</md-button>
    </md-snackbar>
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
      showSnackbar: false,
      isCourseDialogOpen: true,
      search: {
        subjectCode: '',
        title: ''
      },
      selectedCourse: null
    }
  },
  computed: {
    isSearchEmpty () {
      return !this.search.subjectCode && !this.search.title
    },
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
    searchCourseTitles () {
      if (this.search.subjectCode === '') return []
      return (this.groupedBySubjectCode[this.search.subjectCode] || []).map(course => course.title)
    },
    results () {
      if (this.isSearchEmpty) return []

      let results = courses
      if (this.search.subjectCode) {
        results = courses.filter(course => course.subjectCode.toLowerCase().startsWith(this.search.subjectCode.toLowerCase()))
      }

      if (this.search.title) {
        results = results.filter(course => course.title.toLowerCase().includes(this.search.title.toLowerCase()))
      }

      return results
    }
  },
  methods: {
    getAllCredits (sections) {
      return [...new Set(sections.map(section => section.credits))].sort()
    }
  }
}
</script>

<style scoped>
.md-card {
  width: 320px;
  margin: 10px;
  display: inline-block;
  vertical-align: top;
}
</style>
