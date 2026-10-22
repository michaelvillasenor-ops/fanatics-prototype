import type { ReactNode } from "react";

export interface ButtonProps {
  /** One primary per surface. Everything else is secondary or tertiary. */
  kind?: "primary" | "secondary" | "tertiary";
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
}

export function Button({ kind = "secondary", onClick, disabled, children }: ButtonProps) {
  const base = {
    minHeight: "var(--touch-target)",
    padding: "0 var(--space-5)",
    borderRadius: "var(--radius-pill)",
    font: "inherit",
    fontWeight: "var(--font-weight-bold)",
    cursor: disabled ? "default" : "pointer",
    opacity: disabled ? 0.4 : 1,
    transition: "transform var(--motion-fast) var(--ease-enter)",
  } as const;
  const byKind = {
    primary: { background: "var(--color-accent)", color: "var(--color-on-accent)", border: "none" },
    secondary: { background: "transparent", color: "var(--color-text)", border: "1px solid var(--color-border)" },
    tertiary: { background: "transparent", color: "var(--color-text-subdued)", border: "none" },
  }[kind];
  return (
    <button type="button" onClick={onClick} disabled={disabled} style={{ ...base, ...byKind }}>
      {children}
    </button>
  );
}
