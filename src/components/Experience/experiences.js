export default [
  {
    title: `Five in the Hive`,
    subtitle: `Fantasy Sports Web App`,
    id: '5inthehive',
    paragraphs: [
      `Five in the Hive is ...`,

      `Click below to play!`
    ],
    links: [
      {
        name: 'Open the App',
        url: 'https://fiveinthehive.net',
        event: 'play-fiveinthehive'
      },
      {
        name: 'Source',
        url: 'https://github.com/kanepenley/fiveinthehive',
        event: 'github-fiveinthehive'
      }
    ]
  },
  {
    title: `Wedding Website`,
    id: 'weddingsite',
    paragraphs: [
      `My wife, Sarah, and I got married June 15, 2019. to prepare for the occasion, I created a website to
      provide our guests with info about us and about the ceremony. To start, I forked <a href="https://github.com/rampatra/wedding-website">wedding-website</a>
      on github, then added some new content and features to make the site unique to us.`,

      `On the site, our guests were able to learn about how Sarah and I met, get to know the people  in our wedding party, get directions or order an uber to the
      venue, find links to our gift registries, or get answers to more of the common questions about the ceremony.`,

      `The coolest thing about the site, however, was that our guests could RSVP without filling out those so-easy-to-lose RSVP cards. The backend setup for the
       RSVP feature was super simple. The web app made requests directly to Google Sheets, so our guest list was automatically updated and easy to sort and search.
       Not only that, but Google Sheets allowed us to register event handlers to send our guests confirmation emails as well as notify Sarah and me that we'd
       gotten a new hit.`,

      `The wedding is already over, but you can still RSVP at the link below! (use code 0615)`
    ],
    links: [
      {
        name: 'Webpage',
        url: 'https://content.nathanorick.com/wedding/index.html',
        event: 'open-wedding'
      }
    ]
  },
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
  },
  {
    title: `Presentations`,
    subtitle: `Links to Slides`,
    id: 'slides',
    startDate: null,
    paragraphs: [
      `<a href="https://docs.google.com/presentation/d/1BhCy5KHv75PNp6V4VI-9CtxDuRu-IwVTRVcv6wyl4T0/edit#slide=id.p">Testing Angular UI</a>`,
      `<a href="https://docs.google.com/presentation/d/1eDM8PsqXy5y69bJYOJFTgkb-7FXvA90JEN7VNh6BukM/edit#slide=id.p">Intro to Progressive Web Apps</a>`
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
  }
]
