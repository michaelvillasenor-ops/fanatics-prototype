import type { PrototypeConfig } from "./app/config";
import { Button, ListRow, Stack, Text } from "./components";
import { formatPrice, formatUsd, quoteBuy } from "./data/fmx";
import { useData } from "./data/useData";
import { copy } from "./demo/copy";

/**
 * The starting canvas: an FMX Portfolio-style example that exercises the harness
 * (data states, one variant flag, the odds-format flag, copy file, primitives).
 * Replace it with your concept, but keep the rule: every variant renders through
 * THIS tree, branching on config. Never add a separate <PrototypeB/>; separate
 * components remount state on switch.
 */
export function Prototype({ config }: { config: PrototypeConfig }) {
  const data = useData(config.state);

  if (data.status === "loading") {
    return (
      <div className="screen" role="status" aria-live="polite">
        <Text subdued>{copy.loading}</Text>
      </div>
    );
  }

  if (data.status === "error") {
    return (
      <div className="screen">
        <Stack gap={4}>
          <Text variant="title" as="h1">{copy.error.title}</Text>
          <Text subdued>{copy.error.body}</Text>
          <Button kind="primary">{copy.error.cta}</Button>
        </Stack>
      </div>
    );
  }

  const { portfolio } = data;
  const rows = portfolio.positions.map((p) => ({ position: p, quote: quoteBuy(p.contracts, p.priceCents) }));
  const largest = [...rows].sort((a, b) => b.quote.totalCents - a.quote.totalCents)[0];

  return (
    <div className="screen" data-testid="home" data-variant={config.variant}>
      <Stack gap={5}>
        <Text variant="headline" as="h1">{copy.home.greeting(portfolio.name)}</Text>

        {config.variant === "b" && largest && (
          <div style={{ padding: "var(--space-4)", borderRadius: "var(--radius-lg)", background: "var(--color-surface)" }}>
            <Stack gap={2}>
              <Text variant="caption" subdued>{copy.variantB.banner}</Text>
              <ListRow
                title={`${largest.position.market}: ${largest.position.outcome}`}
                subtitle={copy.variantB.costLine(formatUsd(largest.quote.totalCents), formatUsd(largest.quote.feeCents))}
                meta={copy.home.pays(formatUsd(largest.quote.paysCents))}
              />
            </Stack>
          </div>
        )}

        {rows.length === 0 ? (
          // Design the empty state first: it is often the most common one, and it teaches.
          <Stack gap={3} align="start">
            <Text variant="title" as="h2">{copy.empty.title}</Text>
            <Text subdued>{copy.empty.body}</Text>
            <Button kind="primary">{copy.empty.cta}</Button>
          </Stack>
        ) : (
          <Stack gap={2}>
            <Stack direction="row" justify="between" align="center">
              <Text variant="title" as="h2">{copy.home.sectionTitle}</Text>
              <Button kind="primary">{copy.home.primaryCta}</Button>
            </Stack>
            {rows.map(({ position: p, quote }) => (
              <ListRow
                key={p.id}
                title={`${p.market}: ${p.outcome}`}
                subtitle={copy.home.positionSubtitle(p.contracts.toLocaleString("en-US"), formatPrice(p.priceCents, config.odds))}
                meta={copy.home.pays(formatUsd(quote.paysCents))}
              />
            ))}
          </Stack>
        )}
      </Stack>
    </div>
  );
}
