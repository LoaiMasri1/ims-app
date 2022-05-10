import { DEPARTMENT_URL, ITEM_URL, USER_URL } from "../settings/settings.js";

const token = localStorage.getItem("token");

export function deleteItem(id) {
  if (confirm("Are you sure you want to delete this item?")) {
    $.ajax({
      url: `${ITEM_URL}/${id}`,
      method: "DELETE",
      beforeSend: function (xhr) {
        xhr.setRequestHeader("authorization", "Bearer " + token);
      },
      success: function (data) {
        alert(data.message);
        location.reload();
      },
      error: function (data) {
        alert(data.responseJSON.message);
        console.error(data.responseJSON.message);
      },
    });
  }
}

export function editItem(id) {
  $("#edit-form")[0].reset();

  $.ajax({
    url: `${ITEM_URL}/${id}`,
    method: "GET",
    dataType: "json",
    beforeSend: function (xhr) {
      xhr.setRequestHeader("authorization", "Bearer " + token);
    },
    success: function (data) {
      let { item } = data;
      $("#edit-form")[0].reset();
      $("#edit-form").find("#id").val(item.id);
      $("#edit-form").find("#name").val(item.name);
      $("#edit-form").find("#categoryId").val(item.category);
      $("#editModal").modal("show");
    },
    error: function (data) {
      alert(data.responseJSON.message);
      console.error(data.responseJSON.message);
    },
  });
}

export function getUsers() {
  return $.ajax({
    url: `${USER_URL}`,
    method: "GET",
    dataType: "json",
    beforeSend: function (xhr) {
      xhr.setRequestHeader("authorization", "Bearer " + token);
    },
    success: function (data) {
      let { user } = data;
      return user;
    },
    error: function (data) {
      alert(data.responseJSON.message);
      console.error(data.responseJSON.message);
    },
  });
}

export function getDepartments() {
  return $.ajax({
    url: `${DEPARTMENT_URL}`,
    method: "GET",
    dataType: "json",
    beforeSend: function (xhr) {
      xhr.setRequestHeader("authorization", "Bearer " + token);
    },
    success: function (data) {
      const { department } = data;
      return department;
    },
    error: function (data) {
      Swal.fire({
        title: "Error",
        text: data.responseJSON.message,
        icon: "error",
      });
    },
  });
}
