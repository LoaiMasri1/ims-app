import { DELAY, REGISTER_URL } from "../settings/settings.js";
const token = localStorage.getItem("token");
if (token) {
  window.location.href = "item.html";
}

function registerUser(e) {
  e.preventDefault();
  console.log(123);
  const form = e.target;
  const data = {
    username: form.username.value,
    password: form.password.value,
    email: form.email.value,
    phone: form.phone.value,
  };

  $.ajax({
    url: REGISTER_URL,
    type: "POST",
    data,
    success: (data) => {
      console.log(data.message);
      const message = `<div class="alert alert-success" role="alert">${data.message}</div>`;
      $("#message").append(message);
      setTimeout(() => {
        window.location.href = "login.html";
        $("#message").empty();
      }, DELAY);
    },
    error: (err) => {
      console.log(err.responseJSON.message);
      const message = `<div class="alert alert-danger" role="alert">${err.responseJSON.message}</div>`;
      $("#error").append(message);
      setTimeout(() => {
        $("#error").empty();
      }, DELAY);
    },
  });
}

$("#register-form").submit(registerUser);
