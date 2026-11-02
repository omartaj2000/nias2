export default function TrustOperationsDetail() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-4">Trust Operations</h1>
      <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-12">
        How the platform maintains the integrity of its operations.
      </p>
      {[
        { title: "Campaign Review", body: "All campaigns are reviewed before going live. Our team checks for compliance with community guidelines, accurate representation, and legal compliance." },
        { title: "Fraud Detection", body: "We use automated and manual processes to detect fraudulent campaigns. Suspicious campaigns are flagged, investigated, and removed if found to violate our policies." },
        { title: "On-Chain Verification", body: "All financial transactions are immutably recorded on the Ethereum blockchain, providing an auditable trail that cannot be altered by any party, including the platform." },
        { title: "Dispute Resolution", body: "If a dispute arises between a campaign creator and a backer, we offer mediation services. Our trust team investigates both sides before making a determination." },
        { title: "Account Actions", body: "Accounts found to be in violation of our terms may be warned, suspended, or permanently banned depending on the severity and frequency of the violation." },
      ].map(({ title, body }) => (
        <section key={title} className="mb-8 bg-white dark:bg-[#1c1c24] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
          <h2 className="text-xl font-bold mb-3 text-[#8c6dfd]">{title}</h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg">{body}</p>
        </section>
      ))}
    </div>
  );
}
