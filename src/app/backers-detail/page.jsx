"use client";
import { useState, useEffect } from "react";
import { useStateContext } from "@/context";
import { filterExcludedCampaigns } from "@/utils/campaignFilters";

export default function BackersDetail() {
  const { contract, getCampaigns, getDonations, address } = useStateContext();
  const [stats, setStats] = useState({ backed: 0, total: 0, eth: "0" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!contract || !address) { setIsLoading(false); return; }
    (async () => {
      setIsLoading(true);
      const campaigns = filterExcludedCampaigns(await getCampaigns());
      let backed = 0;
      let totalEth = 0;
      for (const c of campaigns) {
        const donations = await getDonations(c.pId);
        const mine = donations.filter((d) => d.donator.toLowerCase() === address.toLowerCase());
        if (mine.length) {
          backed++;
          mine.forEach((d) => { totalEth += parseFloat(d.donation); });
        }
      }
      setStats({ backed, total: campaigns.length, eth: totalEth.toFixed(4) });
      setIsLoading(false);
    })();
  }, [contract, address]);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-4">Your Backer Profile</h1>
      <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-12">
        A summary of your activity as a backer on this platform.
      </p>

      {!address ? (
        <p className="text-center text-gray-500 dark:text-gray-400 py-16 text-lg">
          Connect your wallet to see your backer stats.
        </p>
      ) : isLoading ? (
        <div className="flex justify-center py-16">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { label: "Campaigns Backed", value: stats.backed },
            { label: "Total Campaigns", value: stats.total },
            { label: "Total ETH Donated", value: `${stats.eth} ETH` },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white dark:bg-[#1c1c24] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 text-center">
              <p className="text-4xl font-bold text-[#8c6dfd] mb-2">{value}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
