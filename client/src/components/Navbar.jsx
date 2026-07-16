function Navbar() {
  return (
    <nav className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6 lg:px-8">
      <span className="truncate text-base font-semibold text-gray-900 sm:text-lg">
        🎓 Student Support AI
      </span>

      <div className="flex shrink-0 items-center gap-2">
        <span
          className="h-2 w-2 rounded-full bg-green-500"
          aria-hidden="true"
        />
        <span className="text-sm text-gray-600">Online</span>
      </div>
    </nav>
  )
}

export default Navbar
