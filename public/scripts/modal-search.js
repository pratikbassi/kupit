$(() => {
  const $modalBody = $("#modalBody");
  $("#search-show").on("click", () => {
    event.preventDefault();
    $modalBody.empty();
    const htmlOutput = `
    <header>
      <h2>Search</h2>
    </header>
    <form id="search-form" action="/" method="GET">
      <div class="keyword form-group">
        <label for="keyword">Keyword</label>
        <input type="text" name="keyword" class="form-control" id="searchKeyword" placeholder="Search Keyword">
      </div>
      <div class="form-row">
        <div class="min-price form-group col-md-6">
          <label for="min_price">Min Price</label>
          <input type="number" name="min_price" class="form-control" id="searchPrice" placeholder="Min Price">
        </div>
        <div class="max-price form-group col-md-6">
          <label for="max_price">Max Price</label>
          <input type="number" name="max_price" class="form-control" id="searchPrice" placeholder="Max Price">
        </div>
      </div>

      <button type="submit" class="submit btn btn-dark" data-toggle="modal" data-target="#modal">Search</button>
    </form>
    `;
    $modalBody.append(htmlOutput);
  });
});
