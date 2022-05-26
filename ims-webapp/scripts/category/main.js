import {
  CATEGORY_URL,
  DELAY,
  primaryColor,
  dangerColor,
} from "../settings/settings.js";
import { getUsername } from "../utils/utils.js";

const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}
getUsername(token);

function getCategory(id) {
  return $.ajax({
    url: `${CATEGORY_URL}/${id}`,
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

export function deleteCategory(id) {
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
        url: `${CATEGORY_URL}/${id}`,
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

export async function editCategory(id) {
  const { category } = await getCategory(id),
    { subClassification, mainClassification } = category;

  const { value: data } = await Swal.fire({
    title: "Edit Category",
    html: `<input type="text" id="MainClassification" class="swal2-input"  value=${mainClassification}>
           <input type="text" id="SubClassification" class="swal2-input" value=${subClassification}>`,
    icon: "info",
    focusConfirm: false,
    showCancelButton: true,
    cancelButtonText: "Cancel",
    confirmButtonText: "Add",
    confirmButtonColor: primaryColor,
    cancelButtonColor: dangerColor,
    preConfirm: () => {
      return {
        mainClassification: $("#MainClassification").val(),
        subClassification: $("#SubClassification").val(),
      };
    },
  });

  if (data) {
    $.ajax({
      url: `${CATEGORY_URL}/${id}`,
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

export async function addCategory() {
  const { value: data } = await Swal.fire({
    title: "Add Category",
    html: `<input type="text" id="MainClassification" class="swal2-input w-75"  placeholder="Enter the Main Classification">
           <input type="text" id="SubClassification" class="swal2-input w-75" placeholder="Enter the Sub Classification">`,
    icon: "info",
    focusConfirm: false,
    showCancelButton: true,
    cancelButtonText: "Cancel",
    confirmButtonText: "Add",
    confirmButtonColor: primaryColor,
    cancelButtonColor: dangerColor,
    preConfirm: () => {
      return {
        mainClassification: $("#MainClassification").val(),
        subClassification: $("#SubClassification").val(),
      };
    },
  });

  if (!data) return;

  $.ajax({
    url: CATEGORY_URL,
    method: "POST",
    data: data,
    beforeSend: function (xhr) {
      xhr.setRequestHeader("authorization", "Bearer " + token);
    },
    success: function (data) {
      Swal.fire("Success", "Category Added Successfully", "success");
      setTimeout(() => {
        location.reload();
      }, DELAY - 1500);
    },
    error: function (err) {
      Swal.fire("Error", err.responseJSON.message, "error");
    },
  });
}
