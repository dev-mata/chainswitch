'use client'

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useChainId, useChains, useDisconnect } from "wagmi";

function shortAddress(addr?: string) {
    if (!addr) return "";
    return `${addr.slice(0, 6)}…${addr.slice(-4)}`
}

export default function EvmConnectCard() {
    const chainId = useChainId();
    const chains = useChains();
    const { disconnect } = useDisconnect();

    const currentChain = chains.find((c) => c.id === chainId)


    return (
        <div className="max-w-[520px] rounded-xl border border-gray-200 p-4">
            <h2 className="mb-3 text-lg font-semibold">EVM Wallet</h2>


            <ConnectButton.Custom>
                {({
                    account,
                    chain,
                    openConnectModal,
                    openAccountModal,
                    openChainModal,
                    mounted,
                }) => {
                    const ready = mounted
                    const connected = Boolean(ready && account && chain)

                    return (
                        <div className="grid gap-2.5">
                            {!connected ? (
                                <button
                                    onClick={openConnectModal}
                                    type="button"
                                    className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm font-medium hover:bg-gray-50 active:bg-gray-100 hover:text-black">
                                    Connect Wallet
                                </button>
                            ) : (
                                <div className="flex flex-wrap gap-2.5">
                                    <button
                                        onClick={openAccountModal}
                                        type="button"
                                        className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm font-medium hover:bg-gray-50 active:bg-gray-100">
                                        {shortAddress(account?.address)}
                                    </button>

                                    <button
                                        onClick={openChainModal}
                                        type="button"
                                        className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm font-medium hover:bg-gray-50 active:bg-gray-100">
                                        {chain?.name}
                                    </button>

                                    <button
                                        onClick={() => disconnect()}
                                        type="button"
                                        className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm font-medium hover:bg-gray-50 active:bg-gray-100"
                                    >
                                        Disconnect
                                    </button>

                                </div>
                            )}

                            <div className="space-y-1 text-sm text-gray-600">
                                <div>
                                    <span className="font-semibold text-gray-800">Status:</span>{" "}
                                    {connected ? "Connected" : "Disconnected"}
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-800">Network:</span>{" "}
                                    {connected ? chain?.name : currentChain?.name ?? "—"}
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-800">Chain ID:</span>{" "}
                                    {chainId ?? "—"}
                                </div>
                            </div>

                        </div>
                    )
                }}
            </ConnectButton.Custom>
        </div>
    )
}