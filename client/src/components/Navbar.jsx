function Navbar({ handleNewChat }) {
  return (
    <nav className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6 lg:px-8">

      <span className="truncate text-base font-semibold text-gray-900 sm:text-lg">
        🎓 Student Support AI
      </span>

      <div className="flex items-center gap-4">

        <button
          onClick={handleNewChat}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          + New Chat
        </button>

        <div className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full bg-green-500"
            aria-hidden="true"
          />
          <span className="text-sm text-gray-600">Online</span>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;