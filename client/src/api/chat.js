const API_BASE_URL = "https://student-support-ai-chatbot-backend.onrender.com";

export async function sendMessage(message, category) {
  const response = await fetch(`${API_BASE_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      category,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to contact server");
  }

  const data = await response.json();
  return data.reply;
}

export async function getMessages() {
  const response = await fetch(`${API_BASE_URL}/api/messages`);

  if (!response.ok) {
    throw new Error("Failed to fetch messages");
  }

  return response.json();
}

export async function clearMessages() {
  await fetch(`${API_BASE_URL}/api/messages`, {
    method: "DELETE",
  });
}