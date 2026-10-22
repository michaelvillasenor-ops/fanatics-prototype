import type { OddsFormat } from "../data/fmx";

// Every behavioral difference between variants and states is a config flag.
// The full configuration serializes to URL query params: a link is a complete,
// reproducible setup. Add new flags here (type + default + parse + serialize),
// never as ad-hoc component state that a URL can't reproduce.

export type Page = "home" | "tokens" | "links";
export type Variant = "a" | "b";
export type DataState = "default" | "empty" | "loading" | "error";
export type Theme = "dark" | "light";

export interface PrototypeConfig {
  /** Which route to render. Query routing (not pathnames) survives any static-host subpath. */
  page: Page;
  /** The treatment under test. Every variant renders through the SAME component tree. */
  variant: Variant;
  /** Force a data state, so empty/loading/error are one link away. */
  state: DataState;
  theme: Theme;
  /** How prices render: 48¢, 48% or 2.08x. Same number underneath (cents). */
  odds: OddsFormat;
  /** Render inside the device frame (off for full-bleed captures or desktop work). */
  frame: boolean;
  /** Presenter mode: hide tooling and auto-hide the cursor. */
  present: boolean;
  /** Debug HUD. */
  debug: boolean;
  /** First-run onboarding. Tests and captures always pass onboard=0. */
  onboard: boolean;
}

export const defaultConfig: PrototypeConfig = {
  page: "home",
  variant: "a",
  state: "default",
  theme: "dark",
  odds: "cents",
  frame: true,
  present: false,
  debug: false,
  onboard: true,
};

const oneOf =
  <T extends string>(values: readonly T[]) =>
  (raw: string | null, fallback: T): T =>
    values.includes(raw as T) ? (raw as T) : fallback;

const pageOf = oneOf<Page>(["home", "tokens", "links"]);
const variantOf = oneOf<Variant>(["a", "b"]);
const stateOf = oneOf<DataState>(["default", "empty", "loading", "error"]);
const themeOf = oneOf<Theme>(["dark", "light"]);
const oddsOf = oneOf<OddsFormat>(["cents", "percent", "multiplier"]);

const bool = (raw: string | null, fallback: boolean): boolean =>
  raw === null ? fallback : raw !== "0";

export function parseConfig(params: URLSearchParams): PrototypeConfig {
  const d = defaultConfig;
  return {
    page: pageOf(params.get("page"), d.page),
    variant: variantOf(params.get("variant"), d.variant),
    state: stateOf(params.get("state"), d.state),
    theme: themeOf(params.get("theme"), d.theme),
    odds: oddsOf(params.get("odds"), d.odds),
    frame: bool(params.get("frame"), d.frame),
    present: bool(params.get("present"), d.present),
    debug: bool(params.get("debug"), d.debug),
    onboard: bool(params.get("onboard"), d.onboard),
  };
}

/** Only non-default values are written, so shared links stay readable. */
export function serializeConfig(c: PrototypeConfig): URLSearchParams {
  const p = new URLSearchParams();
  const d = defaultConfig;
  const set = (key: string, value: string, def: string) => {
    if (value !== def) p.set(key, value);
  };
  const b = (v: boolean) => (v ? "1" : "0");
  set("page", c.page, d.page);
  set("variant", c.variant, d.variant);
  set("state", c.state, d.state);
  set("theme", c.theme, d.theme);
  set("odds", c.odds, d.odds);
  set("frame", b(c.frame), b(d.frame));
  set("present", b(c.present), b(d.present));
  set("debug", b(c.debug), b(d.debug));
  set("onboard", b(c.onboard), b(d.onboard));
  return p;
}

export function configToHref(c: PrototypeConfig): string {
  const qs = serializeConfig(c).toString();
  return qs ? `?${qs}` : "./";
}
