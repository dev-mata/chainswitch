import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { evmChains } from "./chains";
import { http } from "wagmi";

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
        [evmChains[0].id]: http(process.env.NEXT_PUBLIC_RPC_MAINNET || undefined),
        [evmChains[1].id]: http(process.env.NEXT_PUBLIC_RPC_BASE || undefined),
        [evmChains[2].id]: http(process.env.NEXT_PUBLIC_RPC_ARBITRUM || undefined),
        [evmChains[3].id]: http(process.env.NEXT_PUBLIC_RPC_OPTIMISM || undefined),
        [evmChains[4].id]: http(process.env.NEXT_PUBLIC_RPC_POLYGON || undefined),
    },
})
