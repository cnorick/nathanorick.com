<template>
  <div id="app">
    <div>
      <intro class="intro"></intro>
      <copyright></copyright>
    </div>
  </div>
</template>

<script>
import Copyright from './components/Copyright/Copyright'
import Intro from './components/Intro/Intro'

export default {
  name: 'app',
  components: {
    Copyright,
    Intro
  }
}
</script>

<style lang="scss">
.intro {
  padding-bottom: 40px;
}
</style>
