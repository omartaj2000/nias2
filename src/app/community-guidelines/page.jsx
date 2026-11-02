export default function CommunityGuidelines() {
  const rules = [
    ["Be Respectful", "Treat all community members with respect. No harassment, hate speech, or personal attacks."],
    ["Be Honest", "Do not post false, misleading, or deceptive information. Represent your campaign accurately."],
    ["No Spam", "Do not post unsolicited promotional content, chain letters, or repetitive messages."],
    ["Protect Privacy", "Do not share private information about others without their consent."],
    ["Legal Content Only", "Do not post content that infringes on intellectual property rights or violates any law."],
    ["No Harmful Content", "Do not promote violence, illegal activities, or content harmful to minors."],
    ["Constructive Feedback", "Provide constructive criticism. Disagreements are fine — hostility is not."],
    ["Report Violations", "If you see something that violates these guidelines, please report it to our support team."],
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-4">Community Guidelines</h1>
      <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-12">
        This is a community built on trust and creativity. These guidelines help us keep it that way.
      </p>
      <div className="space-y-6">
        {rules.map(([title, desc]) => (
          <div key={title} className="bg-white dark:bg-[#1c1c24] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
            <h3 className="font-bold text-lg mb-2 text-[#8c6dfd]">{title}</h3>
            <p className="text-gray-700 dark:text-gray-300">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
