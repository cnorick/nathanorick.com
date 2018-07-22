<template>
  <div class="bio">
    <h2 class="title is-2 header has-text-centered">About Me</h2>
    <div class="columns is-marginless is-centered">
      <div class="column is-half-widescreen is-three-quarters-tablet">
        <div>
          <p class="bio-paragraph">
            Recent
            <a ga-event="eecs" href="http://www.eecs.utk.edu/">Computer Science</a> / <a href="https://www.math.utk.edu/">Math</a> grad from the
            <a ga-event="utk" href="http://www.utk.edu/">University of Tennessee, Knoxville</a>.
          </p>
          <p class="bio-paragraph">
            Currently an <a href="https://angular.io/">Angular</a> developer on a customer-facing product at <a ga-event="osi" href="http://www.osisoft.com/">OSIsoft</a> in San Leandro, CA. 
          </p>
          <p class="bio-paragraph">Programming is my passion! I love building software that is both exciting and useful, and I'm always looking to work on new projects that can make a real difference in the world.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Vue from 'vue'

export default {
  name: 'bio'
}
</script>

<style lang="scss">
.bio {
  h2.header {
    margin-left: 10px;
    margin-bottom: 0;
  }
  hr {
    margin: 0;
  }
  p.bio-paragraph {
    margin: 20px;
  }
}
</style>
