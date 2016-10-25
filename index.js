var mode = location.hash.replace("#", "")

if (["day", "week", "month", "year", "all"].indexOf(mode) < 0) {
  mode = "day"
  location.hash = "day"
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
    categories: categories,
    db: db,
    postsPerSubreddit: subredditMax,
  },
  watch: {
    mode: function() {
      //empty all posts
      for (var i = 0; i < this.categories.length; i++) {
        var category = this.db[this.categories[i]]
        category.posts = []
        category.showLimit = 5
      }
      this.retrieveAll()
    }
  },
  methods: {
    switchMode: function(mode, e) {
      e.preventDefault()
      this.mode = mode
      location.hash = this.mode
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
            var posts = r.body.data.children.slice(0, this.postsPerSubreddit)
            //preprocess each post
            for (var i = 0; i < posts.length; i++) {
              var data = posts[i].data
              var url = data.url
              url = fixRedditLinks(url)
              var title = data.title.replace(/&amp;/g, "&")

              //extra rules go here

              var permalink = "https://www.reddit.com" + data.permalink
              db[category].posts.push({
                title: title,
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

if (location.hash === "") {
  location.hash = "day"
}

app.retrieveAll()
