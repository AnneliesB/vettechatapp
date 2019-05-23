"use strict";

var appendUser = function appendUser(user) {
  var userHtml = "<li class=\"user user--online\">\n        <div class=\"user__avatar\"></div>\n        <h3 class=\"user__name\">".concat(user.username, "</h3>\n        <h5 class=\"user__motto\">Geef vis</h5>\n    </li>");
  var userMenu = document.querySelector("ul.users");
  userMenu.insertAdjacentHTML("beforeend", userHtml);
};

var getUsers = function getUsers() {
  fetch(url + "users", {
    method: "get",
    "headers": {
      "Content-Type": 'application/json'
    }
  }).then(function (result) {
    return result.json();
  }).then(function (json) {
    var userArray = json.data.users;
    userArray.forEach(function (user) {
      appendUser(user);
    });
  })["catch"](function (err) {
    console.log(err);
  });
};

getUsers();