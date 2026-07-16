function ChatWindow() {
  return (
    // Main chat container — grows on the page but stays at least 300px tall
    <section className="flex min-h-[300px] flex-1 flex-col rounded-2xl border border-gray-100 bg-white shadow-sm">
      {/* Empty state — centered placeholder when there are no messages */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-8 text-center sm:px-6">
        <p className="text-lg font-semibold text-gray-900 sm:text-xl">
          💬 Conversation
        </p>

        <p className="mt-3 text-sm text-gray-600 sm:text-base">
          No messages yet.
        </p>

        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
          Start by asking a question below.
        </p>
      </div>
    </section>
  )
}

export default ChatWindow
