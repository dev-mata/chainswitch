'use client'
import "@rainbow-me/rainbowkit/styles.css";
import "@solana/wallet-adapter-react-ui/styles.css"

// EVM
import { wagmiConfig } from "@/lib/evm/wagmiConfig";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { WagmiProvider } from "wagmi";
import { useMemo } from "react";

// Solana

import { getSolanaEndpoint } from "@/lib/solana/config";
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

// ton
import { TonConnectUIProvider } from '@tonconnect/ui-react';


const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {

    const solanaEndpoint = useMemo(() => getSolanaEndpoint(), [])

    const solanaWallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
        ],
        []
    )

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    const manifestUrl = `${appUrl}/tonconnect-manifest.json`

    return (
        <WagmiProvider config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    <ConnectionProvider endpoint={solanaEndpoint}>
                        <WalletProvider wallets={solanaWallets} autoConnect>
                            <WalletModalProvider>

                                <TonConnectUIProvider manifestUrl={manifestUrl}>{children}</TonConnectUIProvider>
                            </WalletModalProvider>
                        </WalletProvider>
                    </ConnectionProvider>
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}