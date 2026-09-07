import { cn } from "@/lib/utils";
import { Container } from "./container";

type SectionProps = React.ComponentProps<"section"> & {
  /** Set false to lay out the section's own full-bleed background. */
  contained?: boolean;
  containerClassName?: string;
};

/** Vertical rhythm between page bands, with the standard container inside. */
export function Section({
  className,
  contained = true,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn("py-16 sm:py-24", className)} {...props}>
      {contained ? (
        <Container className={containerClassName}>{children}</Container>
      ) : (
        children
      )}
    </section>
  );
}
