<template>
  <div class="browse-courses-page">
    <h1>Browse Courses</h1>

    <md-card>
      <md-card-content>
        <div class="search md-layout md-gutter">
          <div class="md-layout-item">
            <md-autocomplete v-model.trim="search.subjectCode" :md-options="subjectCodesWithFullNames">
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
      </md-card-content>
      <md-card-expand>
        <!-- <md-card-expand-trigger>
          <md-button class="md-accent">Advanced Search</md-button>
        </md-card-expand-trigger> -->
        <md-card-expand-content>
          <md-card-content>
            <p>test</p>
          </md-card-content>
        </md-card-expand-content>
      </md-card-expand>
    </md-card>

    <div class="subject-codes" v-if="isSearchEmpty">
      <transition-group name="subject-code-list" tag="div">

        <md-card
          class="subject-code-card"
          v-for="subjectCode in subjectCodes"
          :key="subjectCode"
          :class="favoriteSubjectCodes.includes(subjectCode) ? 'md-accent' : 'md-primary'"
          md-with-hover
          @click.native="search.subjectCode = subjectCode"
        >
          <md-ripple>
            <md-card-header>
            <md-tooltip md-direction="bottom">{{ groupedBySubjectCode[subjectCode].length }} courses</md-tooltip>
              <md-card-header-text>
                <div class="md-title">{{ subjectCode }}</div>
                <div class="md-subhead">{{ subjectCodeFullName(subjectCode) }}</div>
              </md-card-header-text>
              <md-button class="md-icon-button" @click.stop="toggleSubjectCodeFavorite(subjectCode)">
                <md-icon>star</md-icon>
              </md-button>
            </md-card-header>

          </md-ripple>
        </md-card>
      </transition-group>
    </div>

    <md-empty-state v-else-if="results.length === 0"
      md-rounded
      md-icon="search"
      md-label="No results for your search"
      md-description="We could not find any courses that matched your search. Try changing the filters.">
    </md-empty-state>

    <md-table v-model="tableResults" md-sort="code" md-sort-order="asc">

      <md-table-toolbar>
        <h1 class="md-title">Search Results</h1>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }" @click="selectCourse(item)">
        <md-table-cell md-label="Code" md-sort-by="number"><strong>{{ item.subjectCode }}-{{ item.number }}</strong></md-table-cell>
        <md-table-cell md-label="Title" md-sort-by="title">{{ item.title }}</md-table-cell>
        <md-table-cell md-label="Sections" md-sort-by="sections.length">{{ item.sections.length }}</md-table-cell>
        <md-table-cell md-label="Credits">{{ getAllCredits(item.sections).join(',') }}</md-table-cell>
      </md-table-row>
      <!-- <md-table-row>
        <md-table-head>Code</md-table-head>
        <md-table-head>Title</md-table-head>
        <md-table-head>Sections</md-table-head>
        <md-table-head>Credits</md-table-head>
      </md-table-row>

      <md-table-row v-for="result in results" :key="result.subjectCode + result.number" @click="selectCourse(result)">
      </md-table-row> -->
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
      favoriteSubjectCodes: [],
      tableResults: [],
      search: {
        subjectCode: '',
        title: '',
        instructor: ''
      }
    }
  },
  created () {
    if (localStorage.getItem('favoriteSubjectCodes') !== null) {
      try {
        this.favoriteSubjectCodes = JSON.parse(localStorage.getItem('favoriteSubjectCodes'))
      } catch (e) {
        localStorage.removeItem('favoriteSubjectCodes')
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
      return Object.keys(this.groupedBySubjectCode)
        .sort((a, b) => {
          if (this.favoriteSubjectCodes.includes(a) && this.favoriteSubjectCodes.includes(b)) {
            if (a > b) return 1
            if (a < b) return -1
          } else if (this.favoriteSubjectCodes.includes(a)) return -1
          else if (this.favoriteSubjectCodes.includes(b)) return 1
          else if (a > b) return 1
          else if (a < b) return -1
          return 0
        })
    },
    subjectCodesWithFullNames () {
      return this.subjectCodes.map(subjectCode => `${subjectCode} - ${this.subjectCodeFullName(subjectCode)}`)
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
      console.log('changed results')
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
  watch: {
    results (newResults) {
      this.tableResults = newResults
      console.log('updated tableResults')
    },
    favoriteSubjectCodes (newFavoriteSubjectCodes) {
      localStorage.setItem('favoriteSubjectCodes', JSON.stringify(newFavoriteSubjectCodes))
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
    },
    toggleSubjectCodeFavorite (subjectCode) {
      if (this.favoriteSubjectCodes.includes(subjectCode)) {
        this.favoriteSubjectCodes = this.favoriteSubjectCodes.filter(oldSubjectCode => oldSubjectCode !== subjectCode)
      } else {
        this.favoriteSubjectCodes = [...this.favoriteSubjectCodes, subjectCode]
      }
    }
  }
}
</script>

<style scoped>
.subject-code-card {
  width: 320px;
  margin: 10px;
  display: inline-block;
  vertical-align: top;
}

.subject-code-list-move {
  transition: transform 0.5s ease-out;
}
</style>
