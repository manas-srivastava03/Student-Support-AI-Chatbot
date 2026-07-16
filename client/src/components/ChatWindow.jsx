function ChatWindow({ messages, loading }) {
  return (
    <section className="flex min-h-[350px] flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        💬 Conversation
      </h2>

      <div className="flex flex-1 flex-col gap-3 overflow-y-auto">

        {messages.length === 0 && !loading ? (
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <p className="text-gray-600">No messages yet.</p>
            <p className="mt-2 text-sm text-gray-500">
              Start by asking a question below.
            </p>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`max-w-[75%] rounded-xl px-4 py-2 ${
                  message.sender === "user"
                    ? "self-end bg-blue-600 text-white"
                    : "self-start bg-gray-200 text-gray-900"
                }`}
              >
                {message.text}
              </div>
            ))}

            {loading && (
              <div className="self-start rounded-xl bg-gray-200 px-4 py-2 text-gray-700 italic">
                🤖 Student Support AI is thinking...
              </div>
            )}
          </>
        )}

      </div>

    </section>
  );
}

export default ChatWindow;