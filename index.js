// - toggle daily, weekly, monthly
// - accept subreddit to watch with validation
// - add url args to keep mode on

var subredditMax = 3
var mode = Qs.parse(location.search.replace("?", "")).t || "day"
var items = []
var titleText = {
  day: "Daily",
  week: "Weekly",
  month: "Monthly",
  year: "Yearly",
  all: "AllTime"
}
var db = {
  tech: {
    subreddits: ["programming", "futurology", "tech", "linux", "learnprogramming", "python", "javascript"],
    posts: [],
    showLimit: 5
  },
  design: {
    subreddits: ["design", "graphic_design", "web_design", "webdesignnews", "UserExperience", "DataIsBeautiful", "typography"],
    posts: [],
    showLimit: 5
  },
  sports: {
    subreddits: ["climbing", "bouldering", "climbingvids", "climbharder"],
    posts: [],
    showLimit: 5
  },
  trivia: {
    subreddits: ["interestingasfuck", "IAmA", "explainlikeimfive", "books", "askhistorians", "LifeProTips", "lifehacks", "YouShouldKnow", "TrueReddit"],
    posts: [],
    showLimit: 5
  }
}

String.prototype.capitalizeFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

function fixRedditLinks(link) {
  if (link.split('.')[1] === "reddituploads") {
    return link.replace(/&amp;/g, "&")
  }
  return link
}

var app = new Vue({
  el: '#app',
  data: {
    mode: mode,
    categories: ["tech", "design", "sports", "trivia"],
    db: db,
  },
  watch: {
    mode: function() {
      //empty all posts
      for (var i = 0; i < this.categories.length; i++) {
        this.db[this.categories[i]].posts = []
      }
      this.retrieveAll()
    }
  },
  methods: {
    switchMode: function(mode, e) {
      e.preventDefault()
      this.mode = mode
      location.search = "?t=" + this.mode
    },
    incrementLimit: function(category, e) {
      e.preventDefault()
      db[category].showLimit += 5
      if (db[category].showLimit >= db[category].posts.length) {
        e.target.style.display = "none"
      }
    },
    retrieveAll: function() {
      for (var i = 0; i < this.categories.length; i++) {
        this.retrievePosts(this.categories[i])
      }
    },
    retrievePosts: function(category) {
      var subreddits = db[category].subreddits
      for (var i = 0; i < subreddits.length; i++) {
        superagent
          .get("https://www.reddit.com/r/" + subreddits[i] + "/top/.json?t=" + this.mode)
          .end(function(e, r) {
            var posts = r.body.data.children.slice(0, subredditMax)
            for (var i = 0; i < posts.length; i++) {
              var data = posts[i].data

              //preprocess URL
              var url = data.url
              url = fixRedditLinks(url)

              var permalink = "https://www.reddit.com" + data.permalink
              db[category].posts.push({
                title: data.title,
                url: url,
                score: data.score,
                subreddit: data.subreddit,
                permalink: permalink,
                created: data.created_utc,
                comments: data.num_comments
              })
            }
            db[category].posts = _.sortBy(db[category].posts, "score").reverse()
          })
      }
    },
  },
})
if (location.search === "") {
  location.search = "?t=day"
}
app.retrieveAll()
