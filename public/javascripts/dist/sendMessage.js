"use strict";

var primus = Primus.connect(url, {
  reconnect: {
    max: Infinity // Number: The max delay before we try to reconnect.
    ,
    min: 500 // Number: The minimum delay before we try reconnect.
    ,
    retries: 10 // Number: How many times we should try to reconnect.

  }
});
primus.on("data", function (data) {
  if (data.action == "addMessage") {
    addMessage(data.data.data.message, data.data);
  } else if (data.action == "reload") {
    document.querySelector(".messages__flex").innerHTML = "";
    previous = "lol";
    startUp();
  } else if (data.action == "updateMotto") {
    document.querySelector("ul.users").innerHTML = "";
    getUsers();
  }
});

var sendMessage = function sendMessage(e) {
  var message = input.value;
  fetch(url + "api/v1/messages", {
    method: "post",
    "headers": {
      "Content-Type": 'application/json',
      "Authorization": "Bearer " + localStorage.getItem('token')
    },
    body: JSON.stringify({
      "message": message
    })
  }).then(function (result) {
    return result.json();
  }).then(function (json) {
    primus.write({
      "action": "addMessage",
      "data": json
    }); //console.log(json);

    /*let message = `<ul class="message__container message--sent">
    <li class="message__avatar"></li>
    <li class="message__user"></li>
    </ul> `;*/

    /*
    let todo = `<div class="todo">
        <input type="checkbox" class="todo__state">
        <div class="todo__text">${json.data.todo.text}</div>
        <a class="todo__delete" href="#" data-id="${json.data.todo._id}">delete</a>
    </div>`; 
    document.querySelector(".todo__new").insertAdjacentHTML('afterend', todo);
    */

    input.value = "";
  })["catch"](function (err) {
    console.log(err);
  });
};

var input = document.querySelector("#message");
var sendMessageButton = document.querySelector("#messageSend");
sendMessageButton.addEventListener("click", sendMessage);
input.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    sendMessage();
  }

  e.preventDefault();
});