import Link from "next/link";

const STEPS = [
  { n: "01", title: "Create Your Campaign", desc: "Fill in your campaign details — title, story, goal, deadline, and images. Use Markdown for rich formatting in your story.", href: "/create-campaign", cta: "Start Campaign" },
  { n: "02", title: "Upload Images via IPFS", desc: "Drag and drop your campaign images. They're stored on IPFS via Thirdweb Storage — decentralised and permanent.", href: "/create-campaign", cta: "Upload Images" },
  { n: "03", title: "Set Funding Packages", desc: "Offer tiered backing packages with custom ETH amounts and discount percentages to incentivise early backers.", href: "/create-campaign", cta: "Add Packages" },
  { n: "04", title: "Go Live & Promote", desc: "Once submitted, your campaign is live on-chain. Share your campaign URL with your network to start raising funds.", href: "/", cta: "View Campaigns" },
  { n: "05", title: "Withdraw Your Funds", desc: "When your campaign goal is met or end date passes, use the Withdraw page to claim your ETH directly to your wallet.", href: "/withdraw", cta: "Go to Withdraw" },
];

export default function CampaignNextStep() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-4">Campaign Next Steps</h1>
      <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-16 max-w-2xl mx-auto">
        Your complete guide to launching, running, and completing a successful campaign on our platform.
      </p>

      <div className="space-y-6">
        {STEPS.map(({ n, title, desc, href, cta }) => (
          <div key={n} className="flex gap-6 bg-white dark:bg-[#1c1c24] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 hover:-translate-y-0.5 transition-transform">
            <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-lg">
              {n}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-xl mb-2">{title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{desc}</p>
              <Link href={href} className="text-[#8c6dfd] font-semibold hover:underline text-sm">
                {cta} →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
