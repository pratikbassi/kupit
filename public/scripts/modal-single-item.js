$(() => {
  const escapeTxt = function(str) {
    const div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
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
        <img src="${image_url}">
      </div>
      <div class="title">
        <h2>${title}</h2>
        <h4>${stock} In Stock</h4>
        <h5>Located: ${city}</h5>
        
      </div>
      <div class="message">
        <button class="btn btn-outline-info">message</button>
        <i id="fav-item-id-${id}" data-itemid="${id}" class="material-icons favorite-icon">favorite_border</i>

      </div>
      <div class="description">
        <article>
          <p>${description}</p>
        </article>
      </div>
      ${
        user.id == ownerId
          ? `      <div class="admin-tools">
      <button class="btn btn-danger" data-itemid="${id}" class="remove ${id}">Remove</button>
      <button class="btn btn-warning" data-itemid="${id}" class="mark-sold ${id}">Mark Sold</button>
    </div>`
          : `<div></div>`
      }

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
});
