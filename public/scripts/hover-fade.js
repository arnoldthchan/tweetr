$(document).ready(function(){
  $('#tweets-container').on('mouseenter', 'article', function(){
    $(this).removeClass('trans');
    $(this).find('span.icons').show();
  });
  $('#tweets-container').on('mouseleave', 'article', function(){
    $(this).addClass('trans');
    $(this).find('span.icons').hide();
  });
});

