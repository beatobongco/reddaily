// - toggle daily, weekly, monthly
// - accept subreddit to watch with validation
var subredditMax = 3
var items = []
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

function fixRedditLinks(link) {
  if (link.split('.')[1] === "reddituploads") {
    return link.replace(/&amp;/g, "&")
  }
  return link
}

var app = new Vue({
  el: '#app',
  data: {
    mode: "day",
    categories: ["tech", "design", "sports", "trivia"],
    db: db,
  },
  methods: {
    incrementLimit: function(category, e) {
      e.preventDefault()
      db[category].showLimit += 5
      if (db[category].showLimit >= db[category].posts.length) {
        e.target.style.display = "none"
      }
    },
    retrieveAll: function() {
      for (var i = 0; i < app.categories.length; i++) {
        app.retrievePosts(app.categories[i])
      }
    },
    retrievePosts: function(category) {
      var subreddits = db[category].subreddits
      for (var i = 0; i < subreddits.length; i++) {
        superagent
          .get("https://www.reddit.com/r/" + subreddits[i] + "/top/.json?t=" + app.mode)
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

app.retrieveAll()
