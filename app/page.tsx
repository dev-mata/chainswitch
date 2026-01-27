import Image from "next/image";
import EvmConnectCard from "./components/evm/EvmConnectCard";
import SolanaConnectCard from "./components/solana/SolanaConnectCard";

export default function Home() {
  return (
    <main className="p-24">
      {/* <EvmConnectCard /> */}

      <SolanaConnectCard />
    </main>
  );
}
