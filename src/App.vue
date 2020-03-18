<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="drawerOpen = !drawerOpen">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title" style="flex: 1">RPI Scheduler</span>

        <md-menu md-size="medium" md-align-trigger>
          <md-button md-menu-trigger>Spring 2020</md-button>

          <md-menu-content>
            <md-menu-item>Summer 2020</md-menu-item>
            <md-menu-item>Fall 2020</md-menu-item>
          </md-menu-content>
        </md-menu>
      </md-app-toolbar>

      <md-app-drawer md-permanent="full" :md-active.sync="drawerOpen">
        <MyAppDrawer />
      </md-app-drawer>

      <md-app-content>
        <CourseDialog :active="$store.state.isCourseDialogOpen" :course="$store.state.selectedCourse" @close="$store.commit('SET_COURSE_DIALOG_OPEN', false)" />
        <transition name="router-view-fade" mode="out-in">
          <router-view></router-view>
        </transition>
        <md-button v-if="$store.state.selectedCRNs.length > 0" class="md-fab md-plain md-fab-bottom-right" @click="$store.commit('SET_SELECTED_CRNS', [])">
          <md-icon>clear</md-icon>
        </md-button>
      </md-app-content>

    </md-app>
  </div>
</template>

<script>
import MyAppDrawer from './components/MyAppDrawer'
import CourseDialog from './components/CourseDialog.vue'

export default {
  name: 'App',
  components: { MyAppDrawer, CourseDialog },
  data () {
    return {
      drawerOpen: false
    }
  },
  created () {
    if (localStorage.getItem('selectedCRNs') !== null) {
      try {
        this.$store.commit('SET_SELECTED_CRNS', JSON.parse(localStorage.getItem('selectedCRNs')))
      } catch (e) {
        localStorage.removeItem('selectedCRNs')
      }
    }
  }
}
</script>

<style lang="scss">
.md-app {
  height: 100vh;
}

.router-view-fade-enter-active, .router-view-fade-leave-active {
  transition: opacity .1s ease-in-out;
}
.router-view-fade-enter, .router-view-fade-leave-to {
  opacity: 0;
}
</style>
