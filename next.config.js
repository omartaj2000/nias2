/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "ipfs.io" },
      { protocol: "https", hostname: "ipfs.nftstorage.link" },
      { protocol: "https", hostname: "gateway.ipfscdn.io" },
    ],
  },
};

module.exports = nextConfig;
