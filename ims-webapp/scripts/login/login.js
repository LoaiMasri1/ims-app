import { DELAY, LOGIN_URL } from "../settings/settings.js";

let token = localStorage.getItem("token");

if (token) {
  window.location.href = "item.html";
}

$("#login-form").on("submit", loginUser);

function loginUser(e) {
  console.log(123);
  e.preventDefault();
  const form = e.target;
  const user = {
    email: form.email.value,
    password: form.password.value,
  };
  $.ajax({
    url: LOGIN_URL,
    type: "POST",
    data: JSON.stringify(user),
    contentType: "application/json",
    success: function (data) {
      localStorage.setItem("token", data.token);
      window.location = "item.html";
    },
    error: function (err) {
      const message = `<div class="alert alert-danger" role="alert">${err.responseJSON.message}</div>`;
      $("#error").append(message);
      setTimeout(() => {
        $("#error").empty();
      }, DELAY);
    },
  });
}
