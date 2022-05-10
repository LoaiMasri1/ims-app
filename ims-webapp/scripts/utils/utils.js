import { DEPARTMENT_URL, USER_URL, CATEGORY_URL } from "../settings/settings.js";

const token = localStorage.getItem("token");

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

export function getCategorys() {
  return $.ajax({
    url: `${CATEGORY_URL}`,
    method: "GET",
    dataType: "json",
    beforeSend: function (xhr) {
      xhr.setRequestHeader("authorization", "Bearer " + token);
    },
    success: function (data) {
      const { category } = data;
      return category;
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

