"use client";

import {
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import {
  categories,
  mockAssets,
  type Asset,
  type AssetCategory,
  type AssetStatus,
} from "@/data/mockAssets";

const STORAGE_KEY = "uniasset-assets-v1";
const ACTIVITY_KEY = "uniasset-activity-v1";

interface ActivityEntry {
  id: string;
  message: string;
  timestamp: number;
}

function subscribe() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

function readAssets(): Asset[] {
  if (typeof window === "undefined") return mockAssets;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as Asset[]) : mockAssets;
  } catch {
    return mockAssets;
  }
}

function readActivity(): ActivityEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = window.localStorage.getItem(ACTIVITY_KEY);
    return saved ? (JSON.parse(saved) as ActivityEntry[]) : [];
  } catch {
    return [];
  }
}

function statusStyles(status: AssetStatus) {
  switch (status) {
    case "Available":
      return "bg-emerald-50 text-emerald-700 ring-emerald-600/20";
    case "Checked Out":
      return "bg-amber-50 text-amber-700 ring-amber-600/20";
    case "Maintenance":
      return "bg-rose-50 text-rose-700 ring-rose-600/20";
  }
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className={`mt-2 text-3xl font-semibold tracking-tight ${accent}`}>
        {value}
      </p>
    </div>
  );
}

export default function Page() {
  const mounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  const [assets, setAssets] = useState<Asset[]>(readAssets);
  const [activity, setActivity] = useState<ActivityEntry[]>(readActivity);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"All" | AssetCategory>("All");
  const [status, setStatus] = useState<"All" | AssetStatus>("All");

  useEffect(() => {
    if (!mounted) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(assets));
  }, [assets, mounted]);

  useEffect(() => {
    if (!mounted) return;
    window.localStorage.setItem(ACTIVITY_KEY, JSON.stringify(activity));
  }, [activity, mounted]);

  function logActivity(message: string) {
    setActivity((prev) =>
      [
        {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          message,
          timestamp: Date.now(),
        },
        ...prev,
      ].slice(0, 8),
    );
  }

  function changeStatus(
    asset: Asset,
    next: AssetStatus,
    assignedTo: string | null,
    message: string,
  ) {
    setAssets((prev) =>
      prev.map((item) =>
        item.id === asset.id ? { ...item, status: next, assignedTo } : item,
      ),
    );
    logActivity(message);
  }

  function resetDemo() {
    setAssets(mockAssets);
    setActivity([]);
    window.localStorage.removeItem(STORAGE_KEY);
    window.localStorage.removeItem(ACTIVITY_KEY);
  }

  const stats = useMemo(() => {
    return {
      total: assets.length,
      available: assets.filter((a) => a.status === "Available").length,
      checkedOut: assets.filter((a) => a.status === "Checked Out").length,
      maintenance: assets.filter((a) => a.status === "Maintenance").length,
    };
  }, [assets]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return assets.filter((asset) => {
      const matchesQuery =
        term.length === 0 ||
        asset.name.toLowerCase().includes(term) ||
        asset.id.toLowerCase().includes(term) ||
        asset.serial.toLowerCase().includes(term) ||
        asset.location.toLowerCase().includes(term);
      const matchesCategory = category === "All" || asset.category === category;
      const matchesStatus = status === "All" || asset.status === status;
      return matchesQuery && matchesCategory && matchesStatus;
    });
  }, [assets, query, category, status]);

  if (!mounted) {
    return <div className="min-h-screen bg-slate-100" />;
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-lg font-bold text-white shadow-sm">
              UA
            </div>
            <div>
              <h1 className="text-lg font-semibold leading-tight">UniAsset</h1>
              <p className="text-xs text-slate-500">
                University Asset &amp; Inventory Management
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-600/20 sm:inline">
              Prototype
            </span>
            <button
              type="button"
              onClick={resetDemo}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Reset demo
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="Total assets" value={stats.total} accent="text-slate-900" />
          <StatCard
            label="Available"
            value={stats.available}
            accent="text-emerald-600"
          />
          <StatCard
            label="Checked out"
            value={stats.checkedOut}
            accent="text-amber-600"
          />
          <StatCard
            label="In maintenance"
            value={stats.maintenance}
            accent="text-rose-600"
          />
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full sm:max-w-xs">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" strokeLinecap="round" />
                  </svg>
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search assets, serials, locations..."
                    className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={category}
                    onChange={(event) =>
                      setCategory(event.target.value as "All" | AssetCategory)
                    }
                    className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  >
                    <option value="All">All categories</option>
                    {categories.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <select
                    value={status}
                    onChange={(event) =>
                      setStatus(event.target.value as "All" | AssetStatus)
                    }
                    className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  >
                    <option value="All">All statuses</option>
                    <option value="Available">Available</option>
                    <option value="Checked Out">Checked Out</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-4 py-3 font-medium">Asset</th>
                      <th className="px-4 py-3 font-medium">Category</th>
                      <th className="px-4 py-3 font-medium">Location</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium">Assigned to</th>
                      <th className="px-4 py-3 text-right font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filtered.map((asset) => (
                      <tr key={asset.id} className="hover:bg-slate-50/70">
                        <td className="px-4 py-3">
                          <p className="font-medium text-slate-900">{asset.name}</p>
                          <p className="text-xs text-slate-500">
                            {asset.id} · {asset.serial}
                          </p>
                        </td>
                        <td className="px-4 py-3 text-slate-600">{asset.category}</td>
                        <td className="px-4 py-3 text-slate-600">{asset.location}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusStyles(
                              asset.status,
                            )}`}
                          >
                            {asset.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          {asset.assignedTo ?? "—"}
                        </td>
                        <td className="px-4 py-3 text-right">
                          {asset.status === "Available" && (
                            <button
                              type="button"
                              onClick={() =>
                                changeStatus(
                                  asset,
                                  "Checked Out",
                                  "Current User",
                                  `${asset.name} checked out`,
                                )
                              }
                              className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-indigo-500"
                            >
                              Check out
                            </button>
                          )}
                          {asset.status === "Checked Out" && (
                            <button
                              type="button"
                              onClick={() =>
                                changeStatus(
                                  asset,
                                  "Available",
                                  null,
                                  `${asset.name} returned`,
                                )
                              }
                              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
                            >
                              Check in
                            </button>
                          )}
                          {asset.status === "Maintenance" && (
                            <button
                              type="button"
                              onClick={() =>
                                changeStatus(
                                  asset,
                                  "Available",
                                  null,
                                  `${asset.name} marked available after repair`,
                                )
                              }
                              className="rounded-lg border border-emerald-300 bg-white px-3 py-1.5 text-xs font-medium text-emerald-700 transition hover:bg-emerald-50"
                            >
                              Mark repaired
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-4 py-10 text-center text-slate-500">
                          No assets match your filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">Recent activity</h2>
              <p className="mt-1 text-xs text-slate-500">
                Demo actions are stored in your browser.
              </p>
              <ul className="mt-4 space-y-3">
                {mounted && activity.length === 0 && (
                  <li className="rounded-lg bg-slate-50 px-3 py-3 text-sm text-slate-500">
                    No activity yet. Check out an asset to see it here.
                  </li>
                )}
                {mounted &&
                  activity.map((entry) => (
                    <li
                      key={entry.id}
                      className="rounded-lg border border-slate-100 bg-slate-50/60 px-3 py-2"
                    >
                      <p className="text-sm text-slate-700">{entry.message}</p>
                      <p className="mt-0.5 text-xs text-slate-400">
                        {new Date(entry.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </li>
                  ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5">
              <h2 className="text-sm font-semibold text-indigo-900">
                About this prototype
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-indigo-900/70">
                UniAsset centralizes equipment tracking across the university.
                This demo uses mock data and browser storage; a live database can
                be added in the next phase.
              </p>
            </div>
          </aside>
        </section>

        <footer className="pb-4 text-center text-xs text-slate-400">
          UniAsset — IS Project Management Prototype · Built with Next.js ·
          Deployed on Vercel
        </footer>
      </main>
    </div>
  );
}
