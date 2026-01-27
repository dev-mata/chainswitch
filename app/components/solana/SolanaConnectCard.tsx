'use client'
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

function shortAddress(addr?: string) {
    if (!addr) return "";
    const s = addr.toString();
    return `${s.slice(0, 6)}…${s.slice(-4)}`;
}

export default function SolanaConnectCard() {
    const { connection } = useConnection()
    const { publicKey, connected, connecting, disconnecting, wallet } = useWallet()

    return (
        <div className="max-w-[520px] rounded-xl border border-gray-200 p-4">
            <h2 className="mb-3 text-lg font-semibold">Solana Wallet</h2>

            <div className="[&_*]:font-medium">
                <WalletMultiButton />
            </div>


            <div className="mt-3 grid gap-1.5 text-sm text-gray-600">
                <div>
                    <span className="font-semibold text-gray-800">Status:</span>{" "}
                    {connected
                        ? "Connected"
                        : connecting
                            ? "Connecting…"
                            : disconnecting
                                ? "Disconnecting…"
                                : "Disconnected"}
                </div>

                <div>
                    <span className="font-semibold text-gray-800">Address:</span>{" "}
                    {publicKey ? shortAddress(publicKey.toBase58()) : "—"}
                </div>

                <div>
                    <span className="font-semibold text-gray-800">Wallet:</span>{" "}
                    {wallet?.adapter?.name ?? "—"}
                </div>

                <div>
                    <span className="font-semibold text-gray-800">RPC:</span>{" "}
                    {(connection as any)?._rpcEndpoint ?? "—"}
                </div>
            </div>


        </div>
    )
}