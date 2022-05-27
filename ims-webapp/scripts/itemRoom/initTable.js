import { addItemRoom, deleteItemRoom, editItemRoom } from "./main.js";
window._itemRoom = { deleteItemRoom, editItemRoom };
import { ITEMROOM_URL, DELAY } from "../settings/settings.js";

$(document).ready(function () {
  $.ajax({
    url: ITEMROOM_URL,
    method: "GET",
    dataType: "json",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "authorization",
        "Bearer " + localStorage.getItem("token")
      );
    },
    success: async function (data) {
      const title = "Item Room",
        { itemroom } = data;
      let html = `
                    <thead>
                        <tr class="text-center">
                            <th>Item </th>
                            <th>Room</th>
                            <th>Number Of Item</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemroom
                          .map((itemRoom) => {
                              console.log(itemRoom)
                            return `
                                <tr class="text-center">
                                    <td>${itemRoom.item.name}</td>
                                    <td>${itemRoom.roomId}</td>
                                    <td>${itemRoom.numberOfItem}</td>
                                    <td>
                                        <button class="btn btn-primary btn-sm" onclick="window._itemRoom.editItemRoom(${itemRoom.itemId}, ${itemRoom.roomId})">
                                            <i class="fa fa-edit"></i>
                                        </button>
                                        <button class="btn btn-danger btn-sm" onclick="window._itemRoom.deleteItemRoom(${itemRoom.itemId}, ${itemRoom.roomId})">
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
            action: addItemRoom,
          },
        ],
      });
    },
    error: function (err) {
      Swal.fire("Error", err.message, "error");
      setTimeout(() => {
        window.location.href = "itemRoom.html";
      }, DELAY - 1500);
    },
  });
});
