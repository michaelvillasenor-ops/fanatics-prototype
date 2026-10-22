import { Text } from "./Text";

export interface ListRowProps {
  title: string;
  subtitle?: string;
  /** Image URL; falls back to a neutral tile (never initials-on-gradient). */
  image?: string;
  /** Right-aligned value (a price, a payout). Rendered with tabular figures. */
  meta?: string;
  onClick?: () => void;
}

export function ListRow({ title, subtitle, image, meta, onClick }: ListRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-3)",
        width: "100%",
        minHeight: "var(--touch-target)",
        padding: "var(--space-2) 0",
        background: "none",
        border: "none",
        textAlign: "left",
        color: "inherit",
        font: "inherit",
        cursor: onClick ? "pointer" : "default",
      }}
    >
      <div
        aria-hidden
        style={{
          width: 48,
          height: 48,
          flexShrink: 0,
          borderRadius: "var(--radius-sm)",
          background: image ? `center / cover url(${image})` : "var(--color-surface-raised)",
        }}
      />
      <span style={{ display: "flex", flexDirection: "column", minWidth: 0, flex: 1 }}>
        <Text variant="body-lg">{title}</Text>
        {subtitle && <Text variant="caption" subdued>{subtitle}</Text>}
      </span>
      {meta && (
        <span style={{ flexShrink: 0, fontVariantNumeric: "tabular-nums" }}>
          <Text variant="body">{meta}</Text>
        </span>
      )}
    </button>
  );
}
