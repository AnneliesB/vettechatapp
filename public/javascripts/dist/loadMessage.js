"use strict";

fetch('http://localhost:3000/api/v1/messages', {
  method: "get",
  "headers": {
    "Content-Type": 'application/json',
    "Authorization": "Bearer " + localStorage.getItem('token')
  }
}).then(function (result) {
  return result.json();
}).then(function (json) {
  console.log(json);
  console.log(json.data.messages.length);
  console.log(json.data.messages[0].user);
  json.data.messages.forEach(function (element) {
    console.log(element.username);
    var message = "<ul class=\"message__container message--sent\">\n                        <li class=\"message__avatar\"></li>\n                        <li class=\"message__user\">".concat(element.username, "</li>\n                        <li>\n                        <p>").concat(element.message, "</p>\n                        </li>\n                        </ul>");
    document.querySelector(".messages__flex").insertAdjacentHTML('beforeend', message);
  });
})["catch"](function (err) {
  console.log(err);
});
/*const load = (req, res, next) => {
    fetch('http://localhost:3000/api/v1/messages', {
        method: "get",
        "headers": {
            "Content-Type": 'application/json',
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
    }).then(result => {
        return result.json();
    }).then(json => {
        //console.log(json);
        for (var i = 0; i < json.length; i++) {
            let message = `<ul class="message__container message--sent">
                        <li class="message__avatar"></li>
                        <li class="message__user">${json.data.message.user}</li>
                        <li>
                        <p>${json.data.message.message}</p>
                        </li>
                        </ul>`;
            document.querySelector(".loadedMessages").insertAdjacentHTML('beforeend', message);

        }

    }).catch(err =>{
        console.log
    })


}

load();*/