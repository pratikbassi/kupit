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
      <div class="min-price form-group">
        <label for="min_price">Min Price</label>
        <input type="number" name="min_price" class="form-control" id="searchPrice" placeholder="Min Price">
        <input type="range" min="1" max="100" value="50" class="slider" id="slider-min-price">
      </div>
      <div class="max-price form-group">
        <label for="max_price">Max Price</label>
      </div>
      <input type="submit" class="submit btn btn-primary" data-toggle="modal" data-target="#modal">
    </form>
    `;
    $modalBody.append(htmlOutput);
  });
});
