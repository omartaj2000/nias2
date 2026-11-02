"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStateContext } from "@/context";
import FundCard from "@/components/FundCard";
import { filterExcludedCampaigns } from "@/utils/campaignFilters";

export default function TopFinds() {
  const { contract, getCampaigns } = useStateContext();
  const router = useRouter();
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!contract) return;
    (async () => {
      setIsLoading(true);
      const data = await getCampaigns();
      const filtered = filterExcludedCampaigns(data ?? []);
      // Sort by amount collected descending → top finds
      const sorted = filtered.sort((a, b) => parseFloat(b.amountCollected) - parseFloat(a.amountCollected));
      setCampaigns(sorted.slice(0, 12));
      setIsLoading(false);
    })();
  }, [contract]);

  return (
    <div className="px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-4">Top Finds</h1>
      <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-12">
        The most-funded campaigns on this platform right now.
      </p>
      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center">
          {campaigns.map((c) => (
            <FundCard key={c.pId} {...c} handleClick={() => router.push(`/campaign-details/${c.pId}`)} />
          ))}
        </div>
      )}
    </div>
  );
}
