import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import WelcomeSection from "../components/WelcomeSection";
import MessageInput from "../components/MessageInput";
import ChatWindow from "../components/ChatWindow";
import { sendMessage, getMessages, clearMessages } from "../api/chat";

function Home() {
  // Stores the current text inside the input box
  const [input, setInput] = useState("");

  // Stores all chat messages
  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);
  const [historyLoaded, setHistoryLoaded] = useState(false);

  // Load chat history when the app starts
  useEffect(() => {
    async function loadMessages() {
      try {
        const history = await getMessages();
        setMessages(history);
      } catch (error) {
        console.error("Failed to load chat history:", error);
      } finally {
        setHistoryLoaded(true);
      }
    }

    loadMessages();
  }, []);

  // Handles quick action buttons
  const handleSuggestionClick = (prompt) => {
    handleSend(prompt);
  };

  // Clears the current chat
  const handleNewChat = async () => {
    try {
      await clearMessages();
      setMessages([]);
    } catch (error) {
      console.error(error);
    }
  };

  // Sends a message to the backend
  const handleSend = async (customMessage = null) => {
    const messageToSend = customMessage ?? input;

    if (messageToSend.trim() === "") return;

    const userMessage = {
      sender: "user",
      text: messageToSend,
    };

    // Show user's message immediately
    setMessages((prev) => [...prev, userMessage]);

    // Clear the input field
    if (!customMessage) {
      setInput("");
    }

    setLoading(true);

    try {
      const aiReply = await sendMessage(messageToSend);

      const botMessage = {
        sender: "bot",
        text: aiReply,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "❌ Unable to contact the server.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar handleNewChat={handleNewChat} />

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 px-4 py-6 sm:gap-6 sm:px-6 sm:py-8 lg:px-8">
        {historyLoaded && messages.length === 0 && (
          <WelcomeSection onSuggestionClick={handleSuggestionClick} />
        )}

        <ChatWindow
          messages={messages}
          loading={loading}
        />

        <MessageInput
          input={input}
          setInput={setInput}
          handleSend={handleSend}
          loading={loading}
        />
      </main>
    </div>
  );
}

export default Home;