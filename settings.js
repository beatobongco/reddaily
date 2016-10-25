var subredditMax = 3 // how many posts to pull per subreddit from top
var showLimit = 5 // how many posts to show at first and how many to add for each "read more" click
var categories = ["tech", "design", "sports", "trivia"]
var db = {
  tech: {
    subreddits: ["programming", "futurology", "tech", "linux", "learnprogramming", "python", "javascript"],
    posts: [],
    showLimit: showLimit
  },
  design: {
    subreddits: ["design", "graphic_design", "web_design", "webdesignnews", "UserExperience", "DataIsBeautiful", "typography"],
    posts: [],
    showLimit: showLimit
  },
  sports: {
    subreddits: ["climbing", "bouldering", "climbingvids", "climbharder"],
    posts: [],
    showLimit: showLimit
  },
  trivia: {
    subreddits: ["interestingasfuck", "IAmA", "explainlikeimfive", "books", "askhistorians", "LifeProTips", "lifehacks", "YouShouldKnow", "TrueReddit"],
    posts: [],
    showLimit: showLimit
  }
}
