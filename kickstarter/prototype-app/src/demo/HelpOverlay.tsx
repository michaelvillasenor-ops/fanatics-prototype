import { copy } from "./copy";

const keys: [string, string][] = [
  ["P", "Toggle controls"],
  ["?", "Toggle this help"],
  ["Esc", "Close overlays"],
];

export function HelpOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div className="overlay" role="dialog" aria-label={copy.tooling.helpTitle} onClick={onClose}>
      <div className="overlay-card">
        <strong>{copy.tooling.helpTitle}</strong>
        <dl>
          {keys.map(([k, v]) => (
            <div key={k} style={{ display: "flex", gap: "var(--space-4)" }}>
              <dt style={{ width: 48 }}><kbd>{k}</kbd></dt>
              <dd style={{ margin: 0 }}>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
