export const ARC = {
  id: 5042,
  caipNetworkId: "eip155:5042",
  chainNamespace: "eip155",
  name: "Arc",
  nativeCurrency: { name: "USDC", symbol: "USDC", decimals: 6 },
  rpcUrls: { default: { http: ["https://rpc.blockdaemon.mainnet.arc.io"] } },
  blockExplorers: { default: { name: "Arc Explorer", url: "https://explorer.arc.io" } }
};

export const PROJECT_ID = "4f71172824a0ea69b0270161482356fe";

// Paste only the deployed StonkRaccoons NFT contract address here.
export const NFT_CONTRACT = "0x6E49e473FebD8937F2387b68fC6fa39B6266f2De";

// Replace these two links with your official X profile and OpenSea collection.
export const X_URL = "https://x.com/STONKRACCOONS";
export const OPENSEA_URL = "https://opensea.io/";

export const NFT_ABI = [
  "function totalMinted() view returns (uint256)",
  "function mintOpen() view returns (bool)",
  "function currentEpoch() view returns (uint256)",
  "function epochRemaining() view returns (uint256)",
  "function epochWalletLimit(uint256) view returns (uint256)",
  "function mintedInEpoch(uint256,address) view returns (uint256)",
  "function quote(uint256) view returns (uint256 epoch, uint256 price, uint256 total)",
  "function mint(uint256 quantity) payable",
  "function tokenURI(uint256 tokenId) view returns (string)"
];
