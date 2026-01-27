export type Ecosystem = "EVM" | "SOLANA" | "TON";

export const ECOSYSTEM_LABEL: Record<Ecosystem, string> = {
    EVM: "EVM (Ethereum & L2s)",
    SOLANA: "Solana",
    TON: "TON",
};
