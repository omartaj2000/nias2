export default function TrustAndSafety() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-4">Trust &amp; Safety</h1>
      <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-12">
        At this platform, trust is the foundation of everything we build.
      </p>
      {[
        { title: "Blockchain Transparency", body: "Every transaction on this platform is recorded on the Ethereum blockchain. This means all fund movements are publicly auditable, immutable, and tamper-proof — no hidden fees, no redirected funds." },
        { title: "Smart Contract Security", body: "Funds are held and distributed by audited smart contracts, not by platform staff. This eliminates the risk of internal mismanagement and ensures creators receive exactly what was pledged." },
        { title: "Campaign Verification", body: "We review campaigns before they go live to check for accuracy and compliance with our community guidelines. Campaigns that violate our policies are removed." },
        { title: "Backer Protection", body: "If a campaign you backed is removed for fraud or policy violations, we will make every effort to assist with recovery through our dispute resolution process." },
        { title: "Data Security", body: "We use industry-standard encryption to protect your data. We never sell your personal information to third parties. Your wallet address is the only identifier linked to on-chain activity." },
        { title: "Report an Issue", body: "If you believe a campaign is fraudulent or a user is violating our guidelines, please contact our support team immediately. We investigate all reports seriously." },
      ].map(({ title, body }) => (
        <section key={title} className="mb-8 bg-white dark:bg-[#1c1c24] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
          <h2 className="text-xl font-bold mb-3 text-[#8c6dfd]">{title}</h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg">{body}</p>
        </section>
      ))}
    </div>
  );
}
