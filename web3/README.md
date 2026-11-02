# Raise Hive - Smart Contracts

> Ethereum smart contracts for the Raise Hive crowdfunding platform

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Compile contracts
npm run build

# Deploy contracts
npm run deploy

# Release contracts
npm run release
```

## 📁 Project Structure

```
web3/
├── contracts/          # Solidity smart contracts
│   ├── RaiseHive.sol  # Main crowdfunding contract
│   └── ...
├── scripts/           # Deployment scripts
├── test/              # Contract tests
├── hardhat.config.js  # Hardhat configuration
└── package.json
```

## 📝 Smart Contract Overview

### RaiseHive Contract

The main contract handles all crowdfunding operations:

```solidity
contract RaiseHive {
    struct Campaign {
        address payable creator;
        uint goal;
        uint raisedAmount;
        uint deadline;
        bool completed;
        string category;
        string title;
    }
    
    // Core functions
    function createCampaign(...) public
    function contribute(uint _campaignId) public payable
    function withdrawFunds(uint _campaignId) public
}
```

### Key Features

- **Campaign Creation**: Anyone can create a campaign with goal and deadline
- **Contributions**: Users can contribute ETH to campaigns
- **Withdrawals**: Creators can withdraw funds after deadline
- **Transparency**: All transactions recorded on blockchain
- **Security**: Built-in checks and validations

## 🔧 Contract Functions

### createCampaign
```solidity
function createCampaign(
    uint _goal,
    uint _duration,
    string memory _category,
    string memory _title
) public
```
Creates a new crowdfunding campaign.

### contribute
```solidity
function contribute(uint _campaignId) public payable
```
Contribute ETH to a campaign.

### withdrawFunds
```solidity
function withdrawFunds(uint _campaignId) public
```
Withdraw funds after campaign ends (creator only).

## 🛠️ Development

### Compile Contracts
```bash
npm run build
```
Compiles all Solidity contracts and generates artifacts.

### Deploy to Network
```bash
npm run deploy
```
Deploys contracts to the selected network (testnet/mainnet).

### Run Tests
```bash
npx hardhat test
```

### Local Development
```bash
# Start local Hardhat node
npx hardhat node

# Deploy to local network
npx hardhat run scripts/deploy.js --network localhost
```

## 🌐 Supported Networks

- **Ethereum Mainnet**
- **Goerli Testnet**
- **Sepolia Testnet**
- **Polygon**
- **Mumbai (Polygon Testnet)**

## 🔐 Security Features

- ✅ Reentrancy protection
- ✅ Access control (only creator can withdraw)
- ✅ Deadline validation
- ✅ Goal completion checks
- ✅ Safe math operations

## 📊 Gas Optimization

- Efficient storage patterns
- Minimal state changes
- Optimized loops
- Event emissions for off-chain tracking

## 🧪 Testing

```bash
# Run all tests
npx hardhat test

# Run specific test
npx hardhat test test/RaiseHive.test.js

# Check coverage
npx hardhat coverage
```

## 📦 Dependencies

- **hardhat**: ^2.x - Development environment
- **@thirdweb-dev/contracts**: Contract extensions
- **@openzeppelin/contracts**: Secure contract library
- **ethers**: ^5.x - Ethereum library

## 🔗 Thirdweb Integration

This project uses Thirdweb for:
- Easy deployment
- Contract management
- Dashboard access
- IPFS storage

### Deploy with Thirdweb
```bash
npm run deploy
```

### Release Contract
```bash
npm run release
```

## 📝 Environment Variables

Create a `.env` file:

```env
PRIVATE_KEY=your_wallet_private_key
THIRDWEB_API_KEY=your_thirdweb_api_key
ETHERSCAN_API_KEY=your_etherscan_api_key
```

## 🔍 Contract Verification

After deployment, verify on Etherscan:

```bash
npx hardhat verify --network mainnet DEPLOYED_CONTRACT_ADDRESS
```

## 📚 Learn More

- [Solidity Documentation](https://docs.soliditylang.org/)
- [Hardhat Documentation](https://hardhat.org/docs)
- [Thirdweb Contracts](https://portal.thirdweb.com/contractkit)
- [OpenZeppelin](https://docs.openzeppelin.com/contracts)

## 🐛 Common Issues

### Insufficient funds
Ensure your wallet has enough ETH for gas fees.

### Nonce too high
Reset your MetaMask account or wait for pending transactions.

### Contract size too large
Optimize contract code or split into multiple contracts.

## 🤝 Contributing

1. Write tests for new features
2. Follow Solidity style guide
3. Document all functions
4. Run security checks

## 📄 License

MIT License - see LICENSE file for details

---

**Secure, transparent, decentralized** 🔐
