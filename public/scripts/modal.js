$(() => {
  const escapeTxt = function(str) {
    const div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const $modalBody = $("#modalBody");

  $(".container-items").on("click", ".modal-show", function() {
    event.preventDefault();
    const $this = $(this);
    $modalBody.empty();
    $.ajax({
      method: "GET",
      url: `/items/${$this.data("itemid")}`
    }).done(items => {
      const image_url = escapeTxt(items.image_url);
      const title = escapeTxt(items.title);
      const stock = escapeTxt(items.stock);
      const city = escapeTxt(items.city);
      const description = escapeTxt(items.description);
      console.log(image_url, title, stock, city, description);

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
          <button>message</button>
  
        </div>
        <div class="description">
          <article>
            <p>${description}</p>
          </article>
        </div>
        <div class="admin-tools">
          <button>admin</button>
        </div>
      </main>
      `;
      $modalBody.append(htmlOutput);
    });
  });

  $("#search-show").on("click", () => {
    event.preventDefault();
    $modalBody.empty();
    const htmlOutput = `
    <header>
      <h2>Search</h2>
    </header>
    <form id="search-form" action="/search" method="GET">
      <div class="keyword form-group">
        <label for="keyword">Keyword</label>
        <input type="text" name="keyword" class="form-control" id="searchKeyword" placeholder="Search Keyword">
      </div>
      <div class="min-price form-group">
        <label for="min_price">Min Price</label>
        <input type="number" name="min_price" class="form-control" id="searchPrice" placeholder="Search Price">
        <input type="range" min="1" max="100" value="50" class="slider" id="slider-min-price">
      </div>
      <div class="max-price form-group">
        <label for="max_price">Max Price</label>
        <input type="number" name="max_price" class="form-control" id="searchPrice" placeholder="Search Price">
        <input type="range" min="1" max="100" value="50" class="slider" id="slider-max-price">
      </div>
      <input type="submit" class="submit btn btn-primary">
    </form>
    `;
    $modalBody.append(htmlOutput);
  });
});
