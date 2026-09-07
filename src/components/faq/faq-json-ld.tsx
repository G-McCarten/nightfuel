import { getAnsweredFaq } from "@/lib/content";

/**
 * FAQPage structured data, built only from questions that have a real answer.
 * Every answer is a placeholder at launch, so this renders nothing — it starts
 * emitting as soon as the owner fills answers in and flips `isPlaceholder`.
 */
export function FaqJsonLd() {
  const answered = getAnsweredFaq();
  if (answered.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: answered.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <script
      type="application/ld+json"
      // Serialised server-side from our own content module, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
