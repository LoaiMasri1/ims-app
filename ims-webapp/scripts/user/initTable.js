import { deleteUser, editUser, addUser } from "./main.js";
window._user = { deleteUser, editUser };
import { USER_URL, DELAY } from "../settings/settings.js";

$(document).ready(function () {
  $.ajax({
    url: USER_URL,
    method: "GET",
    dataType: "json",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "authorization",
        "Bearer " + localStorage.getItem("token")
      );
    },
    success: function (data) {
      const title = "User",
        { user } = data;
      let html = `
                    <thead>
                        <tr class="text-center">
                            <th>ID</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>department</th>
                            <th>Role</th>
                            <th>Action's</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        ${user
                          .map((user) => {
                            return `
                                <tr class="text-center">
                                    <td>${user.id}</td>
                                    <td>${user.username}</td>
                                    <td>${user.email}</td>
                                    <td>${user.phone}</td>
                                    <td>${user.department?.name || null}</td>
                                    <td>${
                                      user.role
                                        ? `<span class="badge bg-danger">
                                          Admin
                                        </span>`
                                        : `<span class="badge bg-success">
                                          Member
                                        </span>`
                                    }</td>
                                    <td>
                                        <button class="btn btn-primary btn-sm" onclick="window._user.editUser(${
                                          user.id
                                        })">
                                            <i class="fa fa-edit"></i>
                                        </button>
                                        <button class="btn btn-danger btn-sm" onclick="window._user.deleteUser(${
                                          user.id
                                        })">
                                            <i class="fa fa-trash"></i>
                                        </button>
                                    </td>
                                    
                                </tr>
                                `;
                          })
                          .join("")}
                    </tbody>`;
      $("#myTable").html(html);
      $("#myTable").DataTable({
        dom:
          "<'row'<'col-sm-6'B><'col-sm-6 d-flex align-items-center justify-content-end'f>>" +
          "<'row'<'col-sm-12'tr>>" +
          "<'row'<'col-sm-4'i><'col-sm-4 text-center d-flex align-items-center justify-content-center'l><'col-sm-4'p>>",
        buttons: [
          {
            extend: "excelHtml5",
            text: '<i class="fa fa-file-excel-o"></i> Excel',
            titleAttr: "Export to Excel",
            title: title,
            exportOptions: {
              columns: ":not(:last-child)",
            },
          },
          {
            extend: "csvHtml5",
            text: '<i class="fa fa-file-text-o"></i> CSV',
            titleAttr: "Export to CSV",
            title: title,
            exportOptions: {
              columns: ":not(:last-child)",
            },
          },
          {
            extend: "pdfHtml5",
            text: '<i class="fa fa-file-pdf-o"></i> PDF',
            titleAttr: "Export to PDF",
            title: title,
            exportOptions: {
              columns: ":not(:last-child)",
            },
          },
          {
            extend: "print",
            text: '<i class="fa fa-print"></i> Print',
            titleAttr: "Print Table",
            exportOptions: {
              columns: ":visible",
            },
            customize: function (win) {
              $(win.document.body)
                .find("table")
                .find("td:last-child, th:last-child")
                .remove();
            },
          },
          {
            text: '<i class="fa fa-plus"></i> Add',
            className: "add-btn",
            action: addUser,
          },
        ],
      });
    },
    error: function (err) {
      Swal.fire("Error", err.responseJSON.message, "error");
      setTimeout(() => {
        window.location.href = "item.html";
      }, DELAY - 1500);
    },
  });
});
