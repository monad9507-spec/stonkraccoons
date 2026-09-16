import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { ARC, PROJECT_ID } from "./config";

const origin = typeof window === "undefined" ? "https://stonkraccoons-arc.monadnft123.chatgpt.site" : window.location.origin;

createAppKit({
  adapters: [new EthersAdapter()],
  networks: [ARC],
  defaultNetwork: ARC,
  projectId: PROJECT_ID,
  metadata: {
    name: "StonkRaccoons",
    description: "5,000 fully on-chain pixel raccoons on Arc",
    url: origin,
    icons: [`${origin}/assets/raccoon-base.svg`]
  },
  themeMode: "dark",
  themeVariables: {
    "--w3m-accent": "#d9e2ec",
    "--w3m-border-radius-master": "4px"
  },
  features: { analytics: true, email: false, socials: [] }
});
