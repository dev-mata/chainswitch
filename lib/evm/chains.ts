import { mainnet, base, arbitrum, optimism, polygon, sepolia } from "wagmi/chains"

export const evmChains = [
    mainnet,
    base,
    arbitrum,
    optimism,
    polygon,
    sepolia
] as const