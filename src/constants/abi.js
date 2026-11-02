export const CROWDFUNDING_ABI = [
  "function createCampaign(address _owner, string _title, string _category, string _email, string _description, uint256 _target, uint256 _deadline, string[] _image, tuple(string question, string answer)[] _faqs, tuple(string amount, string discount)[] _packages) external returns (uint256)",
  "function updateCampaign(uint256 _id, string _title, string _category, string _email, string _description, uint256 _target, uint256 _deadline, string[] _image, tuple(string question, string answer)[] _updatedFaqs, tuple(string amount, string discount)[] _updatedPackages) external returns (bool)",
  "function deleteCampaign(uint256 _id) external returns (bool)",
  "function donateToCampaign(uint256 _id) external payable",
  "function payOutToCampaignTeam(uint256 _id) external returns (bool)",
  "function getDonators(uint256 _id) external view returns (address[], uint256[])",
  "function getCampaigns() external view returns (tuple(address owner, bool payedOut, string category, string email, string title, string description, uint256 target, uint256 deadline, uint256 amountCollected, string[] image, address[] donators, uint256[] donations, tuple(string question, string answer)[] faqs, tuple(string amount, string discount)[] packages)[])",
  "function numberOfCampaigns() external view returns (uint24)",
];

export const CONTRACT_ADDRESS = "0xff7153dd223E504f93a072a7B90a791D49d40353";

export const SEPOLIA_NETWORK = { name: "sepolia", chainId: 11155111 };

/** Public Sepolia RPCs — first working one is used for reads */
export const SEPOLIA_RPCS = [
  "https://ethereum-sepolia-rpc.publicnode.com",
  "https://1rpc.io/sepolia",
  "https://rpc2.sepolia.org",
];
