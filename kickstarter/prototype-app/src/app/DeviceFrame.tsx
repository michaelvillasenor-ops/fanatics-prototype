import type { ReactNode } from "react";

/**
 * Mobile-first viewport at 393×852 by default. Change the CSS variables in
 * app.css (--frame-w / --frame-h) for desktop work, or pass frame=0.
 * Everything that uses tokens must render INSIDE the theme root (html);
 * portals mounted elsewhere silently lose every CSS variable.
 */
export function DeviceFrame({ children }: { children: ReactNode }) {
  return (
    <div className="device-frame" data-testid="device-frame">
      <div className="device-screen">{children}</div>
    </div>
  );
}
