"use client";

import { useState, useEffect } from "react";
import { DisplayCampaigns } from "@/components";
import { useStateContext } from "@/context";
import { filterExcludedCampaigns } from "@/utils/campaignFilters";
import Carousel from "@/components/Carousel";
import ImageGallery from "@/components/ImageGallery";
import BacktheProject from "@/components/BacktheProject";
import CategoriesComponent from "@/components/CategoriesComponent";

export default function Home() {
  const { address, contract, getCampaigns } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    if (!contract) return;
    let cancelled = false;
    (async () => {
      setIsLoading(true);
      try {
        const data = await getCampaigns();
        if (!cancelled) setCampaigns(data || []);
      } catch (err) {
        console.warn("Home: failed to load campaigns", err);
        if (!cancelled) setCampaigns([]);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [address, contract, getCampaigns]);

  return (
    <>
      <Carousel />

      <DisplayCampaigns
        title="All Campaigns"
        isLoading={isLoading}
        campaigns={filterExcludedCampaigns(campaigns)}
      />

      <ImageGallery />

      <BacktheProject />

      <CategoriesComponent />
    </>
  );
}
