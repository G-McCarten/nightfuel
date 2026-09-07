import {
  ClockIcon,
  IdCardIcon,
  PlugIcon,
  RulerIcon,
  TrendingUpIcon,
  WrenchIcon,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  TrendingUp: TrendingUpIcon,
  Clock: ClockIcon,
  Wrench: WrenchIcon,
  Ruler: RulerIcon,
  Plug: PlugIcon,
  IdCard: IdCardIcon,
};

export type ValueProp = {
  readonly icon: string;
  readonly title: string;
  readonly body: string;
};

/** Icon + heading + line. Used for both "why venues say yes" and the spec list. */
export function ValueProps({
  items,
  accent = "blue",
}: {
  items: readonly ValueProp[];
  accent?: "blue" | "violet";
}) {
  return (
    <ul className="grid gap-6 sm:grid-cols-3">
      {items.map((item) => {
        const Icon = ICONS[item.icon] ?? TrendingUpIcon;
        return (
          <li key={item.title} className="space-y-3">
            <Icon
              aria-hidden
              className={
                accent === "blue"
                  ? "size-6 text-neon-blue"
                  : "size-6 text-neon-violet"
              }
            />
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-sm text-muted">{item.body}</p>
          </li>
        );
      })}
    </ul>
  );
}
