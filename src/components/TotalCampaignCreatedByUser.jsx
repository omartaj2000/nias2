"use client";
import { useState, useEffect } from "react";
import { useStateContext } from "@/context";

const TotalCampaignCreatedByUser = ({ ownerAddress }) => {
  const { address, contract, getCampaigns } = useStateContext();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!contract) return;
    (async () => {
      const data = await getCampaigns();
      setCount(data.filter((c) => c.owner === ownerAddress).length);
    })();
  }, [address, contract, ownerAddress]);

  return <span>{count} Campaign(s)</span>;
};

export default TotalCampaignCreatedByUser;
