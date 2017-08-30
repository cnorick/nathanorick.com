<template>
  <div id="app">
    <div>
      <intro class="intro"></intro>
      <br>
      <bio></bio>
      <br>
      <experience></experience>
      <copyright></copyright>
    </div>
  </div>
</template>

<script>
import Copyright from './components/Copyright/Copyright'
import Intro from './components/Intro/Intro'
import Bio from './components/Bio/Bio'
import Vue from 'vue'
import Experience from './components/Experience/Experience'
export default {
  name: 'app',
  components: {
    Copyright,
    Intro,
    Bio,
    Experience
  },
  mounted: () => {
    setTimeout(() => { Vue.$ga.page('home') }, 1000)
  }
}
</script>

<style lang="scss">
.intro {
  padding-bottom: 40px;
}
</style>
