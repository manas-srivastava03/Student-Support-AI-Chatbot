function MessageInput({ input, setInput, handleSend }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-sm sm:p-4">
      <div className="flex items-center gap-2 sm:gap-3">

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          placeholder="Ask your question..."
          className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 sm:py-3 sm:text-base"
        />

        <button
          type="button"
          onClick={handleSend}
          className="shrink-0 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 sm:px-6 sm:py-3 sm:text-base"
        >
          Send
        </button>

      </div>
    </div>
  );
}

export default MessageInput;