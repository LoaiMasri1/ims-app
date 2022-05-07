import { ROOM_URL, DELAY } from "../settings/settings.js";
let token = localStorage.getItem("token");


$("#add-form").submit(function (e) {
  e.preventDefault();
  const form = $(this),
    data = {
      type: form.find("#type").val(),
      userId: form.find("#user").val(),
      departmentId: form.find("#department").val(),
    };

  $.ajax({
    url: ROOM_URL,
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
      console.error(data.responseJSON);
    },
  });
});

$("#edit-form").submit(function (e) {
  e.preventDefault();
  const form = $(this),
    data = {
      type: form.find("#type").val(),
      userId: form.find("#user").val(),
      departmentId: form.find("#department").val(),
    };
  $.ajax({
    url: `${ROOM_URL}/${form.find("#id").val()}`,
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
