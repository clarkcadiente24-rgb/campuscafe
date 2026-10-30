export default function LogoMark({ size = "md" }: { size?: "sm" | "md" }) {
  const dimensions = size === "sm" ? "h-9 w-9" : "h-10 w-10";
  return (
    <div
      className={`flex ${dimensions} items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 shadow-lg shadow-orange-900/40 ring-1 ring-white/25`}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 9h12v5a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V9Z" />
        <path d="M16 10h2a2 2 0 0 1 0 4h-2" />
        <path d="M7 5c0-1 1-1 1-2M11 5c0-1 1-1 1-2" />
        <path d="M4 21h12" />
      </svg>
    </div>
  );
}
