import { DELAY, FORGET_PASSWORD_URL } from "../settings/settings.js";

function forgetPassword(e) {
  e.preventDefault();
  const form = e.target;
  const password = form.password.value,
    confirmPassword = form.password_confirmation.value,
    email = form.email.value;
  if (password !== confirmPassword) {
    const message =
      "<div class='alert alert-danger text-center'>Password's Not Match</div>";
    $("#error").append(message);
    setTimeout(() => {
      $("#error").empty();
    }, DELAY);
    return;
  }
  const data = {
    email: email,
    newPassword: password,
  };
  $.ajax({
    url: FORGET_PASSWORD_URL,
    type: "POST",
    data: data,
    success: function (data) {
      const message = `<div class='alert alert-success text-center'>${data.message}</div>`;
      $("#message").append(message);
      setTimeout(() => {
        $("#message").empty();
        window.location.href = "login.html";
      }, DELAY);
    },
    error: function (error) {
      const message = `<div class='alert alert-danger text-center'>${error.responseJSON.message}</div>`;
      $("#error").append(message);
      setTimeout(() => {
        $("#error").empty();
      }, DELAY);
    },
  });
}

$("#forget-form").submit(forgetPassword);
