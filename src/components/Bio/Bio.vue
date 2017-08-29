<template>
  <div class="bio">
    <h2 class="title is-3 header has-text-centered">About Me</h2>
    <div class="columns is-marginless is-centered">
      <div class="column is-half-widescreen is-three-quarters-tablet">
        <div>
          <p class="bio-paragraph">
            I am a
            <a href="http://www.eecs.utk.edu/">Computer Science</a> student at the
            <a href="http://www.utk.edu/">University of Tennessee, Knoxville</a> minoring in Math, and graduating May 12th, 2018. At UT, I am an ambassador for the
            <a href="http://www.coop.utk.edu/">Engineering Professional Practice Office</a> where I counsel engineering students in their internship searches.
          </p>
          <p class="bio-paragraph">I recently finished four terms as a software development intern at
            <a href="http://www.osisoft.com/">OSIsoft, LLC</a>. I worked three semesters in the Johnson City, TN office, and one semester at OSIsoft's HQ in San Leandro, CA.
            Check out what I worked on while at OSIsoft <a href="#OSI">below</a> in the Experience section.
          </p>
          <p class="bio-paragraph">I love programming, and I'm really excited work in software development professionally after graduation! I can't wait to put my skills and knowledge to good use on projects that will change the world.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'bio',
  components: {
  }
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
