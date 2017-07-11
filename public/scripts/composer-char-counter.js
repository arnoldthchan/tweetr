// console.log('composer-char-counter is working!');


function count(){
  let textInput = $(this).val().length;
  let charCount = 140 - textInput;
  let counter = $(this).parent().find('span.counter');
  //Changes counter to red once 140 character limit is reached
  if(charCount <= 0){
    $(counter).addClass('char-limit');
  } else{
    $(counter).removeClass('char-limit');
  }
  $(counter).html(charCount);
}

$(document).ready(function(){
  //Text area counter, subtracts length of textarea from 140
  $('form').on('input', 'textarea', count);
});