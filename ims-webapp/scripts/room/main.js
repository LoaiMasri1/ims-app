import {
  DELAY,
  ROOM_URL,
  primaryColor,
  dangerColor,
} from "../settings/settings.js";

import {
  getUsers,
  getDepartments,
} from "../utils/utils.js";
const token = localStorage.getItem("token");
console.log(token);

const EMPTY_MESSAGE = "999";

function getRoom(id) {
  return $.ajax({
    url: `${ROOM_URL}/${id}`,
    method: "GET",
    dataType: "json",
    beforeSend: function (xhr) {
      xhr.setRequestHeader("authorization", "Bearer " + token);
    },
    success: function (data) {
      const { room } = data;
      return room;
    },
  });
}

export function deleteRoom(id) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: primaryColor,
    cancelButtonColor: dangerColor,
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        url: `${ROOM_URL}/${id}`,
        method: "DELETE",
        beforeSend: function (xhr) {
          xhr.setRequestHeader("authorization", "Bearer " + token);
        },
        success: function (data) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          setTimeout(() => {
            location.reload();
          }, DELAY - 1500);
        },
        error: function (data) {
          Swal.fire("Error!", data.responseJSON.message, "error");
          console.error(data.responseJSON.message);
        },
      });
    }
  });
}

export async function editRoom(id) {
  const { room } = await getRoom(id),
    { type } = room;

  const { value: data } = await Swal.fire({
    title: "Edit Room",
    html: `
    <input id="Type" class="swal2-input w-75" value=${type} placeholder="Enter Type">
    <select id="User" class="swal2-input w-75">
      <option value=${EMPTY_MESSAGE}>Select User</option>
    </select>
    <select id="Department" class="swal2-input w-75">
      <option  value=${EMPTY_MESSAGE}>Select Department</option>
    </select>`,

    icon: "info",
    focusConfirm: false,
    showCancelButton: true,
    cancelButtonText: "Cancel",
    confirmButtonText: "Edit",
    confirmButtonColor: primaryColor,
    cancelButtonColor: dangerColor,
    didOpen: async () => {
      const { user } = await getUsers(),
        { department } = await getDepartments();
      user.forEach((user) => {
        $("#User").append(
          `<option value=${user.id} ${
            user.id === room.user ? "selected" : ""
          }>${user.username}</option>`
        );
      });

      department.forEach((department) => {
        $("#Department").append(
          `<option value=${department.id} ${
            department.id === room.department ? "selected" : ""
          } >${department.name}</option>`
        );
      });
    },
    preConfirm: () => {
      return {
        type: $("#Type").val(),
        userId: $("#User").val(),
        departmentId: $("#Department").val(),
      };
    },
  });

  if (!data) return;

  if (data.userId === EMPTY_MESSAGE) {
    return Swal.fire("Error!", "Please select a user", "error");
  }
  if (data.departmentId === EMPTY_MESSAGE) {
    return Swal.fire("Error!", "Please select a department", "error");
  }

  $.ajax({
    url: `${ROOM_URL}/${id}`,
    method: "PUT",
    data: data,
    beforeSend: function (xhr) {
      xhr.setRequestHeader("authorization", "Bearer " + token);
    },
    success: function (data) {
      Swal.fire("Edited!", "Your Database Edited Successfully.", "success");
      setTimeout(() => {
        location.reload();
      }, DELAY - 1500);
    },
    error: function (err) {
      Swal.fire("Error!", err.responseJSON.message, "error");
      console.error(err.responseJSON.message);
    },
  });
}

export async function addRoom() {
  const { value: data } = await Swal.fire({
    title: "Add Room",
    html: `
    <input id="Type" class="swal2-input w-75" placeholder="Enter Type">
            <select id="User" class="swal2-input w-75">
              <option selected value=${EMPTY_MESSAGE}>Select User</option>
            </select>
            <select id="Department" class="swal2-input w-75">
              <option selected value=${EMPTY_MESSAGE}>Select Department</option>
            </select>`,
    icon: "info",
    focusConfirm: false,
    showCancelButton: true,
    cancelButtonText: "Cancel",
    confirmButtonText: "Add",
    confirmButtonColor: primaryColor,
    cancelButtonColor: dangerColor,
    preConfirm: () => {
      return {
        type: $("#Type").val(),
        userId: $("#User").val(),
        departmentId: $("#Department").val(),
      };
    },
    didOpen: async () => {
      const { user } = await getUsers(),
        { department } = await getDepartments();

      console.log(user);

      user.forEach((user) => {
        $("#User").append(`<option value=${user.id}>${user.username}</option>`);
      });

      department.forEach((department) => {
        $("#Department").append(
          `<option value=${department.id}>${department.name}</option>`
        );
      });
    },
  });

  if (!data) return;
  if (data.departmentId === EMPTY_MESSAGE)
    return await Swal.fire("Error!", "Please Select Department", "error");

  if (data.userId === EMPTY_MESSAGE)
    return await Swal.fire("Error!", "Please Select User", "error");

  await $.ajax({
    url: ROOM_URL,
    method: "POST",
    data: data,
    beforeSend: function (xhr) {
      xhr.setRequestHeader("authorization", "Bearer " + token);
    },
    success: function (data) {
      Swal.fire("Success", "Room Added Successfully", "success");
      setTimeout(() => {
        location.reload();
      }, DELAY - 1500);
    },
    error: function (err) {
      Swal.fire("Error", err.responseJSON.message, "error");
    },
  });
}
