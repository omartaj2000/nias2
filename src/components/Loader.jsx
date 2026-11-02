"use client";

const Loader = () => (
  <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center flex-col">
    <div className="w-[100px] h-[100px] border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
    <p className="mt-[20px] font-bold text-[20px] text-white text-center">
      Transaction is in progress<br />Please wait...
    </p>
  </div>
);

export default Loader;
