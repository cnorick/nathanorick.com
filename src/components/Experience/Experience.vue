<template>
  <div class="experience">
    <div class="columns is-desktop is-5 is-multiline is-marginless is-centered is-variable is-6">
      <div v-for="(e) in experiences" v-bind:key="e.id"
           class="column is-half-desktop project"
           v-scroll-reveal="e.scrollObj">
        <div class="box">
          <div class="header columns">
            <div class="experience-title column is-two-thirds">
              <h3 class="title is-3">{{e.title}}</h3>
              <h4 class="subtitle is-5">{{e.subtitle}}</h4>
            </div>
            <div class="date column is-one-third">
              <span>{{e.startDate}}{{e.endDate ? '-': ''}}{{e.endDate}}</span>
            </div>
          </div>
          <hr>
          <div v-for="(p, i) in e.paragraphs" :key="i" class="experience-content">
            <p class="experience-paragraph" v-html="p"></p>
            <br v-if="i != e.paragraphs.length - 1" />
          </div>
          <div v-if="e.links" class="links-container">
            <hr class="links-divider">
            <div v-if="e.links" class="columns is-centered">
              <br>
              <span v-for="(l, i) in e.links" :key="i" class="column has-text-centered">
                <a :href="l.url" :ga-event="l.event">{{l.name}}</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import experiences from './experiences'

let cleanExperiences = experiences.map((val, ind) => {
  let scrollObj = {} // for animations on scrolling.
  if (ind % 2 === 0) {
    scrollObj.origin = 'left'
  } else {
    scrollObj.origin = 'right'
    scrollObj.delay = 300 // so the left card comes in first, then the right.
  }
  return {...val, scrollObj: scrollObj}
})

export default {
  name: 'experience',
  components: {
  },
  data: () => {
    return {
      experiences: cleanExperiences
    }
  }
}
</script>

<style lang="scss">
@import "~bulma/sass/utilities/initial-variables";

.experience {
  .project {
    .box {
      display: flex;
      flex-direction: column;
      height: 100%;
      .header {
        margin-bottom: 20px;
        .date {
          display: flex;
          flex-direction: column;
          span {
            @media screen and (min-width: $tablet) {
              align-self: flex-end;
            }
          }
        }
      }
      .experience-content {
        flex-grow: 1;
        .experience-paragraph {

        }
      }
      .links-container {
        hr.links-divider {
          margin-top: 1.5rem;
          margin-bottom: 1rem;
        }
      }
    }
  }
}
</style>
