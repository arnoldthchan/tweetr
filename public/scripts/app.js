/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];


function createTweetElement(tweetData){
  // var newTweet = $('<article>').addClass('tweet trans-on');
  // var image = $('<img>').addClass('avatar').attr('src', tweetData.user.avatars.regular);
  // var name = $('<span>').addClass('name').text(tweetData.user.name);
  // var handle = $('<span>').addClass('handle').text(tweetData.user.handle);
  // var header = $('<header>').append(image, name, handle);
  // var tweetText = $('<div>').addClass('tweet-text').text(tweetData.content.text);
  // var icon1 = $('<a>').addClass('fa fa-flag')
  // var icon2 = $('<a>').addClass('fa fa-retweet')
  // var icon3 = $('<a>').addClass('fa fa-heart')
  // var span = $('<span>').addClass('icons').append(icon1, icon2, icon3)
  // var footer = $('<footer>').addClass('tweet').text(tweetData.created_at).append(span);
  // var timeCreated = tweetData.created_at;
  // newTweet.append(header, tweetText, footer);

  seconds = Math.round(tweetData.created_at / 1000);
  test = new Date(1461116232*1000).toString();
  now = new Date();

  console.log('date:', test);
  console.log('now:', now);

  newTweet =
    `<article class='tweet'>
    <header>
      <img class='avatar' src='${tweetData.user.avatars.regular}'>
      <span class='name'>${tweetData.user.name}</span>
      <span class='handle'>${tweetData.user.handle}</span>
    </header>
      <div class='tweet-text'>${tweetData.content.text}</div>
    <footer class='tweet'>${test} days ago
      <span class='icons'>
        <a href='' ><i class='fa fa-flag'></i></a>
        <a href='' ><i class='fa fa-retweet'></i></a>
        <a href='' ><i class='fa fa-heart'></i></a>
      </span>
    </footer>
    </article>`
  return newTweet
}

function renderTweets(tweets) {
  for (let i in tweets){
    var $tweet = createTweetElement(tweets[i]);
    $('#tweets-container').append($tweet);
  }
}

// Test / driver code (temporary)
$(document).ready(function(){
  renderTweets(data);
});
