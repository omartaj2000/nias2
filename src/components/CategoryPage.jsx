"use client";

import { useState, useEffect } from "react";
import { useStateContext } from "@/context";
import { AllCampaigns, Loader } from "@/components";
import { filterExcludedCampaigns } from "@/utils/campaignFilters";

/**
 * Reusable category page shell.
 * @param {string} title       - Page heading
 * @param {string|string[]} categories - Contract category value(s) to filter by
 */
export default function CategoryPage({ title, categories }) {
  const { contract, getCampaigns } = useStateContext();
  const [isLoading, setIsLoading] = useState(true);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    if (!contract) return;
    (async () => {
      setIsLoading(true);
      const data = await getCampaigns();
      const cats = Array.isArray(categories) ? categories : [categories];
      const filtered = filterExcludedCampaigns(data ?? []).filter((c) =>
        cats.some((cat) => c.category?.toLowerCase() === cat.toLowerCase())
      );
      setCampaigns(filtered);
      setIsLoading(false);
    })();
  }, [contract]);

  if (isLoading) return <Loader />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">{title}</h1>
      {campaigns.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 py-16">No campaigns found in this category.</p>
      ) : (
        <AllCampaigns campaigns={campaigns} />
      )}
    </div>
  );
}
