'use client'
import { Ecosystem, ECOSYSTEM_LABEL } from "@/lib/multichain/ecosystem";
import { useChainModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { act, useEffect, useMemo, useState } from "react";
import { useAccount, useChainId, useChains, useDisconnect } from "wagmi";

import { useTonAddress, useTonConnectModal, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";

function short(addr?: string) {
    if (!addr) return ""

    return addr.length > 12 ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : addr;
}


const LS_KEY = "active-ecosystem"

export default function UnifiedWalletPanel() {
    const [active, setActive] = useState<Ecosystem>("EVM");
    const [pickerOpen, setPickerOpen] = useState(false);



    useEffect(() => {
        const saved = (typeof window != "undefined" && window.localStorage.getItem(LS_KEY)) as Ecosystem | null;
        if (saved === "EVM" || saved === "SOLANA" || saved === "TON") setActive(saved)
    }, [])

    useEffect(() => {
        if (typeof window !== "undefined") window.localStorage.setItem(LS_KEY, active)
    }, [active])

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
    const { setVisible: openSolModal } = useWalletModal();


    const tonAddress = useTonAddress()
    const tonWallet = useTonWallet()
    const tonModal = useTonConnectModal()
    const [tonConnectUI] = useTonConnectUI()
    const tonConnected = !!tonWallet;

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

            connected: tonConnected,
            address: tonAddress ?? "",
            network: tonWallet?.account ? `TON • ${tonWallet.account}` : "TON"
        }
    }, [active, evmConnected, evmAddress, currentChain?.name, solConnected, solAddress, tonConnected, tonAddress, tonWallet?.account])

    const disconnectActive = async () => {
        if (active === "EVM" && evmConnected) evmDisconnect();
        if (active === "SOLANA" && solConnected) await solWallet.disconnect();
        if (active === "TON" && tonConnected) await tonConnectUI.disconnect();
    }



    const connectActive = () => {
        if (active === "EVM") return openConnectModal?.();
        if (active === "SOLANA") return openSolModal(true);
        if (active === "TON") return tonModal.open();
    };


    const switchEcosystem = async (next: Ecosystem) => {
        if (next === active) {
            connectActive();
            setPickerOpen(false);
            return;
        }
        await disconnectActive();
        setActive(next);
        setPickerOpen(false);

        // open the right connect modal after switching
        if (next === "EVM") openConnectModal?.();
        if (next === "SOLANA") openSolModal(true);
        if (next === "TON") tonModal.open();
    };




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
                            type="button"
                            className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm font-medium hover:bg-gray-50 active:bg-gray-100">
                            Switch Chain
                        </button>
                    )}

                    {status.connected ? (
                        <button
                            type="button"
                            onClick={disconnectActive}
                            className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm font-medium hover:bg-gray-50 active:bg-gray-100"

                        >
                            Disconnect
                        </button>
                    ) : (
                        <button
                            onClick={connectActive}
                            type="button"
                            className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm font-medium hover:bg-gray-50 active:bg-gray-100">
                            Connect Wallet
                        </button>
                    )}
                </div>

            </div>

            <div className="mt-3 grid gap-1.5 text-sm text-gray-600">

                <div>
                    <span className="font-semibold text-gray-800">Status:</span>{" "}
                    {status.connected ? "Connected" : "Disconnected"}
                </div>
                <div>
                    <span className="font-semibold text-gray-800">Address:</span> {" "}
                    {status.connected ? short(status.address) : "-"}
                </div>
                <div>
                    <span className="font-semibold text-gray-800">Network:</span> {status.network}
                </div>

                {active === "EVM" && (
                    <div>
                        <span className="font-semibold text-gray-800">Chain ID:</span>{chainId ?? "-"}
                    </div>
                )}

                {active === "SOLANA" && (
                    <div>
                        <span className="font-semibold text-gray-800">RPC:</span> {" "}
                        {(connection as any)?._rpcEndpoint ?? "-"}
                    </div>
                )}

            </div>

            {pickerOpen && (
                <div className="fixed inset-0 z-50 bg-black/40">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <div className="w-full max-w-[420px] rounded-xl bg-gray-900 p-4 shadow-lg">
                            <div className="flex items-center justify-between">
                                <div className="text-sm font-semibold">Select Ecosystem</div>

                                <button
                                    onClick={() => setPickerOpen(false)}
                                    type="button"
                                    className="rounded-md px-2 py-1 text-sm text-gray-600 hover:bg-purple-900 hover:text-white">
                                    X
                                </button>
                            </div>


                            <div className="mt-3 grid gap-2.5">
                                <button
                                    onClick={() => switchEcosystem("EVM")}
                                    type="button"
                                    className="rounded-lg border border-gray-200 p-3 text-left hover:bg-gray-700 active:bg-gray-100"
                                >
                                    <div className="font-semibold">EVM</div>
                                    <div className="mt-0.5 text-xs text-gray-500">
                                        Ethereum, Base, Arbitrum, Optimism, Polygon…
                                    </div>
                                </button>

                                <button
                                    onClick={() => switchEcosystem("SOLANA")}
                                    type="button"
                                    className="rounded-lg border border-gray-200 p-3 text-left hover:bg-gray-700 active:bg-gray-100"
                                >
                                    <div className="font-semibold">Solana</div>
                                    <div className="mt-0.5 text-xs text-gray-500">
                                        Phantom, Solflare, Backpack…
                                    </div>
                                </button>

                                <button
                                    onClick={() => switchEcosystem("TON")}
                                    type="button"
                                    className="rounded-lg border border-gray-200 p-3 text-left opacity-60 hover:bg-gray-700 active:bg-gray-100"
                                >
                                    <div className="font-semibold">TON</div>
                                    <div className="mt-0.5 text-xs text-gray-500">We’ll add TON next</div>
                                </button>
                            </div>

                            <div className="mt-2.5 text-xs text-gray-500">
                                Switching ecosystems disconnects the current one first.
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}