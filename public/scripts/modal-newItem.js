$(() => {
  const $containerItems = $("#container-items");

  const escapeTxt = function(str) {
    const div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const PostAjax = (url, params) => {
    $.ajax({
      method: "POST",
      url: url,
      data: params,
      dataType: "json"
    }).done(item => {
      $containerItems.empty();
      if (item.error) {
        $containerItems.prepend(generateError(item));
        setTimeout(function() {
          $containerItems.empty();
        }, 5000);
      } else {
        $containerItems.prepend(generateItemHTML(item));
        window.location.href = `/#itemid=${item.id}`;
      }
    });
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

  const $modalBody = $("#modalBody");
  $("#item-new-btn").on("click", () => {
    event.preventDefault();
    $modalBody.empty();
    const newItemhtml = `
  <form id="new-item-form" method="POST" action="" class="newItem">
  <h2>Post New Item</h2>
  <hr />
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputTitle">Title</label>
      <input type="text" class="form-control" id="inputTitle" name="title">
    </div>
    <div class="form-group col-md-6">
      <label for="inputPrice">Price</label>
      <input type="number" class="form-control" id="inputPrice" name="price">
    </div>
  </div>

  <div class="form-group">
    <label for="inputDescription">Description</label>
    <textarea type="text" class="form-control" id="inputDescription" name="description"></textarea>
  </div>

  <div class="form-row">
    <div class="form-group col-md-6"">
      <label for="inputStock">Stock</label>
      <input type="number" class="form-control" id="inputStock" name="stock">
    </div>
    <div class="form-group col-md-6">
      <label for="inputCity">City</label>
      <input type="text" class="form-control" id="inputCity" name="city">
    </div>
  </div>
  <div class="form-group">
  <label for="inputUrl">Image URL</label>
  <input type="text" class="form-control" id="inputUrl" name="image_url">
  </div>
  <button type="submit" class="btn btn-dark" data-toggle="modal" data-target="#modal">Post</button>
</form>
    `;
    $modalBody.append(newItemhtml);
  });

  $modalBody.on("submit", "#new-item-form", function() {
    event.preventDefault();
    PostAjax("/item/new", $("#new-item-form").serialize());
  });
});
