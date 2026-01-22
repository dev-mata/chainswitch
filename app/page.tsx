import Image from "next/image";
import EvmConnectCard from "./components/evm/EvmConnectCard";

export default function Home() {
  return (
    <main className="p-24">
      <EvmConnectCard />
    </main>
  );
}
