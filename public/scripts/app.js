/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//User Creation function, returns newtweet with HTML tags
function createTweetElement(tweetData){
  const newTweet = $(`<article data-id='${tweetData._id}'class='tweet trans'>`);
  const image    = $(`<img class='avatar'>`).attr('src', tweetData.user.avatars.regular);
  const name     = $(`<span class='name'>`).text(tweetData.user.name);
  const handle   = $(`<span class ='handle'>`).text(tweetData.user.handle);

  const icon1 = $(`<i class='fa fa-flag'>`);
  const icon2 = $(`<i class='fa fa-retweet'>`);
  //Changes like icon in span depending on if liked or not
  if (tweetData.liked === true){
    var icon3 = $(`<i data-likes=${tweetData.liked} class='fa fa-heart char-limit'>`);
  } else {
    var icon3 = $(`<i data-likes=${tweetData.liked} class='fa fa-heart-o'>`);
  }

  const span        = $(`<span class='icons'>`).append(icon1, icon2, icon3)
  const header      = $(`<header>`).append(image, name, handle);
  const tweetText   = $(`<p class='tweet-text'>`).text(tweetData.content.text);
  const footer      = $(`<footer class='tweet'>`).text(calculateSince(tweetData.created_at)).append(span);
  const timeCreated = tweetData.created_at;

  newTweet.append(header, tweetText, footer);
  return newTweet
}
//Iterates through tweets database and uses createTweetElement to prepend to container
function renderTweets(tweets) {
  $('#tweets-container').empty();
  for (let i in tweets){
    var $tweet = createTweetElement(tweets[i]);
    $('#tweets-container').prepend($tweet);
  }
}

$(document).ready(function(){
  function loadTweets(){
    $.ajax({
      url: 'tweets',
      method: 'GET',
      success: function(tweets) {
        renderTweets(tweets);
      }
    });
  }
  //Prevents refreshing of page on submit
  $('form').on('submit', function(event){
    var input = $(this).find('textarea').val();
    event.preventDefault()
    validateTweetPost(input);
  });
  //Toggles visibility of new-tweet container when compose is clicked
  $('#compose').on('click', function(event){
    var $composeTweetBox = $(this).closest('body').find('section.new-tweet');
    if($composeTweetBox.css('display') === 'none'){
      $composeTweetBox.slideToggle();
      $(this).closest('body').find('textarea').focus();
      $("html, body").animate({ scrollTop: 0 }, "slow");
    } else{
      $composeTweetBox.slideToggle();
    }
  });
  //Checks if submitted tweet is blank or over 140 characters
  function validateTweetPost(tweet){
    if(tweet.length >= 140){
      $('span#error').remove();
      $('form').append(`<span id='error' class='char-limit'>Tweet over 140 characters</span>`);
      setTimeout(function(){
        $('span#error').remove();
      }, 1500);
    return;
  } else if(tweet === ''){
      $('span#error').remove();
      $('form').append(`<span id='error' class='char-limit'>Tweet is blank</span>`);
      setTimeout(function(){
        $('span#error').remove();
      }, 1500);
    return;
  }
    //Posts to database and resets textarea/counter
    $.ajax({
      url: 'tweets',
      type: 'POST',
      data: { text: tweet },
      success: function() {
        $('textarea').val('');
        $('span.counter').html('140');
        loadTweets();
      }
    });
  }
  //Event listener for when empty heart icon is clicked, changes to liked to true
  $('#tweets-container').on('click', 'i.fa-heart-o',function(event){
    const $tweetID = $(this).closest('article.tweet').data('id');
    const $liked = $(this).data('likes');
      $.ajax({
        url: `/tweets/${$tweetID}/likes/`,
        type: 'PUT',
        success: function(res, status) {
          loadTweets();
        }
      });
    });
  //Event listener for when red heart icon is clicked, changes to liked to false
  $('#tweets-container').on('click', 'i.fa-heart',function(event){
    const $tweetID = $(this).closest('article.tweet').data('id');
    const $liked = $(this).data('likes');
      $.ajax({
        url: `/tweets/${$tweetID}/unlikes/`,
        type: 'PUT',
        success: function(res, status) {
          loadTweets();
        }
      });
    });
  loadTweets();
});
