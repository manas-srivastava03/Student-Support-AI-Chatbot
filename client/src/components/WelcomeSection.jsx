const features = [
  {
    icon: "📚",
    label: "Admissions",
    prompt: "What is the admission process and what documents are required?",
  },
  {
    icon: "💰",
    label: "Fee Structure",
    prompt: "Explain the fee structure for students.",
  },
  {
    icon: "📝",
    label: "Examinations",
    prompt: "Tell me about examination rules, schedules, and grading.",
  },
  {
    icon: "🎓",
    label: "Scholarships",
    prompt: "What scholarships are available and who is eligible?",
  },
];

function WelcomeSection({ onSuggestionClick }) {
  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 text-center sm:mb-8">
        <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
          🎓 Welcome to Student Support AI
        </h2>

        <p className="mt-2 text-sm text-gray-600 sm:text-base">
          Choose a topic below or ask your own question.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        {features.map((feature) => (
          <button
            key={feature.label}
            type="button"
            onClick={() => onSuggestionClick(feature.prompt)}
            className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-left transition-all hover:bg-blue-50 hover:border-blue-300"
          >
            <span className="text-2xl">{feature.icon}</span>

            <span className="text-sm font-medium text-gray-800 sm:text-base">
              {feature.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default WelcomeSection;