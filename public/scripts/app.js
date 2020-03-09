$(() => {
  const $modal = $("#modal");
  const $containerItems = $(".container-items");

  // escapes dangerous html
  const escapeTxt = function(str) {
    const div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const generateItemHTML = obj => {
    const image_url = escapeTxt(obj.image_url);
    const title = escapeTxt(obj.title);
    const stock = escapeTxt(obj.stock);
    const city = escapeTxt(obj.city);
    const id = escapeTxt(obj.id);
    const is_sold = escapeTxt(obj.is_sold);
    const htmlOutput = `
    <section id="item-id-${id}" 
      class="container-md container-item ${is_sold ? "is-sold" : ""}">
      <div class="item-img">
        <img class="img-thumbnail rounded" src="${image_url}"/>
      </div>
      <div id="" class="container-favourite">
        <img class="favourite favourite_on" src="https://toppng.com/public/uploads/preview/heart-emoji-11549911583t6kulc2slx.png">
      </div>
      <div class="item-info">
        <h5>${stock} in Stock</h5>
        <h6>Located: ${city}</h6>
      </div>
      <div class="item-title">
        <h5>${title}</h5>
        <button id="neat" data-itemId="${id}" type="button" class="modal-show btn btn-primary" data-toggle="modal" data-target="#modal">
          View more info
        </button>
      </div>
    </section>
    `;
    return htmlOutput;
  };

  $.ajax({
    method: "GET",
    url: "/featured"
  }).done(items => {
    for (const obj of items) {
      $(".container-items").prepend(generateItemHTML(obj));
    }
  });

  $modal.on("submit", "#search-form", function(event) {
    event.preventDefault();
    const $this = $(this);
    console.log($this.serialize());
    $.ajax({
      method: "GET",
      url: "/search",
      data: $this.serialize()
    }).done(items => {
      $containerItems.empty();
      for (const obj of items) {
        $containerItems.prepend(generateItemHTML(obj));
      }
    });
  });
});
