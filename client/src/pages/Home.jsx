import { useState } from "react";
import Navbar from "../components/Navbar";
import WelcomeSection from "../components/WelcomeSection";
import MessageInput from "../components/MessageInput";
import ChatWindow from "../components/ChatWindow";
import { sendMessage } from "../api/chat";

function Home() {
  // Stores the current text inside the input box
  const [input, setInput] = useState("");

  // Stores all chat messages
  const [messages, setMessages] = useState([]);

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
  
    try {
      // Send message to FastAPI
      const aiReply = await sendMessage(currentMessage);
  
      // Store AI response
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
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 px-4 py-6 sm:gap-6 sm:px-6 sm:py-8 lg:px-8">

        <WelcomeSection />

        <ChatWindow messages={messages} />

        <MessageInput
          input={input}
          setInput={setInput}
          handleSend={handleSend}
        />

      </main>
    </div>
  );
}

export default Home;