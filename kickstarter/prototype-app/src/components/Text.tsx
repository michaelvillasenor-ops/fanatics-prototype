import type { CSSProperties, ElementType, ReactNode } from "react";

/** Named text styles only. Add a variant here instead of inlining a font-size. */
export type TextVariant = "headline" | "title" | "body-lg" | "body" | "caption";

const styles: Record<TextVariant, CSSProperties> = {
  headline: { fontSize: "var(--font-size-headline)", fontWeight: "var(--font-weight-bold)", lineHeight: "var(--line-height-tight)" },
  title: { fontSize: "var(--font-size-title)", fontWeight: "var(--font-weight-bold)", lineHeight: "var(--line-height-tight)" },
  "body-lg": { fontSize: "var(--font-size-body-lg)" },
  body: { fontSize: "var(--font-size-body)" },
  caption: { fontSize: "var(--font-size-caption)" },
};

export interface TextProps {
  variant?: TextVariant;
  /** Subdued color for secondary information. */
  subdued?: boolean;
  as?: ElementType;
  children: ReactNode;
}

export function Text({ variant = "body", subdued, as: As = "span", children }: TextProps) {
  return (
    <As
      style={{
        ...styles[variant],
        margin: 0,
        color: subdued ? "var(--color-text-subdued)" : "var(--color-text)",
      }}
    >
      {children}
    </As>
  );
}
