import { useCallback, useEffect, useState } from "react";
import { parseConfig, serializeConfig, type PrototypeConfig } from "./config";

/** Config state that stays in sync with the URL (replaceState, so Back isn't spammed). */
export function useConfig() {
  const [config, setConfig] = useState<PrototypeConfig>(() =>
    parseConfig(new URLSearchParams(window.location.search)),
  );

  useEffect(() => {
    const onPop = () => setConfig(parseConfig(new URLSearchParams(window.location.search)));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const update = useCallback((patch: Partial<PrototypeConfig>) => {
    setConfig((prev) => {
      const next = { ...prev, ...patch };
      const qs = serializeConfig(next).toString();
      window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
      return next;
    });
  }, []);

  return [config, update] as const;
}
