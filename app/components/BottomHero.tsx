function Feature({
    title,
    desc,
}: {
    title: string;
    desc: string;
}) {
    return (
        <div className="flex gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <div className="mt-1 h-9 w-9 rounded-xl bg-slate-100" />
            <div>
                <div className="text-sm font-semibold text-slate-900">{title}</div>
                <p className="mt-1 text-xs leading-5 text-slate-500">{desc}</p>
            </div>
        </div>
    );
}

export default function BottomHero() {
    return (
        <div className="rounded-[28px] bg-white p-7 shadow-sm ring-1 ring-slate-200">
            <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
                <div>
                    <h2 className="text-3xl font-semibold leading-tight text-slate-900">
                        Not a demo.
                        <br />
                        A system
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-slate-500">
                        Built to show how I structure apps: composable components, network-aware state, and scalable integrations, so adding the next chain is straightforward.
                    </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                    <Feature
                        title="Responsive by Design"
                        desc="Instant UI feedback, smart loading states, and minimal rerenders."
                    />
                    <Feature
                        title="One Switch, Clean State"
                        desc="Disconnects the active wallet, tears down providers, and boots the next network"
                    />
                    <Feature
                        title="Safe Connection Flow"
                        desc="Explicit permissions, clear session boundaries, and guardrails around address/chain state"
                    />
                    <Feature
                        title="Composable Architecture"
                        desc="Chains are modular. Add more networks, RPCs, and UI states without rewriting the app"
                    />
                </div>
            </div>
        </div>
    );
}
