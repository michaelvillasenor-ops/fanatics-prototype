# Usability checklist: heuristics with a brand lens, plus bar-raisers

The usability lens for `/design-ship`. Mark each item ✅ pass, ⚠️ caveat, or ❌ fail. Fails
become blockers; caveats become strong recommendations.

> Customize the examples in quotes to your product's terminology. Add team-specific bar-raisers
> as `/skill-refine` surfaces them.

## Nielsen's ten heuristics

1. **Visibility of system status.** Loading uses the design system's spinners or skeletons.
   Long-running actions give feedback within ~150ms. Use optimistic UI where the action is
   reversible.
2. **Match with the real world.** Words match the product's terminology (`systems/writing.md`),
   not internal jargon.
3. **User control and freedom.** Destructive actions are reversible (undo) or confirmed. Sheets
   and modals can always be dismissed (handle, swipe, Escape).
4. **Consistency and standards.** Design-system components are used consistently, with no
   parallel implementations of the same control. Patterns match the live product.
5. **Error prevention.** Confirm destructive actions, validate inline before submit, and use smart
   defaults.
6. **Recognition rather than recall.** Don't make the user carry context across screens.
7. **Flexibility and efficiency.** Shortcuts and gestures for power users that don't confuse
   novices.
8. **Aesthetic and minimalist design.** Restraint. Hero moments are earned. Content carries the
   visual weight.
9. **Recognize, diagnose, recover from errors.** Plain-language problem plus a next step. No error
   codes alone, and no blame.
10. **Help and documentation.** First-run hints only where genuinely needed, and never required for
    the core path.

## Bar-raisers

- **Real content.** No lorem ipsum or "Name Here" placeholders. It holds up against varied, messy
  real content.
- **Contrast in real conditions.** Check the surface with the actual imagery and on a bright
  screen, not only with a contrast checker.
- **Motion / reduced-motion parity.** Every motion-driven hierarchy has a static equivalent.
- **Cross-locale spot-check.** +30% text expansion (German, French) and RTL (Arabic, Hebrew): no
  truncation, no clipped buttons.
- **Screen-reader walk-through**, top to bottom. Headings and links read on their own, decorative
  images are hidden, and content images have alt text.
- **Touch targets** are at least `44px`, with hit zones that don't overlap.
- **Empty, error, and loading states** exist for every list, search, and feed. The empty state
  teaches.
- **Offline or poor connection.** It degrades gracefully without losing user state.
- **One primary CTA per surface.**
- **Honesty.** Anything mocked is labeled as such wherever the audience could mistake it for real.

## Anti-patterns to flag immediately

- "Oops" or blame in error copy.
- String concatenation or pluralization that won't survive translation.
- Text baked into images.
- Modals nested in modals.
- Forms longer than necessary.
- Animations that hijack scroll or block input for more than 500ms.
- A hero treatment on an everyday utility surface.
