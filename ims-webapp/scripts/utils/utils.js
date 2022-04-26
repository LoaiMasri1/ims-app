import { DEPARTMENT_URL } from "../settings/settings.js";

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
