import { Button, Stack, Text } from "../components";
import { copy } from "./copy";

/** First-run only (localStorage). Tests and captures pass onboard=0; presenter mode skips it. */
export function Onboarding({ onDone }: { onDone: () => void }) {
  return (
    <div className="overlay" role="dialog" aria-label={copy.tooling.onboardingTitle}>
      <div className="overlay-card">
        <Stack gap={4}>
          <Text variant="title">{copy.tooling.onboardingTitle}</Text>
          <Text subdued>{copy.tooling.onboardingBody}</Text>
          <Button kind="primary" onClick={onDone}>{copy.tooling.onboardingCta}</Button>
        </Stack>
      </div>
    </div>
  );
}
