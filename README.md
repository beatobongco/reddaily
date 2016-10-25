![image](https://cloud.githubusercontent.com/assets/3739702/19669856/422113ee-9a95-11e6-92fe-699bed9079a7.png)

https://beatobongco.com/reddaily/

A simple, responsive, and completely client-side aggregator that gives you your daily dose of reddit with less of the distraction! reddaily goes to all your favorite subreddits, gets the highest scoring posts, and displays them by category so its easy to digest.

## Desktop view
![image](https://cloud.githubusercontent.com/assets/3739702/19669928/d4e2acc4-9a95-11e6-83a4-c82f53883935.png)

## Mobile view
![image](https://cloud.githubusercontent.com/assets/3739702/19671700/2bf5b800-9aa3-11e6-88ca-200aed29c3bb.png)

## Customizing

To roll your own reddaily, simply edit the `settings.js` file. The first two settings are self-explanatory

```
var subredditMax = 3 // how many posts to pull per subreddit from top scoring
var showLimit = 5 // how many posts to show at first and how many to add for each "read more" click
```

Create your categories by changing the `categories` variable.

```
var categories = ["tech", "design", "sports", "trivia"]
````

Edit the `db` variable with your chosen categories. Each entry must conform to this structure:

```
<category_name>: {
  subreddits: [<subreddit_1>, <subreddit_2>, ...],
  posts: [],
  showLimit: showLimit
}

```

Example:

```
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
```

Finally, fine tune your column layout by editing the `index.less` file and compiling it to css (I just run `autoless` while developing).

```
@numcolumns: 4
```

That's it, you should be good to go! Just open up `index.html` on your favorite browser. Hope you enjoy your reddaily experience. :)

## License

reddaily is licensed under the MIT license. (http://opensource.org/licenses/MIT)

## Contributing

Just hit me up with a PR! :)
