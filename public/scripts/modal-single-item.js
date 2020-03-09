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
});
