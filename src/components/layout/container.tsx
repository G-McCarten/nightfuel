import { cn } from "@/lib/utils";

/** The site's single horizontal rhythm: one max width, one gutter. */
export function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}
      {...props}
    />
  );
}
