import Image from "next/image";

export default function LogoMark({ size = "md" }: { size?: "sm" | "md" }) {
  const dimensions = size === "sm" ? "h-9 w-9" : "h-10 w-10";
  return (
    <span
      className={`relative block ${dimensions} overflow-hidden rounded-xl shadow-lg shadow-black/40 ring-1 ring-white/15`}
    >
      <Image
        src="/logo.png"
        alt=""
        fill
        sizes="40px"
        priority
        className="object-cover"
      />
    </span>
  );
}
