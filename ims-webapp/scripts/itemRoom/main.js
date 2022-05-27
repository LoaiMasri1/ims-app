import {
    DELAY,
    ROOM_URL,
    ITEMROOM_URL,
    primaryColor,
    dangerColor,
    EMPTY_MESSAGE,
  } from "../settings/settings.js";
  
  import { getRoom, getItem } from "../utils/utils.js";
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
  }
  
  
  function getItemRoom(itemId, roomId) {
    return $.ajax({
      url: `${ITEMROOM_URL}/item/${itemId}/room/${roomId}`,
      method: "GET",
      dataType: "json",
      beforeSend: function (xhr) {
        xhr.setRequestHeader("authorization", "Bearer " + token);
      },
      success: function (data) {
        const { itemRoom } = data;
        return itemRoom;
      },
    });
  }

  export function deleteItemRoom(itemId, roomId) {
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
          url: `${ITEMROOM_URL}/item/${itemId}/room/${roomId}`,
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
  
  export async function editItemRoom(itemId, roomId) {
    const {itemroom} = await getItemRoom(itemId, roomId),
    {numberOfItem} = itemroom
    console.log(itemroom)
    console.log(numberOfItem)
    const { value: data } = await Swal.fire({
      title: "Edit ItemRoom",
      html: `
      <select id="Item" class="swal2-input w-75">
        <option value=${EMPTY_MESSAGE}>Select Item</option>
      </select>
      <select id="Room" class="swal2-input w-75">
        <option  value=${EMPTY_MESSAGE}>Select Room</option>
      </select>
      <input type="text" id="numberOfItem" class="swal2-input w-75" value=${numberOfItem} placeholder="Enter Number Of Item">`
      ,
  
      icon: "info",
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Edit",
      confirmButtonColor: primaryColor,
      cancelButtonColor: dangerColor,
      didOpen: async () => {
        const { item } = await getItem(),
          { room } = await getRoom();
        item.forEach((item) => {
          $("#Item").append(
            `<option value=${item.id} ${
              item.id === itemroom.itemId ? "selected" : ""
            }>${item.name}</option>`
          );
        });
  
        room.forEach((room) => {
          $("#Room").append(
            `<option value=${room.id} ${
              room.id === itemroom.roomId ? "selected" : ""
            } >${room.type}</option>`
          );
        });
      },
      preConfirm: () => {
        return {
          numberOfItem: $("#numberOfItem").val(),
          itemId: $("#Item").val(),
          roomId: $("#Room").val(),
        };
      },
    });
  
    if (!data) return;
  
    if (data.itemId === EMPTY_MESSAGE) {
      return Swal.fire("Error!", "Please select item", "error");
    }
    if (data.roomId === EMPTY_MESSAGE) {
      return Swal.fire("Error!", "Please select room", "error");
    }
  
    $.ajax({
      url: `${ITEMROOM_URL}/item/${itemId}/room/${roomId}`,
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
  
  export async function addItemRoom() {
    const { value: data } = await Swal.fire({
      title: "Add ItemRoom",
      html:`
      <select id="Item" class="swal2-input w-75">
        <option value=${EMPTY_MESSAGE}>Select Item</option>
      </select>
      <select id="Room" class="swal2-input w-75">
        <option  value=${EMPTY_MESSAGE}>Select Room</option>
      </select>
      <input min = 0 type="number" id="numberOfItem" class="swal2-input w-75" placeholder="Enter Number Of Item">`,
      icon: "info",
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Add",
      confirmButtonColor: primaryColor,
      cancelButtonColor: dangerColor,
      preConfirm: () => {
        return {
          numberOfItem: $("#numberOfItem").val(),
          itemId: $("#Item").val(),
          roomId: $("#Room").val(),
        };
      },
      didOpen: async () => {
        const { item } = await getItem(),
          { room } = await getRoom();
  
        console.log(item);
  
        item.forEach((item) => {
          $("#Item").append(`<option value=${item.id}>${item.name}</option>`);
        });
  
        room.forEach((room) => {
          $("#Room").append(
            `<option value=${room.id}>${room.type}</option>`
          );
        });
      },
    });
  
    if (!data) return;
    if (data.roomId === EMPTY_MESSAGE)
      return await Swal.fire("Error!", "Please Select Room", "error");
  
    if (data.itemId === EMPTY_MESSAGE)
      return await Swal.fire("Error!", "Please Select Item", "error");
  
    await $.ajax({
      url: ITEMROOM_URL,
      method: "POST",
      data: data,
      beforeSend: function (xhr) {
        xhr.setRequestHeader("authorization", "Bearer " + token);
      },
      success: function (data) {
        Swal.fire("Success", "ItemRoom Added Successfully", "success");
        setTimeout(() => {
          location.reload();
        }, DELAY - 1500);
      },
      error: function (err) {
        Swal.fire("Error", err.responseJSON.message, "error");
      },
    });
  }
  