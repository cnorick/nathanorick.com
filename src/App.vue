<template>
  <div id="app">
    <hero></hero>
    <copyright></copyright>
  </div>
</template>

<script>
import Hero from './components/Hero/Hero'
import Copyright from './components/Copyright'

export default {
  name: 'app',
  components: {
    Hero,
    Copyright
  }
}
</script>

<style>
@import "~bulma";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
