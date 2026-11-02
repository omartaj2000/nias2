"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStateContext } from "@/context";
import FundCard from "@/components/FundCard";
import { filterExcludedCampaigns } from "@/utils/campaignFilters";

export default function ExploreProjects() {
  const { contract, getCampaigns } = useStateContext();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [campaigns, setCampaigns] = useState([]);
  const [selected, setSelected] = useState("All");

  const CATEGORIES = ["All","Education","Technology","Social Impact","Health & Fitness","Arts & Culture","Travel","Memorial","Competition","Prototyping","Creative Services","Fulfillment"];

  useEffect(() => {
    if (!contract) return;
    (async () => {
      setIsLoading(true);
      const data = await getCampaigns();
      setCampaigns(filterExcludedCampaigns(data ?? []));
      setIsLoading(false);
    })();
  }, [contract]);

  const filtered = selected === "All" ? campaigns : campaigns.filter((c) => c.category?.toLowerCase().includes(selected.toLowerCase()));

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Explore Projects</h1>

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-smooth ${
              selected === cat
                ? "bg-primary-500 text-white shadow-primary"
                : "bg-white dark:bg-dark-800 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 shadow-sm"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center">
          {filtered.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 py-16">No campaigns in this category yet.</p>
          ) : (
            filtered.map((c) => (
              <FundCard key={c.pId} {...c} handleClick={() => router.push(`/campaign-details/${c.pId}`)} />
            ))
          )}
        </div>
      )}
    </div>
  );
}
