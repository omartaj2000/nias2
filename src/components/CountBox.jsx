"use client";

const CountBox = ({ title, value }) => (
  <div className="flex flex-col items-center w-[150px]">
    <h4 className="font-bold text-[30px] bg-white dark:bg-[#1c1c24] p-3 rounded-t-[10px] w-full text-center truncate">
      {value}
    </h4>
    <p className="font-normal text-[16px] text-white bg-[#8c6dfd] rounded-lg px-3 py-2 w-full text-center">
      {title}
    </p>
  </div>
);

export default CountBox;
