$(() => {
  // $(".admin-tools").on()
  const $modalBody = $("#modalBody");

  $modalBody.on("click", "#admin-remove", function() {
    const $this = $(this);
    const itemId = $this.data("itemid");
    $.ajax({
      url: `/item/delete/${itemId}`,
      method: "PUT"
    })
      .then(item => {
        window.location.href = "/#my-listings-btn";
        location.reload();
      })
      .catch(e => console.error(e));
  });

  $modalBody.on("click", "#admin-sold", function() {
    const $this = $(this);
    const itemId = $this.data("itemid");
    $.ajax({
      url: `/item/sold/${itemId}`,
      method: "PUT"
    })
      .then(() => {
        window.location.href = "/#my-listings-btn";
        location.reload();
      })
      .catch(e => console.error(e));
  });
});
