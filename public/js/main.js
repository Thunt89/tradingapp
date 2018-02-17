$(document).ready(function(){
  $('.deleteTrade').on('click',deleteTrade);
});

function deleteTrade(){
  var confirmation = confirm('Are you sure?');

    if (confirmation){
        $.ajax({
          type:'DELETE',
          url:'/trades/delete/'+$(this).data('id')
        }).done(function(response){
          window.location.replace('/');
        });
          window.location.replace('/');
      } else {
        return false;
      }
      }
