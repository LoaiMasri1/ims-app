import { DEPARTMENT_URL } from "../settings/settings.js";
import { USER_URL } from "../settings/settings.js";

export function deleteDepartment(id) {
  if (confirm("Are you sure you want to delete this department?")) {
    $.ajax({
      url: `${DEPARTMENT_URL}/${id}`,
      method: "DELETE",
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

export function deleteUser(id) {
  if (confirm("Are you sure you want to delete this user?")) {
    $.ajax({
      url: `${USER_URL}/${id}`,
      method: "DELETE",
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

export function editDepartment(id) {
  $("#edit-form")[0].reset();

  $.ajax({
    url: `${DEPARTMENT_URL}/${id}`,
    method: "GET",
    dataType: "json",
    success: function (data) {
      let { department } = data;
      $("#edit-form")[0].reset();
      $("#edit-form").find("#id").val(department.id);
      $("#edit-form").find("#name").val(department.name);
      $("#edit-form").find("#floor").val(department.floorNumber);
      $("#editModal").modal("show");
    },
    error: function (data) {
      alert(data.responseJSON.message);
      console.error(data.responseJSON.message);
    },
  });
}

export function editUser(id) {
  $("#edit-form")[0].reset();
  console.log(id);
  $.ajax({
    url: `${USER_URL}/${id}`,
    method: "GET",
    dataType: "json",
    success: function (data) {
      let { user } = data;
      $("#edit-form")[0].reset();
      $("#edit-form").find("#id").val(user.id);
      $("#edit-form").find("#userName").val(user.username);
      $("#edit-form").find("#email").val(user.email);
      $("#edit-form").find("#phone").val(user.phone);
      $("#edit-form").find("#departmentId").val(user.department.id);
      $("#editModal").modal("show");
    },
    error: function (data) {
      alert(data.responseJSON.message);
      console.error(data.responseJSON.message);
    },
  });
}
