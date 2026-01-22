import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { evmChains } from "./chains";
import { http } from "wagmi";
import { fallback } from "viem";

const appName = process.env.NEXT_PUBLIC_APP_NAME || "chainswitch"
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "";

if (!projectId) {
    console.warn("Missing NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ")
}


export const wagmiConfig = getDefaultConfig({
    appName,
    projectId,
    chains: [...evmChains],
    ssr: true,
    transports: {
        [evmChains[0].id]: fallback([
            http('https://ethereum-rpc.publicnode.com'),
            http('https://cloudflare-eth.com'),
            http('https://eth.drpc.org'),
        ]),
        [evmChains[1].id]: fallback([
            http('https://mainnet.base.org'),
            http('https://base-rpc.publicnode.com'),
            http('https://base.drpc.org'),
        ]),
        [evmChains[2].id]: fallback([
            http('https://arb1.arbitrum.io/rpc'),
            http('https://arbitrum-one-rpc.publicnode.com'),
            http('https://arbitrum.drpc.org'),
        ]),
        [evmChains[3].id]: fallback([
            http('https://mainnet.optimism.io'),
            http('https://optimism-rpc.publicnode.com'),
            http('https://optimism.drpc.org'),
        ]),
        [evmChains[4].id]: fallback([
            http('https://polygon-rpc.com'),
            http('https://polygon-bor-rpc.publicnode.com'),
            http('https://polygon.drpc.org'),
        ]),
        [evmChains[5].id]: fallback([
            http('https://ethereum-sepolia-rpc.publicnode.com'),
            http('https://rpc.sepolia.org'),
            http('https://rpc2.sepolia.org'),
            http('https://sepolia.drpc.org'),
        ]),

    },
})
