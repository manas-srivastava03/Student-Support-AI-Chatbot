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

  const handleNewChat = async () => {
    try {
      await clearMessages();
  
      setMessages([]);
    } catch (error) {
      console.error(error);
    }
  };

  // Runs when the user clicks Send
  const handleSend = async () => {
    if (input.trim() === "") return;

    // Store user's message
    const userMessage = {
      sender: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);

    // Save current input before clearing
    const currentMessage = input;

    // Clear input immediately
    setInput("");
    setLoading(true);

    try {
      // Send message to FastAPI
      const aiReply = await sendMessage(currentMessage);
      setLoading(false);

      // Store AI response
      const botMessage = {
        sender: "bot",
        text: aiReply,
      };

      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
      console.error(error);
      setLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "❌ Unable to contact the server.",
        },
      ]);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar handleNewChat={handleNewChat} />

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 px-4 py-6 sm:gap-6 sm:px-6 sm:py-8 lg:px-8">

      {historyLoaded && messages.length === 0 && <WelcomeSection />}

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