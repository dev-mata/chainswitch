import Link from "next/link";

function BrandChip({ label, dotClass = "bg-slate-200" }: { label: string, dotClass?: string }) {
    return (
        <div className="flex h-8 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-600 shadow-sm">
            <span className={`inline-block h-3 w-3 rounded-sm ${dotClass}`} />
            {label}
        </div>
    );
}

export default function LeftHero() {
    return (
        <div className="rounded-[28px] bg-white p-7 shadow-sm ring-1 ring-slate-200">
            <div className="max-w-md gap-2">
                <h1 className="text-4xl font-semibold leading-tight text-slate-900">
                    Chain Switching
                    <br />
                    Done Right
                </h1>

                <p className="mt-4 mb-6 text-sm leading-6 text-slate-500">
                    A multi-chain connector showcasing real engineering: provider orchestration, safe disconnects, and clean UX across TON, Solana, and EVM.
                </p>

                <Link href="https://github.com/dev-mata/chainswitch" className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800">
                    View Code
                </Link>
            </div>

            <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs text-slate-500">Main Networks:</p>

                <div className="mt-3 flex flex-wrap gap-2">
                    <BrandChip label="Ethereum" dotClass="bg-[#9891D5]" />
                    <BrandChip label="Solana" dotClass="bg-[#3C92B5]" />
                    <BrandChip label="TON" dotClass="bg-[#0098EA]" />
                    <BrandChip label="BSC" dotClass="bg-[#E9C419]" />
                    <BrandChip label="ARB" dotClass="bg-[#C50707]" />
                </div>
            </div>
        </div>
    );
}
