'use client'
import { Ecosystem, ECOSYSTEM_LABEL } from "@/lib/multichain/ecosystem";
import { useChainModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { act, useMemo, useState } from "react";
import { useAccount, useChainId, useChains, useDisconnect } from "wagmi";

function short(addr?: string) {
    if (!addr) return ""

    return addr.length > 12 ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : addr;
}


const LS_KEY = "active-ecosystem"

export default function UnifiedWalletPanel() {
    const [active, setActive] = useState<Ecosystem>("EVM");
    const [pickerOpen, setPickerOpen] = useState(false);



    const evmAccount = useAccount();
    const evmConnected = evmAccount.isConnected;
    const evmAddress = evmAccount.address
    const chainId = useChainId()
    const chains = useChains();
    const currentChain = chains.find((c) => c.id === chainId)
    const { disconnect: evmDisconnect } = useDisconnect()
    const { openConnectModal } = useConnectModal()
    const { openChainModal } = useChainModal()


    const { connection } = useConnection()
    const solWallet = useWallet()
    const solConnected = !!solWallet.publicKey;
    const solAddress = solWallet.publicKey?.toBase58()
    const { setVisible } = useWalletModal();

    const status = useMemo(() => {
        if (active === "EVM") {
            return {
                connected: evmConnected,
                address: evmAddress ?? "",
                network: currentChain?.name ?? "-"
            }
        }
        if (active === "SOLANA") {
            return {
                connected: solConnected,
                address: solAddress ?? "",
                network: "Solana"
            }
        }
        return {

            connected: false,
            address: "",
            network: "TON(coming next)"
        }
    }, [active, evmConnected, evmAddress, currentChain?.name, solConnected, solAddress])

    return (
        <div className="max-w-6xl rounded-xl border border-gray-200 p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">

                <div>
                    <h2 className="m-0 text-lg font-semibold">
                        Wallet
                        <div className="text-sm text-gray-500">{ECOSYSTEM_LABEL[active]}</div>
                    </h2>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <button
                        onClick={() => setPickerOpen(true)}
                        type="button"
                        className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm font-medium hover:bg-gray-50 hover:text-purple-500 active:bg-gray-100">
                        Change Network
                    </button>

                    {active === "EVM" && status.connected && (
                        <button
                            onClick={() => openChainModal?.()}
                            className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm font-medium hover:bg-gray-50 active:bg-gray-100">
                            Switch Chain
                        </button>
                    )}
                </div>

            </div>
        </div>
    )
}