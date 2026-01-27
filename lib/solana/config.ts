import { clusterApiUrl } from "@solana/web3.js";

export function getSolanaEndpoint() {
    const fromEnv = process.env.NEXT_PUBLIC_SOLANA_RPC
    if (fromEnv) return fromEnv;

    return clusterApiUrl("mainnet-beta")
}

