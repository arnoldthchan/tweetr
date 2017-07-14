$(document).ready(function(){
  $('#tweets-container').on('mouseenter', 'article', function(){
    $(this).removeClass('trans');
    $(this).find('span.icons').show();
  });
  $('#tweets-container').on('mouseleave', 'article', function(){
    $(this).addClass('trans');
    if(!$(this).find('i.fa-heart').hasClass('char-limit')){
      $(this).find('span.icons').hide();
    }
  });
});

