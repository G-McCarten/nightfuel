"use client";

/**
 * Last-resort fallback: this replaces the root layout, so it ships its own
 * <html>/<body> and cannot rely on globals.css being applied. Deliberately
 * minimal, with inline styles only.
 */
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          padding: "2rem",
          textAlign: "center",
          background: "#0A0A0F",
          color: "#FFFFFF",
          fontFamily:
            "ui-sans-serif, system-ui, 'Segoe UI', Helvetica, Arial, sans-serif",
        }}
      >
        <h1 style={{ fontSize: "1.75rem", fontStyle: "italic", margin: 0 }}>
          Something went wrong.
        </h1>
        <p style={{ color: "#A0A3B1", margin: 0 }}>
          Please reload the page. If it keeps happening, try again later.
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            marginTop: "0.5rem",
            padding: "0.625rem 1.25rem",
            borderRadius: "0.5rem",
            border: "none",
            background: "#2F6BFF",
            color: "#FFFFFF",
            fontSize: "0.9375rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
