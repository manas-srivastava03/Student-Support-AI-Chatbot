import Navbar from '../components/Navbar'
import WelcomeSection from "../components/WelcomeSection";
import MessageInput from '../components/MessageInput'
import ChatWindow from "../components/ChatWindow";

function Home() {
  return (
    // Full-page wrapper: stacks navbar + content vertically
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* 1. Navbar fixed at the top of the page */}
      <Navbar />

      {/* 2. Centered content area with responsive padding and max width */}
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 px-4 py-6 sm:gap-6 sm:px-6 sm:py-8 lg:px-8">
        {/* Placeholder for WelcomeCard component (coming soon) */}
        <WelcomeSection />

        {/* Placeholder for ChatWindow component (coming soon) */}
        <ChatWindow />
        {/* flex-1 lets this section grow to fill available space */}
        <div aria-label="Chat window placeholder" className="flex-1" />

        {/* Placeholder for MessageInput component (coming soon) */}
        <MessageInput />
      </main>
    </div>
  )
}

export default Home
