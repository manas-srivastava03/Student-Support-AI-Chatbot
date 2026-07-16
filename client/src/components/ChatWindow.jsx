import { useEffect, useRef } from "react";

function ChatWindow({ messages, loading }) {
  // Reference to the bottom of the chat
  const messagesEndRef = useRef(null);

  // Auto-scroll whenever messages or loading changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <section className="flex h-[550px] flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        💬 Conversation
      </h2>

      {/* Scrollable chat area */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-3">

          {messages.length === 0 && !loading ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
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

          {/* Invisible element used for auto-scroll */}
          <div ref={messagesEndRef}></div>

        </div>
      </div>
    </section>
  );
}

export default ChatWindow;