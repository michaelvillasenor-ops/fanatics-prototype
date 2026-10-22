import { configToHref, defaultConfig, type PrototypeConfig } from "../app/config";
import { Stack, Text } from "../components";

// Canonical configurations: the deep-link sheet (?page=links). Add a row for
// every state a reviewer should be able to open in one click.
const links: { label: string; config: Partial<PrototypeConfig> }[] = [
  { label: "Default (variant A)", config: {} },
  { label: "Variant B", config: { variant: "b" } },
  { label: "Empty state", config: { state: "empty" } },
  { label: "Loading state", config: { state: "loading" } },
  { label: "Error state", config: { state: "error" } },
  { label: "Light theme", config: { theme: "light" } },
  { label: "Odds as percentage", config: { odds: "percent" } },
  { label: "Odds as multiplier", config: { odds: "multiplier" } },
  { label: "Presenter mode", config: { present: true } },
  { label: "Token preview", config: { page: "tokens" } },
];

export function LinksRoute() {
  return (
    <main className="page">
      <Stack gap={5}>
        <Text variant="headline" as="h1">Links</Text>
        {links.map((l) => {
          const href = configToHref({ ...defaultConfig, onboard: false, ...l.config });
          const abs = new URL(href, window.location.href).toString();
          return (
            <Stack key={l.label} direction="row" gap={3} align="center">
              <a href={href} style={{ color: "var(--color-accent)", minWidth: 200 }}>{l.label}</a>
              <code style={{ color: "var(--color-text-subdued)" }}>{href}</code>
              <button type="button" onClick={() => navigator.clipboard?.writeText(abs)}>Copy</button>
            </Stack>
          );
        })}
      </Stack>
    </main>
  );
}
