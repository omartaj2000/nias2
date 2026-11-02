"use client";

import Link from "next/link";

const BacktheProject = () => (
  <div className="flex flex-col md:flex-row items-center justify-center my-20 px-4 bg-white dark:bg-[#1c1c24] py-10 rounded-2xl">
    {/* Left image */}
    <div className="w-full md:w-1/4 flex justify-center mb-6 md:mb-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/game.png" alt="Back the project" className="w-64 h-[25rem] object-contain" />
    </div>

    {/* Text */}
    <div className="w-full md:w-1/2 md:px-8 text-center md:text-left">
      <h2 className="text-3xl font-semibold mb-6">Back the Project, take the ride</h2>
      <p className="text-justify text-md text-gray-700 dark:text-gray-300 leading-relaxed">
        This platform is your destination for clever innovation in tech, design and more — often
        with special perks and pricing for early adopters. Back a campaign, share your ideas and
        feedback with the project team, and join the rewards of bringing new products to life.
      </p>
      <Link
        href="/what-we-do"
        className="mt-6 inline-block text-sm font-semibold tracking-wider text-[#8c6dfd] hover:text-[#7868b3] transition-colors"
      >
        LEARN ABOUT CROWDFUNDING →
      </Link>
    </div>

    {/* Right image */}
    <div className="w-full md:w-1/4 flex justify-center md:justify-end mt-6 md:mt-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/cycle.png" alt="Cycle" className="w-64 h-[25rem] object-contain" />
    </div>
  </div>
);

export default BacktheProject;
