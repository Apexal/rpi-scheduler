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

      <div class="md-layout-item">
        <md-autocomplete v-model.trim="search.instructor" :md-options="searchCourseInstructors">
          <label>Instructor</label>
        </md-autocomplete>
      </div>
    </div>

    <div class="subject-codes" v-if="isSearchEmpty">
      <md-card class="md-primary" md-with-hover v-for="(subjectCourses, subjectCode) in groupedBySubjectCode" :key="subjectCode" @click.native="search.subjectCode = subjectCode">
        <md-ripple>
          <md-card-header>
            <div class="md-title">{{ subjectCode }}</div>
            <div class="md-subhead">{{ subjectCodeFullName(subjectCode) }}</div>
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
        <md-table-head>Code</md-table-head>
        <md-table-head>Title</md-table-head>
        <md-table-head>Sections</md-table-head>
        <md-table-head>Credits</md-table-head>
      </md-table-row>

      <md-table-row v-for="result in results" :key="result.subjectCode + result.number" @click="selectCourse(result)">
        <md-table-cell><strong>{{ result.subjectCode }}-{{ result.number }}</strong></md-table-cell>
        <md-table-cell>{{ result.title }}</md-table-cell>
        <md-table-cell>{{ result.sections.length }}</md-table-cell>
        <md-table-cell>{{ getAllCredits(result.sections).join(',') }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import courses from '../data.json'
import subjectCodesFullNames from '../subjectCodes'

export default {
  name: 'BrowseCoursesPage',
  data () {
    return {
      search: {
        subjectCode: '',
        title: '',
        instructor: ''
      }
    }
  },
  computed: {
    isSearchEmpty () {
      return !this.search.subjectCode && !this.search.title && !this.search.instructor
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
      return Object.keys(this.groupedBySubjectCode).map(subjectCode => `${subjectCode} - ${this.subjectCodeFullName(subjectCode)}`)
    },
    searchCourseTitles () {
      if (this.search.subjectCode === '') return []
      return (this.groupedBySubjectCode[this.search.subjectCode] || []).map(course => course.title)
    },
    searchCourseInstructors () {
      if (this.isSearchEmpty) return []
      return [...new Set(this.results.map(course => course.sections.map(section => section.instructors).flat()).flat())].sort()
    },
    results () {
      if (this.isSearchEmpty) return []

      let results = courses
      if (this.search.subjectCode) {
        results = courses.filter(course => course.subjectCode.toLowerCase().startsWith(this.search.subjectCode.toLowerCase().split(' -')[0]))
      }

      if (this.search.title) {
        results = results.filter(course => course.title.toLowerCase().includes(this.search.title.toLowerCase()))
      }

      if (this.search.instructor) {
        results = results.filter(course => course.sections.some(section => section.instructors.includes(this.search.instructor)))
      }

      return results
    }
  },
  methods: {
    getAllCredits (sections) {
      return [...new Set(sections.map(section => section.credits))].sort()
    },
    selectCourse (course) {
      this.$store.commit('SET_SELECTED_COURSE', course)
      this.$store.commit('SET_COURSE_DIALOG_OPEN', true)
    },
    subjectCodeFullName (subjectCode) {
      return subjectCodesFullNames[subjectCode] || subjectCode
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
