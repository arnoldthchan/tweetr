//Text area counter, subtracts length of textarea from 140

function count(){
  const textInput = $(this).val().length;
  const charCount = 140 - textInput;
  const counter = $(this).parent().find('span.counter');
  //Changes counter to red once 140 character limit is reached
  if(charCount <= 0){
    $(counter).addClass('char-limit');
  } else{
    $(counter).removeClass('char-limit');
  }
  $(counter).html(charCount);
}

$(document).ready(function(){
  $('form').on('input', 'textarea', count);
});