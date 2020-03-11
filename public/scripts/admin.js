$(() => {
  $(".modal-body").on("click", ".single-item > .admin-tools > .remove", () => {
    const itemId = $(".remove")
      .attr("class")
      .split(" ")[1];

    $.ajax({
      url: `/item/delete/${itemId}`,
      method: "PUT"
    })
      .then(item => {
        window.location.href = "/";
      })
      .catch(e => console.error(e));
  });

  $(".modal-body").on(
    "click",
    ".single-item > .admin-tools > .mark-sold",
    () => {
      const itemId = $(".mark-sold")
        .attr("class")
        .split(" ")[1];

      $.ajax({
        url: `/item/sold/${itemId}`,
        method: "PUT"
      })
        .then(() => {
          window.location.href = "/";
        })
        .catch(e => console.error(e));
    }
  );
});
