const ws = new WebSocket("ws://localhost:3000");

const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message-input");

ws.onmessage = (event) => {
  if (event.data instanceof Blob) {
    const reader = new FileReader();
    reader.onload = () => {
      const message = reader.result;
      displayMessage(message, "received");
    };
    reader.readAsText(event.data);
  } else {
    const message = event.data;
    displayMessage(message, "received");
  }
  scrollToBottom();
};

function sendMessage() {
  const message = messageInput.value.trim();
  if (message) {
    ws.send(message);
    displayMessage(`You: ${message}`, "sent");
    messageInput.value = "";
    scrollToBottom();
  }
}

function displayMessage(content, type = "system") {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", type);
  messageElement.innerText = content;
  chatBox.appendChild(messageElement);
}

function scrollToBottom() {
  chatBox.scrollTop = chatBox.scrollHeight;
}

ws.onerror = (error) => {
  console.error("WebSocket Error:", error);
  displayMessage("⚠️ Connection error occurred.", "system");
};

ws.onclose = () => {
  displayMessage("🔌 Connection closed.", "system");
};
