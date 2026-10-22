import { Button, Stack, Text, type TextVariant } from "../components";

const colors = ["bg", "surface", "surface-raised", "text", "text-subdued", "text-tertiary", "border", "accent", "on-accent", "link", "positive", "negative", "warning", "fancash"];
const spaces = [1, 2, 3, 4, 5, 6, 7];
const textVariants: TextVariant[] = ["headline", "title", "body-lg", "body", "caption"];

/** ?page=tokens: every token and primitive on one page. Check it after mapping a design system. */
export function TokensRoute() {
  return (
    <main className="page">
      <Stack gap={6}>
        <Text variant="headline" as="h1">Tokens</Text>
        <Stack gap={3}>
          <Text variant="title" as="h2">Color</Text>
          <Stack direction="row" gap={3}>
            {colors.map((c) => (
              <Stack key={c} gap={1} align="center">
                <div style={{ width: 64, height: 64, borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", background: `var(--color-${c})` }} />
                <Text variant="caption" subdued>{c}</Text>
              </Stack>
            ))}
          </Stack>
        </Stack>
        <Stack gap={3}>
          <Text variant="title" as="h2">Spacing</Text>
          {spaces.map((s) => (
            <Stack key={s} direction="row" gap={3} align="center">
              <Text variant="caption" subdued>--space-{s}</Text>
              <div style={{ height: 12, width: `var(--space-${s})`, background: "var(--color-accent)" }} />
            </Stack>
          ))}
        </Stack>
        <Stack gap={3}>
          <Text variant="title" as="h2">Type</Text>
          {textVariants.map((v) => <Text key={v} variant={v}>{v}: The quick brown fox</Text>)}
        </Stack>
        <Stack gap={3}>
          <Text variant="title" as="h2">Buttons</Text>
          <Stack direction="row" gap={3}>
            <Button kind="primary">Primary</Button>
            <Button kind="secondary">Secondary</Button>
            <Button kind="tertiary">Tertiary</Button>
          </Stack>
        </Stack>
      </Stack>
    </main>
  );
}
