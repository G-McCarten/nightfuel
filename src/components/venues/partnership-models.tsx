import { CheckIcon } from "lucide-react";
import { forVenuesCopy } from "@/content/copy/for-venues";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PartnershipModels() {
  const { items, footnote } = forVenuesCopy.models;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((model) => (
          <Card key={model.name} className="h-full">
            <CardHeader>
              <p className="text-xs font-semibold tracking-wider text-neon-violet uppercase">
                {model.tagline}
              </p>
              <CardTitle className="display text-2xl">{model.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted">{model.description}</p>
              <ul className="space-y-2">
                {model.points.map((point) => (
                  <li key={point} className="flex gap-2 text-sm">
                    <CheckIcon
                      aria-hidden
                      className="mt-0.5 size-4 shrink-0 text-neon-blue"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="text-sm text-muted">{footnote}</p>
    </div>
  );
}
