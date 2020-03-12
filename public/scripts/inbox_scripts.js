//let $ = require('jquery');
let localData = {};
let local_id = 0;
const generateButton = data => {
  let returnString = `<button data-id=${data.id} type='button' class='test btn btn-light btn-block'>
  Reciever: ${data.reciever} Sender: ${data.sender} Item ID: ${data.item_id}</button>`;

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
};
$(document).ready(function() {
  $("#reply").hide();
  $("#submitted").hide();

  $.ajax({
    method: "GET",
    url: "/messages"
  }).done(items => {
    for (let item of items) {
      localData[item.id] = {
        body: item.body,
        reciever: item.reciever,
        sender: item.sender,
        item_id: item.item_id,
        created: item.created
      };
      $("#message_list").append(generateButton(item)); //GENERATES LIST OF MESSAGES
    }
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
