const wsUrl = "wss://echo.websocket.org/";

const output = document.querySelector(".chat");
const btnSend = document.querySelector(".j-btn-send");
const btnGeo = document.querySelector(".j-btn-geolocation");
output.innerHTML = "";
let websocket;
let message;
let closeSend = false;
let n = 1;

// Функция работы с WebSocket и обработчики событий
function testWebSocket() {
  websocket = new WebSocket(wsUrl);
  websocket.onopen = function (event) {
    onOpen(event);
  };
  websocket.onclose = function (event) {
    onClose(event);
  };
  websocket.onmessage = function (event) {
    setTimeout(onMessage, 1000, event);
  };
  websocket.onerror = function (event) {
    onError(event);
  };
}

function onOpen(event) {
  console.log("CONNECTED");
}

function onClose(event) {
  console.log("DISCONNECTED");

  closeSend = true;
}

function onMessage(event) {
  console.log("RESPONSE: " + event.data);
  output.innerHTML += `<p class="output">${event.data}</p>`;
}

function onError(event) {
  console.log("ERROR: " + event.data);
}

const error = () => {
  console.log("Разрешите получать ваше местоположение");
};

const success = (position) => {
  console.log("position", position);
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  output.innerHTML += `<p class="output" style="word-wrap: break-word;">Ссылка на карту:
   https://www.openstreetmap.org/#map=18/${latitude}/${longitude}</p>`;
  if (n > 3) {
    message = document.querySelectorAll(".output")[2 * n - 8];
    message.style = "display:none";
    message = document.querySelectorAll(".output")[2 * n - 7];
    message.style = "display:none";
  }
  websocket.close();
};

btnSend.addEventListener("click", () => {
  message = document.querySelector("input").value;
  if (closeSend) {
    return;
  }
  if (message == "") {
    return;
  }
  output.innerHTML += `<p class="output">${message}</p>`;
  websocket.send(message);
  if (n > 3) {
    message = document.querySelectorAll(".output")[2 * n - 8];
    message.style = "display:none";
    message = document.querySelectorAll(".output")[2 * n - 7];
    message.style = "display:none";
  }
  n++;
});

btnGeo.addEventListener("click", () => {
  if (closeSend) {
    return;
  }
  if (!navigator.geolocation) {
    console.log("Geolocation не поддерживается вашим браузером");
  } else {
    console.log("Определение местоположения…");
    navigator.geolocation.getCurrentPosition(success, error);
  }
});

window.addEventListener("load", testWebSocket, false);
