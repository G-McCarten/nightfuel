import { CircleCheckIcon } from "lucide-react";

/**
 * Replaces the form on success. There is no confirmation email — this on-page
 * message is the confirmation the submitter gets.
 */
export function FormSuccess({ onReset }: { onReset: () => void }) {
  return (
    <div
      role="status"
      className="rounded-xl border border-neon-blue/40 bg-surface p-8"
    >
      <CircleCheckIcon aria-hidden className="size-7 text-neon-blue" />
      <h3 className="display mt-4 text-2xl">Got it.</h3>
      <p className="mt-2 text-muted">
        We&apos;ll be in touch within 2 business days.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-5 text-sm font-semibold text-neon-blue hover:underline"
      >
        Send another message
      </button>
    </div>
  );
}
