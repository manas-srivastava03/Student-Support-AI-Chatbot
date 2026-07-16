function ChatWindow({ messages }) {
  return (
    <section className="flex min-h-[300px] flex-col rounded-2xl border border-gray-100 bg-white shadow-sm p-6">

      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        💬 Conversation
      </h2>

      {messages.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <p className="text-gray-600">No messages yet.</p>
          <p className="text-sm text-gray-500 mt-2">
            Start by asking a question below.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {messages.map((message, index) => (
            <div
              key={index}
              className="self-end max-w-[75%] rounded-xl bg-blue-600 px-4 py-2 text-white"
            >
              {message.text}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default ChatWindow;