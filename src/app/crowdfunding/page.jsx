import Link from "next/link";

export default function Crowdfunding() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-4">What is Crowdfunding?</h1>
      <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
        A beginner-friendly guide to crowdfunding — and how blockchain makes it better.
      </p>
      {[
        { title: "The Basics", body: "Crowdfunding is the practice of funding a project or venture by raising small amounts of money from a large number of people, typically via the internet. It's used by entrepreneurs, artists, nonprofits, and individuals to bring ideas to life without relying on traditional bank loans or venture capital." },
        { title: "Types of Crowdfunding", body: "There are four main types: Reward-based (backers receive a product or perk), Donation-based (no return expected), Equity-based (backers receive shares), and Debt-based (loan repaid with interest). This platform primarily supports reward-based and donation-based crowdfunding." },
        { title: "Why Blockchain Changes Everything", body: "Traditional crowdfunding platforms take 5–10% in fees, restrict access to certain countries, and hold funds in a centralised account. This platform uses Ethereum smart contracts to eliminate fees, enable global participation, and ensure funds go directly to creators — fully transparently." },
        { title: "Is It Right for Me?", body: "If you have a project that needs community support, a product you want to validate before manufacturing, or a cause you want to champion — crowdfunding is for you. This platform is ideal for anyone comfortable with Web3 wallets or willing to learn." },
      ].map(({ title, body }) => (
        <section key={title} className="mb-8 bg-white dark:bg-[#1c1c24] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
          <h2 className="text-xl font-bold mb-3 text-[#8c6dfd]">{title}</h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">{body}</p>
        </section>
      ))}
      <div className="text-center mt-8">
        <Link href="/create-campaign" className="bg-[#8c6dfd] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#7868b3] transition-colors">
          Launch Your Campaign
        </Link>
      </div>
    </div>
  );
}
