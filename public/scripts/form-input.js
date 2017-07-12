// The user should be given an error
//   that their tweet content is too long
//   or that it is not present
//   (ideally separate messages for each scenario)

// The form should not be cleared
// The form should not submit


// $(document).ready(function(){
//   $('form').on('submit', function(event){
//     event.preventDefault()
//     var input = $(this).find('textarea').val();
//     if(input.length >= 145){
//       event.preventDefault()
//     } else if(input === ''){
//       event.preventDefault()
//     }
//     console.log('i would add the tweet here, if i knew how');

//   });
// });