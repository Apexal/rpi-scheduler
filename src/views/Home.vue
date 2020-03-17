<template>
  <div class="home-page">
    <h1 class="md-display-2">Welcome to RPI Scheduler</h1>

    <h1>About</h1>
    <p>This web app was made in response to YACS not being updated for the Summer 2020 semester.</p>

    <h1>How do I use it?</h1>
    <p>Search for and select your <router-link :to="{ name: 'BrowseCourses' }">courses</router-link> and then view your <router-link :to="{ name: 'ViewSchedule' }">schedule</router-link>.</p>

    <h1>Where is the data from?</h1>
    <p>Course, section, and period data is web scraped from the public SIS <a href="https://sis.rpi.edu/reg/zs202001.htm" target="_blank" rel="noopener noreferrer">page</a>.</p>

    <h1>What is planned?</h1>
    <ul>
      <li>
        Advanced section search
        <ul>
          <li>Earliest starting time</li>
          <li>Latest ending time</li>
        </ul>
      </li>
      <li class="done">Full subject titles</li>
      <li>Official course descriptions</li>
      <li>Section conflict detection</li>
      <li>Marking times in the calendar to schedule around</li>
      <li>Saving schedules to your account</li>
      <li>Sharing schedules</li>
      <li>Course suggestions</li>
    </ul>

    <h1>Credits</h1>
    <p>This web app was made and is maintained by <a target="_blank" href="https://github.com/Apexal">Frank Matranga '22</a> and is entirely <a href="https://github.com/Apexal" target="_blank" rel="noopener noreferrer">open-source</a>.</p>

    <h1>Feedback</h1>
    <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScEDOsNe7f53nZYn85-K7rz8sh2HS5Xx98J6-Xs_3BhSDAIsQ/viewform?embedded=true" width="640" style="height: 700px" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
  </div>
</template>

<script>

export default {
  name: 'Home'
}
</script>

<style lang="scss" scoped>
li.done {
  text-decoration: line-through;
}
</style>
