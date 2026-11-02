"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "./Icons";
import { useStateContext } from "@/context";
import { getReplacementImage } from "@/utils/imageReplacer";

const Carousel = ({ autoPlayInterval = 5000 }) => {
  const { contract, getCampaigns } = useStateContext();
  const [isLoading, setIsLoading] = useState(true);
  const [campaigns, setCampaigns] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!contract) return;
    let cancelled = false;
    (async () => {
      setIsLoading(true);
      try {
        const data = await getCampaigns();
        if (!cancelled) setCampaigns(data || []);
      } catch (err) {
        console.warn("Carousel: failed to load campaigns", err);
        if (!cancelled) setCampaigns([]);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [contract, getCampaigns]);

  const handleNext = useCallback(() => {
    setCurrent((c) => (c + 1) % campaigns.length);
  }, [campaigns.length]);

  const handlePrev = useCallback(() => {
    setCurrent((c) => (c - 1 + campaigns.length) % campaigns.length);
  }, [campaigns.length]);

  useEffect(() => {
    if (campaigns.length === 0) return;
    const id = setInterval(handleNext, autoPlayInterval);
    return () => clearInterval(id);
  }, [handleNext, autoPlayInterval, campaigns.length]);

  if (isLoading) {
    return (
      <div className="w-full lg:h-[35rem] md:h-[28rem] h-[22rem] bg-gray-100 dark:bg-dark-800 rounded-2xl animate-pulse flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (campaigns.length === 0) return null;

  const camp = campaigns[current];
  const images = Array.isArray(camp.image) ? camp.image : [camp.image];
  const displayImage = getReplacementImage(camp.title, images[0]);

  const snippet = (text = "", max = 200) =>
    text.length > max ? text.slice(0, max) + "…" : text;

  return (
    <div className="relative w-full lg:h-[35rem] md:h-[28rem] h-[22rem] mb-10 rounded-2xl overflow-hidden">
      {/* Image */}
      <img
        src={displayImage}
        alt={camp.title}
        className="w-full h-full object-cover transition-all duration-700"
      />

      {/* Overlay text */}
      <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-8 bg-gradient-to-t from-black/60 to-transparent">
        <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 max-w-2xl">
          <h3 className="font-bold text-xl md:text-2xl lg:text-3xl text-white truncate">
            {camp.title}
          </h3>
          <p className="text-white/90 text-sm md:text-base mt-1 line-clamp-2">
            {snippet(camp.description, 160)}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        <button
          aria-label="Previous"
          onClick={handlePrev}
          className="p-2.5 bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm rounded-full hover:scale-110 transition-transform shadow"
        >
          <ChevronLeft className="w-4 h-4 text-gray-700 dark:text-white" />
        </button>
        <button
          aria-label="Next"
          onClick={handleNext}
          className="p-2.5 bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm rounded-full hover:scale-110 transition-transform shadow"
        >
          <ChevronRight className="w-4 h-4 text-gray-700 dark:text-white" />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
        {campaigns.slice(0, 8).map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current
                ? "bg-white w-5"
                : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
