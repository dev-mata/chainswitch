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

function StatRow({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2 ring-1 ring-slate-200">
            <span className="text-xs font-medium text-slate-600">{label}</span>
            <span className="text-xs font-semibold text-slate-900">{value}</span>
        </div>
    );
}


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
        <div className="relative overflow-hidden rounded-[28px] bg-white p-7 shadow-sm ring-1 ring-slate-200">
            {/* Subtle decorative glow to match LeftHero/BottomHero style */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-slate-100 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-slate-100 blur-3xl" />

            <div className="relative">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <div className="text-xs font-medium tracking-wide text-slate-500">
                            Wallet Console
                        </div>
                        <h2 className="mt-1 text-3xl font-semibold text-slate-900">
                            Wallet
                        </h2>
                        <div className="mt-1 inline-flex items-center gap-2">
                            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                                {active}
                            </span>
                            <span className="text-xs text-slate-500">
                                {ECOSYSTEM_LABEL[active]}
                            </span>
                        </div>
                    </div>

                    {/* Actions (keep button colors unchanged) */}
                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            onClick={() => setPickerOpen(true)}
                            type="button"
                            className="rounded-full border px-3 py-2.5 text-xs font-medium bg-[#EDAF32] hover:bg-gray-50 text-black  active:bg-gray-100"
                        >
                            Change Network
                        </button>

                        {active === "EVM" && status.connected && (
                            <button
                                onClick={() => openChainModal?.()}
                                type="button"
                                className="rounded-full border px-3 py-2.5 text-xs font-medium bg-[#4FF9BF] hover:bg-gray-50 text-black  active:bg-gray-100"
                            >
                                Switch Chain
                            </button>
                        )}

                        {status.connected ? (
                            <button
                                type="button"
                                onClick={disconnectActive}
                                className="rounded-full border px-3 py-2.5 text-xs font-medium bg-[#EF6462] hover:bg-gray-50 text-black  active:bg-gray-100"
                            >
                                Disconnect
                            </button>
                        ) : (
                            <button
                                onClick={connectActive}
                                type="button"
                                className="rounded-full border px-3 py-2.5 text-xs font-medium bg-[#7EACC1] hover:bg-gray-50 text-black  active:bg-gray-100"
                            >
                                Connect Wallet
                            </button>
                        )}
                    </div>
                </div>

                {/* Divider */}
                <div className="mt-5 h-px w-full bg-slate-200" />

                {/* Content */}
                <div className="mt-5 grid gap-3">
                    <StatRow
                        label="Status"
                        value={status.connected ? "Connected" : "Disconnected"}
                    />
                    <StatRow label="Address" value={status.address} />
                    <StatRow label="Network" value={status.network} />

                    {active === "EVM" && <StatRow label="Chain ID" value={chainId} />}

                    {active === "SOLANA" && <StatRow label="RPC" value={status.network} />}

                    {/* Small note */}
                    <div className="mt-1 rounded-xl bg-slate-50 px-3 py-2 text-[11px] text-slate-500 ring-1 ring-slate-200">
                        Tip: Switching ecosystems disconnects the current session first to avoid stale providers.
                    </div>
                </div>

                {/* Picker Modal */}
                {pickerOpen && (
                    <div className="fixed inset-0 z-50">
                        {/* Backdrop */}
                        <button
                            aria-label="Close"
                            onClick={() => setPickerOpen(false)}
                            className="absolute inset-0 bg-black/40"
                            type="button"
                        />

                        <div className="relative flex min-h-full items-center justify-center p-4">
                            <div className="w-full max-w-[440px] overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10">
                                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                                    <div>
                                        <div className="text-sm font-semibold text-slate-900">
                                            Select Ecosystem
                                        </div>
                                        <div className="text-xs text-slate-500">
                                            Choose which network family to connect.
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setPickerOpen(false)}
                                        type="button"
                                        className="rounded-lg px-2 py-1 text-sm text-slate-600 hover:bg-slate-100"
                                    >
                                        ✕
                                    </button>
                                </div>

                                <div className="px-5 py-4">
                                    <div className="grid gap-2.5">
                                        <button
                                            onClick={() => switchEcosystem("EVM")}
                                            type="button"
                                            className="group rounded-2xl border border-slate-200 p-4 text-left transition hover:bg-slate-50 active:bg-slate-100"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="font-semibold text-slate-900">EVM</div>
                                                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 ring-1 ring-slate-200">
                                                    Ethereum+
                                                </span>
                                            </div>
                                            <div className="mt-1 text-xs text-slate-500">
                                                Ethereum, Base, Arbitrum, Optimism, Polygon…
                                            </div>
                                        </button>

                                        <button
                                            onClick={() => switchEcosystem("SOLANA")}
                                            type="button"
                                            className="group rounded-2xl border border-slate-200 p-4 text-left transition hover:bg-slate-50 active:bg-slate-100"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="font-semibold text-slate-900">Solana</div>
                                                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 ring-1 ring-slate-200">
                                                    High TPS
                                                </span>
                                            </div>
                                            <div className="mt-1 text-xs text-slate-500">
                                                Phantom, Solflare, Backpack…
                                            </div>
                                        </button>

                                        <button
                                            onClick={() => switchEcosystem("TON")}
                                            type="button"
                                            className="group rounded-2xl border border-slate-200 p-4 text-left transition hover:bg-slate-50 active:bg-slate-100"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="font-semibold text-slate-900">TON</div>
                                                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 ring-1 ring-slate-200">
                                                    Telegram
                                                </span>
                                            </div>
                                            <div className="mt-1 text-xs text-slate-500">
                                                TON Connect wallet flow & manifest-based sessions.
                                            </div>
                                        </button>
                                    </div>

                                    <div className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-xs text-slate-500 ring-1 ring-slate-200">
                                        Switching ecosystems disconnects the current one first to prevent mixed-provider states.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}