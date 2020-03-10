$(() => {
  const $modal = $("#modal");
  const $containerItems = $("#container-items");

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
      <div id="" class="container-favorite">
        
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

  const loadAjax = (url, params) => {
    $.ajax({
      method: "GET",
      url: url,
      data: params
    }).done(items => {
      $containerItems.empty();
      for (const obj of items) {
        $containerItems.prepend(generateItemHTML(obj));
      }
    });
  };
  loadAjax("/featured");

  $modal.on("submit", "#search-form", function(event) {
    event.preventDefault();
    const $this = $(this);
    loadAjax("/search", $this.serialize());
  });

  $("#my-listings").on("click", function() {
    event.preventDefault();
    const $this = $(this);
    const userID = escapeTxt($this.data("userid"));
    loadAjax(`/items/user/${userID}`);
  });

  $("#my-favorites").on("click", function() {
    event.preventDefault();
    const $this = $(this);
    const userID = escapeTxt($this.data("userid"));
    loadAjax(`/favorite`);
  });
});
