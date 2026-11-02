"use client";

/**
 * Generic platform logo — sunrise icon + no brand name.
 */
const G = "#2ea84b";

const PlatformLogo = ({ className = "", showText = true }) => (
  <div className={`inline-flex items-center gap-3 ${className}`}>
    {/* Sunrise icon */}
    <svg viewBox="0 0 50 40" width="48" height="38" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Dome */}
      <path d="M5 36 A20 20 0 0 1 45 36 Z" fill={G} />
      {/* 5 rays */}
      {[0, 33, -33, 62, -62].map((deg) => (
        <rect key={deg} x="22.5" y="5" width="5" height="14" rx="2.5" fill={G}
          transform={`rotate(${deg} 25 36)`} />
      ))}
    </svg>

    {showText && (
      <div className="flex flex-col leading-tight">
        <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
          Crowdfunding Platform
        </span>
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
          Community Crowdfunding
        </span>
      </div>
    )}
  </div>
);

export default PlatformLogo;
