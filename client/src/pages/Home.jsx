import { useState } from "react";
import Navbar from "../components/Navbar";
import WelcomeSection from "../components/WelcomeSection";
import MessageInput from "../components/MessageInput";
import ChatWindow from "../components/ChatWindow";

function Home() {
  // Stores the current text inside the input box
  const [input, setInput] = useState("");

  // Stores all chat messages
  const [messages, setMessages] = useState([]);

  // Runs when the user clicks Send
  const handleSend = () => {
    if (input.trim() === "") return;

    const newMessage = {
      sender: "user",
      text: input,
    };

    setMessages([...messages, newMessage]);

    // Clear the input box
    setInput("");
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