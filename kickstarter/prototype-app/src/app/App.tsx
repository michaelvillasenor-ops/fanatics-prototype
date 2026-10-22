import { useEffect, useState } from "react";
import { useConfig } from "./useConfig";
import { DeviceFrame } from "./DeviceFrame";
import { Prototype } from "../Prototype";
import { TokensRoute } from "../tokens/TokensRoute";
import { LinksRoute } from "../demo/LinksRoute";
import { ControlPanel } from "../demo/ControlPanel";
import { HelpOverlay } from "../demo/HelpOverlay";
import { Onboarding } from "../demo/Onboarding";
import type { PrototypeConfig } from "./config";

declare global {
  interface Window {
    /** Test bridge: read by scripts/verify-*.mjs for assertions. Extend as the prototype grows. */
    __proto?: {
      config: PrototypeConfig;
      setConfig: (patch: Partial<PrototypeConfig>) => void;
      ready: boolean;
    };
  }
}

export function App() {
  const [config, setConfig] = useConfig();
  const [panelOpen, setPanelOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [onboarded, setOnboarded] = useState(
    () => localStorage.getItem("proto:onboarded") === "1",
  );

  useEffect(() => {
    document.documentElement.dataset.theme = config.theme;
    document.documentElement.classList.toggle("is-present", config.present);
  }, [config.theme, config.present]);

  useEffect(() => {
    window.__proto = { config, setConfig, ready: true };
  }, [config, setConfig]);

  // Same keyboard map in normal and presenter modes.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "p" || e.key === "P") setPanelOpen((o) => !o);
      if (e.key === "?") setHelpOpen((o) => !o);
      if (e.key === "Escape") {
        setPanelOpen(false);
        setHelpOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (config.page === "tokens") return <TokensRoute />;
  if (config.page === "links") return <LinksRoute />;

  const showOnboarding = config.onboard && !config.present && !onboarded;
  const screen = <Prototype config={config} />;

  return (
    <div className="stage">
      {config.frame ? <DeviceFrame>{screen}</DeviceFrame> : screen}
      {!config.present && (
        <ControlPanel open={panelOpen} config={config} setConfig={setConfig} />
      )}
      {helpOpen && <HelpOverlay onClose={() => setHelpOpen(false)} />}
      {showOnboarding && (
        <Onboarding
          onDone={() => {
            localStorage.setItem("proto:onboarded", "1");
            setOnboarded(true);
          }}
        />
      )}
      {config.debug && (
        <pre className="debug-hud" aria-hidden>
          {JSON.stringify(config, null, 2)}
        </pre>
      )}
    </div>
  );
}
