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
</style>
