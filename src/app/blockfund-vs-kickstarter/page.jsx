export default function BlockFundVsKickstarter() {
  const rows = [
    ["Fees",              "0% — smart contract only",        "5% platform + 3–5% payment"],
    ["Fund Release",      "Automatic via smart contract",    "Manual, held by Kickstarter"],
    ["Transparency",      "On-chain, fully auditable",       "Opaque, centralised"],
    ["Geographic Limits", "None — global by default",        "Limited to select countries"],
    ["Currency",          "ETH (crypto-native)",             "Fiat only"],
    ["Ownership",         "Creator retains full control",    "Kickstarter can remove campaigns"],
    ["Refunds",           "Governed by smart contract logic","Handled by Kickstarter policy"],
    ["KYC Required",      "No — wallet-based identity",      "Yes — extensive verification"],
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-4">Blockchain vs Traditional Crowdfunding</h1>
      <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
        See how a blockchain-native crowdfunding platform compares to the traditional model.
      </p>
      <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#8c6dfd] text-white">
              <th className="px-6 py-4 font-semibold">Feature</th>
              <th className="px-6 py-4 font-semibold">⛓️ This Platform</th>
              <th className="px-6 py-4 font-semibold">Kickstarter</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([feature, ours, theirs], i) => (
              <tr key={feature} className={i % 2 === 0 ? "bg-white dark:bg-[#1c1c24]" : "bg-gray-50 dark:bg-[#252936]"}>
                <td className="px-6 py-4 font-semibold text-gray-800 dark:text-gray-200">{feature}</td>
                <td className="px-6 py-4 text-green-600 dark:text-green-400 font-medium">{ours}</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{theirs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
