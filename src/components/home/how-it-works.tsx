import { Section } from "@/components/layout/section";
import { homeCopy } from "@/content/copy/home";

export function HowItWorks() {
  const { title, steps } = homeCopy.howItWorks;

  return (
    <Section aria-labelledby="how-it-works">
      <h2 id="how-it-works" className="display mb-10 text-3xl sm:text-4xl">
        {title}
      </h2>

      <ol className="grid gap-6 sm:grid-cols-3">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="rounded-xl border border-hairline bg-surface p-6"
          >
            <span
              aria-hidden="true"
              className="display block text-2xl text-neon-violet"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm text-muted">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
