"use client";

import { useRouter } from "next/navigation";
import FundCard from "./FundCard";

const AllCampaigns = ({ isLoading, campaigns = [] }) => {
  const router = useRouter();
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap gap-8 justify-center">
        {isLoading ? (
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
        ) : campaigns.length === 0 ? (
          <p className="font-semibold text-sm text-[#818183]">No campaigns available.</p>
        ) : (
          campaigns.filter((c) => c.image).map((campaign) => (
            <FundCard
              key={campaign.pId}
              {...campaign}
              handleClick={() => router.push(`/campaign-details/${campaign.pId}`)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AllCampaigns;
