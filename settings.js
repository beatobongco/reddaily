var subredditMax = 3 // how many posts to pull per subreddit from top
var categories = ["tech", "design", "sports", "trivia"]
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
