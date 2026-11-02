"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useStateContext } from "@/context";
import { CountBox, Loader } from "@/components";
import { calculateBarPercentage, daysLeft } from "@/utils";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import ReactMarkdown from "react-markdown";
import { getReplacementImage } from "@/utils/imageReplacer";
import CommentSection from "@/components/CommentSection";
import TotalCampaignCreatedByUser from "@/components/TotalCampaignCreatedByUser";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TAB_KEYS = ["story", "donators", "faq", "comments", "contact"];

export default function CampaignDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { donate, payOutToCampaignTeam, getDonations, contract, address, deleteCampaign, getCampaigns } = useStateContext();

  const [campaign, setCampaign] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [amount, setAmount] = useState("");
  const [donators, setDonators] = useState([]);
  const [activeTab, setActiveTab] = useState("story");
  const [fundTab, setFundTab] = useState("donate");

  useEffect(() => {
    if (!contract) return;
    (async () => {
      const all = await getCampaigns();
      const found = all.find((c) => String(c.pId) === String(id));
      setCampaign(found ?? null);
      setIsLoading(false);
      if (found) {
        const d = await getDonations(found.pId);
        setDonators(d);
      }
    })();
  }, [contract, address, id]);

  if (isLoading) return <Loader />;
  if (!campaign) return <p className="text-center py-20 text-gray-500">Campaign not found.</p>;

  const remainingDays = daysLeft(campaign.deadline);
  const isOwner = campaign.owner?.toLowerCase() === address?.toLowerCase();
  const images = Array.isArray(campaign.image) ? campaign.image : [campaign.image];

  const compareAmounts = () =>
    parseFloat(ethers.utils.parseEther(campaign.amountCollected)) <=
    parseFloat(ethers.utils.parseEther(campaign.target));

  const handleDonate = async () => {
    setIsLoading(true);
    await donate(campaign.pId, amount);
    router.push("/");
    setIsLoading(false);
  };

  const handleWithdraw = async () => {
    if (remainingDays > 0 && compareAmounts()) {
      toast("You can't withdraw funds before the campaign ends", { theme: "dark" });
      return;
    }
    setIsLoading(true);
    await payOutToCampaignTeam(campaign.pId);
    router.push("/");
    setIsLoading(false);
  };

  const sliderSettings = { dots: true, infinite: true, speed: 500, slidesToShow: 1, slidesToScroll: 1 };

  return (
    <div>
      {isLoading && <Loader />}

      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex flex-col">
          <div className="font-semibold text-[20px] uppercase p-2">{campaign.title}</div>
          <div className="xl:w-[1200px] lg:w-[1000px] sm:w-[400px] justify-center items-center">
            <Slider {...sliderSettings}>
              {images.map((url, i) => (
                <img
                  key={i}
                  src={i === 0 ? getReplacementImage(campaign.title, url) : url}
                  alt={campaign.title}
                  className="w-full h-[410px] object-cover rounded-xl"
                />
              ))}
            </Slider>
          </div>
          <div className="relative w-full h-[5px] bg-[#8c6dfd] mt-2">
            <div
              className="absolute h-full bg-[#4acd8d]"
              style={{ width: `${calculateBarPercentage(campaign.target, campaign.amountCollected)}%`, maxWidth: "100%" }}
            />
          </div>
        </div>

        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox title="Days Left" value={remainingDays} />
          <CountBox title={`Raised of ${campaign.target} ETH`} value={campaign.amountCollected} />
          <CountBox title="Total Backers" value={donators.length} />
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-semibold text-[18px] uppercase">Creator</h4>
            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/30">
                <span className="text-xl">👤</span>
              </div>
              <div>
                <h4 className="font-semibold text-[14px]">{campaign.owner}</h4>
                <p className="mt-[4px] text-[12px] text-[#808191]">
                  <TotalCampaignCreatedByUser ownerAddress={campaign.owner} />
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-dark-800 mb-4">
              {TAB_KEYS.map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveTab(key)}
                  className={`px-3 py-2 text-sm font-medium capitalize border-b-2 -mb-px ${
                    activeTab === key
                      ? "border-[#8c6dfd] text-[#8c6dfd]"
                      : "border-transparent text-gray-500"
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>

            <div className="rounded-xl bg-white dark:bg-[#1c1c24] p-4">
              {activeTab === "story" && (
                <ReactMarkdown className="font-normal text-[16px] text-[#808191]">{campaign.description}</ReactMarkdown>
              )}
              {activeTab === "donators" && (
                donators.length > 0 ? donators.map((d, i) => (
                  <div key={i} className="flex justify-between py-1">
                    <p className="text-[#b2b3bd] text-sm">{i + 1}. {d.donator}</p>
                    <p className="text-[#808191] text-sm">{d.donation} ETH</p>
                  </div>
                )) : <p className="text-[#808191]">No donators yet.</p>
              )}
              {activeTab === "faq" && (
                campaign.faqs?.map((faq, i) => (
                  <div key={i} className="flex flex-col m-2 p-2">
                    <h4 className="font-semibold">Q: {faq.question}</h4>
                    <p className="text-[#808191]">A: {faq.answer}</p>
                  </div>
                ))
              )}
              {activeTab === "comments" && (
                <CommentSection
                  articleId={String(campaign.pId)}
                  currentUser={address ? { _id: address, name: address, img: "" } : null}
                />
              )}
              {activeTab === "contact" && (
                <a href={`mailto:${campaign.email}`} className="text-blue-500">Send email to owner</a>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex flex-col p-4 bg-white dark:bg-[#1c1c24] rounded-[10px] mt-[20px]">
            {!isOwner && (
              <div>
                <div className="flex gap-2 mb-4">
                  {["donate", "fund"].map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setFundTab(key)}
                      className={`px-3 py-2 text-sm font-medium capitalize rounded-md ${
                        fundTab === key ? "bg-[#8c6dfd] text-white" : "bg-gray-100 dark:bg-dark-800"
                      }`}
                    >
                      {key === "donate" ? "Donate" : "Fund Package"}
                    </button>
                  ))}
                </div>

                {fundTab === "donate" && (
                  <div className="flex flex-col space-y-2">
                    <label className="text-sm text-gray-500">ETH amount</label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      step={0.01}
                      className="w-full rounded-md border border-gray-200 dark:border-dark-800 bg-transparent px-3 py-2"
                    />
                    <button type="button" className="w-full bg-[#8c6dfd] text-white rounded-md py-2" onClick={handleDonate}>
                      Donate
                    </button>
                  </div>
                )}

                {fundTab === "fund" && (
                  <div className="flex flex-col space-y-3">
                    <p className="text-sm text-gray-500">Select package</p>
                    {campaign.packages?.map((pkg, i) => (
                      <label key={i} className="flex items-start gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="package"
                          value={pkg.amount}
                          checked={amount === pkg.amount}
                          onChange={() => setAmount(pkg.amount)}
                          className="mt-1"
                        />
                        <span>
                          <span className="font-medium">{pkg.amount} ETH</span>
                          <span className="block text-xs text-gray-500">{pkg.discount}% discount</span>
                        </span>
                      </label>
                    ))}
                    <button type="button" className="w-full bg-[#8c6dfd] text-white rounded-md py-2" onClick={handleDonate}>
                      Fund
                    </button>
                  </div>
                )}
              </div>
            )}

            {isOwner && (
              <div className="space-y-2 flex flex-col">
                <button type="button" className="w-full bg-[#8c6dfd] text-white rounded-md py-2" onClick={handleWithdraw}>
                  Withdraw Funds
                </button>
                <button
                  type="button"
                  className="w-full bg-[#8c6dfd] text-white rounded-md py-2"
                  onClick={() => router.push(`/campaign-update/${campaign.pId}`)}
                >
                  Edit Campaign
                </button>
                <button
                  type="button"
                  className="w-full bg-danger-500 text-white rounded-md py-2"
                  onClick={async () => {
                    setIsLoading(true);
                    await deleteCampaign(campaign.pId);
                    router.push("/");
                  }}
                >
                  Delete Campaign
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
