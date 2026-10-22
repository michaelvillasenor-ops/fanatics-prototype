# VARIANT-CONTRACT — rules for parallel agents building variants

Each agent builds exactly one variant. The orchestrator has pre-assigned folders, export names,
and IDs.

1. **Write only inside your folder:** `src/variants/<your-id>/`. Touch nothing else.
2. **Keep the export name** `<VariantX>` and the props interface exactly as given.
3. **Don't start or stop the dev server.** The orchestrator owns it on :<port>.
4. **Typecheck before reporting:** `npm run typecheck`, and report the output.
5. **Use only the shared primitives** listed below, plus tokens. No new shared components; if you
   need one, say so in your report.
6. All copy goes in `src/demo/copy.ts` under `variants.<your-id>`. Add your keys only.

## Shared primitive APIs
```ts
// paste the signatures of Text, Stack, Button, … here
```

## After all agents report
The orchestrator runs a **mount audit** (grep the imports) to confirm every variant is actually
rendered, then `npm run verify`.
