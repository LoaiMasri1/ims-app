import {
  USER_URL,
  DELAY,
  primaryColor,
  dangerColor,
  EMPTY_MESSAGE,
} from "../settings/settings.js";

import { getDepartments, getUsername } from "../utils/utils.js";

const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "login.html";
}
getUsername(token);
function getUser(id) {
  return $.ajax({
    url: `${USER_URL}/${id}`,
    method: "GET",
    dataType: "json",
    beforeSend: function (xhr) {
      xhr.setRequestHeader("authorization", "Bearer " + token);
    },
    success: function (data) {
      const { category } = data;
      return category;
    },
  });
}

export function deleteUser(id) {
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
        url: `${USER_URL}/${id}`,
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

export async function editUser(id) {
  const { user } = await getUser(id),
    { username, email, phone } = user;
  const { value: data } = await Swal.fire({
    title: "Edit Category",
    html: `<input type="text" id="username" class="swal2-input w-75"  value=${username}>
           <input type="email" id="email" class="swal2-input w-75" value=${email}>
           <input type="text" id="phone" class="swal2-input w-75" value=${phone}>
           <select id="department" class="swal2-input w-75">
           <option value=${EMPTY_MESSAGE}>Select Department</option>
           </select>
           `,
    icon: "info",
    focusConfirm: false,
    showCancelButton: true,
    cancelButtonText: "Cancel",
    confirmButtonText: "Add",
    confirmButtonColor: primaryColor,
    cancelButtonColor: dangerColor,
    didOpen: async () => {
      const { department } = await getDepartments();
      department.forEach((department) => {
        $("#department").append(
          `<option value=${department.id} ${
            department.id === user.department ? "selected" : ""
          } >${department.name}</option>`
        );
      });
    },
    preConfirm: () => {
      return {
        username: $("#username").val(),
        email: $("#email").val(),
        phone: $("#phone").val(),
        departmentId: $("#department").val(),
      };
    },
  });

  if (!data) return;

  if (data.departmentId === EMPTY_MESSAGE)
    return Swal.fire("Error!", "Please select a department", "error");

  console.log(data);
  $.ajax({
    url: `${USER_URL}/${id}`,
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

export async function addUser() {
  const { value: data } = await Swal.fire({
    title: "Add User",
    html: `<input type="text" id="username" class="swal2-input w-75" placeholder="Enter Username">
           <input type="email" id="email" class="swal2-input w-75" placeholder="Enter Email">
           <input type="tel" id="phone" class="swal2-input w-75" placeholder="Enter Phone">
           <select id="department" class="swal2-input w-75">
           <option selected value="999">Select Department</option>
           </select>
           <p class="text-muted mt-3">The default password is <strong>Password123</strong><br>to change it contact the admin</p>`,
    icon: "info",
    focusConfirm: false,
    showCancelButton: true,
    cancelButtonText: "Cancel",
    confirmButtonText: "Add",
    confirmButtonColor: primaryColor,
    cancelButtonColor: dangerColor,
    didOpen: async () => {
      const { department } = await getDepartments();
      department.forEach((department) => {
        $("#department").append(
          `<option value=${department.id}>${department.name}</option>`
        );
      });
    },
    preConfirm: () => {
      return {
        username: $("#username").val(),
        email: $("#email").val(),
        phone: $("#phone").val(),
        departmentId: $("#department").val(),
      };
    },
  });

  if (!data) return;

  if (data.departmentId === "999")
    return Swal.fire("Error!", "Please select a department", "error");

  $.ajax({
    url: USER_URL,
    method: "POST",
    data: data,
    beforeSend: function (xhr) {
      xhr.setRequestHeader("authorization", "Bearer " + token);
    },
    success: function (data) {
      Swal.fire("Success", data.message, "success");
      setTimeout(() => {
        location.reload();
      }, DELAY - 1500);
    },
    error: function (err) {
      Swal.fire("Error", err.responseJSON.message, "error");
    },
  });
}
