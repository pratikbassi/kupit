$(() => {
  const escapeTxt = function(str) {
    const div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const loadSingleItemModal = function(url, params) {};

  const generateSingleItemHTML = obj => {
    const image_url = escapeTxt(obj.image_url);
    const title = escapeTxt(obj.title);
    const stock = escapeTxt(obj.stock);
    const city = escapeTxt(obj.city);
    const description = escapeTxt(obj.description);
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
        <i class="material-icons">favorite</i>

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
    return htmlOutput;
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
      $modalBody.append(generateSingleItemHTML(items));
    });
  });
});
