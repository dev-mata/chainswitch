import Image from "next/image";
import EvmConnectCard from "./components/evm/EvmConnectCard";
import SolanaConnectCard from "./components/solana/SolanaConnectCard";
import UnifiedWalletPanel from "./components/multichain/UnifiedWalletPanel";
import Header from "./components/Header";
import LeftHero from "./components/LeftHero";
import RightHero from "./components/RightHero";
import BottomHero from "./components/BottomHero";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">

      <div className="mx-auto max-w-6xl px-4 py-6">
        <Header />

        <section className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <LeftHero />
            <UnifiedWalletPanel />

          </div>

          <div className="mt-6">
            <BottomHero />
          </div>
        </section>

      </div>
    </main >
  );
}
