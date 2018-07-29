<template>
  <div class="experience">
    <!-- <h2 class="title is-2 header has-text-centered">Projects</h2> -->
    <div class="columns is-desktop is-5 is-multiline is-marginless is-centered is-variable is-6">
      <div v-for="(e) in experiences" v-bind:key="e.id"
           class="column is-half-desktop project">
        <div class="box"
             v-scroll-reveal="e.scrollObj">
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
let rawExperiences =
  [
    {
      title: `Squirrel Petting Simulator`,
      subtitle: `Computer Graphics Project`,
      id: 'squirrel-game',
      startDate: 'Mar 2018',
      endDate: 'May 2018',
      paragraphs: [
        `Squirrel Petting Simulator is a game I created for my computer graphics class. The shaders were required
        for the project, and were written using WebGL. The animation and the game mechanics I coded in just for
        fun. All of the 3D objects I borrowed from creators online.`,

        `Click below to play the game! The controls require a keyboard and mouse, and the game works best on Chrome.`
      ],
      links: [
        {
          name: 'Play the Game',
          url: 'https://content.nathanorick.com/squirrel/index.html',
          event: 'play-squirrel'
        },
        {
          name: 'Source',
          url: 'https://github.com/cnorick/Squirrel-Petting-Simulator',
          event: 'github-squirrel'
        }
      ]
    },
    {
      title: `OSIsoft`,
      subtitle: `Development Co-op`,
      id: 'OSI',
      startDate: 'Jan 2016',
      endDate: 'Aug 2017',
      paragraphs: [
        `I worked for twelve consecutive months at the Johnson City, TN office. There, I developed data-analysis
        software that collects, persists, analyzes, and visualizes customer and employee contribution and
        interaction on the company’s community website. The application was written with a .NET/C# backend
        and AngularJS front-end. This software helped Customer Support Engineers better understand and more
        efficiently respond to customer needs. Not only that, but it also greatly reduced the amount of
        time it took each week to assemble critical reports. While working on this project, I had the opportunity
        to get familiar with AngularJS, Javascript, C#, .NET, and SQL.`,

        `I also worked for three months at the OSIsoft Headquarters in San Leandro, CA. There, I worked as a part
        of a larger team, developing and testing an Angular UI for customer-facing software. I contributed to this project
        by migrating a large section of existing UI code from Angular 1 to Angular 4, writing UI tests using Jasmine and Angular
        testing tools, and designing/writing new components for the UI.`
      ]
    },
    {
      title: `Random Restaurant`,
      subtitle: `Amazon Alexa Skill`,
      id: 'Alexa',
      startDate: null,
      paragraphs: [
        `Random Restaurant is an Alexa skill that helps people decide where to eat. Often, friends may disagree on what to have
        for dinner, or if someone is new to an area, they may not be aware of all the nearby food options. Users can
        simply say <i>Alexa, ask Random Restaurant for a place to eat</i>, and the app will give them a restaurant recommendation
        that is nearby and currently open.`,

        `The skill is hosted on AWS as a node.js lambda function. It works by collecting the user's address from the device that makes
        the request. It then passes that information to the Yelp public API, which returns a list of nearby and open restaurants.
        From that list, one restaurant is randomly chosen and suggested to the user. Users can also request a specific type of food or
        limit the price range of the suggested restaurant.`
      ],
      links: [
        {
          name: 'Enable the Skill',
          url: 'https://www.amazon.com/Nathan-Orick-Random-Restaurant/dp/B0739K8V4N/ref=sr_1_1?s=digital-skills&ie=UTF8&qid=1505581691&sr=1-1&keywords=random+restaurant',
          event: 'alexaSkills-randomRestaurant'
        },
        {
          name: 'Source',
          url: 'https://github.com/cnorick/randomRestaurant',
          event: 'github-randomRestaurant'
        }
      ]
    }
  ]

let cleanExperiences = rawExperiences.map((val, ind) => {
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
