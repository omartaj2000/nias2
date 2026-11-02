export default function PaymentsDetail() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-4">Payments</h1>
      <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-12">
        Everything you need to know about how money moves on this platform.
      </p>
      {[
        { title: "How Payments Work", body: "This platform uses Ethereum smart contracts to handle all fund flows. When you back a campaign, your ETH is held in the smart contract until it is released to the campaign creator. There is no middleman." },
        { title: "Accepted Methods", body: "We accept payments via MetaMask and other Web3 wallets that support the Ethereum network (Sepolia testnet during development, Ethereum mainnet in production). Standard ERC-20 tokens may also be supported in future." },
        { title: "Fees", body: "This platform charges no platform fee. 100% of what you pledge goes to the campaign creator. You will only pay standard Ethereum gas fees determined by the network at the time of your transaction." },
        { title: "Withdrawals", body: "Campaign creators can withdraw funds once their campaign has reached its goal or end date, whichever comes first. Withdrawals are processed via the smart contract directly to the creator's wallet." },
        { title: "Refunds", body: "Because transactions are recorded on the blockchain, they cannot be reversed by the platform. If a campaign is cancelled or found to be fraudulent, please contact our support team and we will assist with any available remedies." },
      ].map(({ title, body }) => (
        <section key={title} className="mb-8 bg-white dark:bg-[#1c1c24] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
          <h2 className="text-xl font-bold mb-3 text-[#8c6dfd]">{title}</h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg">{body}</p>
        </section>
      ))}
    </div>
  );
}
