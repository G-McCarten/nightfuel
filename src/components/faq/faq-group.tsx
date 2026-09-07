import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqItem } from "@/content/types";

export function FaqGroup({
  title,
  items,
  headingId,
}: {
  title: string;
  items: FaqItem[];
  headingId: string;
}) {
  return (
    <section aria-labelledby={headingId}>
      <h2 id={headingId} className="display mb-6 text-2xl sm:text-3xl">
        {title}
      </h2>

      <Accordion type="multiple" className="w-full">
        {items.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger className="text-left text-base">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="space-y-3">
              {item.isPlaceholder && (
                <span className="inline-block rounded-full border border-hairline px-2.5 py-1 text-xs font-medium text-muted">
                  Answer coming soon
                </span>
              )}
              <p className="text-muted">{item.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
