export default function AuroraBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden"
    >
      <div className="animate-float-slow absolute -left-32 -top-40 h-[30rem] w-[30rem] rounded-full bg-violet-600/30 blur-[130px]" />
      <div className="animate-float-slower absolute -right-40 top-1/4 h-[34rem] w-[34rem] rounded-full bg-cyan-500/20 blur-[140px]" />
      <div className="animate-float-slow absolute bottom-0 left-1/3 h-[28rem] w-[28rem] rounded-full bg-amber-500/15 blur-[130px]" />
    </div>
  );
}
