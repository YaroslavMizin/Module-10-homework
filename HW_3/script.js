const btn = document.querySelector(".btn");
const geo = document.querySelector(".geo");
const output = document.querySelector(".output");
let textInput = document.querySelector(".ipt");

const wsUrl = "wss://echo-ws-service.herokuapp.com";

let webSocket = new WebSocket(wsUrl);
let locationSocket = new WebSocket(wsUrl);

webSocket.onmessage = evt => {
    writeToScreenFromServer("Сервер: " + evt.data);
}

webSocket.onerror = () => {
    writeToScreenFromServer("Ошибка отправки сообщения");
}

locationSocket.onerror = () =>  {
    writeToScreenFromServer("Местоположение не получено");
}

btn.addEventListener("click", () => {
    let text = textInput.value;
    if (text !== "") {
        writeToScreenFromClient("Я: " + text);
        webSocket.send(text);
        document.querySelector(".ipt").value = "";
    } else return;
});

function writeToScreenFromClient(text) {
    let message = output.appendChild(document.createElement("div"));
    message.classList.add("message");
    message.innerHTML = text;
}

function writeToScreenFromServer(text) {
    let response = output.appendChild(document.createElement("div"));
    response.classList.add("message", "response");
    response.innerHTML = text;
}

geo.addEventListener("click", () => {
    let div = output.appendChild(document.createElement("div"));
    div.classList.add("message");
    if (!navigator.geolocation) {
        div.innterHTML = "Геолокация не поддерживается вашим браузером";
    } else {
        let location = div.appendChild(document.createElement("a"));
        location.classList.add("location")
        const success = (position) => {
            location.href = `https://www.openstreetmap.org/#map=18/${position.coords.latitude}/${position.coords.longitude}`;
            location.textContent = "Гео-локация";
            locationSocket.send(location);
        }
        const error = () => {
            location.textContent = "Невозможно получить ваше местоположение";
        }
        navigator.geolocation.getCurrentPosition(success, error);
    }
});