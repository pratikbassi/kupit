$(() => {
  const $modal = $("#modal");
  const $containerItems = $("#container-items");

  // escapes dangerous html
  const escapeTxt = function(str) {
    const div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // generates HTML for items used in frontpage, favorites list, my listings
  const generateItemHTML = obj => {
    const image_url = escapeTxt(obj.image_url);
    const title = escapeTxt(obj.title);
    const stock = escapeTxt(obj.stock);
    const city = escapeTxt(obj.city);
    const id = escapeTxt(obj.id);
    const htmlOutput = `
    <section id="item-id-${id}"
      class="container-md container-item ${obj.is_sold ? "is-sold" : ""}">
      ${
        obj.is_sold
          ? `<img class="item-img is-sold-img rounded" src="../images/sold.png"/>`
          : ``
      }
      <img class="item-img rounded" src="${image_url}"/>

      <div id="" class="item-favorite"></div>

      <h5 class="item-title">${title}</h5>
      <div class="item-info">
        <h5>${stock} in Stock</h5>
        <h6>Located: ${city}</h6>
      </div>
  
      <button data-itemId="${id}" type="button"
        class="modal-show item-btn btn" data-toggle="modal"
        data-target="#modal">
        View more info
      </button>
 
    </section>
    `;
    return htmlOutput;
  };

  const generateError = err => {
    const errorMsg = escapeTxt(err.error);
    const errorOutput = `<div class="alert alert-danger" role="alert">${errorMsg}</div>`;
    return errorOutput;
  };

  const loadAjax = (url, params) => {
    $.ajax({
      method: "GET",
      url: url,
      data: params
    }).done(items => {
      $containerItems.empty();
      if (items.error) {
        $containerItems.prepend(generateError(items));
        setTimeout(function() {
          $containerItems.empty();
        }, 5000);
      } else {
        for (const obj of items) {
          $containerItems.prepend(generateItemHTML(obj));
        }
      }
    });
  };

  $modal.on("submit", "#search-form", function(event) {
    event.preventDefault();
    const $this = $(this);
    loadAjax("/search", $this.serialize());
  });

  $("#my-listings-btn").on("click", function(event) {
    event.preventDefault();
    const $this = $(this);
    const userID = escapeTxt($this.data("userid"));
    loadAjax(`/items/user/${userID}`);
  });

  $("#my-favorites-btn").on("click", function(event) {
    event.preventDefault();
    loadAjax(`/favorite`);
  });

  if (!window.location.hash && !window.location.search) {
    loadAjax("/featured");
  } else if (window.location.hash === "#my-favorite") {
    loadAjax(`/favorite`);
  } else if (window.location.hash === "#my-listings-btn") {
    $("#my-listings-btn").trigger("click");
  } else if (window.location.search) {
    console.log(window.location.search);
    loadAjax("/search", window.location.search.slice(1));
  }
});
