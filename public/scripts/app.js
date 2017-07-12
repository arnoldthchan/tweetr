/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function createTweetElement(tweetData){
//jQUERY METHOD
  var seconds = tweetData.created_at/1000;
  var hours = seconds / 360;
  var days = Math.round(hours / 24);
  let currentTime = new Date(Date.now());
  var createTime = new Date(tweetData["created_at"]);
  let timeAgo = Math.floor((currentTime - createTime) / 1000);

  var newTweet = $('<article>').addClass('tweet trans');
  var image = $('<img>').addClass('avatar').attr('src', tweetData.user.avatars.regular);
  var name = $('<span>').addClass('name').text(tweetData.user.name);
  var handle = $('<span>').addClass('handle').text(tweetData.user.handle);
  var header = $('<header>').append(image, name, handle);

  var tweetText = $('<div>').addClass('tweet-text').text(tweetData.content.text);

  var icon1 = $(`<a href=''>`).append(`<i class='fa fa-flag'>`);
  var icon2 = $(`<a href=''>`).append(`<i class='fa fa-retweet'>`);
  var icon3 = $(`<a href=''>`).append(`<i class='fa fa-heart'>`);
  var span = $('<span>').addClass('icons').append(icon1, icon2, icon3)
  var footer = $('<footer>').addClass('tweet').text(`${timeAgo} seconds ago`).append(span);
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

function renderTweets(tweets) {
  $('#tweets-container').empty();
  for (let i in tweets){
    var $tweet = createTweetElement(tweets[i]);
    $('#tweets-container').prepend($tweet);
  }
}


$(document).ready(function(){
  function loadTweets(){
    console.log('Performing ajax call...');
    $.ajax({
      url: 'tweets',
      method: 'GET',
      success: function(tweets) {
        renderTweets(tweets);
        loadTweets();
        }
    });
  }
  $('#compose').on('click', function(event){
    var $composeTweetBox = $(this).closest('body').find('section.new-tweet');
    $composeTweetBox.slideToggle();
    //VVV DONT WORK VVV
    if($composeTweetBox.is(":hidden")){
      $(this).closest('body').find('textarea').select();
    } else{
      console.log('asd');
    }
    //^^^ DONT WORK ^^^
    });

  loadTweets();
});
