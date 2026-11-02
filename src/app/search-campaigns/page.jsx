"use client";

import { Suspense } from "react";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useStateContext } from "@/context";
import { Loader } from "@/components";
import FundCard from "@/components/FundCard";
import { filterExcludedCampaigns } from "@/utils/campaignFilters";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const router = useRouter();
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

  const filtered = query
    ? campaigns.filter(
        (c) =>
          c.title?.toLowerCase().includes(query.toLowerCase()) ||
          c.category?.toLowerCase().includes(query.toLowerCase())
      )
    : campaigns;

  if (isLoading) return <Loader />;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-center mt-6 mb-12">
        {query ? `Search results for "${query}"` : "All Campaigns"}
      </h1>
      <div className="flex flex-wrap gap-8 justify-center">
        {filtered.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-lg py-16">No campaigns found.</p>
        ) : (
          filtered.map((c) => (
            <FundCard
              key={c.pId}
              {...c}
              handleClick={() => router.push(`/campaign-details/${c.pId}`)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default function SearchCampaigns() {
  return (
    <Suspense fallback={<Loader />}>
      <SearchResults />
    </Suspense>
  );
}
