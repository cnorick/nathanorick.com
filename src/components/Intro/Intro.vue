<template>
  <div class="intro-container">
    <div class="image-container">
      <div class="head-shot">
        <img src="./nathan.png" />
      </div>
    </div>
    <div class="container has-text-centered">
      <h1 class="title is-2">
        Nathan Orick
      </h1>
      <h2 class="subtitle is-5">
        Developer
      </h2>
      <p>
        <a class="button is-outlined" href="http://www.github.com/cnorick">
          <span class="icon">
            <icon name="github"></icon>
          </span>
          <span>
            Github
          </span>
        </a>
        <a class="button is-outlined" href="http://www.linkedin.com/in/nathan-orick">
          <span class="icon">
            <icon name="linkedin"></icon>
          </span>
          <span>
            LinkedIn
          </span>
        </a>
      </p>
    </div>
  </div>
</template>

<script>
import 'vue-awesome/icons/github'
import 'vue-awesome/icons/linkedin'

export default {
  name: 'intro'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped, lang="scss">
$imageHeight: 128px;
$backgroundHeight: 200px;

.image-container {
  background-color: pink;
  align-content: center;
  .head-shot {
    flex: 1;
        margin: auto;
    width: $imageHeight;
    height: $imageHeight;
    img {
      // top: -$imageHeight/2;
      width: $imageHeight;
      height: $imageHeight;
    }
  }
}

.is-outlined {
  background-color: transparent;
  color: #fff;
}

.is-outlined:hover {
  border-color: darkcyan;
  color: #fff
}
</style>
