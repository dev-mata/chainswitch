function FloatingPill({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/90 px-4 py-3 shadow-lg ring-1 ring-black/5 backdrop-blur">
      <div className="h-9 w-9 rounded-xl bg-slate-100" />
      <div className="leading-tight">
        <div className="text-sm font-semibold text-slate-900">{title}</div>
        <div className="text-xs text-slate-500">{subtitle}</div>
      </div>
    </div>
  );
}

function PhoneMock() {
  return (
    <div className="relative mx-auto w-[260px] rounded-[40px] bg-white/90 p-3 shadow-2xl ring-1 ring-black/10">
      {/* notch */}
      <div className="mx-auto mb-3 h-6 w-28 rounded-full bg-slate-900/90" />

      {/* screen */}
      <div className="rounded-[28px] bg-slate-50 p-4">
        <div className="flex items-center justify-between">
          <div className="h-8 w-24 rounded-lg bg-white shadow-sm ring-1 ring-slate-200" />
          <div className="h-8 w-8 rounded-full bg-white shadow-sm ring-1 ring-slate-200" />
        </div>

        <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <div className="text-xs text-slate-500">Total Balance</div>
          <div className="mt-2 text-2xl font-semibold text-slate-900">$25,346.00</div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <button className="rounded-xl bg-blue-600 px-3 py-2 text-xs font-medium text-white">
              Transfer
            </button>
            <button className="rounded-xl bg-white px-3 py-2 text-xs font-medium text-slate-700 ring-1 ring-slate-200">
              Request
            </button>
            <button className="rounded-xl bg-white px-3 py-2 text-xs font-medium text-slate-700 ring-1 ring-slate-200">
              More
            </button>
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center justify-between">
            <div className="text-xs font-medium text-slate-700">Analytics</div>
            <div className="h-6 w-16 rounded-lg bg-slate-100" />
          </div>
          <div className="mt-3 h-24 rounded-xl bg-slate-100" />
        </div>
      </div>
    </div>
  );
}

function CardMock() {
  return (
    <div className="rounded-2xl bg-slate-900/90 p-5 shadow-2xl ring-1 ring-white/10">
      <div className="flex items-center justify-between">
        <div className="h-8 w-10 rounded-lg bg-white/20" />
        <div className="h-7 w-16 rounded-lg bg-white/10" />
      </div>
      <div className="mt-6 h-7 w-40 rounded-lg bg-white/10" />
      <div className="mt-3 h-3 w-24 rounded bg-white/10" />
      <div className="mt-8 flex items-end justify-between">
        <div className="text-xs text-white/70">SEAL.</div>
        <div className="h-6 w-12 rounded bg-white/10" />
      </div>
    </div>
  );
}

export default function RightHero() {
  return (
    <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-indigo-500 via-blue-600 to-blue-700 p-7 shadow-sm">
      {/* soft shapes */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-28 -right-28 h-72 w-72 rounded-full bg-white/10 blur-2xl" />

      <div className="relative grid items-center gap-6 lg:grid-cols-2">
        {/* phone */}
        <PhoneMock />

        {/* right stack */}
        <div className="relative mx-auto w-full max-w-sm">
          <CardMock />

          {/* floating pills */}
          <div className="absolute -left-6 top-20 hidden md:block">
            <FloatingPill title="Google" subtitle="Advertising" />
          </div>
          <div className="absolute -right-6 top-40 hidden md:block">
            <FloatingPill title="Netflix" subtitle="Entertainment" />
          </div>
          <div className="absolute left-8 top-[250px] hidden md:block">
            <FloatingPill title="Uber Eats" subtitle="Food & Beverage" />
          </div>
          <div className="absolute right-10 top-[320px] hidden md:block">
            <FloatingPill title="Walmart" subtitle="Groceries" />
          </div>
        </div>
      </div>
    </div>
  );
}
