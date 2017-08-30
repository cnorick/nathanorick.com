<template>
  <div class="intro-container">
    <div class="background-extention"></div>
    <div class="image-container">
      <div class="head-shot">
        <img src="./nathan.jpg" alt="Picture of Nathan in a pink bowtie" />
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
        <a class="button is-outlined" v-on:click="linkClick('github', 'http://www.github.com/cnorick')">
          <span class="icon">
            <icon name="github"></icon>
          </span>
          <span>
            Github
          </span>
        </a>
        <a class="button is-outlined" v-on:click="linkClick('linkedin', 'http://www.linkedin.com/in/nathan-orick')">
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
import Vue from 'vue'

export default {
  name: 'intro',
  methods: {
    linkClick: (name, url) => {
      Vue.$ga.event({
        eventCategory: 'External Link',
        eventAction: 'click',
        eventLabel: name
      })
      window.location.href = url
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped, lang="scss">
@import '~bulma/sass/utilities/functions';

$imageHeight: 200px;
$backgroundHeight: 200px;
$topBackgroundColor: #4F7CAC;
$bottomBackgroundColor: #fff;

.intro-container {
  background-color: $bottomBackgroundColor;
  .background-extention {
    background-color: $topBackgroundColor;
    height: $backgroundHeight - $imageHeight/2;
    width: 100%;
    display: block;
  }
  .image-container {
    background: linear-gradient(to bottom, $topBackgroundColor 50%, transparent 50%);
    align-content: center;
    margin-top: -1px; // Overlap to avoid rounding errors in height calculation.
    .head-shot {
      margin: auto;
      width: $imageHeight;
      height: $imageHeight;
      img {
        border-radius: 50%;
        width: $imageHeight;
        height: $imageHeight;
      }
    }
  }
  * {
    color: findColorInvert($bottomBackgroundColor);
  }
}

.is-outlined {
  background-color: transparent;
  color: findColorInvert($bottomBackgroundColor);
}

a.button.is-outlined:hover {
  border-color: $topBackgroundColor;
  color: findColorInvert($bottomBackgroundColor);
}
</style>
