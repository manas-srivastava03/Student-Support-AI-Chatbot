// List of topics the chatbot can help with
const features = [
  { icon: '📚', label: 'Admissions' },
  { icon: '💰', label: 'Fee Structure' },
  { icon: '📝', label: 'Examinations' },
  { icon: '🎓', label: 'Scholarships' },
]

function WelcomeSection() {
  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
      {/* Welcome heading and description */}
      <div className="mb-6 text-center sm:mb-8">
        <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
          🎓 Welcome to Student Support AI
        </h2>
        <p className="mt-2 text-sm text-gray-600 sm:text-base">
          I can answer questions related to your college.
        </p>
      </div>

      {/* Responsive grid of feature cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        {features.map((feature) => (
          <div
            key={feature.label}
            className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 transition-colors hover:bg-gray-100"
          >
            <span className="text-2xl" aria-hidden="true">
              {feature.icon}
            </span>
            <span className="text-sm font-medium text-gray-800 sm:text-base">
              {feature.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default WelcomeSection
