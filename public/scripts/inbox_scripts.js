//let $ = require('jquery');
let localData = {}
let local_id = 0
let status = 0;

const generateButton = (data) => {
  let returnString = `<button data-id=${data.id} type='button' class='test btn btn-light btn-block'>Reciever: ${data.reciever} Sender: ${data.sender} Item ID: ${data.item_id}</button>`

  return returnString;
}

const generateItem = (data) => {
  let returnString = `
  <img src=${data.image_url} class='msg_item'></img>
  <ul class='list'>
    <li>Title:${data.title}</li>
    <li>Price:${data.price}</li>
    <li>Created:${data.posting_date}</li>
    <li>Stock:${data.stock}</li>
    <li>Desc:${data.description}</li>
  </ul>
  `

  return returnString;
}


$(document).ready(function(){

  let user_string = $('#user_id').text().trim().replace(/\s/g, '*').split('*')
  let user_id = parseFloat(user_string[user_string.length - 1])


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


      if(item.sender === user_id) {
        $("#message_list").append(generateButton(item)) //GENERATES OUTBOX OF MESSAGES

      }
      else {
        $("#message_inbox").append(generateButton(item)) //GENERATES INBOX OF MESSAGES

      }
    }

  });

  $('.change_box').on('click', function(){
    if(status % 2 === 0) {
      $('#message_list').show()
      $('#message_inbox').hide()
      $('.change_box').text('Switch to Inbox')
      status++;
    } else {
      $('#message_inbox').show()
      $('#message_list').hide()
      $('.change_box').text('Switch to Outbox')

      status++;
    }
  })
  $('#message_container').on('click','.test' , function() { //LETS USER VIEW MESSAGE
    console.log('reached')
    $('#message_display').text('')
    $('.item_display').empty()
    local_id = $(this).data().id
    $('#message_display').text(localData[local_id].body)
    $('#reply').show()
    $('#submitted').hide()
    $.ajax({
      method: 'GET',
      url: '/item',
      data: {item_id:localData[local_id].item_id}
    }).done(
      function(data){
        $('.item_display').append(generateItem(data))
      }
    )
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
