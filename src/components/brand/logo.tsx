import Image from "next/image";
import { cn } from "@/lib/utils";
import { LOGO_ASSETS } from "./logo-assets";

export type LogoVariant = "badge" | "mark" | "wordmark";

/**
 * Sources and intrinsic sizes come from `pnpm icons`, which trims each lockup
 * and writes out the exact dimensions. They reserve the right box before the
 * image loads, which is what keeps the header from shifting.
 */
const VARIANTS = LOGO_ASSETS;

type LogoProps = {
  variant?: LogoVariant;
  className?: string;
  /**
   * Pass `""` when the logo sits inside something that already names it (a link
   * with visible text, for instance) — it then becomes decorative.
   */
  alt?: string;
  priority?: boolean;
};

export function Logo({
  variant = "wordmark",
  className,
  alt = "NightFuel",
  priority = false,
}: LogoProps) {
  const { src, width, height } = VARIANTS[variant];

  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt={alt}
      priority={priority}
      // The lockups are already sized to their use; letting the optimizer
      // resample them is what keeps the header wordmark crisp on retina.
      sizes="(max-width: 640px) 50vw, 560px"
      className={cn("h-auto w-auto select-none", className)}
    />
  );
}
