import Link from "next/link";

export default function WhatWeDo() {
  const features = [
    { icon: "⛓️", title: "Blockchain-Powered", desc: "Every campaign and donation is recorded on the Ethereum blockchain — fully transparent, fully verifiable." },
    { icon: "🔒", title: "Smart Contracts", desc: "Funds are governed by smart contracts. Creators receive 100% of what's raised — zero intermediary fees." },
    { icon: "🌍", title: "Global Reach", desc: "Anyone, anywhere can create or back a campaign. No geographic restrictions, no currency conversion headaches." },
    { icon: "🖼️", title: "IPFS Storage", desc: "Campaign images and files are stored on IPFS via Thirdweb — decentralised and censorship-resistant." },
    { icon: "💬", title: "Community Comments", desc: "Backers and creators can communicate directly on each campaign through our built-in comment system." },
    { icon: "📦", title: "Funding Packages", desc: "Creators can offer tiered funding packages with custom discount levels to reward early supporters." },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-center mb-4">What We Do</h1>
      <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-16 max-w-2xl mx-auto">
        This platform is redefining crowdfunding with blockchain technology. Here's what makes us different.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {features.map(({ icon, title, desc }) => (
          <div key={title} className="bg-white dark:bg-[#1c1c24] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 hover:-translate-y-1 transition-transform">
            <div className="text-4xl mb-4">{icon}</div>
            <h3 className="font-bold text-xl mb-2">{title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{desc}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Link href="/create-campaign" className="bg-[#8c6dfd] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#7868b3] transition-colors inline-block">
          Start Your Campaign Today
        </Link>
      </div>
    </div>
  );
}
