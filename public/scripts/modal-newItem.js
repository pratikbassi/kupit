$(() => {
  const $modalBody = $("#modalBody");
  $("#item-new").on("click", () => {
    event.preventDefault();
    $modalBody.empty();
    const newItemhtml = `
  <form method="POST" action="/item/new">
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
    <textarea type="text" class="form-control" id="inputDescription" name="description">
    </textarea>
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
  <button type="submit" class="btn btn-primary">Post</button>
</form>
    `;
    $modalBody.append(newItemhtml);
  });
});
