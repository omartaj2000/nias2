"use client";

import CategoriesCards from "./CategoriesCards";

const CategoriesComponent = () => (
  <div className="flex flex-col items-center justify-center px-4 pb-10 mt-10">
    <h2 className="text-3xl font-semibold text-center mb-3">
      Which categories interest you?
    </h2>
    <p className="text-center text-gray-600 dark:text-gray-400 mb-2">
      Discover projects just for you and get great recommendations when you select your interests.
    </p>
    <p className="text-center text-gray-500 dark:text-gray-500 mb-6">
      Explore our top categories
    </p>
    <CategoriesCards />
  </div>
);

export default CategoriesComponent;
