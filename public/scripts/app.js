/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function createTweetElement(tweetData){
//jQUERY METHOD
  //TIME
  var seconds = tweetData.created_at/1000;
  var hours = seconds / 360;
  var days = Math.round(hours / 24);
  let currentTime = new Date(Date.now());
  var createTime = new Date(tweetData["created_at"]);
  let timeAgo = Math.floor((currentTime - createTime) / 1000);
  //USER
  var newTweet = $(`<article class='tweet trans'>`);
  var image = $(`<img class='avatar'>`).attr('src', tweetData.user.avatars.regular);
  var name = $(`<span class='name'>`).text(tweetData.user.name);
  var handle = $(`<span class='handle'>`).text(tweetData.user.handle);
  var header = $(`<header>`).append(image, name, handle);

  var tweetText = $(`<p class='tweet-text'>`).text(tweetData.content.text);

  var icon1 = $(`<a href=''>`).append(`<i class='fa fa-flag'>`);
  var icon2 = $(`<a href=''>`).append(`<i class='fa fa-retweet'>`);
  var icon3 = $(`<a href=''>`).append(`<i class='fa fa-heart'>`);
  var span = $(`<span class='icons'>`).append(icon1, icon2, icon3)

  var footer = $(`<footer class='tweet'>`).text(`${timeAgo} seconds ago`).append(span);
  var timeCreated = tweetData.created_at;

  newTweet.append(header, tweetText, footer);
  return newTweet
  // console.log(seconds);

//UNSAFE, DO NOT USE, EVEN THOUGH ITS NICER
  // newTweet =
  //   `<article class='tweet'>
  //   <header>
  //     <img class='avatar' src='${tweetData.user.avatars.regular}'>
  //     <span class='name'>${tweetData.user.name}</span>
  //     <span class='handle'>${tweetData.user.handle}</span>
  //   </header>
  //     <div class='tweet-text'>${tweetData.content.text}</div>
  //   <footer class='tweet'>${date}
  //     <span class='icons'>
  //       <a href='' ><i class='fa fa-flag'></i></a>
  //       <a href='' ><i class='fa fa-retweet'></i></a>
  //       <a href='' ><i class='fa fa-heart'></i></a>
  //     </span>
  //   </footer>
  //   </article>`

}

////PREPEND JUST THE NEW TWEET INSTEAD OF LOADING IT ALL
function renderTweets(tweets) {
  $('#tweets-container').empty();
  for (let i in tweets){
    var $tweet = createTweetElement(tweets[i]);
    $('#tweets-container').prepend($tweet);
  }
}

$(document).ready(function(){
  function loadTweets(){
    // console.log('Performing ajax GET call...');
    $.ajax({
      url: 'tweets',
      method: 'GET',
      success: function(tweets) {
        renderTweets(tweets);
      }
    });
  }
  $('form').on('submit', function(event){
    var input = $(this).find('textarea').val();
    event.preventDefault()
    ////FORM VALIDATION HELPER FUNCTION
    if(input.length >= 140){
        $('span#error').remove();
        $(this).append(`<span id='error' class='char-limit'>Tweet over 140 characters</span>`);
        setTimeout(function(){
          $('span#error').remove();
        }, 1500);
      return;
    } else if(input === ''){
        $('span#error').remove();
        $(this).append(`<span id='error' class='char-limit'>Tweet is empty</span>`);
        setTimeout(function(){
          $('span#error').remove();
        }, 1500);
      return;
    }
    $.ajax({
      url: 'tweets',
      type: 'POST',
      data: { text: input },
      success: function() {
        $('textarea').val('');
        console.log('Adding Tweet');
        loadTweets();
      }
    });
  });
  $('#compose').on('click', function(event){
    var $composeTweetBox = $(this).closest('body').find('section.new-tweet');
    if($composeTweetBox.css('display') === 'none'){
      $composeTweetBox.slideToggle();
      $(this).closest('body').find('textarea').focus();
    } else{
      $composeTweetBox.slideToggle();
    }
    });
  loadTweets();
});
