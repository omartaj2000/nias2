"use client";

import { useState, useEffect } from "react";
import { useStateContext } from "@/context";
import { AllCampaigns } from "@/components";
import { filterExcludedCampaigns } from "@/utils/campaignFilters";

export default function AllCampaignsPage() {
  const { contract, getCampaigns } = useStateContext();
  const [isLoading, setIsLoading] = useState(true);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    if (!contract) return;
    (async () => {
      setIsLoading(true);
      const data = await getCampaigns();
      setCampaigns(filterExcludedCampaigns(data ?? []));
      setIsLoading(false);
    })();
  }, [contract]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center py-8 text-gray-900 dark:text-white">All Campaigns</h1>
      <AllCampaigns isLoading={isLoading} campaigns={campaigns} />
    </div>
  );
}
