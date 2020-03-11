//let $ = require('jquery');
let localData = {}
let local_id = 0
const generateButton = (data) => {
  let returnString = `<button data-id=${data.id} type='button' class='test btn btn-light btn-block'>Reciever: ${data.reciever} Sender: ${data.sender} Item ID: ${data.item_id}</button>`

  return returnString;
}


$(document).ready(function(){

  $('#reply').hide()
  $('#submitted').hide()

  $.ajax({
    method: "GET",
    url: "/messages"
  }).done(items => {

    for (let item of items) {
      localData[item.id] = {
        body:item.body,
        reciever:item.reciever,
        sender:item.sender,
        item_id:item.item_id,
        created:item.created
      }


      $("#message_list").append(generateButton(item)) //GENERATES LIST OF MESSAGES
    }

  });

  if ($('#user_id'))

  $('#message_list').on('click','.test' , function() { //LETS USER VIEW MESSAGE
    $('#message_display').text('')
    local_id = $(this).data().id
    $('#message_display').text(localData[local_id].body)
    $('#reply').show()
    $('#submitted').hide()
  });
  $('#message_outbox').on('click','.test' , function() { //LETS USER VIEW MESSAGE
    $('#message_display').text('')
    local_id = $(this).data().id
    $('#message_display').text(localData[local_id].body)
    $('#reply').show()
    $('#submitted').hide()

  });

  $('#reply').on('submit', function(){ //LETS USER REPLY TO MESSAGE
    event.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/messages',
      data: {
        text: $('#reply').children('textarea').val(),
        sender: localData[local_id].reciever,
        reciever: localData[local_id].sender,
        item_id: localData[local_id].item_id
       }
    })
    $('#reply').children('textarea').val('')
    $('#submitted').show()
  })






})

$(document).ready(function(){

})
