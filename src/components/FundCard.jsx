"use client";

import { daysLeft } from "@/utils";
import { getReplacementImage } from "@/utils/imageReplacer";

const FundCard = ({ owner, title, category, description, target, deadline, amountCollected, image, handleClick }) => {
  const remaining = daysLeft(deadline);
  const displayImage = getReplacementImage(title, Array.isArray(image) ? image[0] : image);

  return (
    <div
      className="w-full sm:max-w-[240px] rounded-[15px] bg-white dark:bg-[#1c1c24] cursor-pointer hover-dramatic transition-smooth overflow-hidden shadow-glow-multi"
      onClick={handleClick}
    >
      <div className="overflow-hidden rounded-t-[15px]">
        <img src={displayImage} alt={title} className="w-full h-[150px] object-cover hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="flex flex-col p-4">
        <div className="flex flex-row items-center mb-[18px]">
          <span className="ml-[2px] mt-[2px] font-medium text-[12px] text-[#808191] px-2 py-0.5 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-full">
            {category}
          </span>
        </div>
        <div className="block">
          <h3 className="font-semibold text-[16px] leading-[26px] truncate">{title}</h3>
          <p className="mt-[5px] font-normal text-[#808191] text-left leading-[18px] truncate">{description}</p>
        </div>
        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <h4 className="font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">{amountCollected}</h4>
            <p className="mt-[3px] font-normal text-[12px] leading-[18px] text-[#808191]">Raised of {target}</p>
          </div>
          <div className="flex flex-col">
            <h4 className="font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">{remaining}</h4>
            <p className="mt-[3px] font-normal text-[12px] leading-[18px] text-[#808191]">Days Left</p>
          </div>
        </div>
        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-primary-100 dark:bg-primary-900/30">
            <span className="text-xs font-bold text-primary-600">👤</span>
          </div>
          <p className="flex-1 font-normal text-[12px] text-[#808191] truncate">
            by <span className="text-[#b2b3bd]">{owner}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FundCard;
