import Link from "next/link";

const ARTICLES = [
  { title: "How to Write a Compelling Campaign Story", desc: "Learn how to craft a narrative that connects with backers and drives funding.", time: "5 min read" },
  { title: "Setting the Right Funding Goal", desc: "Understand how to calculate your target amount realistically.", time: "4 min read" },
  { title: "Promoting Your Campaign on Social Media", desc: "Tactics for reaching your network and beyond to find backers.", time: "6 min read" },
  { title: "What to Do After Your Campaign Ends", desc: "Fulfilling rewards, communicating with backers, and next steps.", time: "4 min read" },
  { title: "Understanding Smart Contracts", desc: "A plain-English guide to how blockchain governs your funds.", time: "7 min read" },
  { title: "Best Practices for Campaign Images and Video", desc: "Visual tips that make your campaign stand out.", time: "3 min read" },
];

export default function EducationCenter() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-4">Education Center</h1>
      <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-12">
        Everything you need to know to run a successful campaign on this platform.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ARTICLES.map(({ title, desc, time }) => (
          <div key={title} className="bg-white dark:bg-[#1c1c24] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 hover:-translate-y-1 transition-transform">
            <span className="text-xs font-medium text-primary-500 uppercase tracking-wider">{time}</span>
            <h3 className="font-bold text-lg mt-2 mb-2">{title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-16 text-center">
        <p className="text-gray-600 dark:text-gray-400 mb-4">Ready to put your knowledge into action?</p>
        <Link href="/create-campaign" className="bg-[#8c6dfd] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#7868b3] transition-colors">
          Start a Campaign
        </Link>
      </div>
    </div>
  );
}
