import { DEPARTMENT_URL, ROOM_URL } from "../settings/settings.js";

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

export function deleteRoom(id) {
  if (confirm("Are you sure you want to delete this room?")) {
    $.ajax({
      url: `${ROOM_URL}/${id}`,
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

export function editRoom(id) {
  $("#edit-form")[0].reset();
  $.ajax({
    url: `${ROOM_URL}/${id}`,
    method: "GET",
    dataType: "json",
    success: function (data) {
      let { room } = data;
      $("#edit-form")[0].reset();
      $("#edit-form").find("#id").val(room.id);
      $("#edit-form").find("#type").val(room.type);
      $("#edit-form").find("#user").val(room.user);
      $("#edit-form").find("#department").val(room.department);
      $("#editModal").modal("show");
      console.log(data)
    },
    error: function (data) {
      alert(data.responseJSON.message);
      console.error(data.responseJSON.message);
    },
  });
}
