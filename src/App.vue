<template>
  <div id="app">
    <div>
      <intro class="intro"></intro>
      <br>
      <bio></bio>
      <copyright></copyright>
    </div>
  </div>
</template>

<script>
import Copyright from './components/Copyright/Copyright'
import Intro from './components/Intro/Intro'
import Bio from './components/Bio/Bio'
import Vue from 'vue'

export default {
  name: 'app',
  components: {
    Copyright,
    Intro,
    Bio
  },
  mounted: () => {
    Vue.$ga.page('home')
    Vue.$ga.event('event')
  }
}
</script>

<style lang="scss">
.intro {
  padding-bottom: 40px;
}
</style>
