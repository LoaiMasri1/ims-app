import {ITEM_URL, DELAY } from "../settings/settings.js";

$("#add-form").submit(function (e) {
  e.preventDefault();
  const form = $(this),
    data = {
      name: form.find("#name").val(),
      categoryId:form.find("#categoryId").val(),
    };

  $.ajax({
    url: ITEM_URL,
    method: "POST",
    data: data,
    success: function (data) {
      $("#add-form")[0].reset();
      $("#add-success").append(`<div class="alert alert-success" role="alert">
                            <strong>Success!</strong> ${data.message}</div>`);

      setTimeout(function () {
        $("#success").empty();
        $("#addModal").modal("hide");
        location.reload();
      }, DELAY);
    },
    error: function (data) {
      $("#add-errors").append(`<div class="alert alert-danger" role="alert">
                            <strong>Error!</strong> ${data.responseJSON.message}</div>`);

      setTimeout(function () {
        $("#add-errors").empty();
      }, DELAY);
      console.error(data.responseJSON.message);
    },
  });
});

$("#edit-form").submit(function (e) {
  e.preventDefault();
  const form = $(this),
    data = {
      name: form.find("#name").val(),
      categoryId:form.find("#categoryId").val(),
    };
  $.ajax({
    url: `${ITEM_URL}/${form.find("#id").val()}`,
    method: "PUT",
    data: data,
    success: function (data) {
      $("#edit-form")[0].reset();
      $("#edit-success").append(`<div class="alert alert-success" role="alert">
                            <strong>Success!</strong> ${data.message}</div>`);

      setTimeout(function () {
        $("#edit-success").empty();
        $("#editModal").modal("hide");
        location.reload();
      }, DELAY);
    },
    error: function (data) {
      $("#edit-errors").append(`<div class="alert alert-danger" role="alert">
                           <strong>Error!</strong> ${data.responseJSON.message}</div>`);
      console.error(data.responseJSON.message);
      setTimeout(function () {
        $("#edit-errors").empty();
      }, DELAY);
    },
  });
});
