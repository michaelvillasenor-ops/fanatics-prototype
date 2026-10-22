import type { ReactNode } from "react";

/** Spacing props only accept scale steps, so off-grid values are unrepresentable. */
export type Space = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface StackProps {
  gap?: Space;
  direction?: "column" | "row";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between";
  padding?: Space;
  children: ReactNode;
}

const justifyMap = { start: "flex-start", center: "center", end: "flex-end", between: "space-between" } as const;
const alignMap = { start: "flex-start", center: "center", end: "flex-end", stretch: "stretch" } as const;

export function Stack({ gap = 3, direction = "column", align = "stretch", justify = "start", padding, children }: StackProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: direction,
        gap: `var(--space-${gap})`,
        alignItems: alignMap[align],
        justifyContent: justifyMap[justify],
        padding: padding ? `var(--space-${padding})` : undefined,
      }}
    >
      {children}
    </div>
  );
}
