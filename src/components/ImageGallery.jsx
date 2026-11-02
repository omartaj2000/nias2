"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "./Icons";

const CARDS = [
  { label: "10 Cool & Clever Finds", gradient: "from-primary-500 to-secondary-500",   route: "/top-finds" },
  { label: "Non Profit",             gradient: "from-secondary-500 to-accent-500",     route: "/competition" },
  { label: "What We Do",             gradient: "from-accent-500 to-success-500",       route: "/what-we-do" },
  { label: "Memorial",               gradient: "from-success-500 to-primary-500",      route: "/memorial" },
];

const ImageGallery = () => {
  const router = useRouter();
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-manrope font-bold text-gray-900 dark:text-white mb-6">
          Discover First on{" "}
          <span className="gradient-text">this platform</span>
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          Where early adopters and innovation seekers discover groundbreaking projects before they hit the mainstream.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {CARDS.map(({ label, gradient, route }) => (
          <div
            key={label}
            className={`group relative overflow-hidden rounded-3xl cursor-pointer h-72 hover-lift bg-gradient-to-br ${gradient}`}
            onClick={() => router.push(route)}
          >
            <div className="absolute inset-0 opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <h3 className="font-manrope font-bold text-3xl md:text-4xl text-white mb-4">
                {label}
              </h3>
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                <ArrowRight className="w-6 h-6 text-white -rotate-45" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
