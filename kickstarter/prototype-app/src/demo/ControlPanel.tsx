import type { PrototypeConfig } from "../app/config";
import { copy } from "./copy";

interface Props {
  open: boolean;
  config: PrototypeConfig;
  setConfig: (patch: Partial<PrototypeConfig>) => void;
}

type Option<K extends keyof PrototypeConfig> = { key: K; label: string; values: PrototypeConfig[K][] };

const options = [
  { key: "variant", label: "Variant", values: ["a", "b"] },
  { key: "state", label: "Data state", values: ["default", "empty", "loading", "error"] },
  { key: "theme", label: "Theme", values: ["dark", "light"] },
  { key: "odds", label: "Odds format", values: ["cents", "percent", "multiplier"] },
] as const satisfies readonly Option<keyof PrototypeConfig>[];

/** Dev-only controls (P). Every control writes a URL flag; nothing here is hidden state. */
export function ControlPanel({ open, config, setConfig }: Props) {
  return (
    <aside className={`control-panel${open ? " control-panel--open" : ""}`} aria-hidden={!open}>
      <strong>{copy.tooling.panelTitle}</strong>
      {options.map((o) => (
        <fieldset key={o.key}>
          <legend>{o.label}</legend>
          {o.values.map((v) => (
            <label key={v} style={{ marginRight: "var(--space-3)" }}>
              <input
                type="radio"
                name={o.key}
                checked={config[o.key] === v}
                onChange={() => setConfig({ [o.key]: v } as Partial<PrototypeConfig>)}
              />{" "}
              {v}
            </label>
          ))}
        </fieldset>
      ))}
      <label>
        <input type="checkbox" checked={config.frame} onChange={(e) => setConfig({ frame: e.target.checked })} /> Device frame
      </label>
    </aside>
  );
}
