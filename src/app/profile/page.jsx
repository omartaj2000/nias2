"use client";

import { useState, useEffect } from "react";
import { DisplayCampaigns } from "@/components";
import { useStateContext } from "@/context";
import { filterExcludedCampaigns } from "@/utils/campaignFilters";

export default function Profile() {
  const { address, contract, getUserCampaigns } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    if (!contract) return;
    (async () => {
      setIsLoading(true);
      const data = await getUserCampaigns();
      setCampaigns(filterExcludedCampaigns(data));
      setIsLoading(false);
    })();
  }, [address, contract]);

  return (
    <div className="flex flex-col p-2">
      <div className="flex flex-row flex-wrap p-2 space-x-2 m-2 gap-3">
        <div className="bg-white dark:bg-[#1c1c24] rounded-xl px-5 py-4 shadow-sm">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Your Address: <span className="font-bold text-sm break-all">{address || "Not connected"}</span>
          </p>
        </div>
        <div className="bg-white dark:bg-[#1c1c24] rounded-xl px-5 py-4 shadow-sm">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Campaigns Created: <span className="font-bold">{campaigns.length}</span>
          </p>
        </div>
      </div>
      <DisplayCampaigns title="Your Campaigns" isLoading={isLoading} campaigns={campaigns} />
    </div>
  );
}
