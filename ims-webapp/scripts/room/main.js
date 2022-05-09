import {
  DELAY,
  ROOM_URL,
  primaryColor,
  dangerColor,
} from "../settings/settings.js";

const token = localStorage.getItem("token");
console.log(token);

function getRoom(id) {
  return $.ajax({
    url: `${ROOM_URL}/${id}`,
    method: "GET",
    dataType: "json",
    beforeSend: function (xhr) {
      xhr.setRequestHeader("authorization", "Bearer " + token);
    },
    success: function (data) {
      const { room } = data;
      return room;
    },
  });
}

export function deleteRoom(id) {
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
        url: `${ROOM_URL}/${id}`,
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

export async function editRoom(id) {
  const { room } = await getRoom(id),
    { type, user, department } = room;

  const { value: data } = await Swal.fire({
    title: "Edit Room",
    html: `<input id="Type" class="swal2-input"  value=${type}>
           <input id="User" class="swal2-input" value=${user}>
           <input id="Department" class="swal2-input" value=${department}>`,
           
    icon: "info",
    focusConfirm: false,
    showCancelButton: true,
    cancelButtonText: "Cancel",
    confirmButtonText: "Add",
    confirmButtonColor: primaryColor,
    cancelButtonColor: dangerColor,
    preConfirm: () => {
      return {
        type: $("#Type").val(),
        userId: $("#User").val(),
        departmentId: $("#Department").val(),
      };
    },
  });

  if (data) {
    $.ajax({
      url: `${ROOM_URL}/${id}`,
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

export async function addRoom() {
  const { value: data } = await Swal.fire({
    title: "Add Room",
    html: `<input id="Type" class="swal2-input" placeholder="Enter Type">
                  <input id="User" class="swal2-input" placeholder="Enter User id">
                  <input id="Department" class="swal2-input" placeholder="Enter Department id">`,
    icon: "info",
    focusConfirm: false,
    showCancelButton: true,
    cancelButtonText: "Cancel",
    confirmButtonText: "Add",
    confirmButtonColor: primaryColor,
  
    cancelButtonColor: dangerColor,
    preConfirm: () => {
      return {
        type: $("#Type").val(),
        userId: $("#User").val(),
        departmentId: $("#Department").val(),
      };
    },
  });

  if (data) {
    $.ajax({
      url: ROOM_URL,
      method: "POST",
      data: data,
      beforeSend: function (xhr) {
        xhr.setRequestHeader("authorization", "Bearer " + token);
      },
      success: function (data) {
        Swal.fire("Success", "Room Added Successfully", "success");
        setTimeout(() => {
          location.reload();
        }, DELAY - 1500);
      },
      error: function (err) {
        Swal.fire("Error", err.responseJSON.message, "error");
      },
    });
  }
}
