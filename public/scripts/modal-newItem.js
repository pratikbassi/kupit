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
        window.location.href = `/#item_id=${item.id}`;
      }
    });
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
