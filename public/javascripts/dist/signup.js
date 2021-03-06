"use strict";

document.querySelector("#signup").addEventListener("click", function (e) {
  var email = document.querySelector("#signup_email").value;
  var username = document.querySelector("#signup_username").value;
  var password = document.querySelector("#signup_password").value;
  var pokeId = Math.floor(Math.random() * 154);
  var avatar = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/".concat(pokeId, ".png");
  fetch(url + "users/signup", {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "username": username,
      "password": password,
      "email": email,
      "avatar": avatar
    })
  }).then(function (response) {
    return response.json();
  }).then(function (json) {
    if (json.status === "succes") {
      var token = json.data.token;
      localStorage.setItem("token", token);
      window.location.href = "/app";
    } else {
      alert = document.querySelector(".alert");
      alert.textContent = json.message;
      alert.classList.remove("hidden");
    }
  });
});