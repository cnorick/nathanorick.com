<template>
  <div id="app">
    <div>
      <intro class="intro"></intro>
      <bio></bio>
      <copyright></copyright>
    </div>
  </div>
</template>

<script>
import Copyright from './components/Copyright/Copyright'
import Intro from './components/Intro/Intro'
import Bio from './components/Bio/Bio'

export default {
  name: 'app',
  components: {
    Copyright,
    Intro,
    Bio
  }
}
</script>

<style lang="scss">
.intro {
  padding-bottom: 40px;
}
</style>
