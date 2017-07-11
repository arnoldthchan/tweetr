$(document).ready(function(){
  $('article.tweet').addClass('trans-on');
  $('article.tweet').on('mouseover', function(){
    $(this).removeClass('trans-on');
    $(this).find('span.icons').show();
  });
  $('article.tweet').on('mouseleave', function(){
    $(this).addClass('trans-on');
    $(this).find('span.icons').hide();
  });
});