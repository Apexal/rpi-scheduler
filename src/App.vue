<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="drawerOpen = !drawerOpen">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">RPI Scheduler</span>
      </md-app-toolbar>

      <md-app-drawer md-permanent="full" :md-active.sync="drawerOpen">
          <MyAppDrawer />
      </md-app-drawer>

      <md-app-content>
        <router-view></router-view>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import MyAppDrawer from './components/MyAppDrawer'

export default {
  name: 'App',
  components: { MyAppDrawer },
  data () {
    return {
      drawerOpen: true
    }
  }
}
</script>

<style lang="scss">
.md-app {
  height: 100vh;
}
</style>
