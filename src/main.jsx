import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { useAppKit, useAppKitAccount, useAppKitNetwork, useAppKitProvider } from "@reown/appkit/react";
import "./appkit";
import { ARC } from "./config";
import "./styles.css";

const short = (address) => address ? `${address.slice(0, 6)}…${address.slice(-4)}` : "";

function WalletButton({ className = "mint" }) {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  return <button className={className} onClick={() => open({ view: isConnected ? "Account" : "Connect" })}>
    {isConnected ? short(address) : "CONNECT WALLET"}
  </button>;
}

function WalletSync() {
  const { isConnected } = useAppKitAccount();
  const { chainId, switchNetwork } = useAppKitNetwork();
  const { walletProvider } = useAppKitProvider("eip155");
  useEffect(() => {
    if (isConnected && walletProvider && Number(chainId) !== ARC.id) switchNetwork(ARC).catch(() => {});
  }, [isConnected, chainId, walletProvider, switchNetwork]);
  return null;
}

function Header({ go }) {
  return <nav className="nav"><button className="brand" onClick={() => go("/")}>STONK<i>RACCOONS</i></button><div className="navlinks"><button onClick={() => go("/#collection")}>Collection</button><button onClick={() => go("/#epochs")}>Epochs</button><button onClick={() => go("/docs/")}>Docs</button><button onClick={() => go("/mint/")}>Mint</button></div><WalletButton /></nav>;
}

function Home({ go }) {
  return <><Header go={go}/><main><section className="hero"><div><div className="eyebrow">Fully on-chain / Arc Mainnet</div><h1>STREET SMART.<br/>ON-CHAIN.</h1><p>5,000 pixel raccoons built natively for Arc. Every trait, every special, every PFP lives on-chain.</p><div className="actions"><button className="mint" onClick={() => go("/mint/")}>MINT A RACCOON</button><button className="secondary" onClick={() => go("/docs/")}>READ DOCS ↗</button></div></div><div className="art"><img src="/assets/raccoon-headset.svg" alt="Pixel StonkRaccoons character"/></div></section><section className="metricbar"><div className="metric"><b>5,000</b><span>On-chain raccoons</span></div><div className="metric"><b>20</b><span>Zombie + Alien specials</span></div><div className="metric"><b>5,000 $RACC</b><span>Per minted NFT</span></div></section><section id="collection" className="section split"><div><div className="eyebrow">The collection</div><h2>TRAITS WITH A LITTLE ATTITUDE.</h2></div><div><p className="copy">4,980 normal StonkRaccoons plus exactly 10 Zombies and 10 Aliens. Six fur types, six glasses, twelve fits, ten headwear pieces and a stack of headphones, chains and earrings.</p><div className="gallery"><img src="/assets/raccoon-01.svg"/><img src="/assets/raccoon-02.svg"/><img src="/assets/raccoon-base.svg"/></div><div className="specials"><span><b>10</b> ZOMBIES</span><span><b>10</b> ALIENS</span><span><b>100%</b> ON-CHAIN SVG</span></div></div></section><section id="epochs" className="section split"><div><div className="eyebrow">Mint curve</div><h2>10 EPOCHS.<br/>500 EACH.</h2></div><div><p className="copy">Mint price moves up by 0.25 USDC after each 500-raccoon epoch. Wallet mint capacity refreshes every epoch.</p><div className="curve"><svg viewBox="0 0 900 220" preserveAspectRatio="none"><polyline points="0,210 100,190 200,168 300,145 400,122 500,100 600,77 700,55 800,32 900,10"/><circle cx="0" cy="210" r="7"/><circle cx="900" cy="10" r="7"/></svg><small>EPOCH 1 — FREE → EPOCH 10 — 2.25 USDC</small></div><div className="epochs">{["FREE · 1",".25 · 20",".50 · 30",".75 · 40","1.00 · 50","1.25 · 60","1.50 · 70","1.75 · 80","2.00 · 90","2.25 · 100"].map((x,i)=><div className={i===0?"active":""} key={x}><b>{String(i+1).padStart(2,"0")}</b>{x}</div>)}</div></div></section><section className="section"><div className="mintbox"><div><div className="eyebrow dark">Mint on Arc</div><h2>READY TO CLAIM?</h2><p>Connect your wallet, switch to Arc and mint your raccoon.</p></div><button onClick={() => go("/mint/")}>OPEN MINT ↗</button></div></section></main><Footer go={go}/></>;
}

function Mint({ go }) {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const [qty] = useState(1);
  const action = () => isConnected ? alert("Mint activates after the collection contract is deployed.") : open({ view: "Connect" });
  return <><Header go={go}/><main className="mintscreen"><section className="art"><img src="/assets/raccoon-headset.svg" alt="StonkRaccoons"/></section><section className="panel"><div className="eyebrow">Mint terminal</div><h1>CLAIM YOUR<br/>RACCOON.</h1><div className="status"><i/> {isConnected ? `CONNECTED · ${short(address)}` : "EPOCH 1 · FREE MINT"}</div><div className="box"><div className="topline"><span>SUPPLY</span><b>0 / 5,000 MINTED</b></div><div className="quantity"><span>QUANTITY</span><b>{qty}</b></div><div className="total"><span>PRICE <b>FREE</b></span><span>WALLET CAP, THIS EPOCH <b>1</b></span></div><div className="reward"><span>YOU RECEIVE</span><b>5,000 $RACC</b></div><button className="mainbtn" onClick={action}>{isConnected ? "MINT A RACCOON" : "CONNECT WALLET"}</button></div><div className="epochline">{Array.from({length:10},(_,i)=><i key={i} className={i===0?"active":""}/>)}</div><p className="notice">Epoch 1: 500 free mints · one raccoon per wallet. Your mint capacity resets in the next epoch.</p></section></main></>;
}

function Docs({ go }) {
  return <><Header go={go}/><main className="docs"><div className="eyebrow">StonkRaccoons / Docs</div><h1>THE FIELD GUIDE.</h1><p>5,000 fully on-chain SVG pixel raccoons on Arc: 4,980 standard, 10 Zombies and 10 Aliens.</p><h2>Mint epochs</h2><p>Ten epochs of 500 NFTs. Epoch 1 is free with one mint per wallet. Later epochs rise by 0.25 USDC, from 0.25 to 2.25 USDC.</p><h2>$RACC rewards</h2><p>Every successfully minted NFT sends <b>5,000 $RACC</b> to its minter. Total supply: 50,000,000 $RACC — 25M rewards and 25M treasury.</p><h2>Arc network</h2><p>Chain ID 5042 · native USDC · Arc Mainnet.</p></main><Footer go={go}/></>;
}

function Footer({ go }) { return <footer className="footer"><span>© 2026 STONKRACCOONS</span><span>ARC MAINNET · NATIVE USDC</span><button onClick={() => go("/docs/")}>DOCUMENTATION ↗</button></footer>; }

function App() {
  const [path, setPath] = useState(window.location.pathname);
  const go = (next) => { window.history.pushState({}, "", next); setPath(next.split("#")[0]); window.scrollTo(0,0); };
  useEffect(() => { const fn=()=>setPath(window.location.pathname); addEventListener("popstate",fn); return ()=>removeEventListener("popstate",fn); },[]);
  return <div className="wrap"><WalletSync/>{path.startsWith("/mint")?<Mint go={go}/>:path.startsWith("/docs")?<Docs go={go}/>:<Home go={go}/>}</div>;
}

createRoot(document.getElementById("root")).render(<App/>);
