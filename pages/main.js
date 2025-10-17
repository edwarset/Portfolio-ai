document.getElementById("chat-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const userText = input.value.trim();

  if (!userText) return;

  // Display user's message safely
  const userDiv = document.createElement("div");
  userDiv.classList.add("text-end", "text-primary", "mb-2");
  userDiv.innerHTML = `<b>You:</b> ${escapeHtml(userText)}`;
  chatBox.appendChild(userDiv);

  input.value = "";
  input.focus();

  // Add loading message
  const loadingMsg = document.createElement("div");
  loadingMsg.classList.add("text-start", "text-muted", "mb-2");
  loadingMsg.innerHTML = `<b>AI:</b> Thinking...`;
  chatBox.appendChild(loadingMsg);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const res = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userText }),
    });

    const data = await res.json();
    const botReply = data.reply || "Sorry, I didn’t get that.";

    loadingMsg.innerHTML = `<b>AI:</b> ${escapeHtml(botReply)}`;
  } catch (err) {
    loadingMsg.innerHTML = `<b>AI:</b> ⚠️ Unable to connect to the AI server.`;
  }

  chatBox.scrollTop = chatBox.scrollHeight;
});

// Prevent potential XSS if AI sends HTML
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}
