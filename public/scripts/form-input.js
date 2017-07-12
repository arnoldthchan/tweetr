// The user should be given an error
//   that their tweet content is too long
//   or that it is not present
//   (ideally separate messages for each scenario)

// The form should not be cleared
// The form should not submit


$(document).ready(function(){
  $('form').on('submit', function(event){
    var input = $(this).find('textarea').val();
    event.preventDefault()
    if(input.length >= 145){
      //flash message for too many characters
      alert('too many');
      return;
    } else if(input === ''){
      //flash message for nothing inside
      alert('too little');
      return;
    }
    $.ajax({
      url: 'tweets',
      type: 'POST',
      data: { text: input },
      success: function() {
        console.log('Adding Tweet');
      }
    });
  });
});