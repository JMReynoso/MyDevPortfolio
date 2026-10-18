# Hidden Content

**Hidden** content stays in the codebase, but visitors can neither see nor reach it. It's kept so it can be restored later (see **Hidden** in `GLOSSARY.md`). Each entry below says what the item is, why it's Hidden, where it lives in code, and how to bring it back.

## Services page

**What it is:** the `/services` page, which lists the owner's freelance Services (productized Services, Services in batches, retainer plans and custom projects), and its Services item in the desktop and mobile navigation.

**Why it's Hidden:** the owner isn't freelancing yet, so the site shouldn't advertise a Service they can't take on. It stays Hidden until they start a freelance business.

**Where it lives:**

- The switch: `features.services` in `src/constants/features.ts`. It's `false` while the page is Hidden.
- The route: `src/routes.ts` registers the `services` route only while the switch is on. While it's off, `/services` matches no route and shows React Router's default error screen, the same as any unknown URL.
- The nav link: `navigationLinks` in `src/pages/Layout.tsx` includes Services only while the switch is on.
- Still in place and still tested, so nothing else needs restoring:
  - the page, `src/pages/Services.tsx` (tested by `test/Services.test.tsx`);
  - the card, `src/components/features/ServiceCard.tsx`;
  - the data, `src/data/services.tsx`;
  - the `/services` entry in the Layout's active-section mapping, in `src/pages/Layout.tsx`;
  - the Services nav icon in `iconMap`, in `src/components/layout/Navigation.tsx`.

**How to restore it:**

1. Set `services: true` in `src/constants/features.ts`.
2. Add `https://justinreynoso.dev/services` to `public/sitemap.xml`.
3. Update the two tests that pin Services as Hidden. Both fail once the switch is on, on purpose:
   - `test/Layout.test.tsx`, "does not render a Services link while Services is Hidden": change it to expect the Services link, with `href="/services"`.
   - `test/routes.test.ts`, "does not resolve the Services URL while Services is Hidden": change it to expect `/services` to match.
4. Run `npm run test:coverage` and `npm run build`.

**Note:** the page already has two commented-out blocks of its own in `src/pages/Services.tsx`: the "How I Work" process section (`id="process"`) and the "Ready to Build Something?" call to action (`id="cta"`). Restoring the page doesn't need them. If you uncomment either one, also import what it uses: `steps` from `src/data/services.tsx`, `motion` from `framer-motion`, and `WarmCard` and `WarmButton` from `src/components`.

## My Story section

**What it is:** the personal "My Story" section at the bottom of the About page. It has several paragraphs about the owner's background and interests and, on desktop, a column of decorative icons beside them.

**Why it's Hidden:** to keep the About page professional. Whether it returns is undecided.

**Where it lives:**

- `src/pages/About.tsx`
  - The section is commented out with JSX comments (`{/*}` ... `*/}`), just above the bottom spacer. A one-line comment above it points to this doc. JSX comments can't nest, so the outer comment is closed and reopened around the section's own `{/* Off-centered decorative icons */}` comment. That gives two pairs of markers for one section.
  - The four symbols only My Story uses are commented out in the same file. Each line is tagged `// My Story (Hidden)`:
    - the `motion` import from `framer-motion`;
    - the mobile-detection hook: the `useIsMobile` import and the `isMobile` line that calls it;
    - the `storyIcons` import;
    - the `hoveredIcon` state.
- `src/data/storyIcons.tsx`: the story-icon data. It's still in the repo, just not imported.
- `test/About.test.tsx`: the test "does not render the Hidden My Story section" pins the section as Hidden. The file still mocks `framer-motion`, `use-mobile` and `storyIcons`, so the story tests work again once the section is restored.

The spacer at the bottom of the About page (`<div className="pb-20 md:pb-1" aria-hidden="true" />`) isn't part of My Story. It keeps the content clear of the mobile navigation, so leave it in place either way.

**How to restore it:**

1. In `src/pages/About.tsx`, uncomment the five lines tagged `// My Story (Hidden)`. Remove the leading `// ` and the trailing tag.
2. Uncomment the section. Delete the two `{/*}` lines and the two `*/}` lines around it, and the one-line pointer comment above it. Keep the `{/* Off-centered decorative icons */}` comment.
3. In `test/About.test.tsx`, change the story tests back to expect the section:
   - Rename "does not render the Hidden My Story section" to "renders the story section". Make it assert that `section-story` and `section-header-My Story` are in the document (`.toBeInTheDocument()` instead of `.not.toBeInTheDocument()`).
   - In "renders sections with correct backgrounds", add `section-story` back with `data-background` set to `white`. My Story now follows the cream Education section, so white keeps the backgrounds alternating. The section's commented-out `<Section id="story" ...>` already uses `background="white"`.
4. Run `npm run test:coverage` and `npm run build`, then check the section by eye at mobile and desktop widths. Commented-out code isn't compiled, so it may have gone stale while it was Hidden. A component, prop or the story-icon data it uses may have changed since.
5. Remove this entry from this doc.
