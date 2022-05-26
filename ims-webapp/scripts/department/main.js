import {
  DELAY,
  DEPARTMENT_URL,
  primaryColor,
  dangerColor,
} from "../settings/settings.js";
import { getUsername } from "../utils/utils.js";

const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "login.html";
}
getUsername(token);

function getDepartment(id) {
  return $.ajax({
    url: `${DEPARTMENT_URL}/${id}`,
    method: "GET",
    dataType: "json",
    beforeSend: function (xhr) {
      xhr.setRequestHeader("authorization", "Bearer " + token);
    },
    success: function (data) {
      const { department } = data;
      return department;
    },
  });
}

export function deleteDepartment(id) {
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
        url: `${DEPARTMENT_URL}/${id}`,
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

export async function editDepartment(id) {
  const { department } = await getDepartment(id),
    { name, floorNumber } = department;

  const { value: data } = await Swal.fire({
    title: "Edit Department",
    html: `<input type="text" id="Name" class="swal2-input"  value=${name}>
           <input type="number" id="Floor" class="swal2-input" value=${floorNumber}>`,
    icon: "info",
    focusConfirm: false,
    showCancelButton: true,
    cancelButtonText: "Cancel",
    confirmButtonText: "Add",
    confirmButtonColor: primaryColor,
    cancelButtonColor: dangerColor,
    preConfirm: () => {
      return {
        name: $("#Name").val(),
        floor: $("#Floor").val(),
      };
    },
  });

  if (data) {
    $.ajax({
      url: `${DEPARTMENT_URL}/${id}`,
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
}

export async function addDepartment() {
  const { value: data } = await Swal.fire({
    title: "Add Department",
    html: `<input type="text"  id="Name" class="swal2-input" placeholder="Enter Name">
           <input type="number" id="Floor" class="swal2-input" placeholder="Enter Floor Number">`,
    icon: "info",
    focusConfirm: false,
    showCancelButton: true,
    cancelButtonText: "Cancel",
    confirmButtonText: "Add",
    confirmButtonColor: primaryColor,
    cancelButtonColor: dangerColor,
    preConfirm: () => {
      return {
        name: $("#Name").val(),
        floor: $("#Floor").val(),
      };
    },
  });

  if (data) {
    $.ajax({
      url: DEPARTMENT_URL,
      method: "POST",
      data: data,
      beforeSend: function (xhr) {
        xhr.setRequestHeader("authorization", "Bearer " + token);
      },
      success: function (data) {
        Swal.fire("Success", "Department Added Successfully", "success");
        setTimeout(() => {
          location.reload();
        }, DELAY - 1500);
      },
      error: function (err) {
        Swal.fire("Error", err.responseJSON.message, "error");
      },
    });
  }
}
