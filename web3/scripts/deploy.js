const hre = require("hardhat");

async function main() {
  const platformTax = 0; // 0% fee — 100% goes to campaign creators

  console.log("Deploying CrowdFunding contract...");

  const CrowdFunding = await hre.ethers.getContractFactory("CrowdFunding");
  const crowdFunding = await CrowdFunding.deploy(platformTax);

  await crowdFunding.deployed();

  console.log(`CrowdFunding deployed to: ${crowdFunding.address}`);
  console.log(`Network: ${hre.network.name}`);
  console.log(`Platform tax: ${platformTax}%`);

  // Save address to a file for the frontend to use
  const fs = require("fs");
  const path = require("path");

  const addressData = { contractAddress: crowdFunding.address };
  const outputPath = path.join(__dirname, "../../src/abis/contract-address.json");

  fs.writeFileSync(outputPath, JSON.stringify(addressData, null, 2));
  console.log(`Contract address saved to src/abis/contract-address.json`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
