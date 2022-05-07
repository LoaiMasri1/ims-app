import { deleteItem,editItem } from "../utils/utils.js";
window._item = { deleteItem, editItem };
import { ITEM_URL } from "../settings/settings.js";

$(document).ready(function () {
  $.ajax({
    url: ITEM_URL,
    method: "GET",
    dataType: "json",
    success: function (data) {
      const title = "Item",
        { item } = data;
      let html = `
                    <thead>
                        <tr class="text-center">
                            <th>ID</th>
                            <th>Name</th>
                            <th>categoryId</th>
                            <th>Action's</th>
                    
                        </tr>
                    </thead>
                    <tbody>
                        ${item
                          .map((item) => {
                            return `
                                <tr class="text-center">
                                    <td>${item.id}</td>
                                    <td>${item.name}</td>
                                    <td>${item.category}</td>
                                    <td>
                                        <button class="btn btn-primary btn-sm" onclick="window._item.editItem(${item.id})">
                                            <i class="fa fa-edit"></i>
                                        </button>
                                        <button class="btn btn-danger btn-sm" onclick="window._item.deleteItem(${item.id})">
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
            action: function () {
              // show modal
              $("#addModal").modal("show");
            },
          },
        ],
      });
    },
  });
});
