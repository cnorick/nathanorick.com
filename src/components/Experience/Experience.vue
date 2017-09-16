<template>
  <div class="experience">
    <h2 class="title is-3 header has-text-centered">Experience</h2>
    <div class="columns is-marginless is-centered">
      <div class="column is-half-widescreen is-three-quarters-tablet">
        <div v-for="e in experiences" :key="e.id" class="box project" v-bind:id="e.id">
          <div class="header columns">
            <div class="experience-title column is-one-third">
              <h3 class="title is-3">{{e.title}}</h3>
              <h4 class="subtitle is-5">{{e.subtitle}}</h4>
            </div>
            <div class="date column is-one-third is-offset-one-third">
              <span>{{e.startDate}}{{e.endDate ? '-': ''}}{{e.endDate}}</span>
            </div>
          </div>
          <hr>
          <div v-for="(p, i) in e.paragraphs">
            <p class="experience-paragraph" v-html="p"></p>
            <br v-if="i != e.paragraphs.length - 1" />
          </div>
          <hr v-if="e.links">
          <div class="links-container columns is-centered">
            <span v-for="(link, name) in e.links" class="column has-text-centered">
              <a href="{{link}}">{{name}}</a>
              <br v-if="i != e.links.length - 1" />
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'experience',
  components: {
  },
  data: () => {
    return {
      experiences: [
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
          startDate: 'Summer 2016',
          paragraphs: [
            `Random Restaurant is an Alexa skill that helps users decide what to eat. Often, friends may disagree on what to have
            for dinner, or if someone is new to an area, they may not know what all of the food options around them are. Users simply
            say 'Alexa, ask Random Restaurant for a place to eat', and the app will give them a restaurant recommendation that is 
            nearby and currently open.`,

            `The skill is hosted on AWS as a node.js lambda function. It works by collecting the user's address from the device that makes
            the request. It then passes that information to the Yelp public API, which returns a list of nearby and open restaurants.
            From that list, one restaurant is randomly chosen and suggested to the user.`
          ],
          links: {
            'Skill Page': '',
            'Source Code': 'https://github.com/cnorick/randomRestaurant'
          }
        }
      ]
    }
  }
}
</script>

<style lang="scss">
@import "~bulma/sass/utilities/initial-variables";

.experience {
  .project {
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
  }
}
</style>
