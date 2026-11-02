"use client";
import { useRouter } from "next/navigation";

const HELP_ITEMS = [
  { icon: "🚀", title: "Getting Started", desc: "Learn how to create your first campaign and connect your wallet.", link: "/how-it-works" },
  { icon: "💰", title: "Payments & Fees", desc: "Understand how funds are collected and distributed via smart contracts.", link: "/payments" },
  { icon: "🛡️", title: "Trust & Safety", desc: "How we keep the platform safe for creators and backers.", link: "/trust-and-safety" },
  { icon: "⚖️", title: "Legal", desc: "Terms of use, privacy policy, and your rights on the platform.", link: "/legal-detail" },
  { icon: "📋", title: "Community Guidelines", desc: "What's allowed and what's not on this platform.", link: "/community-guidelines" },
  { icon: "🔧", title: "Technical Support", desc: "Having trouble connecting your wallet or uploading files? We can help.", link: "/contact" },
];

export default function HelpAndSupport() {
  const router = useRouter();
  return (
    <div>
      {/* Hero */}
      <div className="w-full bg-gradient-to-br from-primary-500 to-secondary-600 rounded-[15px] py-24 flex items-center justify-center mb-20">
        <h1 className="text-3xl lg:text-5xl font-bold text-white text-center px-8">How may we help you?</h1>
      </div>

      {/* Help cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {HELP_ITEMS.map(({ icon, title, desc, link }) => (
          <div
            key={title}
            onClick={() => router.push(link)}
            className="bg-white dark:bg-[#1c1c24] rounded-xl p-6 shadow-sm hover:shadow-md cursor-pointer hover:-translate-y-1 transition-all border border-gray-100 dark:border-gray-800"
          >
            <div className="text-4xl mb-4">{icon}</div>
            <h3 className="font-bold text-lg mb-2">{title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{desc}</p>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="w-full bg-gradient-to-br from-secondary-600 to-primary-500 rounded-[15px] py-20 flex flex-col items-center justify-center text-center px-8 mb-8">
        <h1 className="text-3xl font-bold text-white mb-6">Still can't find what you need?</h1>
        <button
          className="bg-white text-[#8c6dfd] font-semibold py-3 px-8 rounded-full hover:shadow-lg transition-all"
          onClick={() => router.push("/contact")}
        >
          CONTACT SUPPORT
        </button>
      </div>
    </div>
  );
}
