import Image from "next/image";
import EvmConnectCard from "./components/evm/EvmConnectCard";
import SolanaConnectCard from "./components/solana/SolanaConnectCard";
import UnifiedWalletPanel from "./components/multichain/UnifiedWalletPanel";

export default function Home() {
  return (
    <main className="flex items-center justify-center mx-auto h-screen">
      {/* <EvmConnectCard /> */}

      {/* <SolanaConnectCard /> */}

      <UnifiedWalletPanel />
    </main>
  );
}
