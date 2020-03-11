$(() => {
  const escapeTxt = function(str) {
    const div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const generateSingleItemHTML = obj => {
    const id = escapeTxt(obj.id);
    const image_url = escapeTxt(obj.image_url);
    const title = escapeTxt(obj.title);
    const stock = escapeTxt(obj.stock);
    const city = escapeTxt(obj.city);
    const description = escapeTxt(obj.description);
    const htmlOutput = `
    <main class="container single-item ${obj.is_sold ? "is-sold" : ""}">
      <div class="image">
        <img src="${image_url}">
      </div>
      <div class="title">
        <h2>${title}</h2>
        <h4>${stock} In Stock</h4>
        <h5>Located: ${city}</h5>
        
      </div>
      <div class="message">
        <button>message</button>
        <i id="fav-item-id-${id}" data-itemid="${id}" class="material-icons">favorite_border</i>

      </div>
      <div class="description">
        <article>
          <p>${description}</p>
        </article>
      </div>
      <div class="admin-tools">
        <button>admin</button>
        <button data-itemid="${id}" class="remove ${id}">Remove</button>
        <button data-itemid="${id}" class="mark-sold ${id}">Sold</button>
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
      .done(items => {
        $modalBody.append(generateSingleItemHTML(items));
      })
      .then(function(item) {
        $.ajax({
          method: "GET",
          url: `/favorite/${item.id}`
        }).done(item => {
          if (item.length) {
            $(`#fav-item-id-${item[0].id}`).text("favorite");
          }
        });
      });
  });
});
