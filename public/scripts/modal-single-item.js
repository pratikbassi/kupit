$(() => {
  const escapeTxt = function(str) {
    const div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
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

  const generateSingleItemHTML = (obj, user) => {
    const id = escapeTxt(obj.id);
    const ownerId = escapeTxt(obj.user_id);
    const image_url = escapeTxt(obj.image_url);
    const title = escapeTxt(obj.title);
    const stock = escapeTxt(obj.stock);
    const city = escapeTxt(obj.city);
    const description = escapeTxt(obj.description);
    const htmlOutput = `
    <main class="container single-item">
      <div class="image">
      ${obj.is_sold ? `<img class="is-sold" src="../images/sold.png">` : ``}
      <img  src="${image_url}">
        
      </div>

      <div class="item-info">
      <div class="title">
        <h2><b>${title}</b></h2>
        <hr/>
        <p class="item-price">$${obj.price}</p>
        <p class="list-info"><i>Listed ${convertTime(
          obj.posting_date
        )} in ${city}</i></p>
        <p>In Stock:<b> ${stock}</b> </p>
      </div>

      <div class="message">
      <div class="icons">
      <i class="material-icons chat-icon animated faster" ${
        obj.is_sold ? `disabled` : ``
      }>chat_bubble_outline</i>
      <p>Message</p>
      </div>
      <div class="icons">
        <i id="fav-item-id-${id}" data-itemid="${id}" class="material-icons favorite-icon animated faster">favorite_border</i>
        <p>Favorite</p>
        </div>
        ${
          user.id == ownerId
            ? `     
            <div class="icons">
        <i id="admin-remove" class="material-icons delete-icon" data-itemid="${id}" class="remove ${id}">delete_outline</i>
        <p>Remove</p>
        </div>
        <div class="icons">
        <i id="admin-sold" class="material-icons done-icon" data-itemid="${id}" class="mark-sold ${id}">done_outline</i>
        <p>Mark Sold</p>
        </div>
      `
            : `<div></div>`
        }
      </div>

      <div class="description">
      <article>
        <p>${description}</p>
      </article>
    </div>
</div>
    </main>
    `;
    return htmlOutput;
  };

  const $modalBody = $("#modalBody");
  $(".container-items").on("click", ".modal-show", function() {
    event.preventDefault();
    const $this = $(this);
    $modalBody.empty();
    $.ajax({
      method: "GET",
      url: `/items/${$this.data("itemid")}`
    })
      .done(res => {
        $modalBody.append(generateSingleItemHTML(res.item, res.user));
      })
      .then(function(res) {
        $.ajax({
          method: "GET",
          url: `/favorite/${res.item.id}`
        }).done(item => {
          if (item.length) {
            $(`#fav-item-id-${item[0].id}`).text("favorite");
          }
        });
      });
  });

  $modalBody.on("click", ".favorite-icon", function() {
    event.preventDefault();
    const $this = $(this);
    $this.css("animation-name", "none");
    $this.css("animation-name", "flip");
    setTimeout(function() {
      $this.css("animation-name", "none");
    }, 500);

    if ($this.text() === "favorite_border") {
      $.post(`favorite/${$this.data("itemid")}`).done(function() {
        $this.text("favorite");
      });
    } else {
      $.ajax({
        method: "DELETE",
        url: `favorite/${$this.data("itemid")}`
      }).done(function() {
        $this.text("favorite_border");
      });
    }
  });

  $modalBody.on("click", ".chat-icon", function() {
    console.log("chat");
  });
});
