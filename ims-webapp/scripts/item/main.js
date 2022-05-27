import {
  DELAY,
  ITEM_URL,
  primaryColor,
  dangerColor,
  EMPTY_MESSAGE,
} from "../settings/settings.js";

import { getCategorys, getUsername } from "../utils/utils.js";

const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "login.html";
}
getUsername(token);

function getItem(id) {
  return $.ajax({
    url: `${ITEM_URL}/${id}`,
    method: "GET",
    dataType: "json",
    beforeSend: function (xhr) {
      xhr.setRequestHeader("authorization", "Bearer " + token);
    },
    success: function (data) {
      const { item } = data;
      return item;
    },
  });
}

export function deleteItem(id) {
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
        url: `${ITEM_URL}/${id}`,
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

export async function editItem(id) {
  const { item } = await getItem(id),
    { name } = item;

  const { value: data } = await Swal.fire({
    title: "Edit Item",
    html: `
    <input id="Name" class="swal2-input w-75" value=${name} placeholder="Enter Name">
    <select id="Category" class="swal2-input w-75">
      <option value=${EMPTY_MESSAGE}>Select Category</option>
    </select>`,

    icon: "info",
    focusConfirm: false,
    showCancelButton: true,
    cancelButtonText: "Cancel",
    confirmButtonText: "Edit",
    confirmButtonColor: primaryColor,
    cancelButtonColor: dangerColor,
    didOpen: async () => {
      const { category } = await getCategorys();
      category.forEach((category) => {
        $("#Category").append(
          `<option value=${category.id} ${
            category.id === item.category ? "selected" : ""
          }>${category.mainClassification}, ${
            category.subClassification
          }</option>`
        );
      });
    },
    preConfirm: () => {
      return {
        name: $("#Name").val(),
        categoryId: $("#Category").val(),
      };
    },
  });

  if (!data) return;

  if (data.categoryId === EMPTY_MESSAGE) {
    return Swal.fire("Error!", "Please select a category", "error");
  }

  $.ajax({
    url: `${ITEM_URL}/${id}`,
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

export async function addItem() {
  const { value: data } = await Swal.fire({
    title: "Add Item",
    html: `
    <input id="Name" class="swal2-input w-75" placeholder="Enter Name">
            <select id="Category" class="swal2-input w-75">
              <option selected value=${EMPTY_MESSAGE}>Select Category</option>
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
        name: $("#Name").val(),
        categoryId: $("#Category").val(),
      };
    },
    didOpen: async () => {
      const { category } = await getCategorys();

      console.log(category);

      category.forEach((category) => {
        $("#Category").append(
          `<option value=${category.id}>${category.mainClassification}, ${category.subClassification}</option>`
        );
      });
    },
  });
  if (!data) return;
  if (data.categoryId === EMPTY_MESSAGE)
    return await Swal.fire("Error!", "Please Select Category", "error");

  await $.ajax({
    url: ITEM_URL,
    method: "POST",
    data: data,
    beforeSend: function (xhr) {
      xhr.setRequestHeader("authorization", "Bearer " + token);
    },
    success: function (data) {
      Swal.fire("Success", "Item Added Successfully", "success");
      setTimeout(() => {
        location.reload();
      }, DELAY - 1500);
    },
    error: function (err) {
      Swal.fire("Error", err.responseJSON.message, "error");
    },
  });
}
