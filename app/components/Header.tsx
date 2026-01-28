const navItems = ["Products", "Use Cases", "Pricing", "Resources"];

export default function Header() {
    return (
        <header className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-xl bg-slate-900" />
                <span className="text-sm font-semibold tracking-wide text-slate-900">ChainSwitch.</span>

            </div>

            <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-600 md:flex">
                {navItems.map((item) => (
                    <a
                        key={item}
                        href="#"
                        className="text-purple-900 transition hover:text-slate-900"
                    >
                        {item}
                    </a>
                ))}
            </nav>

            <button className="rounded-full bg-slate-900 px-4 py-1.5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800">
                Learn More
            </button>

        </header>
    )
}