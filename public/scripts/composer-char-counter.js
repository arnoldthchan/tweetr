//Text area counter, subtracts length of textarea from 140

function count(){
  const charCount = 140 - $(this).val().length;
  const counter = $(this).parent().find('span.counter');
  //Changes counter to red once 140 character limit is reached
  if(charCount <= 0){
    $(counter).addClass('char-limit');
  } else{
    $(counter).removeClass('char-limit');
  }
  $(counter).html(charCount);
}

//Event listener for textarea, triggers when any input within it changes
$(document).ready(function(){
  $('form').on('input', 'textarea', count);
});