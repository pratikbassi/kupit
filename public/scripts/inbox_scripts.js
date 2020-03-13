//let $ = require('jquery');
<<<<<<< HEAD
let localData = {}
let local_id = 0
let status = 0;

const generateButton = (data) => {
  let returnString = `<button data-id=${data.id} type='button' class='test btn btn-light btn-block'>Reciever: ${data.reciever} Sender: ${data.sender} Item ID: ${data.item_id}</button>`
=======
let localData = {};
let local_id = 0;
const generateButton = data => {
  let returnString = `<button data-id=${data.id} type='button' class='test btn btn-light btn-block'>
  Reciever: ${data.reciever} Sender: ${data.sender} Item ID: ${data.item_id}</button>`;
>>>>>>> f534cb4f9431096d4f21d8c8ba81635d704b09cd

  return returnString;
};

const convertTime = mtime => {
  let currentTime = Date.now();
  let sub = currentTime - Date.parse(mtime);
  let time = sub / 1000;
  if (time < 3600) {
    let min = Math.floor(time / 60);
    return `${min} ${min === 1 ? "min" : "mins"} ago`;
  } else if (time < 86400) {
    let hour = Math.floor(time / 3600);
    return `${hour} ${hour === 1 ? "hour" : "hours"} ago`;
  } else if (time < 604800) {
    let day = Math.floor(time / 86400);
    return `${day} ${day === 1 ? "day" : "days"} ago`;
  } else if (time < 2629743) {
    let week = Math.floor(time / 604800);
    return `${week} ${week === 1 ? "week" : "weeks"} ago`;
  } else if (time < 31556926) {
    let month = Math.floor(time / 2629743);
    return `${month} ${month === 1 ? "month" : "months"} ago`;
  } else {
    let year = Math.floor(time / 31556926);
    return `${year} ${year === 1 ? "year" : "years"} ago`;
  }
};

const generateItem = data => {
  let returnString = `
  <img src=${data.image_url} class='msg_item'></img>
  <ul class='list'>
    <li>Title: ${data.title}</li>
    <li>Price: $${data.price}</li>
    <li>Created: ${convertTime(data.posting_date)}</li>
    <li>Stock: ${data.stock}</li>
    <li>Desc: ${data.description}</li>
  </ul>
  `;
  return returnString;
<<<<<<< HEAD
}


$(document).ready(function(){

  let user_string = $('#user_id').text().trim().replace(/\s/g, '*').split('*')
  let user_id = parseFloat(user_string[user_string.length - 1])


  $('#reply').hide()
  $('#submitted').hide()
=======
};
$(document).ready(function() {
  $("#reply").hide();
  $("#submitted").hide();
>>>>>>> f534cb4f9431096d4f21d8c8ba81635d704b09cd

  $.ajax({
    method: "GET",
    url: "/messages"
  }).done(items => {
    for (let item of items) {
      localData[item.id] = {
<<<<<<< HEAD
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
=======
        body: item.body,
        reciever: item.reciever,
        sender: item.sender,
        item_id: item.item_id,
        created: item.created
      };
      $("#message_list").append(generateButton(item)); //GENERATES LIST OF MESSAGES
    }
>>>>>>> f534cb4f9431096d4f21d8c8ba81635d704b09cd
  });

  if ($("#user_id"))
    $("#message_list").on("click", ".test", function() {
      //LETS USER VIEW MESSAGE
      $("#message_display").text("");
      $(".item_display").empty();
      local_id = $(this).data().id;
      $("#message_display").text(localData[local_id].body);
      $("#reply").show();
      $("#submitted").hide();
      $.ajax({
        method: "GET",
        url: "/item",
        data: { item_id: localData[local_id].item_id }
      }).done(function(data) {
        $(".item_display").append(generateItem(data));
      });
    });

  $("#reply").on("submit", function() {
    //LETS USER REPLY TO MESSAGE
    event.preventDefault();
    $.ajax({
      method: "POST",
      url: "/messages",
      data: {
        text: $("#reply")
          .children("textarea")
          .val(),
        sender: localData[local_id].reciever,
        reciever: localData[local_id].sender,
        item_id: localData[local_id].item_id
      }
    });
    $("#reply")
      .children("textarea")
      .val("");
    $("#submitted").show();
  });
});
$(document).ready(function() {});
