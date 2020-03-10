//let $ = require('jquery');
let localData = {}
const generateButton = (data) => {
  let returnString = `<button data-id=${data.id} type='button' class='test btn btn-light btn-block'>Reciever: ${data.reciever} Sender: ${data.sender} Item ID: ${data.item_id}</button>`

  return returnString;
}


$(document).ready(function(){
  $.ajax({
    method: "GET",
    url: "/messages"
  }).done(items => {

    for (let item of items) {
      localData[item.id] = item.body
      $("#message_list").append(generateButton(item))
    }

  });

  $('#message_list').on('click','.test' , function() {
    $('#message_display').text('')
    $('#message_display').text(localData[$(this).data().id])

  });
})


