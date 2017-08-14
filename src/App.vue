<template>
  <div id="app">
    <div class="header-image">
      <intro></intro>
      <copyright></copyright>
    </div>
  </div>
</template>

<script>
import Copyright from './components/Copyright'
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
.header-image {
  // background-image: linear-gradient(#0B486B,#F56217);
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
