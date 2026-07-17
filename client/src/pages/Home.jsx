import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import WelcomeSection from "../components/WelcomeSection";
import MessageInput from "../components/MessageInput";
import ChatWindow from "../components/ChatWindow";
import { sendMessage, getMessages, clearMessages } from "../api/chat";

function Home() {
  const [input, setInput] = useState("");
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

  const handleSuggestionClick = (prompt) => {
    handleSend(prompt);
  };

  const handleNewChat = async () => {
    try {
      await clearMessages();
      setMessages([]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSend = async (customMessage = null) => {
    console.log("handleSend started");

    const messageToSend = customMessage ?? input;
    console.log("Message:", messageToSend);

    if (messageToSend.trim() === "") {
      console.log("Empty message");
      return;
    }

    console.log("Clearing input");

    const userMessage = {
      sender: "user",
      text: messageToSend,
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentMessage = messageToSend;

    if (!customMessage) {
      setInput("");
    }

    console.log("Setting loading");

    setLoading(true);

    try {
      console.log("Calling API");

      const aiReply = await sendMessage(currentMessage);

      console.log("API returned:", aiReply);

      setLoading(false);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: aiReply,
        },
      ]);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar handleNewChat={handleNewChat} />

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 px-4 py-6 sm:gap-6 sm:px-6 sm:py-8 lg:px-8">
        {historyLoaded && messages.length === 0 && (
          <WelcomeSection
            onSuggestionClick={handleSuggestionClick}
          />
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