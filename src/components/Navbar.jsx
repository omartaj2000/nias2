"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useStateContext } from "@/context";
import CustomButton from "./CustomButton";
import PlatformLogo from "./PlatformLogo";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { connect, address, getCampaigns } = useStateContext();

  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [suggestedCampaigns, setSuggestedCampaigns] = useState([]);
  const [allCampaigns, setAllCampaigns] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = () => {
    if (!searchInput.trim()) return;
    const q = encodeURIComponent(searchInput.trim());
    setSearchInput("");
    setSuggestedCampaigns([]);
    setShowSearch(false);
    router.push(`/search-campaigns?q=${q}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getCampaigns();
        setAllCampaigns(data || []);
      } catch (_) {}
    };
    fetch();
  }, []);

  useEffect(() => {
    setSearchInput("");
    setToggleDrawer(false);
  }, [pathname]);

  useEffect(() => {
    if (!searchInput) { setSuggestedCampaigns([]); return; }
    const q = searchInput.toLowerCase();
    setSuggestedCampaigns(
      allCampaigns.filter(
        (c) =>
          c.title?.toLowerCase().includes(q) ||
          c.category?.toLowerCase().includes(q)
      )
    );
  }, [searchInput, allCampaigns]);

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-dark-900 shadow-sm border-b border-gray-100 dark:border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 hover-scale-sm transition-smooth">
            <PlatformLogo showText />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-8">
            {[["Explore", "/"], ["Start Campaign", "/create-campaign"], ["How It Works", "/how-it-works"]].map(
              ([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-smooth hover-scale-sm"
                >
                  {label}
                </Link>
              )
            )}
          </div>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => setShowSearch((p) => !p)}
              className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-dark-800 transition-smooth"
              aria-label="Search"
            >
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {address ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-900/20 rounded-full">
                  <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {address.slice(0, 6)}…{address.slice(-4)}
                  </span>
                </div>
                <CustomButton
                  btnType="button"
                  title="Disconnect"
                  handleClick={() => { localStorage.clear(); sessionStorage.clear(); window.location.href = "/"; }}
                />
              </div>
            ) : (
              <CustomButton
                btnType="button"
                title="Connect Wallet"
                styles="bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold px-6 py-3 rounded-full hover:shadow-primary-lg transition-smooth hover-scale-sm"
                handleClick={() => {
                  if (typeof window !== "undefined" && window.ethereum?.isMetaMask) {
                    connect();
                  } else {
                    alert("MetaMask extension is not installed!");
                  }
                }}
              />
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors"
            onClick={() => setToggleDrawer((p) => !p)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {toggleDrawer ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop search overlay */}
      {showSearch && (
        <div className="hidden lg:block absolute top-full left-0 right-0 bg-white dark:bg-dark-900 border-b border-gray-200 dark:border-dark-800 shadow-lg animate-slideInUp">
          <div className="max-w-3xl mx-auto px-4 py-6">
            <div className="flex items-center gap-3 px-5 py-4 bg-gray-50 dark:bg-dark-800 rounded-2xl border border-gray-200 dark:border-dark-700 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-100 transition-all">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search for campaigns..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                className="flex-1 bg-transparent outline-none text-lg text-gray-700 dark:text-gray-200 placeholder:text-gray-400"
              />
              {searchInput && (
                <button onClick={handleSearch} className="px-6 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full text-sm font-semibold hover:shadow-primary transition-all">
                  Search
                </button>
              )}
            </div>

            {suggestedCampaigns.length > 0 && (
              <div className="mt-4 bg-white dark:bg-dark-800 rounded-2xl shadow-xl border border-gray-200 dark:border-dark-700 overflow-hidden">
                {suggestedCampaigns.slice(0, 6).map((campaign) => (
                  <div
                    key={campaign.pId}
                    className="p-4 hover:bg-primary-50 dark:hover:bg-primary-900/20 cursor-pointer transition-all border-b border-gray-100 dark:border-dark-700 last:border-0"
                    onClick={() => {
                      router.push(`/campaign-details/${campaign.pId}`);
                      setShowSearch(false);
                    }}
                  >
                    <p className="font-semibold text-gray-800 dark:text-white">{campaign.title}</p>
                    <span className="mt-1 px-2 py-0.5 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium">
                      {campaign.category}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile menu */}
      <div className={`lg:hidden absolute top-full left-0 right-0 bg-white dark:bg-dark-900 border-b border-gray-200 dark:border-dark-800 shadow-lg transition-all duration-300 ${toggleDrawer ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
        <div className="p-4 border-b border-gray-200 dark:border-dark-800">
          <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-dark-800 rounded-2xl">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-sm text-gray-700 dark:text-gray-200 placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="py-2">
          {[["Explore", "/"], ["Start Campaign", "/create-campaign"], ["How It Works", "/how-it-works"], ["My Profile", "/profile"]].map(
            ([label, href]) => (
              <Link key={href} href={href} className="block px-6 py-4 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 font-medium transition-colors">
                {label}
              </Link>
            )
          )}
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-dark-800">
          {address ? (
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 px-4 py-3 bg-primary-50 dark:bg-primary-900/20 rounded-full">
                <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{address.slice(0, 6)}…{address.slice(-4)}</span>
              </div>
              <CustomButton btnType="button" title="Disconnect Wallet" styles="w-full" handleClick={() => { localStorage.clear(); sessionStorage.clear(); window.location.href = "/"; }} />
            </div>
          ) : (
            <CustomButton
              btnType="button"
              title="Connect Wallet"
              styles="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold px-6 py-3 rounded-full"
              handleClick={() => {
                if (typeof window !== "undefined" && window.ethereum?.isMetaMask) connect();
                else alert("MetaMask extension is not installed!");
              }}
            />
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
