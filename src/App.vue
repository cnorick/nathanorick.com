<template>
  <div id="app">
    <intro></intro>
    <copyright></copyright>
  </div>
</template>

<script>
import Intro from './components/Intro'
import Copyright from './components/Copyright'

export default {
  name: 'app',
  components: {
    Intro,
    Copyright
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
