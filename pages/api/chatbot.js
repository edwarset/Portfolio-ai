const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userMessage = input.value.trim();
  if (!userMessage) return;

  addMessage("You", userMessage, "text-end");
  input.value = "";

  addMessage("AI Bot", "Thinking...", "text-start");

  try {
    const response = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await response.json();
    chatBox.lastChild.innerHTML = `<strong>AI Bot:</strong> ${data.reply}`;
  } catch (err) {
    chatBox.lastChild.innerHTML = `<strong>AI Bot:</strong> Error connecting to server.`;
  }

  chatBox.scrollTop = chatBox.scrollHeight;
});

function addMessage(sender, message, alignClass) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("my-2", alignClass);
  msgDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatBox.appendChild(msgDiv);
}
