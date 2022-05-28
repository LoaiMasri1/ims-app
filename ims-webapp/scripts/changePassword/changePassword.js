import { CHANGE_PASSWORD_URL, DELAY } from "../settings/settings.js";

const token = localStorage.getItem("token");

function changePassword(e) {
  e.preventDefault();
  const form = e.target;
  const newPassword = form.newPassword.value,
    confirmPassword = form.confirmPassword.value,
    currentPassword = form.currentPassword.value;

  if (newPassword !== confirmPassword) {
    const message =
      "<div class='alert alert-danger text-center'>Password's Not Match</div>";
    $("#error").append(message);
    setTimeout(() => {
      $("#error").empty();
    }, DELAY);
    return;
  }
  const data = {
    oldPassword: currentPassword,
    newPassword: newPassword,
  };

  $.ajax({
    url: `${CHANGE_PASSWORD_URL}/${token}`,
    type: "POST",
    data: data,
    success: function (data) {
      const message = `<div class='alert alert-success text-center'>${data.message}</div>`;
      $("#message").append(message);
      setTimeout(() => {
        $("#message").empty();
        localStorage.removeItem("token");
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

$("#changePassword-form").submit(changePassword);
