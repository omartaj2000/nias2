"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStateContext } from "@/context";
import { AllCampaigns } from "@/components";

export default function Withdraw() {
  const { address, contract, getUserCampaigns } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    if (!contract) return;
    (async () => {
      setIsLoading(true);
      const data = await getUserCampaigns();
      setCampaigns(data ?? []);
      setIsLoading(false);
    })();
  }, [address, contract]);

  const withdrawable = campaigns.filter(
    (c) => parseFloat(c.amountCollected) >= parseFloat(c.target)
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        Campaigns Ready to Withdraw
      </h1>
      {withdrawable.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 py-16">
          No campaigns have reached their goal yet.
        </p>
      ) : (
        <AllCampaigns isLoading={isLoading} campaigns={withdrawable} />
      )}
    </div>
  );
}
