"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FundCard from "./FundCard";
import { ArrowRight, ChevronLeft, ChevronRight } from "./Icons";

const getPageSize = () => {
  if (typeof window === "undefined") return 8;
  const w = window.innerWidth;
  if (w >= 1400) return 8;
  if (w >= 1200) return 8;
  if (w >= 1010) return 6;
  if (w >= 750)  return 4;
  return 2;
};

const DisplayCampaigns = ({ title, isLoading, campaigns = [] }) => {
  const router = useRouter();
  const [startIndex, setStartIndex] = useState(0);
  const [pageSize, setPageSize] = useState(8);

  useEffect(() => {
    setPageSize(getPageSize());
    const handler = () => setPageSize(getPageSize());
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const displayed = campaigns.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(campaigns.length / pageSize);
  const currentPage = Math.floor(startIndex / pageSize);

  const handleNavigate = (campaign) =>
    router.push(`/campaign-details/${campaign.pId}`);

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-manrope font-bold text-2xl text-gray-900 dark:text-white">{title}</h2>
        <button
          className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 font-semibold text-sm transition-colors group"
          onClick={() => router.push("/explore-projects")}
        >
          View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-6 w-full">
        {isLoading ? (
          <div className="flex items-center justify-center w-full py-20">
            <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
          </div>
        ) : campaigns.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full py-20">
            <p className="font-semibold text-lg text-gray-700 dark:text-gray-300 mb-2">No campaigns yet</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Be the first to create a campaign!</p>
          </div>
        ) : (
          displayed.map((campaign, idx) => (
            <div key={`${campaign.pId}-${idx}`} className={`animate-slideInUp delay-${Math.min((idx % 4) * 100 + 100, 500)}`}>
              <FundCard {...campaign} handleClick={() => handleNavigate(campaign)} />
            </div>
          ))
        )}
      </div>

      {campaigns.length > 0 && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          <button
            onClick={() => setStartIndex((p) => Math.max(0, p - pageSize))}
            disabled={startIndex === 0}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full font-medium text-sm transition-smooth disabled:opacity-40 bg-white dark:bg-dark-800 text-gray-700 dark:text-gray-300 hover:bg-primary-50 shadow-sm hover:shadow-md"
          >
            <ChevronLeft className="w-3 h-3" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          {Array.from({ length: totalPages }, (_, i) => {
            if (i !== 0 && i !== totalPages - 1 && Math.abs(i - currentPage) > 1) {
              if ((i === 1 && currentPage > 2) || (i === totalPages - 2 && currentPage < totalPages - 3))
                return <span key={i} className="px-2 text-gray-400">...</span>;
              return null;
            }
            return (
              <button
                key={i}
                onClick={() => setStartIndex(i * pageSize)}
                className={`w-10 h-10 rounded-full font-medium text-sm transition-smooth ${
                  i === currentPage
                    ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-primary"
                    : "bg-white dark:bg-dark-800 text-gray-700 dark:text-gray-300 hover:bg-primary-50 shadow-sm"
                }`}
              >
                {i + 1}
              </button>
            );
          })}

          <button
            onClick={() => setStartIndex((p) => Math.min((totalPages - 1) * pageSize, p + pageSize))}
            disabled={startIndex + pageSize >= campaigns.length}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full font-medium text-sm transition-smooth disabled:opacity-40 bg-white dark:bg-dark-800 text-gray-700 dark:text-gray-300 hover:bg-primary-50 shadow-sm hover:shadow-md"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      )}

      {campaigns.length > 0 && (
        <p className="text-center mt-4 text-sm text-gray-500 dark:text-gray-400">
          Showing <b>{startIndex + 1}</b>–<b>{Math.min(startIndex + pageSize, campaigns.length)}</b> of <b>{campaigns.length}</b>
        </p>
      )}
    </div>
  );
};

export default DisplayCampaigns;
