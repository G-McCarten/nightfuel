import { cn } from "@/lib/utils";

/**
 * Two blurred colour washes behind a section. Purely decorative, so it's
 * hidden from assistive tech and sits behind content on its own layer. The
 * drift animation only runs for visitors who haven't asked for reduced motion.
 */
export function GlowBg({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      <div
        className="nf-blob top-[-20%] left-[-10%] h-[26rem] w-[26rem]"
        style={{ background: "var(--blue)" }}
      />
      <div
        className="nf-blob right-[-10%] bottom-[-30%] h-[30rem] w-[30rem]"
        style={{ background: "var(--violet)" }}
      />
    </div>
  );
}
